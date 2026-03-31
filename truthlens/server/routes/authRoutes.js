import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
// Logout is typically handled on the client by destroying the token
router.post('/logout', (req, res) => res.json({ message: 'Logged out successfully' }));

export default router;
