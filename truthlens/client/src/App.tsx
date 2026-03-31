import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from '@/components/screens/IntroScreen';
import SignInScreen from '@/components/screens/SignInScreen';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import DashboardPage from '@/pages/DashboardPage';
import HistoryPage from '@/pages/HistoryPage';
import ComparePage from '@/pages/ComparePage';
import ReportsPage from '@/pages/ReportsPage';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased text-foreground">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<IntroScreen onNext={() => window.location.href = '/login'} />} />
              <Route path="/login" element={<SignInScreen />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}
