import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Building2, Package, BarChart3, X, ChevronDown } from 'lucide-react';
import { mockAlerts, mockBranches, mockStock } from '../data';
import { ViewState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onViewChange: (view: ViewState) => void;
}

export function Header({ onViewChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const unreadAlerts = mockAlerts.filter(a => !a.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const reports = [
    { id: 'rev-analytics', name: 'Revenue Analytics', view: 'analytics' as ViewState },
    { id: 'prof-analytics', name: 'Profit Analytics', view: 'analytics' as ViewState },
    { id: 'exp-analytics', name: 'Expense Analytics', view: 'analytics' as ViewState },
    { id: 'cash-analytics', name: 'Cash Flow Analytics', view: 'analytics' as ViewState },
  ];

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    
    const branchResults = mockBranches
      .filter(b => b.name.toLowerCase().includes(query) || b.code.toLowerCase().includes(query))
      .map(b => ({ id: `b-${b.id}`, type: 'branch', icon: Building2, title: b.name, subtitle: b.code, view: 'branches' as ViewState }));
      
    const stockResults = mockStock
      .filter(s => s.product.toLowerCase().includes(query) || s.sku.toLowerCase().includes(query))
      .map(s => ({ id: `s-${s.id}`, type: 'product', icon: Package, title: s.product, subtitle: s.sku, view: 'stock' as ViewState }));
      
    const reportResults = reports
      .filter(r => r.name.toLowerCase().includes(query))
      .map(r => ({ id: `r-${r.id}`, type: 'report', icon: BarChart3, title: r.name, subtitle: 'Analytics Report', view: r.view }));
      
    return [...branchResults, ...stockResults, ...reportResults].slice(0, 6);
  };
  
  const results = getSearchResults();

  const handleResultClick = (view: ViewState) => {
    onViewChange(view);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-16 border-b border-white/5 bg-bg-surface/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6 transition-colors duration-200"
    >
      <div className="relative w-96" ref={searchRef}>
        <motion.div 
          animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex items-center gap-4 bg-bg-base/50 border border-white/10 rounded-full px-4 py-2 w-full focus-within:border-primary/50 focus-within:bg-bg-base focus-within:shadow-[0_0_15px_rgba(79,70,229,0.15)] transition-all duration-300"
        >
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input 
            type="text" 
            placeholder="Search branches, products, or reports..." 
            className="bg-transparent border-none outline-none text-sm w-full text-text-main placeholder-text-muted/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button 
                initial={{ scale: 0, opacity: 0, rotate: -90 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 90 }}
                onClick={() => setSearchQuery('')} 
                className="text-text-muted hover:text-text-main shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isSearchFocused && searchQuery.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full mt-3 bg-bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 origin-top"
            >
              {results.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 pb-2 pt-2 text-xs font-bold text-text-muted uppercase tracking-wider border-b border-white/5 mb-1">
                    Search Results
                  </div>
                  <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                    {results.map((result, index) => {
                      const Icon = result.icon;
                      return (
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          key={result.id}
                          onClick={() => handleResultClick(result.view)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-bg-surface border border-white/5 flex items-center justify-center shrink-0 text-text-muted group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="text-sm font-medium text-text-main truncate group-hover:text-primary transition-colors">{result.title}</div>
                            <div className="text-xs text-text-muted truncate">{result.subtitle}</div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-bg-surface flex items-center justify-center text-text-muted mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium text-text-main mb-1">No results found</div>
                  <div className="text-xs text-text-muted">
                    We couldn't find anything matching "{searchQuery}"
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewChange('alerts')}
          className="relative text-text-muted hover:text-text-main transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Bell className="w-5 h-5" />
          {unreadAlerts > 0 && (
            <>
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full ring-2 ring-bg-surface z-10" 
              />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full animate-ping z-0" />
            </>
          )}
        </motion.button>
        
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 cursor-pointer p-1.5 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-purple-500 overflow-hidden border border-white/10 shadow-lg relative group">
            <img src="https://ui-avatars.com/api/?name=Alexander+Pierce&background=random&color=fff" alt="Avatar" className="w-full h-full object-cover relative z-10" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-text-main leading-tight">Alexander Pierce</div>
            <div className="text-xs text-primary font-medium">CEO / Founder</div>
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted hidden sm:block ml-1" />
        </motion.div>
      </div>
    </motion.header>
  );
}
