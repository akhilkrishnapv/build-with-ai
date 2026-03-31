import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

export type UserStatus = 'loading' | 'unknown' | 'guest' | 'authenticated';

export interface UserData {
  _id: string;
  email: string;
  name: string;
  token?: string;
}

interface AuthState {
  status: UserStatus;
  user: UserData | null;
  loginUser: (data: any) => Promise<void>;
  registerUser: (data: any) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<UserStatus>('loading');
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem('truthlens_user');
      const isGuest = localStorage.getItem('truthlens_guest') === 'true';

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setStatus('authenticated');
        } catch (e) {
          localStorage.removeItem('truthlens_user');
          setStatus('unknown');
        }
      } else if (isGuest) {
        setStatus('guest');
      } else {
        setStatus('unknown');
      }
    };
    checkAuthStatus();
  }, []);

  const loginUser = async (credentials: any) => {
    const { data } = await API.post('/auth/login', credentials);
    setUser(data);
    setStatus('authenticated');
    localStorage.setItem('truthlens_user', JSON.stringify(data));
    localStorage.removeItem('truthlens_guest');
  };

  const registerUser = async (credentials: any) => {
    // Only register, do not set auth status or local storage automatically
    await API.post('/auth/register', credentials);
  };

  const loginAsGuest = () => {
    setStatus('guest');
    setUser(null);
    localStorage.removeItem('truthlens_user');
    localStorage.setItem('truthlens_guest', 'true');
  };

  const logout = () => {
    setStatus('unknown');
    setUser(null);
    localStorage.removeItem('truthlens_user');
    localStorage.setItem('truthlens_guest', 'false');
  };

  return (
    <AuthContext.Provider value={{ status, user, loginUser, registerUser, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
