import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute() {
  const { status } = useAuth();
  
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Allow authenticated users and guests into the dashboard routes
  if (status === 'authenticated' || status === 'guest') {
    return <Outlet />;
  }
  
  return <Navigate to="/login" replace />;
}
