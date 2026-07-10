import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Smartphone, Lock, User, ArrowRight, ShieldCheck, Mail, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [step, setStep] = useState<'credentials' | '2fa' | 'fingerprint'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setStep('2fa');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every(c => c !== '')) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-bg-base to-bg-base" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-primary/20"
          >
            <Building2 className="w-8 h-8" />
          </motion.div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">BizManager System</h1>
          <p className="text-text-muted">Enterprise Management Platform</p>
        </div>

        <div className="bg-bg-surface border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 'credentials' && (
              <motion.form
                key="credentials"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleCredentialSubmit}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
                  <p className="text-sm text-text-muted">Enter your credentials to access your account</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted ml-1">Username</label>
                    <div className="relative">
                      <User className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="e.g., alex.pierce" 
                        className="w-full bg-bg-base border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-text-muted ml-1">Password</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full bg-bg-base border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-white/10 bg-bg-base text-primary focus:ring-primary/50" />
                    <span className="text-text-muted hover:text-white transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">Forgot password?</a>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-bg-surface px-4 text-text-muted uppercase tracking-wider">Or continue with</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('fingerprint')}
                  className="w-full bg-bg-base border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-white rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Fingerprint className="w-5 h-5 text-primary" />
                  Biometric Login
                </button>
              </motion.form>
            )}

            {step === '2fa' && (
              <motion.form
                key="2fa"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handle2FASubmit}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">Two-Factor Authentication</h2>
                  <p className="text-sm text-text-muted max-w-[280px] mx-auto">
                    We've sent a verification code to your registered device ending in ****492.
                  </p>
                </div>

                <div className="flex justify-center gap-2 sm:gap-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const newCode = [...code];
                        newCode[index] = e.target.value;
                        setCode(newCode);
                        if (e.target.value && index < 5) {
                          const nextInput = document.getElementById(`code-${index + 1}`);
                          nextInput?.focus();
                        }
                      }}
                      id={`code-${index}`}
                      className="w-10 sm:w-12 h-12 sm:h-14 bg-bg-base border border-white/10 rounded-xl text-center text-lg sm:text-xl font-bold text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={!code.every(c => c !== '')}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify & Login
                </button>

                <div className="text-center">
                  <button type="button" onClick={() => setStep('credentials')} className="text-sm text-text-muted hover:text-white transition-colors">
                    Back to login
                  </button>
                </div>
              </motion.form>
            )}

            {step === 'fingerprint' && (
              <motion.div
                key="fingerprint"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="space-y-8 text-center py-6"
              >
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-2">Biometric Authentication</h2>
                  <p className="text-sm text-text-muted">Place your finger on the sensor</p>
                </div>

                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto cursor-pointer"
                  onClick={() => onLogin()} // Simulate successful scan
                >
                  <Fingerprint className="w-12 h-12 text-primary" />
                </motion.div>

                <p className="text-xs text-text-muted max-w-[240px] mx-auto">
                  Click the fingerprint icon above to simulate a successful biometric scan.
                </p>

                <button type="button" onClick={() => setStep('credentials')} className="text-sm text-text-muted hover:text-white transition-colors">
                  Use password instead
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 text-center text-xs text-text-muted flex items-center justify-center gap-4">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-white transition-colors">Help Center</a>
        </div>
      </div>
    </div>
  );
}
