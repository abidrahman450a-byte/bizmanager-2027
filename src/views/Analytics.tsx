import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { revenueData, topProductsData, businessHealthData } from '../data';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export function Analytics() {
  return (
    <div className="space-y-6 pb-12 w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Advanced Analytics</h1>
          <p className="text-text-muted">Deep dive into financial and operational metrics.</p>
        </div>
        <select className="bg-bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none focus:border-primary/50 transition-colors cursor-pointer">
          <option>Year to Date</option>
          <option>Last Quarter</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Business Score */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-bg-card border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-48">
          <div className="text-sm text-text-muted font-medium mb-1 flex items-center justify-between relative z-10 cursor-pointer">
            Business Score
            <ChevronRight className="w-4 h-4 text-text-muted opacity-50" />
          </div>
          <div className="flex-1 flex flex-col justify-center relative z-10">
            <div className="text-4xl font-bold text-white tracking-tight mt-2 flex items-end gap-1">
              92 <span className="text-sm text-text-muted font-medium mb-2">/100</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-success font-medium">Excellent</span>
              <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-success rounded-full" />
              </div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[8px] border-success/10 rounded-full" />
        </motion.div>

        {/* Business Health */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-bg-card border border-white/5 rounded-2xl p-6 lg:col-span-2 relative">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-white text-sm">Business Health Radar</h3>
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={businessHealthData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Health" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-medium text-white mb-6">Cash Flow Projection</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#F8FAFC' }} />
                <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-white text-sm">Top Products Performance</h3>
            <button className="text-xs text-primary hover:text-white transition-colors">Export</button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between flex-1 gap-6">
            <div className="w-48 h-48 shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topProductsData}
                    cx="50%" cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {topProductsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-white tracking-tight">$742k</span>
                <span className="text-[9px] text-text-muted uppercase tracking-wider">Total</span>
              </div>
            </div>
            <div className="flex-1 w-full space-y-3">
              {topProductsData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-white text-sm">{item.name}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-mono text-text-muted text-sm">${(item.value).toLocaleString()}</span>
                    <span className="font-mono text-text-muted text-sm w-10 text-right">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
