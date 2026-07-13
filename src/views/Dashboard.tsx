import React from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, Users, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { mockBranches } from '../data';

const performanceData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 980 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

export function Dashboard() {
  const totalRevenue = mockBranches.reduce((sum, b) => sum + b.revenue, 0);
  const totalProfit = mockBranches.reduce((sum, b) => sum + b.profit, 0);
  const totalEmployees = mockBranches.reduce((sum, b) => sum + b.employees, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          amount={`$${totalRevenue.toLocaleString()}`} 
          change="+12.5%" 
          isPositive={true} 
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          delay={0.1}
        />
        <StatCard 
          title="Total Profit" 
          amount={`$${totalProfit.toLocaleString()}`} 
          change="+8.2%" 
          isPositive={true} 
          icon={<TrendingUp className="w-6 h-6 text-green-600" />}
          delay={0.2}
        />
        <StatCard 
          title="Total Employees" 
          amount={totalEmployees.toString()} 
          change="+4" 
          isPositive={true} 
          icon={<Users className="w-6 h-6 text-purple-600" />}
          delay={0.3}
        />
        <StatCard 
          title="Expenses" 
          amount="$45,231" 
          change="+2.4%" 
          isPositive={false} 
          icon={<Activity className="w-6 h-6 text-orange-600" />}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Revenue vs Profit</h3>
            <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorProf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Branch Performance</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBranches.slice(0, 4)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }} width={80} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Activity Feed Row */}
      <div className="grid grid-cols-1 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity Feed</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-6">
            {[
              { id: 1, user: 'Sarah Jenkins', action: 'updated branch details for', target: 'Downtown HQ', time: 'Just now', initial: 'SJ', color: 'bg-blue-100 text-blue-600' },
              { id: 2, user: 'Michael Chen', action: 'approved an expense of', target: '$450.00', time: '10 mins ago', initial: 'MC', color: 'bg-green-100 text-green-600' },
              { id: 3, user: 'Amina Ali', action: 'processed a new sale at', target: 'Westside Plaza', time: '1 hour ago', initial: 'AA', color: 'bg-purple-100 text-purple-600' },
              { id: 4, user: 'System', action: 'completed automated backup', target: 'Database', time: '3 hours ago', initial: 'SY', color: 'bg-gray-100 text-gray-600' },
              { id: 5, user: 'David Rodriguez', action: 'added a new team member to', target: 'North Hills', time: '5 hours ago', initial: 'DR', color: 'bg-orange-100 text-orange-600' },
            ].map((activity, idx) => (
              <div key={activity.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${activity.color}`}>
                  {activity.initial}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="text-sm text-gray-900 mb-1">
                    <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-semibold">{activity.target}</span>
                  </div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, amount, change, isPositive, delay = 0, icon }: { title: string, amount: string, change: string, isPositive: boolean, delay?: number, icon: React.ReactNode }) {
  const isGood = title === 'Expenses' ? !isPositive : isPositive;
  const isActuallyPositiveNumber = change.startsWith('+');
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-36 relative overflow-hidden"
    >
      <div className="flex justify-between items-start">
        <div className="text-gray-500 font-medium">{title}</div>
        <div className="p-2 bg-gray-50 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between mt-2">
        <div className="text-3xl font-bold text-gray-900 tracking-tight">{amount}</div>
        <div className={`flex items-center gap-1 text-sm font-bold ${isGood ? 'text-green-500' : 'text-red-500'}`}>
          {isActuallyPositiveNumber ? <ArrowUpRight className="w-4 h-4 stroke-[3]" /> : <ArrowDownRight className="w-4 h-4 stroke-[3]" />}
          {change.replace('+', '').replace('-', '')}
        </div>
      </div>
    </motion.div>
  );
}
