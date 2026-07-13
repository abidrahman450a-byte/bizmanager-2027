const fs = require('fs');

let content = fs.readFileSync('src/types.ts', 'utf8');

const oldBranch = `export interface Branch {
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
}`;

const newBranch = `export interface Branch {
  id: string;
  name: string;
  code: string;
  image?: string;
  color?: string;
  revenue: number;
  profit: number;
  growth: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  manager: string;
  employees: number;
  dailySales: number;
  weeklyHistory?: { day: string; revenue: number }[];
}`;

content = content.replace(oldBranch, newBranch);

fs.writeFileSync('src/types.ts', content);
