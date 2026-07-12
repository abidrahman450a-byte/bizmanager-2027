import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Building2, 
  Box, 
  Users, 
  DollarSign, 
  FileText, 
  CreditCard, 
  Smartphone, 
  Settings, 
  LogOut,
  ChevronDown,
  LayoutGrid
} from 'lucide-react';
import type { ElementType } from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

const navItems: { id: ViewState; label: string; icon: ElementType; hasSubmenu?: boolean }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, hasSubmenu: true },
  { id: 'branches', label: 'Branches', icon: Building2, hasSubmenu: true },
  { id: 'inventory', label: 'Inventory', icon: Box, hasSubmenu: true },
  { id: 'customers', label: 'Customers', icon: Users, hasSubmenu: true },
  { id: 'employees', label: 'Employees', icon: Users, hasSubmenu: true },
  { id: 'finance', label: 'Finance', icon: DollarSign, hasSubmenu: true },
  { id: 'reports', label: 'Reports', icon: FileText, hasSubmenu: true },
  { id: 'expenses', label: 'Expenses', icon: CreditCard, hasSubmenu: true },
  { id: 'mobile_money', label: 'Mobile Money', icon: Smartphone, hasSubmenu: true },
  { id: 'settings', label: 'Settings', icon: Settings, hasSubmenu: true },
];

export function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    dashboard: true
  });

  const toggleSubmenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-64 bg-bg-surface border-r border-white/5 h-screen flex flex-col hidden md:flex shrink-0 shadow-xl z-20">
      {/* Header / Logo */}
      <div className="pt-8 pb-6 px-6 flex items-center gap-3">
        <div className="flex items-center justify-center shrink-0">
          <LayoutGrid className="w-7 h-7 text-white" />
        </div>
        <div>
          <div className="text-[22px] font-bold tracking-tight text-white leading-none">BIZMANAGER</div>
          <div className="text-[10px] text-text-sidebar-muted mt-1 uppercase tracking-wider font-semibold">Owner Monitor</div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-6 pb-6">
        <div className="flex items-center gap-3">
          <img src="https://ui-avatars.com/api/?name=Owner&background=1D4ED8&color=fff&size=40" alt="Avatar" className="w-10 h-10 rounded-full border border-white/20" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-text-sidebar">Owner</div>
            <div className="text-xs text-text-sidebar-muted">Monitor</div>
          </div>
          <button className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-text-sidebar-muted hover:text-white transition-colors">
            <UserIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <div key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors relative group",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-text-sidebar-muted hover:text-text-sidebar hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-text-sidebar-muted group-hover:text-text-sidebar")} />
                  <span>{item.label}</span>
                </div>
                
                <div className="flex items-center gap-2 relative z-10">
                  {item.hasSubmenu && (
                    <div 
                      onClick={(e) => toggleSubmenu(item.id, e)}
                      className={cn(
                        "w-4 h-4 flex items-center justify-center transition-transform duration-200",
                        openMenus[item.id] ? "rotate-180" : "",
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto">
         <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-text-sidebar-muted hover:text-white hover:bg-white/5"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
