with open('src/views/Branches.tsx', 'r') as f:
    content = f.read()

import re

# Remove MOCK_BRANCHES and INITIAL_INVENTORY
content = re.sub(r'const MOCK_BRANCHES = \[.*?\];\s*type BranchInventoryItem = \{.*?\};\s*const INITIAL_INVENTORY: BranchInventoryItem\[\] = \[.*?\];', '', content, flags=re.DOTALL)

# Also handle if type is separated
content = re.sub(r'const MOCK_BRANCHES = \[.*?\];', '', content, flags=re.DOTALL)
content = re.sub(r'type BranchInventoryItem = \{.*?\};', '', content, flags=re.DOTALL)
content = re.sub(r'const INITIAL_INVENTORY: BranchInventoryItem\[\] = \[.*?\];', '', content, flags=re.DOTALL)

content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { supabase } from '../lib/supabase';")

branches_func = """export function Branches({ currentTab = 'All Branches' }: { currentTab?: string }) {
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state for adding/registering
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', totalAdded: 0, expirationDate: '' });

  useEffect(() => {
    const fetchBranches = async () => {
      const { data, error } = await supabase.from('branches').select('*');
      if (data) {
        const formatted = data.map(b => ({
          id: b.id,
          name: b.name,
          location: b.location || 'Unknown',
          initialRevenue: 0,
          status: b.status === 'active' ? 'Optimal' : 'Review',
          itemsSold: 0,
          inventoryStock: 0,
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=800',
          description: 'Branch location'
        }));
        setBranches(formatted);
      }
    };

    const fetchInventory = async () => {
      // In real scenario we would fetch inventory joined with products
      const { data, error } = await supabase.from('inventory').select('*, products(*)');
      if (data) {
        const formatted = data.map(i => ({
          id: i.id,
          branchId: null, // Depending on schema, we need branch_id, but here it's simple
          name: i.products?.name || 'Unknown Item',
          totalAdded: i.quantity,
          sold: 0,
          damaged: 0,
          expirationDate: 'N/A'
        }));
        setInventory(formatted);
      }
    };

    fetchBranches();
    fetchInventory();

    const branchesSub = supabase.channel('branches_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'branches' }, fetchBranches).subscribe();
    const invSub = supabase.channel('inventory_changes').on('postgres_changes', { event: '*', schema: 'public', table: 'inventory' }, fetchInventory).subscribe();

    return () => {
      branchesSub.unsubscribe();
      invSub.unsubscribe();
    };
  }, []);

  if (currentTab !== 'All Branches') {"""

idx1 = content.find("export function Branches({ currentTab = 'All Branches' }: { currentTab?: string }) {")
idx2 = content.find("  if (currentTab !== 'All Branches') {", idx1)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + branches_func + content[idx2 + len("  if (currentTab !== 'All Branches') {"):]

content = content.replace('MOCK_BRANCHES.map', 'branches.map')
content = content.replace('typeof MOCK_BRANCHES[0]', 'any')

with open('src/views/Branches.tsx', 'w') as f:
    f.write(content)
