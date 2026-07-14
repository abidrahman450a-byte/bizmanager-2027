import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
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
  { name: 'Cunto', value: 40, color: '#2563eb' },
  { name: 'Cabitaan', value: 20, color: '#10b981' },
  { name: 'Electronics', value: 15, color: '#f97316' },
  { name: 'Dharka', value: 15, color: '#8b5cf6' },
  { name: 'Kale', value: 10, color: '#64748b' },
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
  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Sales" value="$12,500" trend="18%" />
        <StatCard title="Profit" value="$10,200" trend="22%" />
        <StatCard title="Expenses" value="$2,300" trend="8%" />
        <StatCard title="Customers" value="512" trend="14%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-900">Dashboard Overview</h2>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-sm font-medium text-slate-600">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
                <span className="text-sm font-medium text-slate-600">Profit</span>
              </div>
            </div>
          </div>
          <div className="h-[320px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.12}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="profit" stroke="none" fillOpacity={1} fill="url(#colorProfit)" />
                <Line type="monotone" dataKey="profit" stroke="#2563eb" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2}} />
                <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6 invisible">Top Categories</h2>
          <div className="flex-1 relative min-h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-y-5 gap-x-2 mt-8 px-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[13px] font-medium text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 text-sm font-medium text-slate-500">Order ID</th>
                  <th className="pb-4 text-sm font-medium text-slate-500">Customer</th>
                  <th className="pb-4 text-sm font-medium text-slate-500">Amount</th>
                  <th className="pb-4 text-sm font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 text-sm text-slate-600 font-medium">{order.id}</td>
                    <td className="py-4 text-sm font-bold text-slate-800">{order.customer}</td>
                    <td className="py-4 text-sm font-bold text-slate-900">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                        order.color === 'emerald' 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : 'bg-orange-50 text-orange-600'
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
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">Income vs Expenses</h2>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-xs font-medium text-slate-600">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
                <span className="text-xs font-medium text-slate-600">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expenses" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </>
  );
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-[130px]">
      <h3 className="text-slate-500 text-[15px] font-medium">{title}</h3>
      <div className="flex justify-between items-end">
        <p className="text-[32px] leading-none font-bold text-slate-800">{value}</p>
        <div className="flex items-center gap-1 text-[#10b981] font-bold mb-1">
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span className="text-[15px]">{trend}</span>
        </div>
      </div>
    </div>
  );
}
