const fs = require('fs');
const content = `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Lock, ArrowRight, Building2 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-600/20"
          >
            <Building2 className="w-7 h-7" />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-500">Sign in to your BizManager account</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit} 
          className="space-y-5"
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">Username</label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., alex.pierce" 
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-gray-500 hover:text-gray-700 transition-colors">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-sm font-bold transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        <div className="mt-12 text-center text-xs text-gray-400 flex items-center justify-center gap-4">
          <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-gray-600 transition-colors">Help</a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/views/Login.tsx', content);
