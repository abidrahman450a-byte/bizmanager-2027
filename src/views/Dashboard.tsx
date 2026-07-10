import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, 
  CheckCircle2, Info, Sparkles, Download, PackageX,
  RefreshCw, Send, Activity, ShieldAlert, Store, Clock, Lock, Menu, X, ChevronRight, PanelRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { cn } from '../lib/utils';
import { mockBranches, mockStock } from '../data';

const revenueData = [
  { name: 'May 1', value: 20000 },
  { name: 'May 8', value: 35000 },
  { name: 'May 15', value: 25000 },
  { name: 'May 22', value: 45000 },
  { name: 'May 31', value: 65000 },
];

const profitData = [
  { name: 'May 1', value: 8000 },
  { name: 'May 8', value: 12000 },
  { name: 'May 15', value: 15000 },
  { name: 'May 22', value: 10000 },
  { name: 'May 31', value: 25000 },
];

const COLORS = ['#2563EB', '#10B981', '#14B8A6', '#F59E0B', '#3B82F6'];

const cashFlowData = [
  { day: 'May 1', in: 40000, out: -30000 },
  { day: 'May 8', in: 55000, out: -20000 },
  { day: 'May 15', in: 30000, out: -45000 },
  { day: 'May 22', in: 65000, out: -15000 },
  { day: 'May 31', in: 80000, out: -25000 },
];

const miniChartDataUp = [{v: 10}, {v: 12}, {v: 11}, {v: 15}, {v: 14}, {v: 18}, {v: 22}];
const miniChartDataDown = [{v: 22}, {v: 20}, {v: 21}, {v: 18}, {v: 19}, {v: 15}, {v: 12}];

const topKPIs = [
  { title: 'Revenue Today', value: '$24,780', change: '+12.5%', isUp: true, icon: Activity, sparkline: miniChartDataUp },
  { title: 'Profit Today', value: '$8,540', change: '+9.3%', isUp: true, icon: TrendingUp, sparkline: miniChartDataUp },
  { title: 'Expenses Today', value: '$4,120', change: '-3.2%', isUp: false, icon: PackageX, sparkline: miniChartDataDown },
  { title: 'Cash Balance', value: '$68,540', change: '+7.6%', isUp: true, icon: CheckCircle2, sparkline: miniChartDataUp },
];

export function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleExportCSV = () => {
    let csvContent = "--- KPIs ---\n";
    csvContent += "Metric,Value,Change\n";
    topKPIs.forEach(kpi => {
      csvContent += `"${kpi.title}","${kpi.value}","${kpi.change}"\n`;
    });

    csvContent += "\n--- Revenue Trend ---\n";
    csvContent += "Date,Revenue\n";
    revenueData.forEach(d => {
      csvContent += `"${d.name}","${d.value}"\n`;
    });

    csvContent += "\n--- Cash Flow ---\n";
    csvContent += "Date,Cash In,Cash Out\n";
    cashFlowData.forEach(d => {
      csvContent += `"${d.day}","${d.in}","${d.out}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bizmanager_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const RightSidebarContent = () => (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium text-white flex items-center gap-2 text-sm">
            Critical Alerts
          </h3>
          <button className="text-xs text-primary hover:text-white transition-colors">View All</button>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3 items-start group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center shrink-0 text-danger mt-0.5">
              <PackageX className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">Out of Stock</h4>
                <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">2m ago</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">5 products out of stock</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 text-warning mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">Low Stock</h4>
                <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">10m ago</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">12 products running low</p>
            </div>
          </div>

          <div className="flex gap-3 items-start group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 text-warning mt-0.5">
              <Store className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">Branch Alert</h4>
                <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">20m ago</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">Hargeisa branch performance down</p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center shrink-0 text-danger mt-0.5">
              <Activity className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-medium text-white group-hover:text-primary transition-colors truncate">High Expenses</h4>
                <span className="text-[10px] text-text-muted whitespace-nowrap ml-2">1h ago</span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">Expenses increased by 15%</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Copilot */}
      <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-bg-surface/50">
          <h3 className="font-medium text-white flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" /> AI Copilot
          </h3>
          <div className="flex items-center gap-2 text-text-muted">
            <button className="hover:text-white transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="p-5 flex-1 bg-gradient-to-b from-primary/5 to-transparent">
          <h4 className="text-base font-semibold text-white mb-1">Hello Abdi! 👋</h4>
          <p className="text-xs text-text-muted mb-6">I'm your AI business assistant. Ask me anything about your business.</p>
          
          <div className="space-y-2 mb-2">
            {['How is my business today?', 'Which branch is performing best?', 'What products need attention?', 'Generate executive summary'].map((q, i) => (
              <button key={i} className="w-full flex items-center gap-2 p-2.5 rounded-lg bg-bg-surface border border-white/5 text-[11px] text-text-muted hover:text-white hover:border-white/10 transition-colors text-left group">
                <Info className="w-3.5 h-3.5 shrink-0 text-text-muted group-hover:text-primary transition-colors" />
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-white/5 bg-bg-surface/50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              className="w-full bg-bg-base border border-white/10 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-muted/50"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full relative">
      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 space-y-6 pb-12 w-full min-w-0"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-card border border-white/5 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Good Morning, Abdi Mohamed.
            </h1>
            <p className="text-sm text-text-muted mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              All systems operational. Here is your executive summary for today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <button className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-hover text-white border border-primary/50 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary/20 hover:scale-105">
              <Sparkles className="w-4 h-4" /> AI Executive Brief
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-bg-surface text-white border border-white/10 hover:border-white/20 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-black/5 dark:hover:bg-white/5"
            >
              <Download className="w-4 h-4 text-primary" /> Export Financials
            </button>
            <button 
              onClick={() => setShowSidebar(true)}
              className="xl:hidden flex items-center gap-2 bg-bg-surface text-white border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <PanelRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topKPIs.map((kpi, idx) => (
            <div 
              key={idx}
              className="bg-bg-card border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-text-muted font-medium uppercase tracking-wider">
                    {kpi.title}
                  </div>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border", kpi.isUp ? 'bg-success/5 border-success/10 text-success' : 'bg-warning/5 border-warning/10 text-warning')}>
                    <kpi.icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white tracking-tight mb-2 font-mono">{kpi.value}</div>
                <div className={cn("text-xs font-medium flex items-center gap-1", kpi.isUp ? "text-success" : "text-warning")}>
                  {kpi.isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {kpi.change} <span className="text-text-muted font-normal">vs yesterday</span>
                </div>
              </div>
              <div className="h-12 mt-4 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kpi.sparkline}>
                    <Line type="monotone" dataKey="v" stroke={kpi.isUp ? '#10B981' : '#F59E0B'} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-white text-sm">Revenue Overview</h3>
              <select className="bg-bg-surface border border-white/10 rounded-md text-xs px-2 py-1 text-text-muted outline-none cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-bold text-white tracking-tight">$742,540</div>
              <div className="text-xs text-success font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> 14.6% <span className="text-text-muted font-normal">vs last month</span>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" dot={{ r: 4, fill: '#111827', stroke: '#2563EB', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-white text-sm">Profit Overview</h3>
              <select className="bg-bg-surface border border-white/10 rounded-md text-xs px-2 py-1 text-text-muted outline-none cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="text-2xl font-bold text-white tracking-tight">$245,850</div>
              <div className="text-xs text-success font-medium flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3 h-3" /> 11.3% <span className="text-text-muted font-normal">vs last month</span>
              </div>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profitData}>
                  <defs>
                    <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorProf)" dot={{ r: 4, fill: '#111827', stroke: '#10B981', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-bg-surface/50 to-transparent">
              <div>
                <h3 className="font-semibold text-white text-base tracking-tight">Branch Performance & Analytics</h3>
                <p className="text-xs text-text-muted mt-1">Comprehensive breakdown of revenue and growth across all locations.</p>
              </div>
              <button className="text-xs px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors font-medium">View Detailed Report</button>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left">
                <thead className="text-[11px] text-text-muted bg-bg-surface/30 border-b border-white/5 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Branch Location</th>
                    <th className="px-6 py-4 font-medium text-right">Total Revenue</th>
                    <th className="px-6 py-4 font-medium text-right">Net Profit</th>
                    <th className="px-6 py-4 font-medium">Performance Target</th>
                    <th className="px-6 py-4 font-medium text-right">MoM Growth</th>
                    <th className="px-6 py-4 font-medium text-center">Health Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockBranches.slice(0, 5).map(branch => (
                    <tr key={branch.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white text-sm whitespace-nowrap flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Store className="w-4 h-4" />
                        </div>
                        {branch.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-right text-sm whitespace-nowrap text-white">${(branch.revenue).toLocaleString()}</td>
                      <td className="px-6 py-4 font-mono text-right text-sm whitespace-nowrap text-success">${(branch.profit).toLocaleString()}</td>
                      <td className="px-6 py-4 min-w-[150px]">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-text-muted">Target</span>
                            <span className="text-white font-mono">{Math.min(Math.max(80 + branch.growth, 0), 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className={cn("h-full rounded-full transition-all duration-1000", branch.growth > 0 ? "bg-gradient-to-r from-success/50 to-success" : "bg-gradient-to-r from-warning/50 to-warning")} style={{ width: `${Math.min(Math.max(80 + branch.growth, 0), 100)}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className={cn("inline-flex items-center gap-1 font-mono text-xs font-medium px-2.5 py-1 rounded-md", branch.growth > 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>
                          {branch.growth > 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {Math.abs(branch.growth)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border",
                          branch.status === 'excellent' && "bg-success/10 text-success border-success/20",
                          branch.status === 'good' && "bg-primary/10 text-primary border-primary/20",
                          branch.status === 'warning' && "bg-warning/10 text-warning border-warning/20",
                          branch.status === 'critical' && "bg-danger/10 text-danger border-danger/20"
                        )}>
                          {branch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </motion.div>

      {/* Desktop Right Sidebar */}
      <div className="hidden xl:block w-[320px] shrink-0 ml-6 relative">
        <RightSidebarContent />
      </div>

      {/* Mobile Slide-over Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] max-w-full bg-bg-base border-l border-white/5 z-50 p-6 overflow-y-auto shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Action Center</h2>
                <button 
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-text-muted hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <RightSidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
