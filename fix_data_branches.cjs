const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

const oldMockBranches = `export const mockBranches: Branch[] = [
  { id: '1', name: 'Downtown HQ', code: 'HQ-01', revenue: 450000, profit: 120000, growth: 15.2, status: 'excellent', manager: 'Sarah Jenkins', employees: 42, dailySales: 18500, weeklyHistory: generateWeeklyHistory(450000 / 30, 15.2) },
  { id: '2', name: 'Westside Plaza', code: 'WP-02', revenue: 280000, profit: 75000, growth: 8.4, status: 'good', manager: 'Michael Chen', employees: 28, dailySales: 9200, weeklyHistory: generateWeeklyHistory(280000 / 30, 8.4) },
  { id: '3', name: 'North Hills', code: 'NH-03', revenue: 150000, profit: 20000, growth: -5.2, status: 'warning', manager: 'David Rodriguez', employees: 15, dailySales: 4100, weeklyHistory: generateWeeklyHistory(150000 / 30, -5.2) },
  { id: '4', name: 'Airport Hub', code: 'AH-04', revenue: 320000, profit: 90000, growth: 12.1, status: 'excellent', manager: 'Emma Watson', employees: 34, dailySales: 11500, weeklyHistory: generateWeeklyHistory(320000 / 30, 12.1) },
];`;

const newMockBranches = `export const mockBranches: Branch[] = [
  { id: '1', name: 'Downtown HQ', code: 'HQ-01', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', color: 'from-blue-500 to-indigo-600', revenue: 450000, profit: 120000, growth: 15.2, status: 'excellent', manager: 'Sarah Jenkins', employees: 42, dailySales: 18500, weeklyHistory: generateWeeklyHistory(450000 / 30, 15.2) },
  { id: '2', name: 'Westside Plaza', code: 'WP-02', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop', color: 'from-emerald-400 to-teal-500', revenue: 280000, profit: 75000, growth: 8.4, status: 'good', manager: 'Michael Chen', employees: 28, dailySales: 9200, weeklyHistory: generateWeeklyHistory(280000 / 30, 8.4) },
  { id: '3', name: 'North Hills', code: 'NH-03', image: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?q=80&w=1000&auto=format&fit=crop', color: 'from-orange-400 to-pink-500', revenue: 150000, profit: 20000, growth: -5.2, status: 'warning', manager: 'David Rodriguez', employees: 15, dailySales: 4100, weeklyHistory: generateWeeklyHistory(150000 / 30, -5.2) },
  { id: '4', name: 'Airport Hub', code: 'AH-04', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop', color: 'from-purple-500 to-violet-600', revenue: 320000, profit: 90000, growth: 12.1, status: 'excellent', manager: 'Emma Watson', employees: 34, dailySales: 11500, weeklyHistory: generateWeeklyHistory(320000 / 30, 12.1) },
];`;

content = content.replace(oldMockBranches, newMockBranches);

fs.writeFileSync('src/data.ts', content);

