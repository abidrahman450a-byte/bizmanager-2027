import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Building2, 
  Package, 
  BarChart3, 
  Settings,
  LogOut,
  CreditCard,
  BellRing,
  FileText
} from 'lucide-react';
import type { ElementType } from 'react';
import { ViewState } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

const navItems: { id: ViewState; label: string; icon: ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'copilot', label: 'AI Copilot', icon: Sparkles },
  { id: 'branches', label: 'Branches', icon: Building2 },
  { id: 'stock', label: 'Stock', icon: Package },
  { id: 'debts', label: 'Credit & Debts', icon: CreditCard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'alerts', label: 'Alerts', icon: BellRing },
  { id: 'reports', label: 'Reports & Cash Flow', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ currentView, onViewChange, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-bg-surface border-r border-white/5 h-screen flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
          BM
        </div>
        <span className="text-xl font-bold tracking-tight text-white">BizManager</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative",
                isActive 
                  ? "text-white" 
                  : "text-text-muted hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-sidebar-bg"
                  className="absolute inset-0 bg-primary/20 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
