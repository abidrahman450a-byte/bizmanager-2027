export type ViewState = 
  | 'dashboard' 
  | 'branches'
  | 'inventory'
  | 'customers'
  | 'employees'
  | 'finance'
  | 'reports'
  | 'expenses'
  | 'mobile_money'
  | 'settings';

export interface KPI {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  format?: 'currency' | 'percentage' | 'number';
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  revenue: number;
  profit: number;
  growth: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  manager: string;
  employees: number;
  dailySales: number;
  weeklyHistory?: { day: string; revenue: number }[];
}

export interface StockItem {
  id: string;
  product: string;
  sku: string;
  barcode: string;
  quantity: number;
  minQuantity: number;
  branch: string;
  price: number;
}

export interface Debt {
  id: string;
  customerName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  branch: string;
  phone: string;
}

export interface Alert {
  id: string;
  type: 'low_stock' | 'profit_drop' | 'revenue_drop' | 'system';
  message: string;
  timestamp: string;
  read: boolean;
}
