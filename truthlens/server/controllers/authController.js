import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback', { expiresIn: '30d' });
};

export const registerUser = async (req, res) => {
  console.log('[Auth Debug] Register request payload:', { ...req.body, password: '[REDACTED]' });
  
  const { name, email, password } = req.body;
  
  try {
    // Basic validation
    if (!name || !email || !password) {
      console.log('[Auth Error] Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Email basic regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log('[Auth Error] Invalid email format');
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    if (password.length < 6) {
       console.log('[Auth Error] Password too short');
       return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('[Auth Error] User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    if (user) {
      console.log(`[Auth Success] User registered: ${user.email}`);
      res.status(201).json({
        message: 'Account created successfully',
        _id: user.id,
        email: user.email
      }); // DO NOT return token here, force them to log in!
    } else {
      console.log('[Auth Error] Invalid user data during creation');
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('[Auth Exception]', error);
    res.status(500).json({ message: 'Server error during registration: ' + error.message, stack: error.stack });
  }
};

export const loginUser = async (req, res) => {
  console.log('[Auth Debug] Login request payload:', { email: req.body.email });
  const { email, password } = req.body;
  
  try {
    if (!email || !password) {
       console.log('[Auth Error] Missing login fields');
       return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('[Auth Error] User not found during login');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('[Auth Error] Incorrect password');
      return res.status(401).json({ message: 'Incorrect password' });
    }

    console.log(`[Auth Success] User logged in: ${user.email}`);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      themePreference: user.themePreference,
      layoutPreference: user.layoutPreference,
      fontPreference: user.fontPreference,
      token: generateToken(user.id)
    });
  } catch (error) {
    console.error('[Auth Exception]', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getMe = async (req, res) => {
  res.json({
      _id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      themePreference: req.user.themePreference,
      layoutPreference: req.user.layoutPreference,
      fontPreference: req.user.fontPreference,
  });
};
