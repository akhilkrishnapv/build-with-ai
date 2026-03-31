import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import IntroScreen from '@/components/screens/IntroScreen';
import SignInScreen from '@/components/screens/SignInScreen';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

export type ScreenState = 'intro' | 'signin' | 'dashboard';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('intro');

  // Animation variants
  const variants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <AnimatePresence mode="wait">
        {currentScreen === 'intro' && (
          <motion.div key="intro" variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
            <IntroScreen onNext={() => setCurrentScreen('signin')} />
          </motion.div>
        )}
        {currentScreen === 'signin' && (
          <motion.div key="signin" variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0">
            <SignInScreen onNext={() => setCurrentScreen('dashboard')} />
          </motion.div>
        )}
        {currentScreen === 'dashboard' && (
          <motion.div key="dashboard" variants={variants} initial="initial" animate="animate" exit="exit" className="relative min-h-screen">
            <MainLayout onNavigateHome={() => setCurrentScreen('intro')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SettingsProvider>
  );
}
