import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Users, Package, ShoppingCart, ArrowRight, ArrowLeft, Plus, Search, AlertTriangle, Calendar, PackageMinus, Edit, Trash2 } from 'lucide-react';

const MOCK_BRANCHES = [
  { 
    id: 1, 
    name: 'Downtown Hub', 
    location: 'New York, NY', 
    initialRevenue: 45200, 
    status: 'Optimal',
    itemsSold: 1245,
    inventoryStock: 8500,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=800',
    description: 'Our flagship store located in the heart of downtown, offering the full range of premium products and in-person consultations.'
  },
  { 
    id: 2, 
    name: 'Westside Branch', 
    location: 'Los Angeles, CA', 
    initialRevenue: 38900, 
    status: 'Optimal',
    itemsSold: 980,
    inventoryStock: 6200,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&h=800',
    description: 'A modern, airy space serving the West coast with high-tech gear and accessories.'
  },
  { 
    id: 3, 
    name: 'North Metro', 
    location: 'Chicago, IL', 
    initialRevenue: 29500, 
    status: 'Review',
    itemsSold: 654,
    inventoryStock: 4100,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200&h=800',
    description: 'Serving the midwest region, focusing on B2B office equipment and large scale orders.'
  },
  { 
    id: 4, 
    name: 'Eastside Store', 
    location: 'Miami, FL', 
    initialRevenue: 31200, 
    status: 'Optimal',
    itemsSold: 812,
    inventoryStock: 5400,
    image: 'https://images.unsplash.com/photo-1577416412292-747c6607f055?auto=format&fit=crop&q=80&w=1200&h=800',
    description: 'Our newest location, bringing top-tier consumer electronics to the sunny southeast.'
  },
];

type BranchInventoryItem = {
  id: string;
  branchId: number;
  name: string;
  totalAdded: number;
  sold: number;
  damaged: number;
  expirationDate: string;
};

const INITIAL_INVENTORY: BranchInventoryItem[] = [
  { id: '1', branchId: 1, name: 'Wireless Headphones Pro', totalAdded: 500, sold: 150, damaged: 5, expirationDate: '2027-12-31' },
  { id: '2', branchId: 1, name: 'Smartwatch Series 5', totalAdded: 300, sold: 120, damaged: 2, expirationDate: '2026-10-15' },
  { id: '3', branchId: 2, name: 'Ergonomic Chair', totalAdded: 150, sold: 40, damaged: 1, expirationDate: 'N/A' },
  { id: '4', branchId: 1, name: 'Organic Coffee Beans', totalAdded: 1000, sold: 800, damaged: 10, expirationDate: '2026-08-20' },
];

export function Branches({ currentTab = 'All Branches' }: { currentTab?: string }) {
  const [selectedBranch, setSelectedBranch] = useState<typeof MOCK_BRANCHES[0] | null>(null);
  const [inventory, setInventory] = useState<BranchInventoryItem[]>(INITIAL_INVENTORY);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state for adding/registering
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', totalAdded: 0, expirationDate: '' });

  if (currentTab !== 'All Branches') {
    return (
      <div className="flex flex-col gap-6 min-h-full text-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold font-display text-slate-900">{currentTab}</h2>
        </div>
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{currentTab} Module</h3>
            <p className="text-slate-500 max-w-md mx-auto">This module is currently under development. Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBranch && newItem.name) {
      setInventory([
        ...inventory, 
        { 
          id: Date.now().toString(), 
          branchId: selectedBranch.id, 
          name: newItem.name, 
          totalAdded: Number(newItem.totalAdded), 
          sold: 0, 
          damaged: 0, 
          expirationDate: newItem.expirationDate || 'N/A' 
        }
      ]);
      setNewItem({ name: '', totalAdded: 0, expirationDate: '' });
      setIsAddModalOpen(false);
    }
  };

  const registerSale = (id: string) => {
    setInventory(inventory.map(item => item.id === id && (item.totalAdded - item.sold - item.damaged > 0) ? { ...item, sold: item.sold + 1 } : item));
  };

  const registerDamage = (id: string) => {
    setInventory(inventory.map(item => item.id === id && (item.totalAdded - item.sold - item.damaged > 0) ? { ...item, damaged: item.damaged + 1 } : item));
  };

  if (selectedBranch) {
    const branchInventory = inventory.filter(item => item.branchId === selectedBranch.id)
                                     .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
      <div className="w-full font-sans pb-16">
        <button 
          onClick={() => setSelectedBranch(null)}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back to all locations
        </button>

        {/* Hero Section */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-md">
          <img 
            src={selectedBranch.image} 
            alt={selectedBranch.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-14 w-full text-white">
            <div className="flex items-center gap-2 text-blue-300 mb-4 font-bold tracking-widest text-sm uppercase">
              <MapPin className="w-5 h-5" /> {selectedBranch.location}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{selectedBranch.name}</h1>
          </div>
        </div>

        {/* Inventory Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Branch Inventory</h2>
              <p className="text-slate-500">Track and manage items, sales, damages, and expirations.</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
                />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-sm shadow-blue-600/20 shrink-0"
              >
                <Plus className="w-5 h-5" /> Add Item
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">Total Added</th>
                    <th className="px-6 py-4">Sold (Out)</th>
                    <th className="px-6 py-4">Damaged</th>
                    <th className="px-6 py-4">Remaining</th>
                    <th className="px-6 py-4">Expiration Date</th>
                    <th className="px-6 py-4">Cashier Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {branchInventory.length > 0 ? (
                    branchInventory.map((item) => {
                      const remaining = item.totalAdded - item.sold - item.damaged;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900">{item.name}</td>
                          <td className="px-6 py-4 font-medium">{item.totalAdded}</td>
                          <td className="px-6 py-4 text-blue-600 font-medium">{item.sold}</td>
                          <td className="px-6 py-4 text-red-500 font-medium">{item.damaged}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${remaining > 20 ? 'bg-emerald-100 text-emerald-700' : remaining > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                              {remaining} In Stock
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {item.expirationDate}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => registerSale(item.id)}
                                disabled={remaining <= 0}
                                className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" /> Sell
                              </button>
                              <button 
                                onClick={() => registerDamage(item.id)}
                                disabled={remaining <= 0}
                                className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                              >
                                <AlertTriangle className="w-3.5 h-3.5" /> Damaged
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                        <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-base font-medium text-slate-900">No items found</p>
                        <p className="text-sm">Add items to this branch to start tracking inventory.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Item Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Add New Item</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddItem} className="p-6 flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Item Name</label>
                  <input 
                    type="text" 
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="e.g. Wireless Mouse"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Initial Quantity (Total Added)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={newItem.totalAdded || ''}
                    onChange={(e) => setNewItem({...newItem, totalAdded: parseInt(e.target.value)})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expiration Date (Optional)</label>
                  <input 
                    type="date" 
                    value={newItem.expirationDate}
                    onChange={(e) => setNewItem({...newItem, expirationDate: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full font-sans pb-16">
      {/* Intro Section */}
      <div className="max-w-4xl mb-16 mt-4">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Our Locations</h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          Explore our network of premium retail branches across the country. 
          Each location is designed to provide the best customer experience and showcase our latest products in an inspiring environment.
        </p>
      </div>

      {/* Grid of Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {MOCK_BRANCHES.map((branch, idx) => (
          <motion.div 
            key={branch.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            onClick={() => setSelectedBranch(branch)}
            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 cursor-pointer flex flex-col h-full"
          >
            <div className="w-full h-72 relative overflow-hidden">
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
              <img 
                src={branch.image} 
                alt={branch.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute top-6 right-6 z-20">
                <span className={`px-4 py-2 text-sm font-bold rounded-full shadow-sm backdrop-blur-md ${branch.status === 'Optimal' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                  {branch.status}
                </span>
              </div>
            </div>
            
            <div className="p-10 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-blue-600 mb-4 text-sm font-bold tracking-widest uppercase">
                <MapPin className="w-5 h-5" /> {branch.location}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {branch.name}
              </h3>
              <p className="text-slate-600 text-lg line-clamp-2 mb-10 flex-1 leading-relaxed">
                {branch.description}
              </p>
              
              <div className="flex items-center justify-between text-blue-600 font-bold pt-8 border-t border-slate-100 mt-auto text-lg">
                <span>View Branch Details</span>
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
