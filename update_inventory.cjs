const fs = require('fs');

const content = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Search, Filter, Plus, Box, AlertCircle, ArrowUpRight, ArrowDownRight, Edit3, Trash2, ArrowLeft, Archive, TrendingUp, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const MOCK_INVENTORY = [
  { 
    id: 1, 
    name: 'Wireless Headphones Pro', 
    sku: 'WH-PRO-01', 
    category: 'Electronics', 
    stock: 145, 
    status: 'In Stock', 
    price: 299.99, 
    lastRestocked: '2 days ago', 
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', 
    trend: [10, 20, 15, 25, 30, 45, 50],
    totalReceived: 500,
    totalSold: 355,
    expiringSoon: 0,
    revenue: 106496.45,
    salesData: [
      { date: 'Mon', sold: 45 }, { date: 'Tue', sold: 52 }, { date: 'Wed', sold: 38 },
      { date: 'Thu', sold: 65 }, { date: 'Fri', sold: 48 }, { date: 'Sat', sold: 75 }, { date: 'Sun', sold: 32 }
    ],
    stockHistory: [
      { month: 'Jan', stock: 400 }, { month: 'Feb', stock: 350 }, { month: 'Mar', stock: 280 },
      { month: 'Apr', stock: 420 }, { month: 'May', stock: 210 }, { month: 'Jun', stock: 145 }
    ]
  },
  { 
    id: 2, 
    name: 'Ergonomic Desk Chair', 
    sku: 'FUR-DC-02', 
    category: 'Furniture', 
    stock: 12, 
    status: 'Low Stock', 
    price: 199.50, 
    lastRestocked: '1 week ago', 
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600', 
    trend: [5, 5, 4, 3, 2, 2, 1],
    totalReceived: 100,
    totalSold: 88,
    expiringSoon: 0,
    revenue: 17556.00,
    salesData: [
      { date: 'Mon', sold: 2 }, { date: 'Tue', sold: 4 }, { date: 'Wed', sold: 1 },
      { date: 'Thu', sold: 5 }, { date: 'Fri', sold: 3 }, { date: 'Sat', sold: 8 }, { date: 'Sun', sold: 2 }
    ],
    stockHistory: [
      { month: 'Jan', stock: 80 }, { month: 'Feb', stock: 65 }, { month: 'Mar', stock: 50 },
      { month: 'Apr', stock: 40 }, { month: 'May', stock: 25 }, { month: 'Jun', stock: 12 }
    ]
  },
  { 
    id: 3, 
    name: 'Organic Energy Drink', 
    sku: 'BEV-ORG-03', 
    category: 'Consumables', 
    stock: 850, 
    status: 'In Stock', 
    price: 4.50, 
    lastRestocked: '1 month ago', 
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600', 
    trend: [30, 25, 20, 15, 10, 5, 0],
    totalReceived: 2000,
    totalSold: 1150,
    expiringSoon: 120,
    revenue: 5175.00,
    salesData: [
      { date: 'Mon', sold: 145 }, { date: 'Tue', sold: 152 }, { date: 'Wed', sold: 138 },
      { date: 'Thu', sold: 165 }, { date: 'Fri', sold: 148 }, { date: 'Sat', sold: 275 }, { date: 'Sun', sold: 127 }
    ],
    stockHistory: [
      { month: 'Jan', stock: 1800 }, { month: 'Feb', stock: 1550 }, { month: 'Mar', stock: 1280 },
      { month: 'Apr', stock: 1120 }, { month: 'May', stock: 950 }, { month: 'Jun', stock: 850 }
    ]
  },
  { 
    id: 4, 
    name: '4K Ultra HD Monitor', 
    sku: 'MON-4K-04', 
    category: 'Electronics', 
    stock: 56, 
    status: 'In Stock', 
    price: 450.00, 
    lastRestocked: '3 days ago', 
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600', 
    trend: [20, 25, 22, 30, 28, 35, 40],
    totalReceived: 150,
    totalSold: 94,
    expiringSoon: 0,
    revenue: 42300.00,
    salesData: [
      { date: 'Mon', sold: 5 }, { date: 'Tue', sold: 8 }, { date: 'Wed', sold: 6 },
      { date: 'Thu', sold: 12 }, { date: 'Fri', sold: 9 }, { date: 'Sat', sold: 15 }, { date: 'Sun', sold: 10 }
    ],
    stockHistory: [
      { month: 'Jan', stock: 120 }, { month: 'Feb', stock: 110 }, { month: 'Mar', stock: 95 },
      { month: 'Apr', stock: 85 }, { month: 'May', stock: 70 }, { month: 'Jun', stock: 56 }
    ]
  },
  { 
    id: 5, 
    name: 'Fresh Roast Coffee Beans', 
    sku: 'COF-FR-05', 
    category: 'Consumables', 
    stock: 45, 
    status: 'Low Stock', 
    price: 18.99, 
    lastRestocked: 'Yesterday', 
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=600', 
    trend: [40, 45, 50, 48, 55, 60, 65],
    totalReceived: 300,
    totalSold: 255,
    expiringSoon: 15,
    revenue: 4842.45,
    salesData: [
      { date: 'Mon', sold: 25 }, { date: 'Tue', sold: 32 }, { date: 'Wed', sold: 28 },
      { date: 'Thu', sold: 35 }, { date: 'Fri', sold: 40 }, { date: 'Sat', sold: 55 }, { date: 'Sun', sold: 40 }
    ],
    stockHistory: [
      { month: 'Jan', stock: 250 }, { month: 'Feb', stock: 200 }, { month: 'Mar', stock: 160 },
      { month: 'Apr', stock: 120 }, { month: 'May', stock: 80 }, { month: 'Jun', stock: 45 }
    ]
  }
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof MOCK_INVENTORY[0] | null>(null);

  const filteredItems = MOCK_INVENTORY.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Electronics', 'Furniture', 'Consumables'];

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
                  <span className={\`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 \${
                    selectedItem.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    selectedItem.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    'bg-rose-50 text-rose-600 border border-rose-100'
                  }\`}>
                    <span className={\`w-1.5 h-1.5 rounded-full \${ 
                        selectedItem.status === 'In Stock' ? 'bg-emerald-500' : 
                        selectedItem.status === 'Low Stock' ? 'bg-amber-500' : 
                        'bg-rose-500'
                    }\`}></span>
                    {selectedItem.status}
                  </span>
                </div>
                
                <div className="space-y-4">
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
                icon={<AlertTriangle className={\`w-5 h-5 \${selectedItem.expiringSoon > 0 ? 'text-rose-600' : 'text-slate-400'}\`} />} 
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
                className={\`px-4 py-2 rounded-xl text-sm font-bold transition-all \${selectedCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}\`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
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
                    <span className={\`px-2.5 py-1 text-[11px] font-bold rounded-lg inline-flex items-center gap-1.5 shadow-sm \${
                      item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-rose-50 text-rose-600 border border-rose-100'
                    }\`}>
                      <span className={\`w-1.5 h-1.5 rounded-full \${ 
                         item.status === 'In Stock' ? 'bg-emerald-500' : 
                         item.status === 'Low Stock' ? 'bg-amber-500' : 
                         'bg-rose-500'
                      }\`}></span>
                      {item.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">{item.name}</h3>
                  <div className="text-xs font-medium text-slate-500 mb-4">{item.sku}</div>
                  
                  <div className="mt-auto flex justify-between items-end pt-4 border-t border-slate-100">
                    <div>
                      <div className="text-[11px] font-medium text-slate-500 mb-0.5">Stock Available</div>
                      <div className={\`font-black text-lg \${item.stock > 10 ? 'text-slate-900' : 'text-rose-600'}\`}>{item.stock}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-medium text-slate-500 mb-0.5">Price</div>
                      <div className="font-black text-lg text-slate-900">\${item.price.toFixed(2)}</div>
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
      className={\`\${highlight ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100'} p-5 rounded-2xl border shadow-sm flex flex-col items-start gap-3 hover:-translate-y-1 transition-transform duration-300\`}
    >
      <div className={\`w-10 h-10 rounded-xl flex items-center justify-center \${bg}\`}>
        {icon}
      </div>
      <div>
        <h3 className={\`text-xs font-bold uppercase tracking-wider mb-1 \${highlight ? 'text-rose-600/70' : 'text-slate-500'}\`}>{title}</h3>
        <p className={\`text-2xl font-black tracking-tight leading-none mb-1 \${highlight ? 'text-rose-700' : 'text-slate-900'}\`}>{value}</p>
        <p className={\`text-[11px] font-medium \${highlight ? 'text-rose-600/70' : 'text-slate-400'}\`}>{subtitle}</p>
      </div>
    </motion.div>
  );
}
`
fs.writeFileSync('src/views/Inventory.tsx', content);
