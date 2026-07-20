import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setLoading(true);
      setError('');
      try {
        // Attempt to sign in with Supabase
        const { error } = await supabase.auth.signInWithPassword({
          email: username,
          password: password,
        });
        if (error) {
          throw error;
        }
        // Auth state listener in App will handle redirect
        onLogin();
      } catch (err: any) {
        setError(err.message || 'Failed to login');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6 selection:bg-blue-500/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0A0F1C] to-[#0A0F1C] pointer-events-none" />
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[360px] relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6"
          >
            <Activity className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-display tracking-tight font-bold text-white mb-2">BizManager</h1>
          <p className="text-blue-200/60 text-sm">Sign in to your account</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit} 
          className="space-y-4"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}
          <div>
            <input 
              type="email" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email address" 
              className="w-full bg-[#11214D] border border-blue-500/20 rounded-xl px-5 py-4 text-sm text-white placeholder:text-blue-200/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" 
              className="w-full bg-[#11214D] border border-blue-500/20 rounded-xl px-5 py-4 text-sm text-white placeholder:text-blue-200/40 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-4 text-sm font-semibold transition-all flex items-center justify-center gap-2 group mt-6 shadow-lg shadow-blue-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
