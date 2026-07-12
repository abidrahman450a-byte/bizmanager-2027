import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockBranches } from '../data';
import { 
  TrendingUp, DollarSign, Wallet, Activity, 
  CreditCard, Receipt, Smartphone, Plus, Search, Filter,
  ArrowUpRight, ArrowDownRight, MoreVertical
} from 'lucide-react';
import { cn } from '../lib/utils';

export function Finance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'mobile_money'>('overview');
  
  const totalRevenue = mockBranches.reduce((sum, b) => sum + b.revenue, 0);
  const totalProfit = mockBranches.reduce((sum, b) => sum + b.profit, 0);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Finance Management</h2>
          <p className="text-gray-500 text-sm mt-1">Monitor organization-wide financial health, expenses, and mobile money.</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === 'overview' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === 'expenses' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Expenses
          </button>
          <button
            onClick={() => setActiveTab('mobile_money')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === 'mobile_money' ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Mobile Money
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <OverviewTab totalRevenue={totalRevenue} totalProfit={totalProfit} />
          )}
          {activeTab === 'expenses' && <ExpensesTab />}
          {activeTab === 'mobile_money' && <MobileMoneyTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({ totalRevenue, totalProfit }: { totalRevenue: number, totalProfit: number }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            Total Revenue
          </div>
          <div className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" /> +12.5% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            Total Net Profit
          </div>
          <div className="text-3xl font-bold text-gray-900">${totalProfit.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" /> +8.2% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            Profit Margin
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round((totalProfit / totalRevenue) * 100)}%
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500 mt-2">
            Healthy margin
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Branch Financial Contributions</h3>
        <div className="space-y-4">
          {mockBranches.map(branch => {
            const percentage = (branch.revenue / totalRevenue) * 100;
            return (
              <div key={branch.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{branch.name}</div>
                  <div className="text-sm text-gray-500 mt-1">{branch.code}</div>
                </div>
                
                <div className="flex-1 w-full max-w-xs">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-gray-500">Revenue Contribution</span>
                    <span className="text-gray-900">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex-1 flex justify-end gap-6 text-right">
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Revenue</div>
                    <div className="font-bold text-gray-900">${branch.revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Profit</div>
                    <div className="font-bold text-green-600">${branch.profit.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExpensesTab() {
  const expenses = [
    { id: 1, date: '2023-10-15', category: 'Rent', description: 'Office Space Rent - HQ', amount: 2500, branch: 'HQ-001', status: 'Paid' },
    { id: 2, date: '2023-10-14', category: 'Utilities', description: 'Electricity & Internet', amount: 450, branch: 'East-002', status: 'Paid' },
    { id: 3, date: '2023-10-12', category: 'Marketing', description: 'Social Media Ad Campaign', amount: 1200, branch: 'HQ-001', status: 'Pending' },
    { id: 4, date: '2023-10-10', category: 'Salaries', description: 'Part-time staff wages', amount: 3400, branch: 'West-003', status: 'Paid' },
    { id: 5, date: '2023-10-08', category: 'Operations', description: 'Office Supplies', amount: 150, branch: 'North-004', status: 'Paid' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search expenses..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 font-medium">
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{expense.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                      <Receipt className="w-3.5 h-3.5" />
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{expense.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{expense.branch}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">${expense.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                      expense.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MobileMoneyTab() {
  const accounts = [
    { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone },
    { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone },
    { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone },
  ];

  const recentTransactions = [
    { id: 101, account: 'EVC Plus', type: 'Received', from: 'Ahmed Ali', amount: 150, date: 'Today, 10:23 AM' },
    { id: 102, account: 'Zaad Service', type: 'Sent', to: 'Supplier XYZ', amount: 450, date: 'Yesterday, 2:45 PM' },
    { id: 103, account: 'EVC Plus', type: 'Received', from: 'Fatima Abdi', amount: 80, date: 'Yesterday, 11:10 AM' },
    { id: 104, account: 'Sahal', type: 'Sent', to: 'Internet Bill', amount: 50, date: 'Oct 12, 09:00 AM' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Mobile Money Accounts</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 font-medium text-sm">
          <Plus className="w-4 h-4" />
          Link Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map(account => {
          const Icon = account.icon;
          return (
            <div key={account.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{account.provider}</div>
                      <div className="text-xs text-gray-500">{account.name}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Available Balance</div>
                  <div className="text-2xl font-bold text-gray-900">${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600 font-mono text-xs">{account.number}</div>
                  <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    {account.status}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  tx.type === 'Received' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                )}>
                  {tx.type === 'Received' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {tx.type === 'Received' ? `Received from ${tx.from}` : `Sent to ${tx.to}`}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="font-medium text-gray-700">{tx.account}</span>
                    <span>&bull;</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              </div>
              <div className={cn(
                "font-bold text-right",
                tx.type === 'Received' ? "text-green-600" : "text-gray-900"
              )}>
                {tx.type === 'Received' ? '+' : '-'}${tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
}
