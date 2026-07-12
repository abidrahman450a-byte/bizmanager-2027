import { Branch, KPI, Alert, StockItem, Debt } from './types';

export const mockKPIs: KPI[] = [
  { title: 'Business Health', value: 92, change: 2.4, trend: 'up', format: 'percentage' },
  { title: 'Revenue Today', value: 145230, change: 12.5, trend: 'up', format: 'currency' },
  { title: 'Profit Today', value: 43100, change: -1.2, trend: 'down', format: 'currency' },
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

export const mockInventoryOwner = [
  { id: '1', name: 'MacBook Pro M3 Max 36GB', category: 'Laptops', initialQty: 50, soldQty: 48, remainingQty: 2, unitCost: 2800, sellPrice: 3499, totalValue: 5600, soldValue: 167952, profit: 33552, trend: [20, 25, 22, 30, 45, 40, 48] },
  { id: '2', name: 'iPhone 15 Pro Max 256GB', category: 'Phones', initialQty: 200, soldQty: 155, remainingQty: 45, unitCost: 900, sellPrice: 1199, totalValue: 40500, soldValue: 185845, profit: 46345, trend: [50, 70, 90, 110, 130, 145, 155] },
  { id: '3', name: 'iPad Pro 12.9" M2', category: 'Tablets', initialQty: 100, soldQty: 100, remainingQty: 0, unitCost: 850, sellPrice: 1099, totalValue: 0, soldValue: 109900, profit: 24900, trend: [10, 25, 45, 60, 80, 95, 100] },
  { id: '4', name: 'AirPods Pro 2nd Gen', category: 'Audio', initialQty: 300, soldQty: 288, remainingQty: 12, unitCost: 150, sellPrice: 249, totalValue: 1800, soldValue: 71712, profit: 28512, trend: [40, 80, 120, 180, 220, 260, 288] },
];

export const mockCashiers = [
  { id: 'c1', name: 'Amina Ali', branch: 'Downtown HQ', todaySales: 4500, weeklySales: 28000, transactions: 142, performance: 'excellent', salesTrend: [{day: 'Mon', sales: 4000}, {day: 'Tue', sales: 4200}, {day: 'Wed', sales: 3800}, {day: 'Thu', sales: 4800}, {day: 'Fri', sales: 5100}, {day: 'Sat', sales: 6100}, {day: 'Sun', sales: 4500}], hourlySales: [{hour: '8AM', sales: 200}, {hour: '10AM', sales: 500}, {hour: '12PM', sales: 1200}, {hour: '2PM', sales: 800}, {hour: '4PM', sales: 1500}, {hour: '6PM', sales: 300}] },
  { id: 'c2', name: 'Omar Hassan', branch: 'Westside Plaza', todaySales: 3200, weeklySales: 19500, transactions: 98, performance: 'good', salesTrend: [{day: 'Mon', sales: 2500}, {day: 'Tue', sales: 2800}, {day: 'Wed', sales: 3100}, {day: 'Thu', sales: 2900}, {day: 'Fri', sales: 3500}, {day: 'Sat', sales: 4700}, {day: 'Sun', sales: 3200}], hourlySales: [{hour: '8AM', sales: 150}, {hour: '10AM', sales: 400}, {hour: '12PM', sales: 800}, {hour: '2PM', sales: 600}, {hour: '4PM', sales: 1000}, {hour: '6PM', sales: 250}] },
  { id: 'c3', name: 'Fadumo Abdi', branch: 'Downtown HQ', todaySales: 4100, weeklySales: 26500, transactions: 130, performance: 'excellent', salesTrend: [{day: 'Mon', sales: 3800}, {day: 'Tue', sales: 3900}, {day: 'Wed', sales: 4100}, {day: 'Thu', sales: 4000}, {day: 'Fri', sales: 4500}, {day: 'Sat', sales: 5500}, {day: 'Sun', sales: 4100}], hourlySales: [{hour: '8AM', sales: 300}, {hour: '10AM', sales: 600}, {hour: '12PM', sales: 1000}, {hour: '2PM', sales: 700}, {hour: '4PM', sales: 1100}, {hour: '6PM', sales: 400}] },
  { id: 'c4', name: 'Ahmed Jama', branch: 'North Hills', todaySales: 1800, weeklySales: 11200, transactions: 65, performance: 'warning', salesTrend: [{day: 'Mon', sales: 1500}, {day: 'Tue', sales: 1600}, {day: 'Wed', sales: 1400}, {day: 'Thu', sales: 1800}, {day: 'Fri', sales: 2000}, {day: 'Sat', sales: 2900}, {day: 'Sun', sales: 1800}], hourlySales: [{hour: '8AM', sales: 100}, {hour: '10AM', sales: 250}, {hour: '12PM', sales: 400}, {hour: '2PM', sales: 300}, {hour: '4PM', sales: 600}, {hour: '6PM', sales: 150}] },
];
/*
  { id: 'c1', name: 'Amina Ali', branch: 'Downtown HQ', todaySales: 4500, weeklySales: 28000, transactions: 142, performance: 'excellent' },
  { id: 'c2', name: 'Omar Hassan', branch: 'Westside Plaza', todaySales: 3200, weeklySales: 19500, transactions: 98, performance: 'good' },
  { id: 'c3', name: 'Fadumo Abdi', branch: 'Downtown HQ', todaySales: 4100, weeklySales: 26500, transactions: 130, performance: 'excellent' },
  { id: 'c4', name: 'Ahmed Jama', branch: 'North Hills', todaySales: 1800, weeklySales: 11200, transactions: 65, performance: 'warning' },
];*/

export const forecastData = [
  { month: 'Jan', actual: 400000, forecast: 380000, previousYear: 320000 },
  { month: 'Feb', actual: 420000, forecast: 410000, previousYear: 340000 },
  { month: 'Mar', actual: 450000, forecast: 430000, previousYear: 350000 },
  { month: 'Apr', actual: 480000, forecast: 460000, previousYear: 380000 },
  { month: 'May', actual: 510000, forecast: 490000, previousYear: 400000 },
  { month: 'Jun', actual: null, forecast: 530000, previousYear: 420000 },
  { month: 'Jul', actual: null, forecast: 560000, previousYear: 450000 },
];

export const mockDebts: Debt[] = [
  { id: '1', customerName: 'Ahmed Jama', amount: 1500, dueDate: '2026-07-15', status: 'pending', branch: 'Downtown HQ', phone: '+252 61 2345678' },
  { id: '2', customerName: 'Amina Omar', amount: 350, dueDate: '2026-07-10', status: 'overdue', branch: 'Westside Plaza', phone: '+252 61 8765432' },
  { id: '3', customerName: 'Hussein Ali', amount: 4200, dueDate: '2026-07-20', status: 'pending', branch: 'Downtown HQ', phone: '+252 61 1122334' },
];

export const revenueData = [
  { name: 'Mon', value: 12000, percentage: 12000 },
  { name: 'Tue', value: 15000, percentage: 15000 },
  { name: 'Wed', value: 18000, percentage: 18000 },
  { name: 'Thu', value: 14000, percentage: 14000 },
  { name: 'Fri', value: 22000, percentage: 22000 },
  { name: 'Sat', value: 28000, percentage: 28000 },
  { name: 'Sun', value: 25000, percentage: 25000 },
];

export const topProductsData = [
  { name: 'MacBook Pro', value: 45, percentage: 45 },
  { name: 'iPhone 15', value: 30, percentage: 30 },
  { name: 'AirPods Pro', value: 15, percentage: 15 },
  { name: 'iPad Pro', value: 10, percentage: 10 },
];

export const businessHealthData = [
  { month: 'Jan', index: 82 },
  { month: 'Feb', index: 85 },
  { month: 'Mar', index: 84 },
  { month: 'Apr', index: 88 },
  { month: 'May', index: 90 },
  { month: 'Jun', index: 92 },
];
