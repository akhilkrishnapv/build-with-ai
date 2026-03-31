import React, { useState } from 'react';
import { Shield, Fingerprint, Mail, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  onNext: () => void;
}

export default function SignInScreen({ onNext }: Props) {
  const { loginAsUser, loginAsGuest } = useAuth();
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      loginAsUser(email);
      onNext();
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    onNext();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Fingerprint className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Secure your analysis history and reports.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-2xl shadow-2xl">
          <Button variant="outline" className="w-full mb-4 h-11 relative" onClick={() => { loginAsUser('user@google.com'); onNext(); }}>
            {/* Simple colored dots to mock Google logo for pure standard react */}
            <div className="absolute left-4 flex gap-0.5">
               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
               <div className="w-2 h-2 rounded-full bg-red-500"></div>
               <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
               <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            Sign in with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide shadow-lg shadow-primary/20">
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <button 
              onClick={handleGuest}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline mb-2"
            >
              Skip & Continue as Guest
            </button>
            <div className="text-sm font-medium text-muted-foreground mt-2">
              Don't have an account? <span className="text-primary hover:underline cursor-pointer">Create an account</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed max-w-[250px] mx-auto opacity-70">
              Your analysis can still be used without an account, but history will not persist.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
