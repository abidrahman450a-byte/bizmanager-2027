with open('src/views/Dashboard.tsx', 'r') as f:
    content = f.read()

import re

# Remove mock data arrays
content = re.sub(r'const lineData = \[.*?\];', '', content, flags=re.DOTALL)
content = re.sub(r'const pieData = \[.*?\];', '', content, flags=re.DOTALL)
content = re.sub(r'const barData = \[.*?\];', '', content, flags=re.DOTALL)
content = re.sub(r'const recentOrders = \[.*?\];', '', content, flags=re.DOTALL)

content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { supabase } from '../lib/supabase';")

dashboard_func = """export function Dashboard() {
  const [insightIndex, setInsightIndex] = useState(0);
  const [lineData, setLineData] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [barData, setBarData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue: 0, profit: 0, costs: 0, customers: 0 });

  const insights = [
    "AI Analysis: Sales for 'Electronics' category are projected to increase by 15% next month based on seasonal trends.",
    "Optimization: Consider reducing inventory for 'Dharka' at Branch 2 to minimize storage costs.",
    "Performance: Overall profit margin is up 4.2% compared to the previous quarter."
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data: sales } = await supabase.from('sales').select('*, customers(name)');
      const { data: saleItems } = await supabase.from('sale_items').select('*');
      
      if (sales) {
        setRecentOrders(sales.slice(0, 5).map(s => ({
          id: s.invoice_number,
          customer: s.customers?.name || 'Walk-in Customer',
          amount: `$${s.total_amount}`,
          status: s.status === 'completed' ? 'PAID' : 'PENDING',
          color: s.status === 'completed' ? 'emerald' : 'orange'
        })));
        
        let totalRev = 0;
        sales.forEach(s => totalRev += Number(s.total_amount));
        
        let totalProfit = 0;
        if (saleItems) {
           saleItems.forEach(si => totalProfit += Number(si.profit));
        }
        
        setStats({
          revenue: totalRev,
          profit: totalProfit,
          costs: totalRev - totalProfit,
          customers: sales.length
        });
      }
      
      // Setup some default charts since we might not have enough history data
      setLineData([
        { name: 'Jan', sales: 2400, profit: 4000 },
        { name: 'Feb', sales: 1398, profit: 3000 },
        { name: 'Mar', sales: 9800, profit: 2000 },
        { name: 'Apr', sales: 3908, profit: 2780 },
        { name: 'May', sales: 4800, profit: 1890 },
        { name: 'Jun', sales: 3800, profit: 2390 },
        { name: 'Jul', sales: 4300, profit: 3490 },
      ]);
      setPieData([
        { name: 'Cunto', value: 40, color: '#0f172a' },
        { name: 'Cabitaan', value: 20, color: '#334155' },
        { name: 'Electronics', value: 15, color: '#64748b' },
        { name: 'Dharka', value: 15, color: '#94a3b8' },
        { name: 'Kale', value: 10, color: '#cbd5e1' },
      ]);
      setBarData([
        { name: 'Jan', income: 400, expenses: 200 },
        { name: 'Feb', income: 450, expenses: 210 },
        { name: 'Mar', income: 420, expenses: 250 },
        { name: 'Apr', income: 600, expenses: 280 },
        { name: 'May', income: 720, expenses: 220 },
        { name: 'Jun', income: 500, expenses: 200 },
        { name: 'Jul', income: 450, expenses: 180 },
      ]);
    };

    fetchData();
    
    const sub1 = supabase.channel('sales').on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, fetchData).subscribe();
    const sub2 = supabase.channel('sale_items').on('postgres_changes', { event: '*', schema: 'public', table: 'sale_items' }, fetchData).subscribe();

    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => {
      clearInterval(timer);
      sub1.unsubscribe();
      sub2.unsubscribe();
    };
  }, []);
"""

idx1 = content.find("export function Dashboard() {")
idx2 = content.find("  return (", idx1)

if idx1 != -1 and idx2 != -1:
    content = content[:idx1] + dashboard_func + content[idx2:]

# Replace stat hardcoded values
content = content.replace('value="$128,500"', 'value={`$${stats.revenue.toLocaleString()}`}')
content = content.replace('value="$42,200"', 'value={`$${stats.profit.toLocaleString()}`}')
content = content.replace('value="$28,300"', 'value={`$${stats.costs.toLocaleString()}`}')
content = content.replace('value="1,204"', 'value={`${stats.customers.toLocaleString()}`}')

with open('src/views/Dashboard.tsx', 'w') as f:
    f.write(content)
