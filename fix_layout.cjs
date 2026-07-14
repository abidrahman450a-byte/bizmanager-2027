const fs = require('fs');

const appContent = `import React, { useState } from 'react';
import { 
  LayoutGrid, Building2, Package, Users, User,
  DollarSign, FileText, CreditCard, LogOut, ChevronDown, 
  Activity, Bell
} from 'lucide-react';
import { Dashboard } from './views/Dashboard';
import { Branches } from './views/Branches';
import { Inventory } from './views/Inventory';
import { Employees } from './views/Employees';
import { Finance } from './views/Finance';
import { Reports } from './views/Reports';
import { Login } from './views/Login';
import { Customers } from './views/Customers';
import { Settings } from './views/Settings';
import { ViewState } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'branches': return <Branches />;
      case 'inventory': return <Inventory />;
      case 'employees': return <Employees />;
      case 'finance': return <Finance />;
      case 'reports': return <Reports />;
      case 'customers': return <Customers />;
      case 'settings': return <Settings />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Activity className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2 capitalize">{currentView.replace('_', ' ')}</h2>
          <p className="text-slate-500 max-w-md mx-auto">This section is currently under development.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#0F172A] text-white flex flex-col flex-shrink-0 shadow-xl z-20">
        <div className="p-6 pb-8 flex items-center gap-3">
          <LayoutGrid className="w-8 h-8 text-white" />
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-wide">BIZMANAGER</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Owner Monitor</p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center font-bold text-sm text-white">
              OW
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-white">Owner</h2>
              <p className="text-xs text-slate-400">Monitor</p>
            </div>
            <User className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto overflow-x-hidden no-scrollbar">
          <NavItem icon={<LayoutGrid className="w-[18px] h-[18px]" />} label="Dashboard" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <NavItem icon={<Building2 className="w-[18px] h-[18px]" />} label="Branches" active={currentView === 'branches'} onClick={() => setCurrentView('branches')} hasDropdown />
          <NavItem icon={<Package className="w-[18px] h-[18px]" />} label="Inventory" active={currentView === 'inventory'} onClick={() => setCurrentView('inventory')} hasDropdown />
          <NavItem icon={<Users className="w-[18px] h-[18px]" />} label="Customers" active={currentView === 'customers'} onClick={() => setCurrentView('customers')} hasDropdown />
          <NavItem icon={<User className="w-[18px] h-[18px]" />} label="Employees" active={currentView === 'employees'} onClick={() => setCurrentView('employees')} hasDropdown />
          <NavItem icon={<DollarSign className="w-[18px] h-[18px]" />} label="Finance" active={currentView === 'finance'} onClick={() => setCurrentView('finance')} hasDropdown />
          <NavItem icon={<FileText className="w-[18px] h-[18px]" />} label="Reports" active={currentView === 'reports'} onClick={() => setCurrentView('reports')} hasDropdown />
          <NavItem icon={<CreditCard className="w-[18px] h-[18px]" />} label="Expenses" active={currentView === 'expenses'} onClick={() => setCurrentView('expenses')} hasDropdown />
        </nav>

        <div className="p-4 mt-auto mb-2">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="font-medium text-sm">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden z-10 relative">
        {/* Header */}
        <header className="px-8 py-5 flex items-center justify-between bg-white border-b border-slate-100/50 sticky top-0 z-30">
          <h1 className="text-[22px] font-bold text-slate-900 capitalize">
            {currentView === 'dashboard' ? 'Dashboard Overview' : currentView.replace('_', ' ')}
          </h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Activity className="w-[18px] h-[18px]" />
            </button>
            <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#2563eb] flex items-center justify-center font-bold text-sm text-white ml-2 cursor-pointer shadow-sm">
              OW
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, hasDropdown = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, hasDropdown?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={\`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all \${
        active 
          ? 'bg-[#2563eb] text-white shadow-sm' 
          : 'text-slate-400 hover:text-white hover:bg-white/5'
      }\`}
    >
      <div className="flex items-center gap-3.5">
        {icon}
        <span className="font-medium text-[15px]">{label}</span>
      </div>
      {hasDropdown && <ChevronDown className={\`w-4 h-4 \${active ? 'text-white/80' : 'text-slate-500'}\`} />}
    </button>
  );
}
`;

const dashboardContent = `import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { 
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="xl:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-slate-900">Sales Overview</h2>
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
          <h2 className="text-lg font-bold text-slate-900 mb-6">Top Categories</h2>
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
                    <Cell key={\`cell-\${index}\`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[28px] font-bold text-slate-800 mt-1">40%</span>
            </div>
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
`;

fs.writeFileSync('src/App.tsx', appContent);
fs.writeFileSync('src/views/Dashboard.tsx', dashboardContent);
