import { motion } from 'motion/react';
import { Package, AlertTriangle, CheckCircle2, Search, Filter } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockStock } from '../data';

export function Stock() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Stock Monitoring</h1>
          <p className="text-text-muted">Global inventory oversight. View-only access.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-bg-surface border border-white/10 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search SKU or Product..." 
              className="bg-transparent border-none outline-none text-sm text-white w-48"
            />
          </div>
          <button className="flex items-center gap-2 bg-bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card border border-white/5 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2 text-text-muted text-sm font-medium"><Package className="w-4 h-4"/> Total SKUs</div>
          <div className="text-2xl font-semibold text-white">4,291</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-bg-card border border-warning/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><AlertTriangle className="w-12 h-12 text-warning"/></div>
          <div className="flex items-center gap-3 mb-2 text-warning text-sm font-medium"><AlertTriangle className="w-4 h-4"/> Low Stock Items</div>
          <div className="text-2xl font-semibold text-white">124</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-bg-card border border-danger/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><AlertTriangle className="w-12 h-12 text-danger"/></div>
          <div className="flex items-center gap-3 mb-2 text-danger text-sm font-medium"><AlertTriangle className="w-4 h-4"/> Out of Stock (Critical)</div>
          <div className="text-2xl font-semibold text-white">12</div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-text-muted bg-bg-surface/50 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Product / SKU</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Unit Price</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Total Value</th>
                <th className="px-6 py-4 font-medium">Value at Risk</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockStock.map(item => {
                const status = item.quantity === 0 ? 'critical' : item.quantity <= item.minQuantity ? 'low' : 'optimal';
                const totalValue = item.price * item.quantity;
                const valueAtRisk = status !== 'optimal' ? (item.minQuantity - item.quantity) * item.price : 0;
                return (
                  <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.product}</div>
                      <div className="text-xs text-text-muted mt-0.5">{item.sku} &bull; {item.barcode}</div>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{item.branch}</td>
                    <td className="px-6 py-4 font-mono text-white">${item.price.toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono">
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-base font-semibold",
                          status === 'critical' ? 'text-danger' : status === 'low' ? 'text-warning' : 'text-white'
                        )}>{item.quantity}</span>
                        <span className="text-xs text-text-muted">/ Min {item.minQuantity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-white">${totalValue.toLocaleString()}</td>
                    <td className="px-6 py-4 font-mono font-medium">
                      {valueAtRisk > 0 ? (
                        <span className={status === 'critical' ? 'text-danger' : 'text-warning'}>
                          ${valueAtRisk.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium capitalize flex items-center w-fit gap-1.5",
                        status === 'optimal' && "bg-success/10 text-success border border-success/20",
                        status === 'low' && "bg-warning/10 text-warning border border-warning/20",
                        status === 'critical' && "bg-danger/10 text-danger border border-danger/20 animate-pulse"
                      )}>
                        {status === 'optimal' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                        {status === 'optimal' ? 'Optimal' : status === 'low' ? 'Low Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
