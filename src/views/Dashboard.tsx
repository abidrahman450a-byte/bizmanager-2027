import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, Legend
} from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
  { name: 'Apr', sales: 2780, profit: 3908 },
  { name: 'May', sales: 1890, profit: 4800 },
  { name: 'Jun', sales: 2390, profit: 3800 },
  { name: 'Jul', sales: 3490, profit: 4300 },
];

const categoryData = [
  { name: 'Cunto', value: 40, color: '#1D4ED8' },
  { name: 'Cabitaan', value: 25, color: '#10B981' },
  { name: 'Electronics', value: 15, color: '#F97316' },
  { name: 'Dharka', value: 12, color: '#8B5CF6' },
  { name: 'Kale', value: 8, color: '#6B7280' },
];

const incomeExpenseData = [
  { name: 'Jan', income: 400, expense: 200 },
  { name: 'Feb', income: 450, expense: 210 },
  { name: 'Mar', income: 420, expense: 250 },
  { name: 'Apr', income: 600, expense: 280 },
  { name: 'May', income: 550, expense: 220 },
  { name: 'Jun', income: 700, expense: 200 },
  { name: 'Jul', income: 500, expense: 180 },
];

const recentOrders = [
  { id: '#1024', customer: 'Cabdullahi', amount: '$250', status: 'Paid' },
  { id: '#1023', customer: 'Ayaan', amount: '$120', status: 'Paid' },
  { id: '#1022', customer: 'Mustafe', amount: '$330', status: 'Pending' },
  { id: '#1021', customer: 'Fadumo', amount: '$75', status: 'Paid' },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Sales" amount="$12,500" change="+18%" isPositive={true} />
        <StatCard title="Profit" amount="$10,200" change="+22%" isPositive={true} />
        <StatCard title="Expenses" amount="$2,300" change="+8%" isPositive={false} />
        <StatCard title="Customers" amount="512" change="+14%" isPositive={true} />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-gray-600">Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="text-gray-600">Profit</span>
              </div>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="profit" stroke="#1D4ED8" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Top Categories</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   itemStyle={{ color: '#111827', fontWeight: 500 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-gray-900">40%</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-3 mt-4 px-2">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-semibold text-gray-500 border-b border-gray-100">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="group">
                    <td className="py-4 text-sm text-gray-500 font-medium">{order.id}</td>
                    <td className="py-4 text-sm text-gray-900 font-medium">{order.customer}</td>
                    <td className="py-4 text-sm text-gray-900 font-bold">{order.amount}</td>
                    <td className="py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                        order.status === 'Paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Income vs Expenses</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-green-500"></span>
                <span className="text-gray-600 font-medium">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600"></span>
                <span className="text-gray-600 font-medium">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpenseData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 11 }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expense" fill="#1D4ED8" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, amount, change, isPositive }: { title: string, amount: string, change: string, isPositive: boolean }) {
  // In the image, expenses has an up arrow but it's red.
  // Wait, the user image shows expenses with a red up arrow (+8%).
  // It means an increase in expenses is "bad" (red). So if title is "Expenses", change the color logic.
  const isGood = title === 'Expenses' ? !isPositive : isPositive;
  const isActuallyPositiveNumber = change.startsWith('+');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-32"
    >
      <div className="text-gray-500 font-medium">{title}</div>
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
