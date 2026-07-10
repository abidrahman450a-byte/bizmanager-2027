import { motion } from 'motion/react';
import { mockAlerts } from '../data';
import { AlertTriangle, TrendingDown, Info, ShieldAlert, CheckCircle2, PackageX } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const alerts = filter === 'all' ? mockAlerts : mockAlerts.filter(a => !a.read);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <PackageX className="w-5 h-5 text-warning" />;
      case 'profit_drop':
      case 'revenue_drop': return <TrendingDown className="w-5 h-5 text-danger" />;
      case 'system': return <Info className="w-5 h-5 text-primary" />;
      default: return <ShieldAlert className="w-5 h-5 text-text-muted" />;
    }
  };

  const getAlertColor = (type: string, read: boolean) => {
    if (read) return "bg-bg-surface border-white/5 opacity-75";
    switch (type) {
      case 'low_stock': return "bg-warning/5 border-warning/20";
      case 'profit_drop':
      case 'revenue_drop': return "bg-danger/5 border-danger/20";
      case 'system': return "bg-primary/5 border-primary/20";
      default: return "bg-bg-surface border-white/10";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">System Alerts</h1>
          <p className="text-text-muted">Stay updated with critical notifications and system events.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-bg-surface border border-white/10 p-1 rounded-lg">
          <button 
            onClick={() => setFilter('all')}
            className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", filter === 'all' ? "bg-white/10 text-white" : "text-text-muted hover:text-white")}
          >
            All Alerts
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2", filter === 'unread' ? "bg-white/10 text-white" : "text-text-muted hover:text-white")}
          >
            Unread
            {mockAlerts.filter(a => !a.read).length > 0 && (
              <span className="w-2 h-2 bg-danger rounded-full" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-12 bg-bg-card rounded-2xl border border-white/5">
            <CheckCircle2 className="w-12 h-12 text-success/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">You're all caught up!</h3>
            <p className="text-text-muted">No new alerts to display.</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-4 sm:p-6 rounded-2xl border transition-colors flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center",
                getAlertColor(alert.type, alert.read)
              )}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1 sm:mt-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h4 className={cn("text-base font-medium", alert.read ? "text-text-muted" : "text-white")}>
                    {alert.message}
                  </h4>
                  <div className="text-sm text-text-muted mt-1 flex items-center gap-2">
                    <span>{alert.timestamp}</span>
                    {!alert.read && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-primary text-xs font-medium uppercase tracking-wider">New</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {!alert.read && (
                <button className="shrink-0 text-sm font-medium text-text-muted hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg">
                  Mark as Read
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
