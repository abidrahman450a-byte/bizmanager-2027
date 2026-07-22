with open('src/views/Inventory.tsx', 'r') as f:
    content = f.read()

import re

# Replace MOCK_INVENTORY with empty array, we will use state
content = re.sub(r'const MOCK_INVENTORY = \[.*?\];', '', content, flags=re.DOTALL)

# Add useEffect and supabase import
content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { supabase } from '../lib/supabase';")

inventory_func = """export function Inventory({ currentTab = 'Stock Levels' }: { currentTab?: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      if (data) {
        const formatted = data.map(p => ({
          id: p.id,
          name: p.name,
          sku: p.sku || 'N/A',
          category: p.category || 'General',
          branch: 'Main HQ',
          stock: p.stock_quantity || 0,
          status: p.stock_quantity <= (p.low_stock_limit || 5) ? (p.stock_quantity === 0 ? 'Out of Stock' : 'Low Stock') : 'In Stock',
          price: p.selling_price || 0,
          lastRestocked: new Date(p.created_at).toLocaleDateString(),
          image: p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
          trend: [10, 20, 15, 25, 30, 45, 50],
          totalReceived: 500,
          totalSold: 355,
          expiringSoon: 0,
          revenue: (p.selling_price || 0) * 355,
          salesData: [
            { date: 'Mon', sold: 45 }, { date: 'Tue', sold: 52 }, { date: 'Wed', sold: 38 },
            { date: 'Thu', sold: 65 }, { date: 'Fri', sold: 48 }, { date: 'Sat', sold: 75 }, { date: 'Sun', sold: 32 }
          ],
          stockHistory: [
            { month: 'Jan', stock: 400 }, { month: 'Feb', stock: 350 }, { month: 'Mar', stock: 280 },
            { month: 'Apr', stock: 420 }, { month: 'May', stock: 210 }, { month: 'Jun', stock: 145 }
          ]
        }));
        setInventoryItems(formatted);
      }
    };

    fetchProducts();

    const subscription = supabase
      .channel('products_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, fetchProducts)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (currentTab !== 'Stock Levels') {"""

idx1 = content.find("export function Inventory({ currentTab = 'Stock Levels' }: { currentTab?: string }) {")
idx2 = content.find("  if (currentTab !== 'Stock Levels') {", idx1)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + inventory_func + content[idx2 + len("  if (currentTab !== 'Stock Levels') {"):]

content = content.replace('MOCK_INVENTORY.filter', 'inventoryItems.filter')
content = content.replace('typeof MOCK_INVENTORY[0]', 'any')

with open('src/views/Inventory.tsx', 'w') as f:
    f.write(content)
