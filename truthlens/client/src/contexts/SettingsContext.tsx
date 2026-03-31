import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'red-black' | 'green-black' | 'blue-white' | 'cyberpunk' | 'minimal-gray';
export type LayoutObj = 'narrow' | 'comfortable' | 'wide';
export type CardStyle = 'rounded' | 'sharp' | 'glass';
export type AnimationSpeed = 'none' | 'slow' | 'default' | 'fast';
export type FontSize = 'sm' | 'md' | 'lg';

interface SettingsState {
  theme: Theme;
  layout: LayoutObj;
  cardStyle: CardStyle;
  animations: AnimationSpeed;
  fontSize: FontSize;
}

interface SettingsContextType extends SettingsState {
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
}

const defaultSettings: SettingsState = {
  theme: 'dark',
  layout: 'comfortable',
  cardStyle: 'rounded',
  animations: 'default',
  fontSize: 'md',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem('truthlens_settings');
    // For backwards compability with previous browser state
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        return defaultSettings;
      }
    }
    // Check OS preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return { ...defaultSettings, theme: 'dark' };
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('truthlens_settings', JSON.stringify(settings));

    // Apply exact classes to document root for CSS variables
    const root = window.document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-red-black', 'theme-green-black', 'theme-blue-white', 'theme-cyberpunk', 'theme-minimal-gray', 'dark');
    
    // Core Tailwind dark mode class mapping
    if (settings.theme === 'dark' || settings.theme === 'red-black' || settings.theme === 'green-black' || settings.theme === 'cyberpunk') {
      root.classList.add('dark');
    }
    
    root.classList.add(`theme-${settings.theme}`);

    // Font Size
    root.classList.remove('text-sm', 'text-base', 'text-lg');
    if (settings.fontSize === 'sm') root.classList.add('text-sm');
    if (settings.fontSize === 'md') root.classList.add('text-base');
    if (settings.fontSize === 'lg') root.classList.add('text-lg');

  }, [settings]);

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ ...settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
