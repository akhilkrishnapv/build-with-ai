import React, { useState } from 'react';
import { Shield, Settings, History, UploadCloud, UserCircle, PieChart, Focus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import SettingsModal from '@/components/settings/SettingsModal';

interface Props {
  onReset: () => void;
  onNavigateHome: () => void;
}

export default function Navbar({ onReset, onNavigateHome }: Props) {
  const { user } = useAuth();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('scan');

  const navItems = [
    { id: 'scan', label: 'Dashboard', icon: UploadCloud },
    { id: 'history', label: 'History', icon: History },
    { id: 'compare', label: 'Compare', icon: Focus },
    { id: 'reports', label: 'Reports', icon: PieChart },
  ];

  return (
    <>
      <nav className="border-b bg-card/80 backdrop-blur-md border-border sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onNavigateHome}
            >
              <div className="bg-primary p-2 rounded-xl shadow-md">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-extrabold text-lg tracking-tight leading-none text-foreground">TruthLens</h1>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">V2 Core</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 border-l border-border pl-6 ml-2">
              <Button variant="ghost" size="sm" onClick={onNavigateHome} className="text-muted-foreground hover:text-foreground">
                <Home className="w-4 h-4 mr-2" /> Home
              </Button>
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Button 
                    key={item.id} 
                    variant={isActive ? "secondary" : "ghost"} 
                    size="sm" 
                    onClick={() => {
                      setActiveTab(item.id);
                      if(item.id === 'scan') onReset();
                    }}
                    className={`relative ${isActive ? 'text-foreground font-semibold bg-secondary/50' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-t-full" />
                    )}
                  </Button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)} className="rounded-full bg-card hover:bg-secondary border-border text-foreground">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="h-6 w-px bg-border mx-1" />
            <Button variant="ghost" className="pl-2 pr-4 rounded-full border border-border bg-card/50 hover:bg-secondary">
              <UserCircle className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm font-medium truncate max-w-[120px]">{user ? user.name : 'Profile / Sign In'}</span>
            </Button>
          </div>
        </div>
      </nav>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
}
