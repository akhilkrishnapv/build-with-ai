import React, { createContext, useContext, useState } from 'react';

export type UserStatus = 'unknown' | 'guest' | 'authenticated';

interface AuthState {
  status: UserStatus;
  user: { email: string; name: string } | null;
  loginAsUser: (email: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<UserStatus>('unknown');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const loginAsUser = (email: string) => {
    setStatus('authenticated');
    setUser({ email, name: email.split('@')[0] });
  };

  const loginAsGuest = () => {
    setStatus('guest');
    setUser(null);
  };

  const logout = () => {
    setStatus('unknown');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ status, user, loginAsUser, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
