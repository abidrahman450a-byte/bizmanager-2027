import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockCashiers } from '../data';
import { Search, Filter, ShieldCheck, DollarSign, Receipt, ChevronRight, ArrowLeft, TrendingUp, Clock, Activity, CalendarDays } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

export function Employees() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const filteredCashiers = mockCashiers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const maxWeeklySales = Math.max(...mockCashiers.map(c => c.weeklySales), 1);
  const selectedEmployee = mockCashiers.find(c => c.id === selectedEmployeeId);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {!selectedEmployeeId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text-main tracking-tight">Staff & Cashier Performance</h2>
                <p className="text-text-muted text-sm mt-1">Monitor individual sales metrics and transaction volumes</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input 
                    type="text"
                    placeholder="Search staff..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main shadow-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-text-main rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockCashiers.map(cashier => (
                <div 
                  key={cashier.id} 
                  onClick={() => setSelectedEmployeeId(cashier.id)}
                  className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-colors hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                        {cashier.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 leading-tight">{cashier.name}</div>
                        <div className="text-xs text-gray-500">{cashier.branch}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-gray-500 font-medium mb-1">Weekly Sales</div>
                      <div className="text-2xl font-bold text-gray-900">${cashier.weeklySales.toLocaleString()}</div>
                    </div>
                    <div className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                      {Math.round((cashier.weeklySales / maxWeeklySales) * 100)}%
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        cashier.performance === 'excellent' ? 'bg-green-500' :
                        cashier.performance === 'good' ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${(cashier.weeklySales / maxWeeklySales) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200 text-sm font-medium text-gray-500">
                      <th className="py-4 px-6 font-semibold">Staff Member</th>
                      <th className="py-4 px-6 font-semibold">Branch</th>
                      <th className="py-4 px-6 font-semibold">Today's Sales</th>
                      <th className="py-4 px-6 font-semibold">Weekly Sales</th>
                      <th className="py-4 px-6 font-semibold">Transactions</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCashiers.map((cashier) => (
                      <tr 
                        key={cashier.id} 
                        onClick={() => setSelectedEmployeeId(cashier.id)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                              {cashier.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{cashier.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <ShieldCheck className="w-3 h-3 text-green-500" /> Cashier
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600 font-medium">
                          {cashier.branch}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 font-bold text-gray-900">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            {cashier.todaySales.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-semibold text-gray-700">
                            ${cashier.weeklySales.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                            <Receipt className="w-4 h-4 text-gray-400" />
                            {cashier.transactions}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            cashier.performance === 'excellent' ? 'bg-green-100 text-green-700' :
                            cashier.performance === 'good' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {cashier.performance === 'excellent' ? 'Excellent' : 
                             cashier.performance === 'good' ? 'Good' : 'Needs Review'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : selectedEmployee ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedEmployeeId(null)}
                className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-gray-600"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-text-main tracking-tight">Employee Profile</h2>
                <p className="text-text-muted text-sm mt-1">Detailed performance metrics and history</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-3xl font-bold border-4 border-white shadow-lg mx-auto mb-4">
                    {selectedEmployee.name.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                  <div className="text-sm font-medium text-gray-500 mb-4">{selectedEmployee.branch}</div>
                  
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-6 ${
                    selectedEmployee.performance === 'excellent' ? 'bg-green-100 text-green-700' :
                    selectedEmployee.performance === 'good' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    Performance: {selectedEmployee.performance.charAt(0).toUpperCase() + selectedEmployee.performance.slice(1)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left border-t border-gray-100 pt-6">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Today's Sales</div>
                      <div className="font-bold text-gray-900 text-lg">${selectedEmployee.todaySales.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Transactions</div>
                      <div className="font-bold text-gray-900 text-lg">{selectedEmployee.transactions}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Weekly Average Sales</div>
                      <div className="font-bold text-gray-900 text-lg">${selectedEmployee.weeklySales.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Area */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-primary" />
                      Weekly Sales Trend
                    </h3>
                    <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 text-xs font-semibold text-gray-600">
                      Last 7 Days
                    </div>
                  </div>
                  <div className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedEmployee.salesTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          formatter={(value) => [`$${value}`, 'Sales']}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-500" />
                      Hourly Performance
                    </h3>
                    <div className="px-3 py-1 bg-gray-50 rounded-lg border border-gray-100 text-xs font-semibold text-gray-600">
                      Today
                    </div>
                  </div>
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedEmployee.hourlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          cursor={{ fill: '#F3F4F6' }}
                          formatter={(value) => [`$${value}`, 'Sales']}
                        />
                        <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                          {selectedEmployee.hourlySales?.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4F46E5' : '#818CF8'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
