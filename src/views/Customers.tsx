import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, User, Phone, Mail, MapPin, DollarSign, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Customers({ currentTab = 'All Customers' }: { currentTab?: string }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // mock data
  const customers = [
    { id: '1', name: 'Ahmed Ali', phone: '+252 61 2345678', email: 'ahmed@example.com', address: 'Mogadishu', totalSpent: 1250.00, status: 'active' },
    { id: '2', name: 'Aisha Jama', phone: '+252 61 8765432', email: 'aisha@example.com', address: 'Hargeisa', totalSpent: 890.50, status: 'active' },
    { id: '3', name: 'Mohamed Hassan', phone: '+252 61 1122334', email: 'mohamed@example.com', address: 'Bosaso', totalSpent: 450.00, status: 'inactive' },
    { id: '4', name: 'Fatima Abdi', phone: '+252 61 5566778', email: 'fatima@example.com', address: 'Kismayo', totalSpent: 3200.00, status: 'active' },
  ];

  if (currentTab !== 'All Customers') {
    return (
      <div className="flex flex-col gap-6 min-h-full text-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-display text-slate-900">{currentTab}</h2>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{currentTab} Module</h3>
            <p className="text-slate-500 max-w-md mx-auto">This module is currently under development. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {customers.map((customer, index) => (
          <motion.div 
            key={customer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-lg font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{customer.name}</h3>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium inline-block mt-1",
                    customer.status === 'active' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  )}>
                    {customer.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                {customer.address}
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Total Spent</p>
                <p className="font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
