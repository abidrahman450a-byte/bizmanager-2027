import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { Branches } from './views/Branches';
import { Inventory } from './views/Inventory';
import { Employees } from './views/Employees';
import { Finance } from './views/Finance';
import { Reports } from './views/Reports';
import { Login } from './views/Login';
import { Customers } from './views/Customers';
import { Settings } from './views/Settings';
import { ViewState } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Bell } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'branches': return <Branches />;
      case 'inventory': return <Inventory />;
      case 'employees': return <Employees />;
      case 'finance': return <Finance />;
      case 'reports': return <Reports />;
      case 'customers': return <Customers />;
      case 'settings': return <Settings />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">{currentView.replace('_', ' ')}</h2>
          <p className="text-gray-500 max-w-md mx-auto">This section is currently under development. Please check back later.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={() => setIsAuthenticated(false)} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Simple Header */}
        <header className="h-20 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
             {currentView === 'dashboard' ? 'Dashboard Overview' : currentView.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
              <Activity className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Owner&background=1D4ED8&color=fff&size=40" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 pb-8">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
