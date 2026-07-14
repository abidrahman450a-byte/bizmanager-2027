const fs = require('fs');

const branchesCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Users, ArrowUp, Activity, ArrowRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, BarChart, Bar, XAxis, CartesianGrid } from 'recharts';

const MOCK_BRANCHES = [
  { id: 1, name: 'Downtown Hub', location: 'New York, NY', initialRevenue: 45200, status: 'Optimal' },
  { id: 2, name: 'Westside Branch', location: 'Los Angeles, CA', initialRevenue: 38900, status: 'Optimal' },
  { id: 3, name: 'North Metro', location: 'Chicago, IL', initialRevenue: 29500, status: 'Review' },
  { id: 4, name: 'Eastside Store', location: 'Miami, FL', initialRevenue: 31200, status: 'Optimal' },
];

const generateChartData = (base: number) => Array.from({length: 20}, (_, i) => ({ val: base + Math.random() * 2000 - 1000, id: i }));
const generateVisitorData = () => Array.from({length: 7}, (_, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], visitors: Math.floor(Math.random() * 500) + 100 }));

export function Branches() {
  const [selectedBranch, setSelectedBranch] = useState<typeof MOCK_BRANCHES[0] | null>(null);
  const [branches] = useState(MOCK_BRANCHES);
  
  const [liveData, setLiveData] = useState<Record<number, { rev: number, visitors: number, chart: any[], visitorChart: any[] }>>(() => {
    const initial: Record<number, any> = {};
    MOCK_BRANCHES.forEach(b => {
      initial[b.id] = {
        rev: b.initialRevenue,
        visitors: Math.floor(Math.random() * 500) + 100,
        chart: generateChartData(b.initialRevenue),
        visitorChart: generateVisitorData(),
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
          
          const newChart = [...old.chart.slice(1), { val: newRev, id: Date.now() }];
          
          next[numKey] = {
            ...old,
            rev: newRev,
            visitors: newVisitors,
            chart: newChart
          };
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatMoney = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="flex flex-col h-full text-slate-800">
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 content-start"
          >
            {branches.map((branch, i) => {
              const live = liveData[branch.id] || { rev: branch.initialRevenue };
              
              return (
              <motion.div 
                key={branch.id}
                layoutId={\`card-\${branch.id}\`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedBranch(branch)}
                className="glass-card p-6 flex flex-col group cursor-pointer hover:shadow-lg hover:border-emerald-500/30 transition-all h-48"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div layoutId={\`icon-\${branch.id}\`} className="w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </motion.div>
                    <div>
                      <motion.h3 layoutId={\`title-\${branch.id}\`} className="font-bold text-slate-800">{branch.name}</motion.h3>
                      <p className="text-sm text-slate-500">{branch.location}</p>
                    </div>
                  </div>
                  <motion.span 
                    key={branch.status}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={\`px-2.5 py-1 text-xs font-bold rounded-lg \${branch.status === 'Optimal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}\`}
                  >
                    {branch.status}
                  </motion.span>
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
                  <button className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )})}
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            layoutId={\`card-\${selectedBranch.id}\`}
            className="glass-card flex-1 flex flex-col p-8 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-4">
                <motion.div layoutId={\`icon-\${selectedBranch.id}\`} className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MapPin className="w-8 h-8" />
                </motion.div>
                <div>
                  <motion.h3 layoutId={\`title-\${selectedBranch.id}\`} className="text-3xl font-bold font-display text-slate-800">{selectedBranch.name}</motion.h3>
                  <p className="text-slate-500 text-lg flex items-center gap-2">
                    {selectedBranch.location} 
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block"></span> 
                    Active Branch
                  </p>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-sm text-slate-500 font-semibold mb-1 uppercase tracking-wider">Live Revenue</p>
                 <motion.div 
                    key={liveData[selectedBranch.id]?.rev}
                    initial={{ scale: 0.95, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-bold font-display text-emerald-600"
                 >
                    {formatMoney(liveData[selectedBranch.id]?.rev || selectedBranch.initialRevenue)}
                 </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                     <Users className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold">Active Visitors</p>
                     <motion.p 
                        key={liveData[selectedBranch.id]?.visitors}
                        initial={{ y: -5 }} animate={{ y: 0 }}
                        className="text-2xl font-bold text-slate-800"
                     >
                        {liveData[selectedBranch.id]?.visitors}
                     </motion.p>
                  </div>
               </div>
               
               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                     <Activity className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold">System Status</p>
                     <p className="text-2xl font-bold text-slate-800">
                        {branches.find(b => b.id === selectedBranch.id)?.status}
                     </p>
                  </div>
               </div>
               
               <div className="bg-white/40 border border-white/60 p-6 rounded-2xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                     <ArrowUp className="w-6 h-6" />
                  </div>
                  <div>
                     <p className="text-sm text-slate-500 font-semibold">Growth</p>
                     <p className="text-2xl font-bold text-slate-800">+12.4%</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
               {/* Line Chart */}
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <Activity className="w-5 h-5 text-emerald-500" /> Revenue Graph
                  </h4>
                  <div className="flex-1 w-full min-h-[200px]">
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
               <div className="bg-white/30 border border-white/50 rounded-3xl p-6 flex flex-col relative overflow-hidden">
                  <h4 className="font-semibold text-slate-700 mb-6 flex items-center gap-2">
                     <Users className="w-5 h-5 text-blue-500" /> Weekly Visitors Chart
                  </h4>
                  <div className="flex-1 w-full min-h-[200px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={liveData[selectedBranch.id]?.visitorChart || []}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                           <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                           <Tooltip 
                              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                           />
                           <Bar dataKey="visitors" fill="#3B82F6" radius={[6, 6, 0, 0]} />
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

fs.writeFileSync('src/views/Branches.tsx', branchesCode);
