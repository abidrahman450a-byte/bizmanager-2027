const fs = require('fs');

const code = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, ArrowUp, Activity, ArrowRight, ArrowLeft, Package, ShoppingCart } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, BarChart, Bar, XAxis, CartesianGrid, Area, AreaChart } from 'recharts';

const MOCK_BRANCHES = [
  { 
    id: 1, 
    name: 'Downtown Hub', 
    location: 'New York, NY', 
    initialRevenue: 45200, 
    status: 'Optimal',
    itemsSold: 1245,
    inventoryStock: 8500,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  { 
    id: 2, 
    name: 'Westside Branch', 
    location: 'Los Angeles, CA', 
    initialRevenue: 38900, 
    status: 'Optimal',
    itemsSold: 980,
    inventoryStock: 6200,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  { 
    id: 3, 
    name: 'North Metro', 
    location: 'Chicago, IL', 
    initialRevenue: 29500, 
    status: 'Review',
    itemsSold: 654,
    inventoryStock: 4100,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200&h=800'
  },
  { 
    id: 4, 
    name: 'Eastside Store', 
    location: 'Miami, FL', 
    initialRevenue: 31200, 
    status: 'Optimal',
    itemsSold: 812,
    inventoryStock: 5400,
    image: 'https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&q=80&w=1200&h=800'
  },
];

const generateChartData = (base: number, variance: number) => Array.from({length: 20}, (_, i) => ({ val: base + Math.random() * variance - (variance/2), id: i }));
const generateVisitorData = () => Array.from({length: 7}, (_, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], visitors: Math.floor(Math.random() * 500) + 100 }));
const generateItemsData = (base: number) => Array.from({length: 12}, (_, i) => ({ time: \`\${i+8}:00\`, sold: Math.floor(Math.random() * (base/10)) + 10 }));

export function Branches() {
  const [selectedBranch, setSelectedBranch] = useState<typeof MOCK_BRANCHES[0] | null>(null);
  const [branches] = useState(MOCK_BRANCHES);
  
  const [liveData, setLiveData] = useState<Record<number, any>>(() => {
    const initial: Record<number, any> = {};
    MOCK_BRANCHES.forEach(b => {
      initial[b.id] = {
        rev: b.initialRevenue,
        visitors: Math.floor(Math.random() * 500) + 100,
        itemsSold: b.itemsSold,
        inventoryStock: b.inventoryStock,
        chart: generateChartData(b.initialRevenue, 2000),
        visitorChart: generateVisitorData(),
        itemsChart: generateItemsData(b.itemsSold),
        stockChart: generateChartData(b.inventoryStock, 100),
      };
    });
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const numKey = Number(key);
          const old = next[numKey];
          
          const newRev = old.rev + (Math.random() * 1000 - 400);
          const newVisitors = Math.max(50, old.visitors + Math.floor(Math.random() * 20 - 10));
          const newItemsSold = old.itemsSold + Math.floor(Math.random() * 5);
          const newStock = Math.max(0, old.inventoryStock - Math.floor(Math.random() * 3));
          
          const newChart = [...old.chart.slice(1), { val: newRev, id: Date.now() }];
          const newItemsChart = [...old.itemsChart.slice(1), { time: 'Now', sold: Math.floor(Math.random() * 50) + 10 }];
          const newStockChart = [...old.stockChart.slice(1), { val: newStock, id: Date.now() }];
          
          next[numKey] = {
            ...old,
            rev: newRev,
            visitors: newVisitors,
            itemsSold: newItemsSold,
            inventoryStock: newStock,
            chart: newChart,
            itemsChart: newItemsChart,
            stockChart: newStockChart,
          };
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-col min-h-full text-slate-800 relative z-10">
      <div className="flex items-center gap-4 mb-8">
        <AnimatePresence mode="popLayout">
          {selectedBranch && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: 'auto' }}
              exit={{ opacity: 0, scale: 0.8, width: 0 }}
              onClick={() => setSelectedBranch(null)}
              className="w-10 h-10 rounded-xl bg-white/50 border border-white/60 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-slate-600 shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.h2 layout className="text-2xl font-bold font-display text-slate-800">
          {selectedBranch ? 'Branch Analytics' : 'Active Branches'}
        </motion.h2>
      </div>

      <AnimatePresence mode="wait">
        {!selectedBranch ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 content-start pb-8"
          >
            {branches.map((branch, i) => {
              const live = liveData[branch.id] || { rev: branch.initialRevenue, itemsSold: branch.itemsSold, inventoryStock: branch.inventoryStock, itemsChart: [] };
              
              return (
              <motion.div 
                key={branch.id}
                layoutId={\`card-\${branch.id}\`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', damping: 20 }}
                onClick={() => setSelectedBranch(branch)}
                className="glass-card flex flex-col group cursor-pointer hover:shadow-2xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all overflow-hidden relative"
              >
                {/* Image Header */}
                <motion.div layoutId={\`image-\${branch.id}\`} className="h-40 w-full relative overflow-hidden">
                   <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                   <img src={branch.image} alt={branch.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
                     <motion.div layoutId={\`icon-\${branch.id}\`} className="w-8 h-8 rounded-lg bg-white/90 backdrop-blur flex items-center justify-center text-emerald-600 shadow-sm">
                        <MapPin className="w-4 h-4" />
                     </motion.div>
                     <motion.h3 layoutId={\`title-\${branch.id}\`} className="font-bold text-white text-xl drop-shadow-md">{branch.name}</motion.h3>
                   </div>
                   <motion.span 
                    key={branch.status}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={\`absolute top-3 right-3 z-20 px-2.5 py-1 text-xs font-bold rounded-lg backdrop-blur-md \${branch.status === 'Optimal' ? 'bg-emerald-500/80 text-white' : 'bg-amber-500/80 text-white'}\`}
                  >
                    {branch.status}
                  </motion.span>
                </motion.div>
                
                <div className="p-5 flex-1 flex flex-col">
                   <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Items Sold */}
                      <div className="bg-white/40 rounded-xl p-3 border border-white/50">
                         <div className="flex items-center gap-2 text-blue-500 mb-1">
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase">Sold Today</span>
                         </div>
                         <motion.div key={live.itemsSold} initial={{ scale: 1.1, color: '#3B82F6' }} animate={{ scale: 1, color: '#1E293B' }} className="text-xl font-bold font-display">
                            {live.itemsSold.toLocaleString()}
                         </motion.div>
                      </div>
                      
                      {/* Inventory Stock */}
                      <div className="bg-white/40 rounded-xl p-3 border border-white/50">
                         <div className="flex items-center gap-2 text-purple-500 mb-1">
                            <Package className="w-4 h-4" />
                            <span className="text-xs font-semibold uppercase">In Stock</span>
                         </div>
                         <motion.div key={live.inventoryStock} initial={{ scale: 1.1, color: '#A855F7' }} animate={{ scale: 1, color: '#1E293B' }} className="text-xl font-bold font-display">
                            {live.inventoryStock.toLocaleString()}
                         </motion.div>
                      </div>
                   </div>
                   
                   <div className="mt-auto flex items-end justify-between">
                     <div>
                       <p className="text-sm text-slate-500 mb-1">Live Revenue</p>
                       <motion.p 
                          key={live.rev}
                          initial={{ opacity: 0.5, y: -2 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-2xl font-bold font-display text-slate-800"
                       >
                          {formatMoney(live.rev)}
                       </motion.p>
                     </div>
                     <div className="h-10 w-24">
                        <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={live.chart || []}>
                              <Line type="monotone" dataKey="val" stroke="#10B981" strokeWidth={2} dot={false} />
                           </LineChart>
                        </ResponsiveContainer>
                     </div>
                     <button className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all transform group-hover:translate-x-1 shadow-sm">
                       <ArrowRight className="w-5 h-5" />
                     </button>
                   </div>
                </div>
              </motion.div>
            )})}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            layoutId={\`card-\${selectedBranch.id}\`}
            className="glass-card flex-1 flex flex-col p-6 md:p-8 overflow-y-auto relative z-20 shadow-2xl pb-12"
            initial={{ borderRadius: 24 }}
            animate={{ borderRadius: 32 }}
          >
            {/* Header with image */}
            <motion.div layoutId={\`image-\${selectedBranch.id}\`} className="h-64 w-full relative overflow-hidden rounded-2xl mb-8 shadow-inner">
               <div className="absolute inset-0 bg-slate-900/40 z-10" />
               <img src={selectedBranch.image} alt={selectedBranch.name} className="w-full h-full object-cover" />
               <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                  <div className="flex items-center gap-4">
                    <motion.div layoutId={\`icon-\${selectedBranch.id}\`} className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                      <MapPin className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <motion.h3 layoutId={\`title-\${selectedBranch.id}\`} className="text-4xl font-bold font-display text-white drop-shadow-lg mb-1">{selectedBranch.name}</motion.h3>
                      <p className="text-white/80 text-lg flex items-center gap-2 drop-shadow">
                        {selectedBranch.location} 
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block"></span> 
                        Active Branch
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden md:block">
                     <p className="text-sm text-white/80 font-semibold mb-1 uppercase tracking-wider">Live Revenue</p>
                     <motion.div 
                        key={liveData[selectedBranch.id]?.rev}
                        initial={{ scale: 0.95, opacity: 0.8 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-bold font-display text-white drop-shadow-md"
                     >
                        {formatMoney(liveData[selectedBranch.id]?.rev || selectedBranch.initialRevenue)}
                     </motion.div>
                  </div>
               </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                     <ArrowUp className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-emerald-700 font-semibold mb-1 uppercase tracking-wider text-[10px]">Revenue Growth</p>
                     <p className="text-2xl font-bold text-slate-800">+12.4%</p>
                  </div>
               </div>
               
               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:bg-white/60 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                     <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">Today's Sales</p>
                     <motion.p 
                        key={liveData[selectedBranch.id]?.itemsSold}
                        initial={{ y: -5, color: '#3B82F6' }} animate={{ y: 0, color: '#1E293B' }}
                        className="text-2xl font-bold text-slate-800"
                     >
                        {liveData[selectedBranch.id]?.itemsSold.toLocaleString()}
                     </motion.p>
                  </div>
               </div>
               
               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:bg-white/60 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                     <Package className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">Current Stock</p>
                     <motion.p 
                        key={liveData[selectedBranch.id]?.inventoryStock}
                        initial={{ y: -5, color: '#A855F7' }} animate={{ y: 0, color: '#1E293B' }}
                        className="text-2xl font-bold text-slate-800"
                     >
                        {liveData[selectedBranch.id]?.inventoryStock.toLocaleString()}
                     </motion.p>
                  </div>
               </div>

               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4 hover:bg-white/60 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                     <Users className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wider text-[10px]">Active Visitors</p>
                     <motion.p 
                        key={liveData[selectedBranch.id]?.visitors}
                        initial={{ y: -5 }} animate={{ y: 0 }}
                        className="text-2xl font-bold text-slate-800"
                     >
                        {liveData[selectedBranch.id]?.visitors}
                     </motion.p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
               {/* Sales Volume Area Chart */}
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:bg-white/40 transition-colors">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <ShoppingCart className="w-5 h-5 text-blue-500" /> Sales Volume (Today)
                  </h4>
                  <div className="flex-1 w-full min-h-[220px]">
                     <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={liveData[selectedBranch.id]?.itemsChart || []}>
                         <defs>
                           <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                           </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                         <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                         <YAxis hide domain={['auto', 'auto']} />
                         <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                         />
                         <Area 
                            type="monotone" 
                            dataKey="sold" 
                            stroke="#3B82F6" 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorSales)"
                            activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                         />
                       </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Inventory Trend Line Chart */}
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:bg-white/40 transition-colors">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <Package className="w-5 h-5 text-purple-500" /> Inventory Depletion
                  </h4>
                  <div className="flex-1 w-full min-h-[220px]">
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={liveData[selectedBranch.id]?.stockChart || []}>
                         <YAxis domain={['auto', 'auto']} hide />
                         <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            labelStyle={{ display: 'none' }}
                         />
                         <Line 
                             type="monotone" 
                             dataKey="val" 
                             stroke="#A855F7" 
                             strokeWidth={4} 
                             dot={false}
                            activeDot={{ r: 8, fill: '#A855F7', stroke: '#fff', strokeWidth: 3 }}
                            style={{ filter: \`drop-shadow(0px 8px 12px rgba(168,85,247,0.3))\` }}
                         />
                       </LineChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Revenue Chart */}
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:bg-white/40 transition-colors">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-emerald-500" /> Live Revenue Stream
                  </h4>
                  <div className="flex-1 w-full min-h-[220px]">
                     <ResponsiveContainer width="100%" height="100%">
                       <LineChart data={liveData[selectedBranch.id]?.chart || []}>
                         <YAxis domain={['auto', 'auto']} hide />
                         <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                            labelStyle={{ display: 'none' }}
                            formatter={(value: number) => formatMoney(value)}
                         />
                         <Line 
                             type="monotone" 
                             dataKey="val" 
                             stroke="#10B981" 
                             strokeWidth={4} 
                             dot={false}
                            activeDot={{ r: 8, fill: '#10B981', stroke: '#fff', strokeWidth: 3 }}
                            style={{ filter: \`drop-shadow(0px 8px 12px rgba(16,185,129,0.3))\` }}
                         />
                       </LineChart>
                     </ResponsiveContainer>
                  </div>
               </div>
               
               {/* Bar Chart */}
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:bg-white/40 transition-colors">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <Users className="w-5 h-5 text-blue-500" /> Weekly Visitors Distribution
                  </h4>
                  <div className="flex-1 w-full min-h-[220px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={liveData[selectedBranch.id]?.visitorChart || []}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                           <Tooltip 
                              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                           />
                           <Bar dataKey="visitors" fill="#64748B" radius={[6, 6, 0, 0]}>
                              {
                                (liveData[selectedBranch.id]?.visitorChart || []).map((entry: any, index: number) => (
                                  <cell key={\`cell-\${index}\`} fill={index === 3 ? '#3B82F6' : '#CBD5E1'} />
                                ))
                              }
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`

fs.writeFileSync('src/views/Branches.tsx', code);
