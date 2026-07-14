const fs = require('fs');

const employeesCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Filter, MoreHorizontal, User, Mail, Phone, Briefcase, X, Activity, CheckCircle2, Clock, DollarSign, Calendar, Timer } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis, BarChart, Bar, XAxis, CartesianGrid } from 'recharts';

const generateInitialData = (base: number) => Array.from({length: 15}, (_, i) => ({ val: base + Math.random() * 10 - 5, id: i }));

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Alice Cooper', role: 'Sales Manager', department: 'Sales', status: 'Active', email: 'alice@biz.com', phone: '+1 555-0101', performance: 92, sales: 12500, hours: 164, days: 22 },
  { id: 2, name: 'Bob Smith', role: 'Developer', department: 'Engineering', status: 'Active', email: 'bob@biz.com', phone: '+1 555-0102', performance: 88, sales: 0, hours: 158, days: 21 },
  { id: 3, name: 'Charlie Davis', role: 'Designer', department: 'Design', status: 'On Leave', email: 'charlie@biz.com', phone: '+1 555-0103', performance: 95, sales: 0, hours: 120, days: 15 },
  { id: 4, name: 'Diana Prince', role: 'HR Manager', department: 'Human Resources', status: 'Active', email: 'diana@biz.com', phone: '+1 555-0104', performance: 81, sales: 0, hours: 170, days: 23 },
  { id: 5, name: 'Evan Wright', role: 'Accountant', department: 'Finance', status: 'Active', email: 'evan@biz.com', phone: '+1 555-0105', performance: 89, sales: 0, hours: 160, days: 22 },
];

export function Employees() {
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [liveTasks, setLiveTasks] = useState(0);
  const [employeeCharts, setEmployeeCharts] = useState<Record<number, any[]>>(() => {
    const initial: Record<number, any[]> = {};
    MOCK_EMPLOYEES.forEach(emp => initial[emp.id] = generateInitialData(emp.performance));
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees(current => {
        const newEmployees = [...current];
        const randomIdx = Math.floor(Math.random() * newEmployees.length);
        const statuses = ['Active', 'On Leave', 'In Meeting', 'Remote'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        newEmployees[randomIdx] = { 
          ...newEmployees[randomIdx], 
          status: randomStatus,
          performance: Math.max(60, Math.min(100, newEmployees[randomIdx].performance + (Math.floor(Math.random() * 5) - 2)))
        };
        return newEmployees;
      });
      
      setLiveTasks(prev => prev + Math.floor(Math.random() * 3));
      setEmployeeCharts(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const numKey = Number(key);
          const oldChart = next[numKey];
          const lastVal = oldChart[oldChart.length - 1].val;
          const newVal = Math.max(0, Math.min(100, lastVal + (Math.random() * 6 - 3)));
          next[numKey] = [...oldChart.slice(1), { val: newVal, id: Date.now() }];
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.role.toLowerCase().includes(searchTerm.toLowerCase()));

  const currentSelected = selectedEmployee ? employees.find(e => e.id === selectedEmployee.id) : null;

  return (
    <div className="flex flex-col gap-6 h-full text-slate-800 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display text-slate-800">Team Members</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Employee
        </motion.button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden pb-4">
        {/* Main List */}
        <motion.div layout className="glass-card flex-1 flex flex-col overflow-hidden p-6 relative z-10">
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/50 border border-white/60 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 shadow-inner"
              />
            </div>
            <button className="bg-white/50 border border-white/60 text-slate-600 px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          <div className="flex-1 overflow-auto rounded-xl border border-white/40 bg-white/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/40 text-slate-500 text-xs uppercase tracking-wider sticky top-0 backdrop-blur-md z-10">
                  <th className="px-6 py-4 font-semibold rounded-tl-xl">Employee</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right rounded-tr-xl">Performance</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((emp) => (
                    <motion.tr 
                      key={emp.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedEmployee(emp)}
                      className={\`border-b border-white/30 hover:bg-white/60 transition-colors cursor-pointer group \${selectedEmployee?.id === emp.id ? 'bg-white/50 shadow-inner' : ''}\`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <motion.div layoutId={\`avatar-\${emp.id}\`} className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0 shadow-sm border border-emerald-200">
                            {emp.name.charAt(0)}
                          </motion.div>
                          <div>
                            <motion.div layoutId={\`name-\${emp.id}\`} className="font-semibold text-slate-800">{emp.name}</motion.div>
                            <div className="text-xs text-slate-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-700">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          {emp.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-200/50 text-slate-700 text-xs font-semibold rounded-lg">
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.span 
                          key={emp.status}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={\`px-3 py-1 text-xs font-bold rounded-lg inline-flex items-center gap-1.5 shadow-sm \${
                            emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                            emp.status === 'On Leave' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            emp.status === 'In Meeting' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                            'bg-purple-100 text-purple-700 border border-purple-200'
                          }\`}
                        >
                          <span className={\`w-1.5 h-1.5 rounded-full \${
                             emp.status === 'Active' ? 'bg-emerald-500' :
                             emp.status === 'On Leave' ? 'bg-amber-500' :
                             emp.status === 'In Meeting' ? 'bg-blue-500' :
                             'bg-purple-500'
                          }\`}></span>
                          {emp.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <motion.div 
                          key={emp.performance}
                          initial={{ y: -5, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="text-sm font-bold text-slate-700"
                        >
                          {emp.performance}%
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
               <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                  <User className="w-12 h-12 mb-4 text-slate-400 opacity-50" />
                  <p>No employees found matching "{searchTerm}"</p>
               </div>
            )}
          </div>
        </motion.div>

        {/* Side Panel */}
        <AnimatePresence>
          {currentSelected && (
            <motion.div 
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: 420, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="glass-card flex flex-col overflow-hidden shrink-0"
            >
              <div className="w-[420px] p-6 flex flex-col h-full overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold font-display tracking-tight">Employee Details</h3>
                  <button 
                    onClick={() => setSelectedEmployee(null)}
                    className="p-2 hover:bg-slate-200/50 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col items-center mb-6">
                  <motion.div layoutId={\`avatar-\${currentSelected.id}\`} className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-3xl shadow-lg border-4 border-white mb-4">
                    {currentSelected.name.charAt(0)}
                  </motion.div>
                  <motion.h2 layoutId={\`name-\${currentSelected.id}\`} className="text-2xl font-bold text-slate-800">{currentSelected.name}</motion.h2>
                  <p className="text-emerald-600 font-medium">{currentSelected.role}</p>
                </div>
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/50 border border-white/60 p-3 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <DollarSign className="w-5 h-5 text-emerald-500 mb-1" />
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Sales</div>
                    <div className="text-lg font-bold text-slate-800">\${currentSelected.sales.toLocaleString()}</div>
                  </div>
                  <div className="bg-white/50 border border-white/60 p-3 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <Timer className="w-5 h-5 text-blue-500 mb-1" />
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Hours</div>
                    <div className="text-lg font-bold text-slate-800">{currentSelected.hours}h</div>
                  </div>
                  <div className="bg-white/50 border border-white/60 p-3 rounded-2xl shadow-sm flex flex-col items-center text-center">
                    <Calendar className="w-5 h-5 text-purple-500 mb-1" />
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Days</div>
                    <div className="text-lg font-bold text-slate-800">{currentSelected.days}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="bg-white/40 p-3 rounded-2xl border border-white/60 shadow-sm flex items-center gap-4">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Email</div>
                      <div className="text-sm text-slate-800 font-medium">{currentSelected.email}</div>
                    </div>
                  </div>
                  <div className="bg-white/40 p-3 rounded-2xl border border-white/60 shadow-sm flex items-center gap-4">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500">Phone</div>
                      <div className="text-sm text-slate-800 font-medium">{currentSelected.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col flex-1 min-h-[220px]">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" /> Live Performance Graph
                  </h4>
                  <div className="flex-1 w-full bg-white/40 rounded-2xl border border-white/60 p-4 mb-4 relative overflow-hidden shadow-inner min-h-[140px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={employeeCharts[currentSelected.id] || []}>
                          <YAxis domain={['auto', 'auto']} hide />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            labelStyle={{ display: 'none' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#10B981" 
                            strokeWidth={3} 
                            dot={false}
                            activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                            style={{ filter: \`drop-shadow(0px 4px 6px rgba(16,185,129,0.3))\` }}
                          />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
`

fs.writeFileSync('src/views/Employees.tsx', employeesCode);
