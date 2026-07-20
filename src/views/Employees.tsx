import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Filter, User, Mail, Phone, X, Activity, CheckCircle2, Clock, DollarSign, Calendar, Timer, Briefcase, TrendingUp, LogIn, LogOut, ArrowLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { supabase } from '../lib/supabase';

const generateHourlyData = () => {
  return [
    { time: '9AM', performance: 40 + Math.random() * 20, sales: Math.floor(Math.random() * 200) },
    { time: '11AM', performance: 60 + Math.random() * 30, sales: Math.floor(Math.random() * 400) },
    { time: '1PM', performance: 50 + Math.random() * 40, sales: Math.floor(Math.random() * 350) },
    { time: '3PM', performance: 70 + Math.random() * 20, sales: Math.floor(Math.random() * 500) },
    { time: '5PM', performance: 30 + Math.random() * 30, sales: Math.floor(Math.random() * 150) },
  ];
};

const generateWeeklyData = () => {
  return [
    { name: 'Mon', sales: 4000 + Math.random() * 1000 },
    { name: 'Tue', sales: 4200 + Math.random() * 1000 },
    { name: 'Wed', sales: 3800 + Math.random() * 1000 },
    { name: 'Thu', sales: 4800 + Math.random() * 1000 },
    { name: 'Fri', sales: 5000 + Math.random() * 1000 },
    { name: 'Sat', sales: 6100 + Math.random() * 1000 },
    { name: 'Sun', sales: 4500 + Math.random() * 1000 },
  ];
};

const MOCK_EMPLOYEES = [
  { id: '1', name: 'Amina Ali', role: 'Sales Rep', department: 'Downtown HQ', status: 'Active', email: 'amina@biz.com', phone: '+1 555-0101', performance: 92, sales: 12500, hours: 164, days: 22, attendanceRate: 98, absentDays: 0, avatar: '', clockIn: '08:15 AM', clockOut: '05:30 PM', todayTasks: 14, todaySales: 4500, transactions: 142, weeklyAvgSales: 28000, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
  { id: '2', name: 'Bob Smith', role: 'Developer', department: 'Engineering', status: 'Active', email: 'bob@biz.com', phone: '+1 555-0102', performance: 88, sales: 0, hours: 158, days: 21, attendanceRate: 90, absentDays: 2, avatar: '', clockIn: '09:00 AM', clockOut: '06:00 PM', todayTasks: 8, todaySales: 0, transactions: 0, weeklyAvgSales: 0, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
  { id: '3', name: 'Charlie Davis', role: 'Designer', department: 'Design', status: 'On Leave', email: 'charlie@biz.com', phone: '+1 555-0103', performance: 95, sales: 0, hours: 120, days: 15, attendanceRate: 85, absentDays: 5, avatar: '', clockIn: '-', clockOut: '-', todayTasks: 0, todaySales: 0, transactions: 0, weeklyAvgSales: 0, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
  { id: '4', name: 'Diana Prince', role: 'HR Manager', department: 'Human Resources', status: 'Active', email: 'diana@biz.com', phone: '+1 555-0104', performance: 81, sales: 0, hours: 170, days: 23, attendanceRate: 100, absentDays: 0, avatar: '', clockIn: '08:30 AM', clockOut: '05:00 PM', todayTasks: 5, todaySales: 0, transactions: 0, weeklyAvgSales: 0, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
  { id: '5', name: 'Evan Wright', role: 'Accountant', department: 'Finance', status: 'Active', email: 'evan@biz.com', phone: '+1 555-0105', performance: 89, sales: 0, hours: 160, days: 22, attendanceRate: 95, absentDays: 1, avatar: '', clockIn: '08:00 AM', clockOut: '04:30 PM', todayTasks: 9, todaySales: 0, transactions: 0, weeklyAvgSales: 0, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
  { id: '6', name: 'Fiona Gallagher', role: 'Sales Rep', department: 'Uptown Branch', status: 'In Meeting', email: 'fiona@biz.com', phone: '+1 555-0106', performance: 94, sales: 8900, hours: 145, days: 19, attendanceRate: 92, absentDays: 1, avatar: '', clockIn: '08:45 AM', clockOut: 'In Progress', todayTasks: 11, todaySales: 3200, transactions: 95, weeklyAvgSales: 19500, hourlyData: generateHourlyData(), weeklyData: generateWeeklyData() },
];

export function Employees({ currentTab = 'Directory' }: { currentTab?: string }) {
  const [employees, setEmployees] = useState<typeof MOCK_EMPLOYEES>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof MOCK_EMPLOYEES[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();

    const subscription = supabase
      .channel('public:employees')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'employees' }, payload => {
        fetchEmployees();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;

      if (data && data.length > 0) {
        const mappedData = data.map(emp => ({
          id: emp.id,
          name: emp.name,
          role: emp.role,
          department: emp.department || 'N/A',
          status: emp.status || 'Active',
          email: emp.email,
          phone: emp.phone || 'N/A',
          performance: emp.performance || 85,
          sales: 0,
          hours: 160,
          days: 22,
          attendanceRate: emp.attendance_rate || 100,
          absentDays: emp.absent_days || 0,
          avatar: '',
          clockIn: '09:00 AM',
          clockOut: '05:00 PM',
          todayTasks: Math.floor(Math.random() * 10),
          todaySales: Math.floor(Math.random() * 1000),
          transactions: Math.floor(Math.random() * 50),
          weeklyAvgSales: Math.floor(Math.random() * 5000),
          hourlyData: generateHourlyData(),
          weeklyData: generateWeeklyData()
        }));
        setEmployees(mappedData);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Fallback to mock data if there is an error (e.g. no supabase keys setup)
      setEmployees(MOCK_EMPLOYEES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    const roles = ['Sales Rep', 'Developer', 'Designer', 'HR Manager', 'Accountant'];
    const departments = ['HQ', 'Engineering', 'Design', 'Human Resources', 'Finance'];
    const randomName = 'New Hire ' + Math.floor(Math.random() * 1000);
    const newEmp = {
      name: randomName,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      email: `newhire${Math.floor(Math.random() * 1000)}@biz.com`,
      status: 'Active',
      performance: Math.floor(Math.random() * 20) + 80,
      attendance_rate: 100,
      absent_days: 0
    };
    
    await supabase.from('employees').insert([newEmp]);
  };

  if (currentTab !== 'Directory') {
    return (
      <div className="flex flex-col gap-6 min-h-full text-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-display text-slate-900">{currentTab}</h2>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{currentTab} Module</h3>
            <p className="text-slate-500 max-w-md mx-auto">This module is currently under development. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const filtered = employees.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.role.toLowerCase().includes(searchTerm.toLowerCase()));
  const currentSelected = selectedEmployee ? employees.find(e => e.id === selectedEmployee.id) : null;

  if (currentSelected) {
    return (
      <div className="flex flex-col gap-6 min-h-full text-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-display text-slate-900">Employees</h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700">
              <Activity className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700">
              <span className="relative">
                <Mail className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => setSelectedEmployee(null)}
            className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[22px] font-bold text-slate-900 leading-tight">Employee Profile</h1>
            <p className="text-sm text-slate-500 font-medium">Detailed performance metrics and history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] font-bold text-4xl shadow-sm border-[6px] border-white ring-1 ring-slate-100 mb-5">
                {currentSelected.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{currentSelected.name}</h2>
              <p className="text-[15px] text-slate-500 font-medium mt-1">{currentSelected.department}</p>
              
              <div className="mt-4 mb-8">
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[13px] font-bold rounded-full border border-emerald-100">
                  Performance: {currentSelected.performance >= 90 ? 'Excellent' : currentSelected.performance >= 75 ? 'Good' : 'Average'}
                </span>
              </div>

              <div className="w-full h-px bg-slate-100 mb-8"></div>

              <div className="w-full grid grid-cols-2 gap-4 text-left mb-8">
                <div>
                  <div className="text-[13px] font-medium text-slate-500 mb-1">Today's Sales</div>
                  <div className="text-2xl font-bold text-slate-900">${currentSelected.todaySales.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-[13px] font-medium text-slate-500 mb-1">Transactions</div>
                  <div className="text-2xl font-bold text-slate-900">{currentSelected.transactions}</div>
                </div>
              </div>

              <div className="w-full text-left mb-6">
                <div className="text-[13px] font-medium text-slate-500 mb-1">Weekly Average Sales</div>
                <div className="text-2xl font-bold text-slate-900">${currentSelected.weeklyAvgSales.toLocaleString()}</div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 text-left">
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                  <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Attendance</div>
                  <div className="text-xl font-black text-emerald-700">{currentSelected.attendanceRate}%</div>
                </div>
                <div className={`${currentSelected.absentDays > 0 ? 'bg-rose-50 border-rose-100' : 'bg-slate-50 border-slate-100'} p-3 rounded-2xl border`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${currentSelected.absentDays > 0 ? 'text-rose-600' : 'text-slate-500'}`}>Absent</div>
                  <div className={`text-xl font-black ${currentSelected.absentDays > 0 ? 'text-rose-700' : 'text-slate-700'}`}>{currentSelected.absentDays} {currentSelected.absentDays === 1 ? 'Day' : 'Days'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Charts */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Weekly Sales Trend */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[17px] font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2563eb]" /> Weekly Sales Trend
                </h3>
                <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-100">
                  Last 7 Days
                </span>
              </div>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentSelected.weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#2563eb" 
                      strokeWidth={3} 
                      fillOpacity={1} 
                      fill="url(#colorSales)" 
                      activeDot={{ r: 6, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hourly Performance */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-[17px] font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#2563eb]" /> Hourly Performance
                </h3>
                <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-semibold rounded-lg border border-slate-100">
                  Today
                </span>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentSelected.hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      cursor={{ fill: '#f8fafc' }}
                    />
                    <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Original list view
  return (
    <div className="flex flex-col gap-6 min-h-full text-slate-800 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold font-display text-slate-800">Team Members</h2>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddEmployee}
          className="bg-[#2563eb] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Employee
        </motion.button>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden pb-4">
        {/* Main List */}
        <motion.div layout className="bg-white rounded-3xl border border-slate-100 flex-1 flex flex-col overflow-hidden p-6 relative z-10 shadow-sm">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb]"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search employees..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all placeholder:text-slate-400"
              />
            </div>
            <button className="bg-slate-50 border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          <div className="flex-1 overflow-auto rounded-xl border border-slate-100 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider sticky top-0 z-10 border-b border-slate-100">
                  <th className="px-6 py-4 rounded-tl-xl">Employee</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Attendance</th>
                  <th className="px-6 py-4 text-right">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filtered.map((emp) => (
                    <motion.tr 
                      key={emp.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ backgroundColor: 'rgba(248, 250, 252, 0.8)' }}
                      onClick={() => setSelectedEmployee(emp)}
                      className={`cursor-pointer transition-colors ${currentSelected?.id === emp.id ? 'bg-blue-50' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#eff6ff] flex items-center justify-center text-[#2563eb] font-bold text-lg shadow-sm border border-slate-200">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-800">{emp.name}</div>
                            <div className="text-xs text-slate-500">{emp.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm text-slate-700">{emp.role}</div>
                        <div className="text-xs text-slate-500">{emp.department}</div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.span 
                          key={emp.status}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg inline-flex items-center gap-1.5 ${
                            emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            emp.status === 'On Leave' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            emp.status === 'In Meeting' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            'bg-purple-50 text-purple-600 border border-purple-100'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${ 
                             emp.status === 'Active' ? 'bg-emerald-500' : 
                             emp.status === 'On Leave' ? 'bg-amber-500' : 
                             emp.status === 'In Meeting' ? 'bg-[#2563eb]' : 
                             'bg-purple-500'
                          }`}></span>
                          {emp.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-sm text-slate-700">{emp.attendanceRate}%</div>
                        {emp.absentDays > 0 ? (
                          <div className="text-xs font-medium text-rose-500">{emp.absentDays} {emp.absentDays === 1 ? 'day' : 'days'} absent</div>
                        ) : (
                          <div className="text-xs font-medium text-emerald-500">Perfect</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${emp.performance}%` }}
                              className={`h-full rounded-full ${emp.performance > 85 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700 w-8">{emp.performance}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
               <div className="flex flex-col items-center justify-center p-12 text-slate-500">
                  <User className="w-12 h-12 mb-4 text-slate-300" />
                  <p>No employees found matching "{searchTerm}"</p>
               </div>
            )}
          </div>
          </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
