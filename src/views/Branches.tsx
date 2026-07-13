import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockBranches } from '../data';
import { Search, Filter, TrendingUp, TrendingDown, Building2, MapPin, Users, DollarSign, Activity, ChevronRight, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Branch } from '../types';

export function Branches() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBranches = mockBranches.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-main tracking-tight">Branches Overview</h2>
          <p className="text-text-muted text-sm mt-1">Manage and monitor your business locations</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-main shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-text-main rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm shrink-0">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 shrink-0">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Add Branch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {filteredBranches.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedBranch(branch)}
              className={`relative overflow-hidden p-5 rounded-2xl border cursor-pointer transition-all ${
                selectedBranch?.id === branch.id 
                  ? 'border-transparent shadow-lg shadow-primary/20 text-white' 
                  : 'bg-white border-gray-200 hover:border-primary/50 shadow-sm'
              }`}
            >
              {/* @ts-ignore */}
              {selectedBranch?.id === branch.id && branch.color && (
                // @ts-ignore
                <div className={`absolute inset-0 bg-gradient-to-br ${branch.color} opacity-100`} />
              )}
              {selectedBranch?.id !== branch.id && branch.image && (
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <img src={branch.image} className="w-full h-full object-cover rounded-bl-full" alt="" />
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={`font-bold text-lg ${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}`}>
                      {branch.name}
                    </h3>
                    <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1 ${
                      selectedBranch?.id === branch.id ? 'bg-white/20 text-white backdrop-blur-md border border-white/20' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {branch.code}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-bold ${
                    branch.growth >= 0 
                      ? selectedBranch?.id === branch.id ? 'text-green-100' : 'text-green-500'
                      : selectedBranch?.id === branch.id ? 'text-red-100' : 'text-red-500'
                  }`}>
                    {branch.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(branch.growth)}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className={`text-xs mb-1 ${selectedBranch?.id === branch.id ? 'text-white/80' : 'text-gray-500'}`}>Revenue</div>
                    <div className={`font-semibold ${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}`}>
                      ${branch.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs mb-1 ${selectedBranch?.id === branch.id ? 'text-white/80' : 'text-gray-500'}`}>Employees</div>
                    <div className={`font-semibold ${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}`}>
                      {branch.employees}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedBranch ? (
              <motion.div
                key={selectedBranch.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="relative p-6 border-b border-gray-100 flex justify-between items-end overflow-hidden h-40">
                  {/* @ts-ignore */}
                  {selectedBranch.image && (
                    <>
                      {/* @ts-ignore */}
                      <img src={selectedBranch.image} alt={selectedBranch.name} className="absolute inset-0 w-full h-full object-cover" />
                      {/* @ts-ignore */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90`} />
                    </>
                  )}
                  <div className="relative z-10 w-full flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedBranch.name} Details</h3>
                      <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {selectedBranch.code} | Managed by {selectedBranch.manager}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 text-white shadow-sm transition-all">
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm font-medium">
                        <DollarSign className="w-4 h-4" /> Revenue
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${selectedBranch.revenue.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm font-medium">
                        <Activity className="w-4 h-4" /> Profit
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${selectedBranch.profit.toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm font-medium">
                        <Users className="w-4 h-4" /> Team
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{selectedBranch.employees}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm font-medium">
                        <TrendingUp className="w-4 h-4" /> Daily Avg
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${selectedBranch.dailySales.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-base font-bold text-gray-900 mb-4">Revenue Trend (Last 7 Days)</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={selectedBranch.weeklyHistory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                  <Building2 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Branch</h3>
                <p className="text-gray-500 max-w-sm">Choose a branch from the list to view its detailed performance, revenue trends, and staff statistics.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
