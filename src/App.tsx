import React, { useState } from 'react';
import { 
  LayoutGrid, Building2, Package, Users, User,
  DollarSign, FileText, CreditCard, LogOut, ChevronDown, 
  Activity, Bell, Settings, HelpCircle, Hexagon, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './views/Dashboard';
import { Branches } from './views/Branches';
import { Inventory } from './views/Inventory';
import { Employees } from './views/Employees';
import { Finance } from './views/Finance';
import { Reports } from './views/Reports';
import { Login } from './views/Login';
import { Customers } from './views/Customers';
import { Settings as SettingsView } from './views/Settings';
import { ViewState } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
      case 'settings': return <SettingsView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 capitalize">{currentView.replace('_', ' ')}</h2>
          <p className="text-slate-500 max-w-md mx-auto">This section is currently under development.</p>
        </div>
      );
    }
  };

  const toggleMenu = (menu: string) => {
    if (expandedMenu === menu) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menu);
    }
  };

  const menuItems = [
    { id: 'dashboard', icon: <LayoutGrid className="w-[18px] h-[18px]" />, label: 'Dashboard' },
    { id: 'branches', icon: <Building2 className="w-[18px] h-[18px]" />, label: 'Branches', subItems: ['All Branches', 'Performance', 'Add Branch'] },
    { id: 'inventory', icon: <Package className="w-[18px] h-[18px]" />, label: 'Inventory', subItems: ['Stock Levels', 'Categories', 'Transfers'] },
    { id: 'customers', icon: <Users className="w-[18px] h-[18px]" />, label: 'Customers', subItems: ['All Customers', 'VIP Group', 'Feedback'] },
    { id: 'employees', icon: <User className="w-[18px] h-[18px]" />, label: 'Employees', subItems: ['Directory', 'Attendance', 'Payroll'] },
    { id: 'finance', icon: <DollarSign className="w-[18px] h-[18px]" />, label: 'Finance', subItems: ['Overview', 'Transactions', 'P&L'] },
    { id: 'reports', icon: <FileText className="w-[18px] h-[18px]" />, label: 'Reports', subItems: ['Sales Report', 'Tax Report', 'Custom'] },
    { id: 'expenses', icon: <CreditCard className="w-[18px] h-[18px]" />, label: 'Expenses', subItems: ['Petty Cash', 'Bills', 'Claims'] },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* Animated Sidebar */}
      <motion.aside 
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-[280px] bg-[#0A0F1C] text-white flex flex-col flex-shrink-0 shadow-2xl z-20 relative border-r border-white/5"
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] pointer-events-none rounded-full" />
        
        {/* Logo Section */}
        <div className="p-6 pb-8 pt-8 flex items-center gap-3 relative z-10">
          <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Hexagon className="w-6 h-6 text-white absolute" strokeWidth={2.5} />
            <Sparkles className="w-3 h-3 text-blue-200 absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="font-black text-xl leading-tight tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">BIZMANAGER</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar z-10 relative pb-6 mt-2">
          {menuItems.map((item) => (
            <NavItem 
              key={item.id}
              icon={item.icon} 
              label={item.label} 
              active={currentView === item.id} 
              expanded={expandedMenu === item.id}
              subItems={item.subItems}
              onClick={() => setCurrentView(item.id as ViewState)} 
              onToggle={() => toggleMenu(item.id)}
            />
          ))}
          
          <div className="mt-8"></div>
          <NavItem 
            icon={<Settings className="w-[18px] h-[18px]" />} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => setCurrentView('settings')} 
          />
          <NavItem 
            icon={<HelpCircle className="w-[18px] h-[18px]" />} 
            label="Help & Support" 
          />
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden z-10 relative bg-[#F8FAFC]">
        {/* Header */}
        <header className="px-8 py-5 flex items-center justify-between bg-white border-b border-slate-200/60 sticky top-0 z-30 backdrop-blur-md bg-white/90">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={currentView}
          >
            <h1 className="text-2xl font-bold text-slate-900 capitalize tracking-tight">
              {currentView === 'dashboard' ? 'Dashboard Overview' : currentView.replace('_', ' ')}
            </h1>
          </motion.div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
              <Activity className="w-[18px] h-[18px]" />
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all relative shadow-sm group">
              <Bell className="w-[18px] h-[18px] group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-full transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-md hover:shadow-lg transition-shadow relative">
                  OW
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                      <h2 className="text-sm font-bold text-slate-900">Abid Rahman</h2>
                      <p className="text-xs text-slate-500 font-medium">System Owner</p>
                    </div>
                    <div className="p-1.5">
                      <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                        <User className="w-4 h-4 text-slate-400" /> My Profile
                      </button>
                      <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors">
                        <Settings className="w-4 h-4 text-slate-400" /> Settings
                      </button>
                      <div className="h-px bg-slate-100 my-1 mx-2" />
                      <button 
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          {renderView()}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

function NavItem({ 
  icon, 
  label, 
  active = false, 
  expanded = false, 
  subItems, 
  onClick,
  onToggle
}: { 
  icon: React.ReactNode, 
  label: string, 
  active?: boolean, 
  expanded?: boolean, 
  subItems?: string[], 
  onClick?: () => void,
  onToggle?: () => void
}) {
  const hasDropdown = subItems && subItems.length > 0;

  return (
    <div className="mb-1">
      <button 
        onClick={() => {
          if (onClick) onClick();
          if (hasDropdown && onToggle) onToggle();
        }}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-300 group ${
          active 
            ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25' 
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className={`transition-transform duration-300 ${active ? 'scale-110 text-white' : 'group-hover:scale-110 group-hover:text-blue-400 text-slate-400'}`}>
            {icon}
          </div>
          <span className={`font-semibold text-[14px] tracking-wide transition-colors ${active ? 'text-white' : 'group-hover:text-white'}`}>{label}</span>
        </div>
        {hasDropdown && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''} ${active ? 'text-white/80' : 'text-slate-500 group-hover:text-slate-300'}`} />
        )}
      </button>
      
      <AnimatePresence>
        {hasDropdown && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="pl-12 pr-4 py-2 space-y-1 relative">
              <div className="absolute left-6 top-0 bottom-4 w-px bg-slate-800" />
              {subItems.map((sub, idx) => (
                <motion.button
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={onClick} // Just activates parent view for now
                  className="relative w-full text-left py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group flex items-center"
                >
                  <div className="absolute -left-6 w-3 h-px bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                  <span className="group-hover:translate-x-1 transition-transform">{sub}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
