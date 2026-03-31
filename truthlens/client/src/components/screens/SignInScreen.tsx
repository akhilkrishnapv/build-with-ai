import React, { useState } from 'react';
import { Fingerprint, Mail, Key, UserPlus, LogIn, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignInScreen() {
  const { loginUser, registerUser, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    resetForm();
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Front-end validation for Registration
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        await loginUser({ email: formData.email, password: formData.password });
        navigate('/dashboard');
      } else {
        await registerUser({ 
           name: formData.name, 
           email: formData.email, 
           password: formData.password 
        });
        setSuccess('Account created successfully. Please sign in!');
        setIsLogin(true);
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      }
    } catch (err: any) {
      if (err.response) {
         setError(err.response.data.message || 'Server error occurred');
      } else if (err.request) {
         setError('Network error. Could not reach the server.');
      } else {
         setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <Fingerprint className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-muted-foreground text-sm">Secure your analysis history and reports.</p>
        </div>

        <div className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-2xl shadow-2xl">
          {error && <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg text-center font-medium">{error}</div>}
          {success && <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm rounded-lg text-center font-medium">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <AnimatePresence>
              {!isLogin && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-1 overflow-hidden">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="John Doe" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@company.com" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-1">
               <div className="flex justify-between items-center pr-1">
                 <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Password</label>
               </div>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
              </div>
            </div>

            <AnimatePresence>
              {!isLogin && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-1 overflow-hidden">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} placeholder="••••••••" className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide shadow-lg mt-6">
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register Account'}
            </Button>
          </form>

          <div className="text-center">
            <button onClick={handleGuest} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline mb-2">
              Skip & Continue as Guest
            </button>
            <div className="text-sm font-medium text-muted-foreground mt-4 pt-4 border-t border-border">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span onClick={handleToggle} className="text-primary hover:underline cursor-pointer font-bold">
                {isLogin ? 'Create an account' : 'Sign In instead'}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed max-w-[250px] mx-auto opacity-70">
              Analysis algorithms run equally for guests, but verification history reports will not strictly persist permanently tracking metadata.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
