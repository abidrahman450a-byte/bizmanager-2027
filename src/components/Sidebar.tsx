import React from 'react';
import { 
  Menu, Home, LayoutGrid, Box, Users, 
  Mail, MessageSquare, Settings, CheckCircle2,
  Briefcase
} from 'lucide-react';
import type { ElementType } from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const navItems: { id: ViewState; icon: ElementType; label: string }[] = [
  { id: 'dashboard', icon: Home, label: 'Dashboard' },
  { id: 'branches', icon: LayoutGrid, label: 'Branches' },
  { id: 'inventory', icon: Box, label: 'Inventory' },
  { id: 'employees', icon: Briefcase, label: 'Employees' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'finance', icon: Mail, label: 'Finance' },
  { id: 'reports', icon: MessageSquare, label: 'Reports' },
];

export function Sidebar({ currentView, onViewChange, onLogout, isExpanded, onToggle }: SidebarProps) {
  return (
    <motion.div 
      animate={{ width: isExpanded ? 240 : 96 }}
      className="border-r border-slate-300/30 flex flex-col py-8 shrink-0 z-20 bg-white/20 backdrop-blur-sm h-full overflow-y-auto overflow-x-hidden scrollbar-hide"
    >
      <div className="flex items-center mb-8 px-8">
        <button 
          onClick={onToggle}
          className="w-12 h-12 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shrink-0 -ml-2"
        >
          <Menu className="w-6 h-6" />
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-2 font-bold text-slate-800 text-xl tracking-tight"
            >
              Menu
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 flex flex-col gap-2 w-full px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "relative flex items-center transition-all duration-300 group shrink-0",
                isExpanded ? "rounded-xl px-4 py-3 h-14" : "rounded-2xl aspect-square justify-center h-16 w-16 mx-auto",
                isActive 
                  ? "bg-[#E6F0EA]/80 text-emerald-600 shadow-sm border border-emerald-100/50" 
                  : "text-slate-400 hover:bg-white/50 hover:text-slate-600"
              )}
            >
              {isActive && !isExpanded && (
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-sm" />
              )}
              {isActive && isExpanded && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-sm" />
              )}
              
              <Icon className="w-6 h-6 shrink-0" strokeWidth={isActive ? 2 : 1.5} />
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="ml-4 font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4 w-full px-4">
        <button 
          onClick={() => onViewChange('settings')}
          className={cn(
            "relative flex items-center transition-all duration-300 shrink-0",
            isExpanded ? "rounded-xl px-4 py-3 h-14" : "rounded-2xl aspect-square justify-center h-16 w-16 mx-auto",
            currentView === 'settings' 
              ? "bg-[#E6F0EA]/80 text-emerald-600 shadow-sm border border-emerald-100/50" 
              : "text-slate-400 hover:bg-white/50 hover:text-slate-600"
          )}
        >
          {currentView === 'settings' && !isExpanded && (
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-sm" />
          )}
          {currentView === 'settings' && isExpanded && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-full shadow-sm" />
          )}
          
          <div className="relative">
            <Settings className="w-6 h-6 relative z-10 shrink-0" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white/50 z-20" />
          </div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-4 font-medium whitespace-nowrap"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        
        <button className={cn(
            "flex items-center text-slate-400 hover:bg-white/50 hover:text-slate-600 transition-colors shrink-0",
            isExpanded ? "rounded-xl px-4 py-3 h-14" : "rounded-2xl aspect-square justify-center h-16 w-16 mx-auto"
        )}>
           <CheckCircle2 className="w-6 h-6 shrink-0" strokeWidth={1.5} />
           <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-4 font-medium whitespace-nowrap"
              >
                Tasks
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
