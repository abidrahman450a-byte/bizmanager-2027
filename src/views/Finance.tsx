import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Building, Download, Plus, Search, Filter, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';

const incomeData = [
  { month: 'Jan', amount: 15000 },
  { month: 'Feb', amount: 18000 },
  { month: 'Mar', amount: 16500 },
  { month: 'Apr', amount: 22000 },
  { month: 'May', amount: 28000 },
  { month: 'Jun', amount: 32000 },
];

const expenseData = [
  { name: 'Payroll', value: 12000, color: '#ef4444' },
  { name: 'Marketing', value: 4500, color: '#f97316' },
  { name: 'Rent & Utilities', value: 3800, color: '#8b5cf6' },
  { name: 'Software', value: 1200, color: '#3b82f6' },
  { name: 'Other', value: 2500, color: '#64748b' },
];

const transactions = [
  { id: 1, name: 'Stripe Payout', type: 'income', amount: 12450.00, date: 'Today, 10:23 AM', status: 'Completed', icon: Building },
  { id: 2, name: 'AWS Cloud Services', type: 'expense', amount: 840.50, date: 'Yesterday', status: 'Completed', icon: Activity },
  { id: 3, name: 'Team Payroll', type: 'expense', amount: 12000.00, date: 'Jul 12', status: 'Completed', icon: Wallet },
  { id: 4, name: 'Shopify Payout', type: 'income', amount: 8230.00, date: 'Jul 10', status: 'Pending', icon: Building },
  { id: 5, name: 'Facebook Ads', type: 'expense', amount: 1200.00, date: 'Jul 09', status: 'Completed', icon: Activity },
];

export function Finance({ currentTab = 'Overview' }: { currentTab?: string }) {
  if (currentTab === 'Transactions') {
    return (
      <div className="flex flex-col gap-8 min-h-full text-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold font-display text-slate-900 tracking-tight"
            >
              Transactions
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-medium mt-1"
            >
              Manage incoming and outgoing payments
            </motion.p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search transactions..." className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-[250px]" />
             </div>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors hover:bg-slate-50"
             >
               <Filter className="w-4 h-4" /> Filter
             </motion.button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((tx, i) => (
                  <motion.tr 
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                          <tx.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{tx.name}</div>
                          <div className="text-sm text-slate-500 capitalize">{tx.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {tx.date}
                      </div>
                    </td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className={`font-bold text-lg ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    );
  }

  if (currentTab === 'P&L') {
    return (
      <div className="flex flex-col gap-8 min-h-full text-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold font-display text-slate-900 tracking-tight"
            >
              Profit & Loss
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 font-medium mt-1"
            >
              Monthly income statement overview
            </motion.p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors hover:bg-slate-50"
            >
              <Download className="w-4 h-4" /> Export PDF
            </motion.button>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Income Statement</h3>
              <p className="text-sm text-slate-500 font-medium">For the period ending Jul 2026</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none font-medium">
              <option>July 2026</option>
              <option>June 2026</option>
              <option>Q2 2026</option>
            </select>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Revenue</h4>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Gross Sales</span>
                <span className="font-bold text-slate-900">$131,500.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Returns & Allowances</span>
                <span className="font-bold text-slate-900">-$2,100.00</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-slate-200">
                <span className="text-slate-900 font-bold">Net Revenue</span>
                <span className="font-black text-emerald-600">$129,400.00</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 mt-8">Expenses</h4>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Payroll</span>
                <span className="font-bold text-slate-900">$12,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Marketing</span>
                <span className="font-bold text-slate-900">$4,500.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Rent & Utilities</span>
                <span className="font-bold text-slate-900">$3,800.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Software & Subscriptions</span>
                <span className="font-bold text-slate-900">$1,200.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-slate-600 font-medium">Other Operating Expenses</span>
                <span className="font-bold text-slate-900">$2,500.00</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-slate-200">
                <span className="text-slate-900 font-bold">Total Expenses</span>
                <span className="font-black text-rose-600">$24,000.00</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 mt-8 flex justify-between items-center">
              <span className="text-lg font-bold text-slate-900 uppercase tracking-wide">Net Profit</span>
              <span className="text-3xl font-black text-emerald-600">$105,400.00</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 min-h-full text-slate-800">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold font-display text-slate-900 tracking-tight"
          >
            Financial Center
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium mt-1"
          >
            Track revenues, expenses, and overall business health
          </motion.p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Download className="w-4 h-4" /> Export
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Record
          </motion.button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value="$142,300.00" 
          trend="+12.5%" 
          isPositive={true} 
          icon={<Wallet className="w-6 h-6 text-white" />} 
          color="bg-slate-900" 
          delay={0.1}
        />
        <StatCard 
          title="Total Income" 
          value="$131,500.00" 
          trend="+8.2%" 
          isPositive={true} 
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />} 
          color="bg-emerald-100" 
          delay={0.2}
        />
        <StatCard 
          title="Total Expenses" 
          value="$24,000.00" 
          trend="-2.4%" 
          isPositive={false} 
          icon={<TrendingDown className="w-6 h-6 text-rose-600" />} 
          color="bg-rose-100" 
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Revenue Growth</h3>
              <p className="text-sm text-slate-500 font-medium">Monthly income performance</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2 outline-none font-medium">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={incomeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} dx={-10} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="amount" stroke="#0f172a" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" activeDot={{ r: 8, strokeWidth: 0, fill: '#0f172a' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Expense Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Expenses</h3>
            <p className="text-sm text-slate-500 font-medium">Distribution by category</p>
          </div>
          <div className="flex-1 relative min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={4}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-medium text-slate-500">Total</span>
              <span className="text-2xl font-bold text-slate-900">$24K</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {expenseData.slice(0, 3).map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-sm text-slate-500 font-medium">Latest incoming and outgoing payments</p>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx, i) => (
                <motion.tr 
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                        <tx.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{tx.name}</div>
                        <div className="text-sm text-slate-500 capitalize">{tx.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {tx.date}
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full inline-flex items-center gap-1.5 ${
                      tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className={`font-bold text-lg ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, trend, isPositive, icon, color, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-slate-500 font-medium mb-1 text-sm uppercase tracking-wider">{title}</h3>
        <p className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{value}</p>
      </div>
      {/* Decorative background element */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 pointer-events-none"></div>
    </motion.div>
  );
}
