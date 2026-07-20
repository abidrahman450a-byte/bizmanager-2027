import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles, Activity, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

const lineData = [
  { name: 'Jan', sales: 2400, profit: 4000 },
  { name: 'Feb', sales: 1398, profit: 3000 },
  { name: 'Mar', sales: 9800, profit: 2000 },
  { name: 'Apr', sales: 3908, profit: 2780 },
  { name: 'May', sales: 4800, profit: 1890 },
  { name: 'Jun', sales: 3800, profit: 2390 },
  { name: 'Jul', sales: 4300, profit: 3490 },
];

const pieData = [
  { name: 'Cunto', value: 40, color: '#0f172a' },
  { name: 'Cabitaan', value: 20, color: '#334155' },
  { name: 'Electronics', value: 15, color: '#64748b' },
  { name: 'Dharka', value: 15, color: '#94a3b8' },
  { name: 'Kale', value: 10, color: '#cbd5e1' },
];

const barData = [
  { name: 'Jan', income: 400, expenses: 200 },
  { name: 'Feb', income: 450, expenses: 210 },
  { name: 'Mar', income: 420, expenses: 250 },
  { name: 'Apr', income: 600, expenses: 280 },
  { name: 'May', income: 720, expenses: 220 },
  { name: 'Jun', income: 500, expenses: 200 },
  { name: 'Jul', income: 450, expenses: 180 },
];

const recentOrders = [
  { id: '#1024', customer: 'Cabdullahi', amount: '$250', status: 'PAID', color: 'emerald' },
  { id: '#1023', customer: 'Ayaan', amount: '$120', status: 'PAID', color: 'emerald' },
  { id: '#1022', customer: 'Mustafe', amount: '$330', status: 'PENDING', color: 'orange' },
  { id: '#1021', customer: 'Fadumo', amount: '$75', status: 'PAID', color: 'emerald' },
];

export function Dashboard() {
  const [insightIndex, setInsightIndex] = useState(0);
  
  const insights = [
    "AI Analysis: Sales for 'Electronics' category are projected to increase by 15% next month based on seasonal trends.",
    "Optimization: Consider reducing inventory for 'Dharka' at Branch 2 to minimize storage costs.",
    "Performance: Overall profit margin is up 4.2% compared to the previous quarter."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8 pb-10"
    >
      {/* AI Insight Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-900 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl shadow-slate-900/10 overflow-hidden relative"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
            <BrainCircuit className="w-6 h-6 text-indigo-400" />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-slate-400 text-sm font-semibold tracking-wide uppercase mb-1 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> 
              Executive Insights
            </h3>
            <AnimatePresence mode="wait">
              <motion.p 
                key={insightIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-white font-medium md:text-lg"
              >
                {insights[insightIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$128,500" trend="18.2%" isUp={true} delay={0.1} />
        <StatCard title="Net Profit" value="$42,200" trend="22.4%" isUp={true} delay={0.2} />
        <StatCard title="Operating Costs" value="$28,300" trend="4.1%" isUp={false} delay={0.3} />
        <StatCard title="Active Customers" value="1,204" trend="12.5%" isUp={true} delay={0.4} />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Line Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 mb-1">Financial Overview</h2>
              <p className="text-slate-500 font-medium">Monthly revenue vs profit analysis</p>
            </div>
            <div className="flex gap-4 bg-slate-50 p-1.5 rounded-full border border-slate-100">
              <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900"></span>
                <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">Profit</span>
              </div>
            </div>
          </div>
          <div className="h-[340px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 500}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', fontWeight: 600 }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="sales" stroke="none" fillOpacity={1} fill="url(#colorSales)" />
                <Line type="monotone" dataKey="sales" stroke="#0f172a" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#0f172a', stroke: '#fff', strokeWidth: 3}} />
                <Line type="monotone" dataKey="profit" stroke="#cbd5e1" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#cbd5e1', stroke: '#fff', strokeWidth: 3}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"
        >
          <div>
            <h2 className="text-xl font-bold font-display text-slate-900 mb-1">Category Distribution</h2>
            <p className="text-slate-500 font-medium">Sales breakdown by product</p>
          </div>
          <div className="flex-1 relative min-h-[260px] flex items-center justify-center mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={115}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', fontWeight: 600 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 tracking-tight font-display">100%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 mt-6">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="text-[14px] font-semibold text-slate-700">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold font-display text-slate-900">Recent Transactions</h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-5 text-sm font-semibold text-slate-400 tracking-wide uppercase">Transaction ID</th>
                  <th className="pb-5 text-sm font-semibold text-slate-400 tracking-wide uppercase">Client</th>
                  <th className="pb-5 text-sm font-semibold text-slate-400 tracking-wide uppercase">Value</th>
                  <th className="pb-5 text-sm font-semibold text-slate-400 tracking-wide uppercase text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-5 text-sm text-slate-500 font-medium group-hover:text-slate-700 transition-colors">{order.id}</td>
                    <td className="py-5 text-sm font-bold text-slate-900">{order.customer}</td>
                    <td className="py-5 text-sm font-black text-slate-900">{order.amount}</td>
                    <td className="py-5 text-right">
                      <span className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-lg ${
                        order.color === 'emerald' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Income vs Expenses */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col"
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-900 mb-1">Cash Flow</h2>
              <p className="text-slate-500 font-medium text-sm">Income vs Expenses</p>
            </div>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-900"></span>
              <span className="w-3 h-3 rounded-full bg-slate-200"></span>
            </div>
          </div>
          <div className="h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)', fontWeight: 600 }}
                  cursor={{ fill: '#f8fafc', radius: 8 }}
                />
                <Bar dataKey="income" fill="#0f172a" radius={[6, 6, 6, 6]} barSize={14} />
                <Bar dataKey="expenses" fill="#e2e8f0" radius={[6, 6, 6, 6]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, trend, isUp, delay }: { title: string, value: string, trend: string, isUp: boolean, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between h-[150px] relative overflow-hidden group hover:shadow-md hover:border-slate-200 transition-all"
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <Activity className="w-24 h-24 text-slate-900 -mr-6 -mt-6" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-slate-500 text-[15px] font-semibold tracking-tight mb-4">{title}</h3>
        <div className="flex justify-between items-end">
          <p className="text-4xl tracking-tighter font-black text-slate-900 font-display">{value}</p>
          <div className={`flex items-center gap-1.5 font-bold mb-1.5 px-2.5 py-1 rounded-lg ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {isUp ? <ArrowUpRight className="w-4 h-4 stroke-[3]" /> : <ArrowDownRight className="w-4 h-4 stroke-[3]" />}
            <span className="text-[13px]">{trend}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
