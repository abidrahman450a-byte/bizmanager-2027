import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockBranches, forecastData, mockStock } from '../data';
import { Search, Filter, TrendingUp, TrendingDown, MoreVertical, ArrowLeft, Users, DollarSign, Activity, Calendar, ChevronDown, ChevronUp, X, Clock, CalendarDays, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '../lib/utils';
import { Branch } from '../types';
import jsPDF from 'jspdf';

export function Branches() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const generatePDFReport = (employee: any) => {
    const doc = new jsPDF();
    
    // Colors
    const primaryColor = [37, 99, 235]; // #2563EB (Blue)
    const textColor = [15, 23, 42]; // slate-900
    const textMuted = [100, 116, 139]; // slate-500

    // Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo "BizManager"
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("BizManager", 20, 25);
    
    // Header Subtitle
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Staff Performance & Attendance Report", 20, 32);

    // Generation Date
    doc.setFontSize(9);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 25);
    
    // Employee Profile Section
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Staff Profile", 20, 55);
    
    // Employee Info Card (Grey Background)
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(20, 60, 170, 40, 3, 3, 'FD');
    
    // Avatar placeholder / Box
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.circle(35, 80, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(employee.name.charAt(0), 33, 81.5);
    
    // Name and Role
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(employee.name, 55, 75);
    
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(employee.role, 55, 82);
    
    // Status & Branch
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("Status:", 120, 75);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(employee.status.toUpperCase(), 138, 75);
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text("Branch:", 120, 85);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(selectedBranch?.name || "HQ", 138, 85);

    // Metrics Section
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Key Metrics", 20, 115);

    // Shift Box
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 120, 80, 30, 3, 3, 'FD');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Shift Timing", 25, 130);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(12);
    doc.text(`${employee.shiftStart} - ${employee.shiftEnd}`, 25, 140);
    
    // Attendance Box
    doc.roundedRect(110, 120, 80, 30, 3, 3, 'FD');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Attendance Rate", 115, 130);
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(16);
    const attRate = ((employee.attendedDays / employee.scheduledDays) * 100).toFixed(0);
    doc.text(`${attRate}%`, 115, 142);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${employee.attendedDays} / ${employee.scheduledDays} Days`, 135, 141);

    // Sales Box
    doc.roundedRect(20, 155, 170, 30, 3, 3, 'FD');
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Daily Sales Avg", 25, 165);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(16);
    doc.text(`$${employee.dailySales.toLocaleString()}`, 25, 177);
    
    // 7-Day Trend Chart
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("7-Day Productivity Trend", 20, 205);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 210, 190, 210);
    
    // Draw simple bar chart
    let chartX = 25;
    const chartY = 260; // bottom of chart
    const maxSales = Math.max(...employee.trend.map((t: any) => t.sales));
    
    employee.trend.forEach((t: any) => {
      const barHeight = (t.sales / maxSales) * 35; // max height 35mm
      
      // Bar
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(chartX, chartY - barHeight, 14, barHeight, 'F');
      
      // Label
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(t.day, chartX + 2, chartY + 5);
      
      // Value
      doc.setFontSize(8);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.text(`$${t.sales}`, chartX, chartY - barHeight - 3);
      
      chartX += 23;
    });

    // Footer
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(9);
    doc.text("© BizManager ERP System - Confidential", 70, 290);
    
    doc.save(`${employee.name.replace(/\s+/g, '_')}_Report.pdf`);
  };

  const generateBulkPDFReport = (employees: any[], branch: Branch) => {
    const doc = new jsPDF();
    
    // Colors
    const primaryColor = [15, 23, 42]; // slate-900 (Executive dark)
    const accentColor = [37, 99, 235]; // #2563EB (Blue)
    const textColor = [30, 41, 59]; // slate-800
    const textMuted = [100, 116, 139]; // slate-500
    const successColor = [16, 185, 129]; // emerald-500

    // Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 45, 'F');
    
    // Logo "BizManager"
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text("BizManager", 20, 25);
    
    // Header Subtitle
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 210, 230);
    doc.text(`Comprehensive Staff Analysis Report - ${branch.name} Branch`, 20, 34);

    // Generation Date & Badge
    doc.setFillColor( accentColor[0], accentColor[1], accentColor[2] );
    doc.roundedRect(145, 18, 45, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, 149, 24.5);
    
    let yPos = 60;
    
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 20, yPos);
    
    // Summary Cards
    yPos += 10;
    const avgAttendance = (employees.reduce((acc, emp) => acc + (emp.attendedDays / emp.scheduledDays), 0) / employees.length * 100).toFixed(1);
    const totalSales = employees.reduce((acc, emp) => acc + emp.dailySales, 0);
    
    // Card 1
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(20, yPos, 80, 25, 3, 3, 'FD');
    doc.setFontSize(10);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text("Avg. Branch Attendance", 25, yPos + 8);
    doc.setFontSize(18);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text(`${avgAttendance}%`, 25, yPos + 18);

    // Card 2
    doc.roundedRect(110, yPos, 80, 25, 3, 3, 'FD');
    doc.setFontSize(10);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text("Daily Target Achieved", 115, yPos + 8);
    doc.setFontSize(18);
    doc.setTextColor(successColor[0], successColor[1], successColor[2]);
    doc.text(`$${totalSales.toLocaleString()}`, 115, yPos + 18);

    yPos += 45;

    // Table Header
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Staff Performance Breakdown", 20, yPos);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setFillColor( primaryColor[0], primaryColor[1], primaryColor[2] );
    doc.rect(20, yPos - 6, 170, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("STAFF NAME", 25, yPos + 1.5);
    doc.text("ROLE & SHIFT", 75, yPos + 1.5);
    doc.text("ATTENDANCE", 125, yPos + 1.5);
    doc.text("PERFORMANCE", 160, yPos + 1.5);
    
    yPos += 14;
    
    employees.forEach((emp, index) => {
        if (yPos > 260) {
            doc.addPage();
            yPos = 30;
            // Redraw Header on new page
            doc.setFillColor( primaryColor[0], primaryColor[1], primaryColor[2] );
            doc.rect(20, yPos - 6, 170, 12, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.text("STAFF NAME", 25, yPos + 1.5);
            doc.text("ROLE & SHIFT", 75, yPos + 1.5);
            doc.text("ATTENDANCE", 125, yPos + 1.5);
            doc.text("PERFORMANCE", 160, yPos + 1.5);
            yPos += 14;
        }
        
        if (index % 2 === 0) {
            doc.setFillColor(248, 250, 252);
            doc.rect(20, yPos - 6, 170, 14, 'F');
        }
        
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text(emp.name, 25, yPos);
        
        doc.setFont("helvetica", "normal");
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text(emp.role, 75, yPos - 1);
        doc.setFontSize(7);
        doc.text(`${emp.shiftStart} - ${emp.shiftEnd}`, 75, yPos + 3);
        
        doc.setFontSize(9);
        const attRate = ((emp.attendedDays / emp.scheduledDays) * 100).toFixed(0);
        doc.setTextColor(Number(attRate) >= 90 ? successColor[0] : textColor[0], Number(attRate) >= 90 ? successColor[1] : textColor[1], Number(attRate) >= 90 ? successColor[2] : textColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text(`${attRate}%`, 125, yPos);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
        doc.text(`${emp.attendedDays}/${emp.scheduledDays} Days`, 135, yPos);
        
        doc.setFontSize(9);
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFont("helvetica", "bold");
        doc.text(`$${emp.dailySales.toLocaleString()}`, 160, yPos);
        
        yPos += 14;
    });

    // Footer
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Generated securely via BizManager ERP System. Confidential Document.", 105, 290, { align: "center" });
    
    doc.save(`BizManager_Staff_Analysis_${branch.name.replace(/\s+/g, '_')}.pdf`);
  };

  const mockEmployees = useMemo(() => {
    if (!selectedBranch) return [];
    return Array.from({ length: Math.min(selectedBranch.employees, 8) }).map((_, i) => {
      const status = i === 4 ? 'offline' : i === 2 ? 'break' : 'active';
      const baseDaily = 1500 - (i * 150) + Math.floor(Math.random() * 200);
      const shiftStart = i % 3 === 0 ? '07:00 AM' : i % 2 === 0 ? '08:00 AM' : '09:00 AM';
      const shiftEnd = i % 3 === 0 ? '03:00 PM' : i % 2 === 0 ? '04:00 PM' : '05:00 PM';
      const scheduledDays = 30;
      const attendedDays = 30 - Math.floor(Math.random() * 4); // 26-30
      
      return {
        id: `${selectedBranch.id}-emp-${i}`,
        name: `Employee #${i + 1}`,
        role: i === 0 ? 'Assistant Manager' : i === 1 ? 'Shift Supervisor' : 'Sales Associate',
        dailySales: baseDaily,
        status: status,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`Employee ${i + 1}`)}&background=random&color=fff&size=200`,
        shiftStart,
        shiftEnd,
        scheduledDays,
        attendedDays,
        trend: Array.from({ length: 7 }, (_, j) => ({
          day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][j],
          sales: baseDaily + Math.floor(Math.random() * 400) - 200
        }))
      };
    });
  }, [selectedBranch]);

  const branchStock = useMemo(() => {
    if (!selectedBranch) return [];
    return mockStock.filter(item => item.branch === selectedBranch.name);
  }, [selectedBranch]);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {selectedEmployee ? (
          <motion.div
            key="employee-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSelectedEmployee(null)}
                  className="w-10 h-10 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden bg-bg-card">
                    <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">{selectedEmployee.name}</h1>
                    <p className="text-primary font-medium">{selectedEmployee.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium capitalize flex items-center gap-2",
                  selectedEmployee.status === 'active' ? "bg-success/10 text-success border border-success/20" :
                  selectedEmployee.status === 'break' ? "bg-warning/10 text-warning border border-warning/20" :
                  "bg-text-muted/10 text-text-muted border border-text-muted/20"
                )}>
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    selectedEmployee.status === 'active' ? "bg-success" :
                    selectedEmployee.status === 'break' ? "bg-warning" : "bg-text-muted"
                  )} />
                  {selectedEmployee.status}
                </span>
                <button 
                  onClick={() => generatePDFReport(selectedEmployee)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <Download className="w-4 h-4" />
                  Export PDF Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Shift Timing</span>
                </div>
                <div className="text-2xl font-bold text-white mt-2">{selectedEmployee.shiftStart}</div>
                <div className="text-sm text-text-muted">to {selectedEmployee.shiftEnd}</div>
              </div>

              <div className="bg-bg-card border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center text-success">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Attendance Rate</span>
                </div>
                <div className="text-2xl font-bold text-white mt-2">{((selectedEmployee.attendedDays / selectedEmployee.scheduledDays) * 100).toFixed(0)}%</div>
                <div className="text-sm text-text-muted">{selectedEmployee.attendedDays} of {selectedEmployee.scheduledDays} days present</div>
              </div>

              <div className="bg-bg-card border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-text-muted uppercase tracking-wider">Daily Sales (Avg)</span>
                </div>
                <div className="text-2xl font-bold text-white mt-2 font-mono">${selectedEmployee.dailySales.toLocaleString()}</div>
                <div className="text-sm text-text-muted">Target achievement</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6 lg:col-span-2">
                <h3 className="text-lg font-medium text-white mb-6">7-Day Performance Trend</h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedEmployee.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id={`grad-large-${selectedEmployee.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: 12 }}
                        formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                      />
                      <Area type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill={`url(#grad-large-${selectedEmployee.id})`} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6 flex flex-col">
                <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full border border-primary/30 bg-bg-base flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5">Shift Started</div>
                      <div className="text-xs text-text-muted">Clocked in at {selectedEmployee.shiftStart}</div>
                    </div>
                    <div className="ml-auto text-xs text-text-muted">Today</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full border border-success/30 bg-bg-base flex items-center justify-center shrink-0">
                      <DollarSign className="w-3.5 h-3.5 text-success" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5">Sale Completed</div>
                      <div className="text-xs text-text-muted">Large order processed ($450)</div>
                    </div>
                    <div className="ml-auto text-xs text-text-muted">2h ago</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full border border-warning/30 bg-bg-base flex items-center justify-center shrink-0">
                      <Clock className="w-3.5 h-3.5 text-warning" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white mb-0.5">Break Taken</div>
                      <div className="text-xs text-text-muted">15 minute rest</div>
                    </div>
                    <div className="ml-auto text-xs text-text-muted">4h ago</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : selectedBranch ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedBranch(null)}
                className="w-10 h-10 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">{selectedBranch.name}</h1>
                <p className="text-text-muted">Code: {selectedBranch.code} &bull; Manager: {selectedBranch.manager}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-text-muted">Total Revenue</h3>
                </div>
                <h2 className="text-3xl font-semibold text-white font-mono">${(selectedBranch.revenue).toLocaleString()}</h2>
              </div>
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-text-muted">Net Profit</h3>
                </div>
                <h2 className="text-3xl font-semibold text-white font-mono">${(selectedBranch.profit).toLocaleString()}</h2>
              </div>
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-text-muted">Daily Sales Avg</h3>
                </div>
                <h2 className="text-3xl font-semibold text-white font-mono">${(selectedBranch.dailySales).toLocaleString()}</h2>
              </div>
              <div className="bg-bg-card border border-white/5 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-medium text-text-muted">Active Employees</h3>
                </div>
                <h2 className="text-3xl font-semibold text-white font-mono">{selectedBranch.employees}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-bg-card border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-white mb-6">Weekly Revenue Trend</h3>
                <div className="h-[300px] w-full">
                  {selectedBranch.weeklyHistory ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={selectedBranch.weeklyHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorBranchRev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="day" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ color: '#F8FAFC' }}
                          labelStyle={{ color: '#94A3B8', marginBottom: '8px' }}
                          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="var(--color-primary)" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorBranchRev)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-text-muted">No weekly data available.</div>
                  )}
                </div>
              </div>

              <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white">Employee Performance</h3>
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">Top {mockEmployees.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {mockEmployees.map((emp) => (
                    <div key={emp.id} className="flex flex-col p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/5">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedEmployeeId(expandedEmployeeId === emp.id ? null : emp.id)}>
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-bg-surface border border-white/10 flex items-center justify-center text-text-muted overflow-hidden">
                              <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                            </div>
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-bg-card",
                              emp.status === 'active' ? "bg-success" : emp.status === 'break' ? "bg-warning" : "bg-text-muted"
                            )} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{emp.name}</div>
                            <div className="text-xs text-text-muted">{emp.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                            <div className="text-sm font-medium text-white font-mono">${emp.dailySales.toLocaleString()}</div>
                            <div className="text-[10px] text-text-muted uppercase tracking-wider">Today</div>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }}
                            className="text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 px-2 py-1 rounded transition-colors"
                          >
                            Profile
                          </button>
                          <button className="text-text-muted hover:text-white p-1">
                            {expandedEmployeeId === emp.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedEmployeeId === emp.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 pb-2 mt-2 border-t border-white/5">
                              <div className="text-xs text-text-muted mb-2">7-Day Productivity Trend</div>
                              <div className="h-24 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={emp.trend} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                                    <XAxis dataKey="day" stroke="#94A3B8" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip 
                                      contentStyle={{ backgroundColor: '#111827', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                                      itemStyle={{ color: '#F8FAFC' }}
                                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']}
                                      labelStyle={{ display: 'none' }}
                                    />
                                    <Line type="monotone" dataKey="sales" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 3, fill: '#111827', stroke: 'var(--color-primary)', strokeWidth: 2 }} />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                  {selectedBranch.employees > 8 && (
                    <button className="w-full py-3 text-sm text-primary hover:text-white font-medium transition-colors">
                      View all {selectedBranch.employees} employees
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden mt-6">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Branch Inventory</h3>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-md">{branchStock.length} items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-text-muted bg-bg-surface/50 border-b border-white/5 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-medium">Product / SKU</th>
                      <th className="px-6 py-4 font-medium">Unit Price</th>
                      <th className="px-6 py-4 font-medium">Quantity</th>
                      <th className="px-6 py-4 font-medium">Total Value</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {branchStock.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                          No inventory items found for this branch.
                        </td>
                      </tr>
                    ) : (
                      branchStock.map(item => {
                        const status = item.quantity === 0 ? 'critical' : item.quantity <= item.minQuantity ? 'low' : 'optimal';
                        const totalValue = item.price * item.quantity;
                        return (
                          <tr key={item.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-white">{item.product}</div>
                              <div className="text-xs text-text-muted mt-0.5">{item.sku} &bull; {item.barcode}</div>
                            </td>
                            <td className="px-6 py-4 font-mono text-white">${item.price.toLocaleString()}</td>
                            <td className="px-6 py-4 font-mono">
                              <div className="flex items-baseline gap-2">
                                <span className={cn(
                                  "font-medium",
                                  status === 'critical' ? 'text-danger' : status === 'low' ? 'text-warning' : 'text-white'
                                )}>{item.quantity}</span>
                                <span className="text-xs text-text-muted">/ Min {item.minQuantity}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono font-medium text-white">${totalValue.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2.5 py-1 rounded-full text-xs font-medium capitalize flex items-center w-fit gap-1.5",
                                status === 'optimal' && "bg-success/10 text-success",
                                status === 'low' && "bg-warning/10 text-warning",
                                status === 'critical' && "bg-danger/10 text-danger"
                              )}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Floating Action Button for Bulk PDF Export */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => generateBulkPDFReport(mockEmployees, selectedBranch)}
              className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-105 transition-all group"
              title="Bulk Export Employee PDF"
            >
              <Download className="w-6 h-6" />
              <span className="absolute right-full mr-4 bg-bg-card border border-white/10 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                Export All Reports
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Branch Performance</h1>
                <p className="text-text-muted">Monitor all locations in real-time.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-bg-surface border border-white/10 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Search branches..." 
                    className="bg-transparent border-none outline-none text-sm text-white w-40"
                  />
                </div>
                <button className="flex items-center gap-2 bg-bg-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockBranches.map((branch, idx) => (
                <motion.div
                  key={branch.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedBranch(branch)}
                  className="bg-bg-card border border-white/5 rounded-2xl p-6 relative group hover:border-white/20 transition-all cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-primary/5"
                >
                  <button className="absolute top-4 right-4 text-text-muted hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-xl bg-bg-surface flex items-center justify-center font-mono text-xs text-text-muted border border-white/5">
                        {branch.code.split('-')[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white tracking-tight">{branch.name}</h3>
                        <p className="text-sm text-text-muted">Manager: {branch.manager}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-bg-surface/50 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-text-muted mb-1">Revenue</p>
                      <p className="text-lg font-semibold text-white font-mono">${(branch.revenue / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="bg-bg-surface/50 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-text-muted mb-1">Daily Sales</p>
                      <p className="text-lg font-semibold text-white font-mono">${(branch.dailySales / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="bg-bg-surface/50 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-text-muted mb-1">Profit</p>
                      <p className="text-lg font-semibold text-success font-mono">${(branch.profit / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="bg-bg-surface/50 rounded-xl p-3 border border-white/5">
                      <p className="text-xs text-text-muted mb-1">Employees</p>
                      <p className="text-lg font-semibold text-white font-mono">{branch.employees}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        branch.growth > 0 ? "text-success" : "text-danger"
                      )}>
                        {branch.growth > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(branch.growth)}%
                      </span>
                      <span className="text-xs text-text-muted">vs last month</span>
                    </div>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium capitalize",
                      branch.status === 'excellent' && "bg-success/10 text-success border border-success/20",
                      branch.status === 'good' && "bg-primary/10 text-primary border border-primary/20",
                      branch.status === 'warning' && "bg-warning/10 text-warning border border-warning/20"
                    )}>
                      {branch.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
