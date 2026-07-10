import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { AICopilot } from './views/AICopilot';
import { Branches } from './views/Branches';
import { Stock } from './views/Stock';
import { Analytics } from './views/Analytics';
import { Settings } from './views/Settings';
import { Debts } from './views/Debts';
import { Alerts } from './views/Alerts';
import { Reports } from './views/Reports';
import { Login } from './views/Login';
import { ViewState } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'copilot': return <AICopilot />;
      case 'branches': return <Branches />;
      case 'stock': return <Stock />;
      case 'debts': return <Debts />;
      case 'alerts': return <Alerts />;
      case 'analytics': return <Analytics />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-bg-base overflow-hidden">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={() => setIsAuthenticated(false)} />
      
      <div className="flex-1 flex flex-col relative">
        <Header onViewChange={setCurrentView} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
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
