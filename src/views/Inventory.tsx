import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockInventoryOwner } from '../data';
import { Search, Filter, Plus, Box, ArrowUpRight, ArrowDownRight, Package, DollarSign, BarChart3, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(mockInventoryOwner[0]?.id || null);

  const filteredItems = mockInventoryOwner.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentItem = mockInventoryOwner.find(i => i.id === selectedItem);

  const chartData = currentItem ? currentItem.trend.map((val, i) => ({
    day: `Day ${i + 1}`,
    sold: val
  })) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-main tracking-tight">Inventory Monitor</h2>
          <p className="text-text-muted text-sm mt-1">Detailed tracking of stock value and sales performance</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text"
              placeholder="Search products..."
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)]">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Products</h3>
            <span className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{filteredItems.length} items</span>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {filteredItems.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={`w-full text-left p-3 rounded-xl transition-all border ${
                  selectedItem === item.id 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-white border-transparent hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className={`font-semibold ${selectedItem === item.id ? 'text-blue-900' : 'text-gray-900'}`}>
                    {item.name}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{item.category}</span>
                  <span className={`font-bold ${item.remainingQty > 10 ? 'text-green-600' : item.remainingQty > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                    {item.remainingQty} left
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Detail & Charts */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentItem ? (
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                      <Box className="w-4 h-4 text-blue-500" /> Initial Stock
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{currentItem.initialQty} <span className="text-sm font-normal text-gray-400">units</span></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                      <Package className="w-4 h-4 text-orange-500" /> Sold
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{currentItem.soldQty} <span className="text-sm font-normal text-gray-400">units</span></div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                      <DollarSign className="w-4 h-4 text-green-500" /> Total Sales Value
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${currentItem.soldValue.toLocaleString()}</div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-3">
                      <BarChart3 className="w-4 h-4 text-purple-500" /> Gross Profit
                    </div>
                    <div className="text-2xl font-bold text-gray-900">${currentItem.profit.toLocaleString()}</div>
                  </div>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{currentItem.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Pricing & Value Analysis</p>
                    </div>
                    <div className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-700">
                      Margin: {Math.round((currentItem.sellPrice - currentItem.unitCost) / currentItem.sellPrice * 100)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Unit Cost</div>
                      <div className="font-bold text-gray-900">${currentItem.unitCost.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Selling Price</div>
                      <div className="font-bold text-gray-900">${currentItem.sellPrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Current Stock Value</div>
                      <div className="font-bold text-gray-900">${currentItem.totalValue.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-base font-bold text-gray-900 mb-4">Sales Trend</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSold" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="sold" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSold)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 h-full flex flex-col items-center justify-center text-center p-8 shadow-sm">
                <Box className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Product</h3>
                <p className="text-gray-500 max-w-sm">Choose an item from the inventory list to view its complete financial and sales tracking details.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
