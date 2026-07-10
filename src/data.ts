import { Branch, KPI, Alert, StockItem, Debt } from './types';

export const mockKPIs: KPI[] = [
  { title: 'Business Health', value: 92, change: 2.4, trend: 'up', format: 'percentage' },
  { title: 'Revenue Today', value: 145230, change: 12.5, trend: 'up', format: 'currency' },
  { title: 'Profit Today', value: 42100, change: -1.2, trend: 'down', format: 'currency' },
  { title: 'Cash Balance', value: 1250000, change: 5.1, trend: 'up', format: 'currency' },
];

const generateWeeklyHistory = (baseRevenue: number, growth: number) => {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    return {
      day: day.toLocaleDateString('en-US', { weekday: 'short' }),
      revenue: Math.floor(baseRevenue * (1 + (growth / 100) * (i / 7)) + (Math.random() * 5000 - 2500))
    };
  });
};

export const mockBranches: Branch[] = [
  { id: '1', name: 'Downtown HQ', code: 'HQ-01', revenue: 450000, profit: 120000, growth: 15.2, status: 'excellent', manager: 'Sarah Jenkins', employees: 42, dailySales: 18500, weeklyHistory: generateWeeklyHistory(450000 / 30, 15.2) },
  { id: '2', name: 'Westside Plaza', code: 'WP-02', revenue: 280000, profit: 75000, growth: 8.4, status: 'good', manager: 'Michael Chen', employees: 28, dailySales: 9200, weeklyHistory: generateWeeklyHistory(280000 / 30, 8.4) },
  { id: '3', name: 'North Hills', code: 'NH-03', revenue: 150000, profit: 20000, growth: -5.2, status: 'warning', manager: 'David Rodriguez', employees: 15, dailySales: 4100, weeklyHistory: generateWeeklyHistory(150000 / 30, -5.2) },
  { id: '4', name: 'Airport Hub', code: 'AH-04', revenue: 320000, profit: 90000, growth: 12.1, status: 'excellent', manager: 'Emma Watson', employees: 34, dailySales: 11500, weeklyHistory: generateWeeklyHistory(320000 / 30, 12.1) },
];

export const mockAlerts: Alert[] = [
  { id: '1', type: 'low_stock', message: 'MacBook Pro M3 stock critically low at Downtown HQ', timestamp: '10 mins ago', read: false },
  { id: '2', type: 'profit_drop', message: 'Unusual profit margin drop detected in North Hills', timestamp: '1 hour ago', read: false },
  { id: '3', type: 'system', message: 'End of day batch processing completed successfully', timestamp: '2 hours ago', read: true },
];

export const mockStock: StockItem[] = [
  { id: '1', product: 'MacBook Pro M3 Max 36GB', sku: 'MBP-M3M-36', barcode: '194253184920', quantity: 2, minQuantity: 5, branch: 'Downtown HQ', price: 3499 },
  { id: '2', product: 'iPhone 15 Pro Max 256GB', sku: 'IP15PM-256-TI', barcode: '194253123456', quantity: 45, minQuantity: 15, branch: 'Westside Plaza', price: 1199 },
  { id: '3', product: 'iPad Pro 12.9" M2', sku: 'IPP-129-M2-256', barcode: '194253789012', quantity: 0, minQuantity: 10, branch: 'North Hills', price: 1099 },
  { id: '4', product: 'AirPods Pro 2nd Gen', sku: 'APP-2G', barcode: '194253456789', quantity: 12, minQuantity: 20, branch: 'Downtown HQ', price: 249 },
  { id: '5', product: 'Magic Keyboard Folio', sku: 'MKF-129', barcode: '194253987654', quantity: 8, minQuantity: 5, branch: 'Airport Hub', price: 299 },
];

export const mockDebts: Debt[] = [
  { id: '1', customerName: 'TechSolutions Inc.', amount: 15400, dueDate: '2023-11-15', status: 'overdue', branch: 'Downtown HQ', phone: '+1 555-0100' },
  { id: '2', customerName: 'Local Education Dept', amount: 42000, dueDate: '2023-12-01', status: 'pending', branch: 'Westside Plaza', phone: '+1 555-0199' },
  { id: '3', customerName: 'Sarah Williams', amount: 850, dueDate: '2023-11-20', status: 'pending', branch: 'North Hills', phone: '+1 555-0211' },
  { id: '4', customerName: 'Marcus Johnson', amount: 1200, dueDate: '2023-10-30', status: 'overdue', branch: 'Airport Hub', phone: '+1 555-0344' },
];

export const forecastData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);
  const baseRevenue = 14000 + (i * 150) + (Math.sin(i / 2) * 2000);
  const baseProfit = baseRevenue * 0.3 + (Math.random() * 500);
  return {
    name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    predictedRevenue: Math.floor(baseRevenue),
    revenueUpper: Math.floor(baseRevenue + (i * 100) + 1000),
    revenueLower: Math.floor(baseRevenue - (i * 100) - 1000),
    predictedProfit: Math.floor(baseProfit),
  };
});

export const revenueData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    revenue: Math.floor(Math.random() * 5000) + 10000,
    profit: Math.floor(Math.random() * 2000) + 3000,
  };
});

export const businessHealthData = [
  { subject: 'Growth', A: 120, fullMark: 150 },
  { subject: 'Revenue', A: 98, fullMark: 150 },
  { subject: 'Profit', A: 86, fullMark: 150 },
  { subject: 'Cash Flow', A: 99, fullMark: 150 },
  { subject: 'Employees', A: 85, fullMark: 150 },
  { subject: 'Inventory', A: 65, fullMark: 150 },
  { subject: 'Branches', A: 85, fullMark: 150 },
  { subject: 'Customers', A: 110, fullMark: 150 },
];

export const topProductsData = [
  { name: 'Product A', value: 245780, percentage: 33 },
  { name: 'Product B', value: 185420, percentage: 25 },
  { name: 'Product C', value: 142560, percentage: 19 },
  { name: 'Product D', value: 98250, percentage: 13 },
  { name: 'Others', value: 70530, percentage: 10 },
];
