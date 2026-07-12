const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// replace the old mockCashiers block
data = data.replace(
  /export const mockCashiers = \[([\s\S]*?)\];/,
  `export const mockCashiers = [
  { id: 'c1', name: 'Amina Ali', branch: 'Downtown HQ', todaySales: 4500, weeklySales: 28000, transactions: 142, performance: 'excellent', salesTrend: [{day: 'Mon', sales: 4000}, {day: 'Tue', sales: 4200}, {day: 'Wed', sales: 3800}, {day: 'Thu', sales: 4800}, {day: 'Fri', sales: 5100}, {day: 'Sat', sales: 6100}, {day: 'Sun', sales: 4500}], hourlySales: [{hour: '8AM', sales: 200}, {hour: '10AM', sales: 500}, {hour: '12PM', sales: 1200}, {hour: '2PM', sales: 800}, {hour: '4PM', sales: 1500}, {hour: '6PM', sales: 300}] },
  { id: 'c2', name: 'Omar Hassan', branch: 'Westside Plaza', todaySales: 3200, weeklySales: 19500, transactions: 98, performance: 'good', salesTrend: [{day: 'Mon', sales: 2500}, {day: 'Tue', sales: 2800}, {day: 'Wed', sales: 3100}, {day: 'Thu', sales: 2900}, {day: 'Fri', sales: 3500}, {day: 'Sat', sales: 4700}, {day: 'Sun', sales: 3200}], hourlySales: [{hour: '8AM', sales: 150}, {hour: '10AM', sales: 400}, {hour: '12PM', sales: 800}, {hour: '2PM', sales: 600}, {hour: '4PM', sales: 1000}, {hour: '6PM', sales: 250}] },
  { id: 'c3', name: 'Fadumo Abdi', branch: 'Downtown HQ', todaySales: 4100, weeklySales: 26500, transactions: 130, performance: 'excellent', salesTrend: [{day: 'Mon', sales: 3800}, {day: 'Tue', sales: 3900}, {day: 'Wed', sales: 4100}, {day: 'Thu', sales: 4000}, {day: 'Fri', sales: 4500}, {day: 'Sat', sales: 5500}, {day: 'Sun', sales: 4100}], hourlySales: [{hour: '8AM', sales: 300}, {hour: '10AM', sales: 600}, {hour: '12PM', sales: 1000}, {hour: '2PM', sales: 700}, {hour: '4PM', sales: 1100}, {hour: '6PM', sales: 400}] },
  { id: 'c4', name: 'Ahmed Jama', branch: 'North Hills', todaySales: 1800, weeklySales: 11200, transactions: 65, performance: 'warning', salesTrend: [{day: 'Mon', sales: 1500}, {day: 'Tue', sales: 1600}, {day: 'Wed', sales: 1400}, {day: 'Thu', sales: 1800}, {day: 'Fri', sales: 2000}, {day: 'Sat', sales: 2900}, {day: 'Sun', sales: 1800}], hourlySales: [{hour: '8AM', sales: 100}, {hour: '10AM', sales: 250}, {hour: '12PM', sales: 400}, {hour: '2PM', sales: 300}, {hour: '4PM', sales: 600}, {hour: '6PM', sales: 150}] },
];`
);
fs.writeFileSync('src/data.ts', data);
