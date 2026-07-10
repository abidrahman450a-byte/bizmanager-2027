import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Lock, Download, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

const cashFlowData = [
  { day: 'May 1', in: 40000, out: -30000 },
  { day: 'May 8', in: 55000, out: -20000 },
  { day: 'May 15', in: 30000, out: -45000 },
  { day: 'May 22', in: 65000, out: -15000 },
  { day: 'May 31', in: 80000, out: -25000 },
];

export function Reports() {
  return (
    <div className="space-y-6 pb-12 w-full max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Reports & Cash Flow</h1>
        <p className="text-sm text-text-muted">Financial intelligence and recent system activities.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Overview */}
        <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-white text-sm">Cash Flow Overview</h3>
            <select className="bg-bg-surface border border-white/10 rounded-md text-xs px-2 py-1 text-text-muted outline-none cursor-pointer">
              <option>This Month</option>
            </select>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6 border-b border-white/5 pb-4">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-text-muted mb-1">Cash In</div>
              <div className="text-xl font-bold text-success">$850k</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-text-muted mb-1">Cash Out</div>
              <div className="text-xl font-bold text-danger">$542k</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-text-muted mb-1">Net Flow</div>
              <div className="text-xl font-bold text-success">$308k</div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: 12 }} 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                />
                <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" />
                <Bar dataKey="in" fill="#10B981" radius={[4, 4, 0, 0]} name="Cash In" />
                <Bar dataKey="out" fill="#EF4444" radius={[0, 0, 4, 4]} name="Cash Out" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-white text-sm">Recent Activity</h3>
            <button className="text-xs text-primary hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-primary/30 bg-bg-base flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium text-white">New login detected</div>
                  <div className="text-[10px] text-text-muted whitespace-nowrap ml-2">2m ago</div>
                </div>
                <div className="text-xs text-text-muted">Dubai, UAE • Chrome • Mac OS</div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-success/30 bg-bg-base flex items-center justify-center shrink-0">
                <Download className="w-4 h-4 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium text-white">Report generated</div>
                  <div className="text-[10px] text-text-muted whitespace-nowrap ml-2">15m ago</div>
                </div>
                <div className="text-xs text-text-muted">Monthly Executive Report - Full Summary</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-warning/30 bg-bg-base flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium text-white">Stock alert triggered</div>
                  <div className="text-[10px] text-text-muted whitespace-nowrap ml-2">30m ago</div>
                </div>
                <div className="text-xs text-text-muted">Rice 25kg is low in stock at Mogadishu Branch</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-primary/30 bg-bg-base flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <div className="text-sm font-medium text-white">Security configuration changed</div>
                  <div className="text-[10px] text-text-muted whitespace-nowrap ml-2">2h ago</div>
                </div>
                <div className="text-xs text-text-muted">Updated password policy for all staff users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
