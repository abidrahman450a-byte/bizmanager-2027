import { useState } from 'react';
import { mockBranches } from '../data';
import { FileText, Download, Calendar, Filter, Building2, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import { Branch } from '../types';

export function Reports() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');

  const generatePDFReport = (branch?: Branch) => {
    const doc = new jsPDF();
    const primaryColor = [29, 78, 216]; // Blue-700
    
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("BizManager", 20, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(branch ? `${branch.name} Performance Report` : "Global Organization Report", 20, 32);
    
    doc.setFontSize(9);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 25);
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 20, 55);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    if (branch) {
      doc.text(`Revenue: $${branch.revenue.toLocaleString()}`, 20, 70);
      doc.text(`Profit: $${branch.profit.toLocaleString()}`, 20, 80);
      doc.text(`Employees: ${branch.employees}`, 20, 90);
      doc.text(`Growth: ${branch.growth}%`, 20, 100);
    } else {
      const totalRev = mockBranches.reduce((a, b) => a + b.revenue, 0);
      doc.text(`Total Organization Revenue: $${totalRev.toLocaleString()}`, 20, 70);
      doc.text(`Active Branches: ${mockBranches.length}`, 20, 80);
    }
    
    doc.save(`${branch ? branch.name.replace(/\s+/g, '_') : 'Global'}_Report.pdf`);
  };

  const displayBranches = selectedBranchId === 'all' 
    ? mockBranches 
    : mockBranches.filter(b => b.id === selectedBranchId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-main tracking-tight">Reports & Analytics</h2>
          <p className="text-text-muted text-sm mt-1">Generate and export performance reports per branch</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => {
              if (selectedBranchId === 'all') {
                generatePDFReport();
              } else {
                generatePDFReport(displayBranches[0]);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">
              {selectedBranchId === 'all' ? 'Export Global Report' : 'Export Branch Report'}
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
          <Building2 className="w-4 h-4 text-gray-500" />
          <select 
            className="bg-transparent border-none text-sm font-medium text-gray-900 focus:ring-0 cursor-pointer outline-none"
            value={selectedBranchId}
            onChange={(e) => setSelectedBranchId(e.target.value)}
          >
            <option value="all">All Branches</option>
            {mockBranches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 font-medium">
          <Calendar className="w-4 h-4" /> This Month
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayBranches.map(branch => (
          <div key={branch.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{branch.name}</h3>
                  <div className="text-sm text-gray-500">{branch.code}</div>
                </div>
                <button 
                  onClick={() => generatePDFReport(branch)}
                  className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <FileText className="w-4 h-4" /> PDF
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Gross Revenue</span>
                  <span className="font-bold text-gray-900">${branch.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Net Profit</span>
                  <span className="font-bold text-gray-900">${branch.profit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Growth Rate</span>
                  <span className={`font-bold ${branch.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {branch.growth >= 0 ? '+' : ''}{branch.growth}%
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
              <span>Managed by: <span className="font-medium text-gray-900">{branch.manager}</span></span>
              <span>{branch.employees} Staff</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
