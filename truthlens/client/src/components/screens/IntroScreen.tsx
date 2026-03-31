import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, Moon, Sun, Palette } from 'lucide-react';
import { useSettings, Theme } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';

interface Props {
  onNext: () => void;
}

const QUOTES = [
  "Seeing is no longer believing.",
  "Verify before you trust.",
  "Truth matters in the age of AI.",
  "Distinguish reality from generation."
];

export default function IntroScreen({ onNext }: Props) {
  const { theme, updateSetting } = useSettings();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const themeOptions: { id: Theme; label: string; bg: string }[] = [
    { id: 'dark', label: 'Dark', bg: 'bg-zinc-900' },
    { id: 'light', label: 'Light', bg: 'bg-zinc-100' },
    { id: 'red-black', label: 'Red', bg: 'bg-red-900' },
    { id: 'green-black', label: 'Green', bg: 'bg-green-900' },
    { id: 'blue-white', label: 'Blue', bg: 'bg-blue-600' },
    { id: 'cyberpunk', label: 'Neon', bg: 'bg-pink-600' },
    { id: 'minimal-gray', label: 'Gray', bg: 'bg-neutral-400' },
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-background flex flex-col items-center justify-center">
      {/* Background Particles/Blur */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[150px]" 
        />
      </div>

      <div className="absolute top-6 right-8 z-20">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => updateSetting('theme', theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full bg-card/10 backdrop-blur-md border border-border/50 hover:bg-card/20 text-foreground"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="bg-primary p-4 rounded-2xl shadow-xl shadow-primary/20 mb-6">
            <Shield className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-4">TruthLens</h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] text-muted-foreground font-semibold mb-16">
            AI Media Verification
          </p>
        </motion.div>

        <div className="h-20 mb-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="text-xl md:text-2xl font-medium text-foreground/80 italic"
            >
              "{QUOTES[quoteIndex]}"
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 1 }}
        >
          <Button 
            onClick={onNext} 
            size="lg" 
            className="group h-14 px-8 rounded-full text-lg font-bold shadow-2xl shadow-primary/25 bg-foreground text-background hover:scale-105 transition-transform"
          >
            Enter Platform
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Theme Quick Selector */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-0 right-0 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5" /> Initialize Theme
          </div>
          <div className="flex bg-card/50 backdrop-blur-md border border-border p-2 rounded-full shadow-lg gap-2">
            {themeOptions.map((t) => (
              <button
                key={t.id}
                onClick={() => updateSetting('theme', t.id)}
                title={t.label}
                className={`w-8 h-8 rounded-full transition-all border-2 ${t.bg} ${
                  theme === t.id ? 'border-primary scale-110 shadow-md shadow-primary/30' : 'border-transparent hover:scale-105 opacity-80'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
