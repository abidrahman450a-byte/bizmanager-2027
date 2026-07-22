import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Filter, Plus, Box, AlertCircle, ArrowUpRight, ArrowDownRight, Edit3, Trash2, ArrowLeft, Archive, TrendingUp, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';



export function Inventory({ currentTab = 'Stock Levels' }: { currentTab?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      if (data) {
        const formatted = data.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku || 'N/A',
          category: p.category || 'General',
          branch: 'Main HQ',
          stock: p.stock_quantity || 0,
          status: p.stock_quantity <= (p.low_stock_limit || 5) ? (p.stock_quantity === 0 ? 'Out of Stock' : 'Low Stock') : 'In Stock',
          price: p.selling_price || 0,
          lastRestocked: new Date(p.created_at).toLocaleDateString(),
          image: p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
          trend: [10, 20, 15, 25, 30, 45, 50],
          totalReceived: 500,
          totalSold: 355,
          expiringSoon: 0,
          revenue: (p.selling_price || 0) * 355,
          salesData: [
            { date: 'Mon', sold: 45 }, { date: 'Tue', sold: 52 }, { date: 'Wed', sold: 38 },
            { date: 'Thu', sold: 65 }, { date: 'Fri', sold: 48 }, { date: 'Sat', sold: 75 }, { date: 'Sun', sold: 32 }
          ],
          stockHistory: [
            { month: 'Jan', stock: 400 }, { month: 'Feb', stock: 350 }, { month: 'Mar', stock: 280 },
            { month: 'Apr', stock: 420 }, { month: 'May', stock: 210 }, { month: 'Jun', stock: 145 }
          ]
        }));
        setInventoryItems(formatted);
      }
    };

    fetchProducts();

    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (currentTab !== 'Stock Levels') {
    return (
      <div className="flex flex-col gap-6 min-h-full text-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-display text-slate-900">{currentTab}</h2>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
               <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{currentTab} Module</h3>
            <p className="text-slate-500 max-w-md mx-auto">This module is currently under development. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesBranch = selectedBranch === 'All Branches' || item.branch === selectedBranch;
    return matchesSearch && matchesCategory && matchesBranch;
  });

  const categories = ['All', 'Electronics', 'Furniture', 'Consumables'];
  const branches = ['All Branches', 'Main HQ', 'Downtown Branch', 'Westside Mall'];

  if (selectedItem) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col gap-6 min-h-full text-slate-800"
      >
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => setSelectedItem(null)}
            className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 leading-tight">{selectedItem.name}</h1>
            <p className="text-sm text-slate-500 font-medium">SKU: {selectedItem.sku}</p>
          </div>
          <div className="ml-auto flex gap-3">
            <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors hover:bg-slate-50">
              <Edit3 className="w-4 h-4" /> Edit Item
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Image and Details */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm"
            >
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name} 
                className="w-full h-64 object-cover rounded-2xl shadow-sm mb-6"
              />
              <div className="px-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-black text-slate-900">${selectedItem.price.toFixed(2)}</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 ${
                    selectedItem.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    selectedItem.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-rose-50 text-rose-600 border border-rose-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ 
                        selectedItem.status === 'In Stock' ? 'bg-emerald-500' : 
                        selectedItem.status === 'Low Stock' ? 'bg-amber-500' : 
                        'bg-rose-500'
                    }`}></span>
                    {selectedItem.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-sm font-medium text-slate-500">Branch</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5"><Box className="w-3.5 h-3.5 text-blue-500"/> {selectedItem.branch}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-sm font-medium text-slate-500">Category</span>
                    <span className="text-sm font-bold text-slate-900">{selectedItem.category}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <span className="text-sm font-medium text-slate-500">Last Restocked</span>
                    <span className="text-sm font-bold text-slate-900">{selectedItem.lastRestocked}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-sm font-medium text-slate-500">Total Revenue</span>
                    <span className="text-sm font-bold text-blue-600">${selectedItem.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Metrics & Charts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DetailStatCard 
                title="Total In" 
                value={selectedItem.totalReceived} 
                subtitle="Inta timid" 
                icon={<Archive className="w-5 h-5 text-blue-600" />} 
                bg="bg-blue-50" 
                delay={0.2}
              />
              <DetailStatCard 
                title="Dispatched" 
                value={selectedItem.totalSold} 
                subtitle="Inta la bixiyey" 
                icon={<ArrowUpRight className="w-5 h-5 text-emerald-600" />} 
                bg="bg-emerald-50" 
                delay={0.3}
              />
              <DetailStatCard 
                title="Remaining" 
                value={selectedItem.stock} 
                subtitle="Inta hartay" 
                icon={<Package className="w-5 h-5 text-indigo-600" />} 
                bg="bg-indigo-50" 
                delay={0.4}
              />
              <DetailStatCard 
                title="Expiring" 
                value={selectedItem.expiringSoon} 
                subtitle="Inta dhaceysa" 
                icon={<AlertTriangle className={`w-5 h-5 ${selectedItem.expiringSoon > 0 ? 'text-rose-600' : 'text-slate-400'}`} />} 
                bg={selectedItem.expiringSoon > 0 ? "bg-rose-50" : "bg-slate-100"} 
                delay={0.5}
                highlight={selectedItem.expiringSoon > 0}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Sales Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Sales Trend (7 Days)
                  </h3>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedItem.salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorItemSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                      />
                      <Area type="monotone" dataKey="sold" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorItemSales)" activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Stock History Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Box className="w-4 h-4 text-blue-600" /> Stock Level History
                  </h3>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedItem.stockHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                      <RechartsTooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                        cursor={{ fill: '#f8fafc' }}
                      />
                      <Bar dataKey="stock" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.div>
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
            Inventory Management
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium mt-1"
          >
            Track stock levels, product variations, and resupply
          </motion.p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </motion.button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col flex-1"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full md:w-auto appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-slate-700"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, SKU..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
              />
            </div>
            <button className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-2.5 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg inline-flex items-center gap-1.5 shadow-sm ${
                      item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${ 
                         item.status === 'In Stock' ? 'bg-emerald-500' : 
                         item.status === 'Low Stock' ? 'bg-amber-500' : 
                         'bg-rose-500'
                      }`}></span>
                      {item.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</div>
                    <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1">
                      <Box className="w-3 h-3" />
                      {item.branch}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">{item.name}</h3>
                  <div className="text-xs font-medium text-slate-500 mb-4">{item.sku}</div>
                  
                  <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-[11px] font-medium text-slate-500 mb-0.5">Stock Available</div>
                      <div className={`font-black text-lg ${item.stock > 10 ? 'text-slate-900' : 'text-rose-600'}`}>{item.stock}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-medium text-slate-500 mb-0.5">Price</div>
                      <div className="font-black text-lg text-slate-900">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-white">
            <Box className="w-12 h-12 mb-4 text-slate-300" />
            <p className="font-medium">No items found matching your criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function DetailStatCard({ title, value, subtitle, icon, bg, delay, highlight = false }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`${highlight ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'} p-5 rounded-2xl border shadow-sm flex flex-col items-start gap-3 hover:-translate-y-1 transition-transform duration-300`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
        {icon}
      </div>
      <div>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-1 ${highlight ? 'text-rose-600/70' : 'text-slate-500'}`}>{title}</h3>
        <p className={`text-2xl font-black tracking-tight leading-none mb-1 ${highlight ? 'text-rose-700' : 'text-slate-900'}`}>{value}</p>
        <p className={`text-[11px] font-medium ${highlight ? 'text-rose-600/70' : 'text-slate-400'}`}>{subtitle}</p>
      </div>
    </motion.div>
  );
}
