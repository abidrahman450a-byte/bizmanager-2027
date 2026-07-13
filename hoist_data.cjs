const fs = require('fs');
let content = fs.readFileSync('src/views/Finance.tsx', 'utf8');

const expensesCode = `const expenses = [
  { id: 1, date: '2023-10-15', category: 'Rent', description: 'Office Space Rent - HQ', amount: 2500, branch: 'HQ-001', status: 'Paid', enteredBy: 'Sarah Jenkins' },
  { id: 2, date: '2023-10-14', category: 'Utilities', description: 'Electricity & Internet', amount: 450, branch: 'East-002', status: 'Paid', enteredBy: 'Michael Chen' },
  { id: 3, date: '2023-10-12', category: 'Marketing', description: 'Social Media Ad Campaign', amount: 1200, branch: 'HQ-001', status: 'Pending', enteredBy: 'Emma Watson' },
  { id: 4, date: '2023-10-10', category: 'Salaries', description: 'Part-time staff wages', amount: 3400, branch: 'West-003', status: 'Paid', enteredBy: 'Sarah Jenkins' },
  { id: 5, date: '2023-10-08', category: 'Operations', description: 'Office Supplies', amount: 150, branch: 'North-004', status: 'Paid', enteredBy: 'David Rodriguez' },
];`;

const accountsCode = `const accounts = [
  { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone, color: 'from-green-500 to-emerald-700', bg: 'bg-green-600', logo: 'EVC', purpose: 'General business transactions & local supplier payments' },
  { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone, color: 'from-blue-500 to-indigo-700', bg: 'bg-blue-600', logo: 'ZAAD', purpose: 'Northern region branch operations & payroll' },
  { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500', logo: 'SAHAL', purpose: 'Emergency funds & petty cash' },
];`;

const recentTransactionsCode = `const recentTransactions = [
  { id: 101, account: 'EVC Plus', type: 'Received', from: 'Ahmed Ali', amount: 150, date: 'Today, 10:23 AM' },
  { id: 102, account: 'Zaad Service', type: 'Sent', to: 'Supplier XYZ', amount: 450, date: 'Yesterday, 2:45 PM' },
  { id: 103, account: 'EVC Plus', type: 'Received', from: 'Fatima Abdi', amount: 80, date: 'Yesterday, 11:10 AM' },
  { id: 104, account: 'Sahal', type: 'Sent', to: 'Internet Bill', amount: 50, date: 'Oct 12, 09:00 AM' },
];`;

// Remove local definitions
content = content.replace(/  const expenses = \[[^\]]+\];\n\n/m, '');
content = content.replace(/  const accounts = \[[^\]]+\];\n\n/m, '');
content = content.replace(/  const recentTransactions = \[[^\]]+\];\n\n/m, '');

// Prepend to top
content = content.replace('export function Finance', expensesCode + '\n\n' + accountsCode + '\n\n' + recentTransactionsCode + '\n\nexport function Finance');

fs.writeFileSync('src/views/Finance.tsx', content);
