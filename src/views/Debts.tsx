import { motion } from 'motion/react';
import { mockDebts } from '../data';
import { CreditCard, Search, Filter, Phone, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function Debts() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDebts = mockDebts.filter(debt => 
    debt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    debt.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDebt = mockDebts.reduce((acc, curr) => curr.status !== 'paid' ? acc + curr.amount : acc, 0);
  const overdueDebt = mockDebts.filter(d => d.status === 'overdue').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Credit & Debts</h1>
          <p className="text-text-muted">Manage outstanding balances and accounts receivable.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-bg-surface border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export List
          </button>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add New Record
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium mb-1">Total Outstanding Debt</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">${totalDebt.toLocaleString()}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium mb-1">Total Overdue</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">${overdueDebt.toLocaleString()}</h3>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-text-muted text-sm font-medium mb-1">Collected This Month</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">$12,450</h3>
        </motion.div>
      </div>

      <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h3 className="text-lg font-medium text-white">Accounts Receivable</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search customers or branches..." 
                className="w-full bg-bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 bg-bg-surface border border-white/10 rounded-lg text-text-muted hover:text-white transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-muted bg-bg-surface/50 border-b border-white/5 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Customer Details</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Amount Due</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDebts.map((debt, index) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={debt.id} 
                  className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{debt.customerName}</div>
                    <div className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" />
                      {debt.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{debt.branch}</td>
                  <td className="px-6 py-4 font-mono font-medium text-white">
                    ${debt.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-muted flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(debt.dueDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center gap-1.5",
                      debt.status === 'paid' && "bg-success/10 text-success",
                      debt.status === 'pending' && "bg-primary/10 text-primary",
                      debt.status === 'overdue' && "bg-danger/10 text-danger"
                    )}>
                      {debt.status === 'overdue' && <AlertTriangle className="w-3 h-3" />}
                      {debt.status === 'pending' && <Clock className="w-3 h-3" />}
                      {debt.status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
                      {debt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Record Payment
                    </button>
                  </td>
                </motion.tr>
              ))}
              {filteredDebts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-muted">
                    No credit records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
