const fs = require('fs');

let content = fs.readFileSync('src/views/Finance.tsx', 'utf8');

// Update expenses
const oldExpenses = `  const expenses = [
    { id: 1, date: '2023-10-15', category: 'Rent', description: 'Office Space Rent - HQ', amount: 2500, branch: 'HQ-001', status: 'Paid' },
    { id: 2, date: '2023-10-14', category: 'Utilities', description: 'Electricity & Internet', amount: 450, branch: 'East-002', status: 'Paid' },
    { id: 3, date: '2023-10-12', category: 'Marketing', description: 'Social Media Ad Campaign', amount: 1200, branch: 'HQ-001', status: 'Pending' },
    { id: 4, date: '2023-10-10', category: 'Salaries', description: 'Part-time staff wages', amount: 3400, branch: 'West-003', status: 'Paid' },
    { id: 5, date: '2023-10-08', category: 'Operations', description: 'Office Supplies', amount: 150, branch: 'North-004', status: 'Paid' },
  ];`;

const newExpenses = `  const expenses = [
    { id: 1, date: '2023-10-15', category: 'Rent', description: 'Office Space Rent - HQ', amount: 2500, branch: 'HQ-001', status: 'Paid', enteredBy: 'Sarah Jenkins' },
    { id: 2, date: '2023-10-14', category: 'Utilities', description: 'Electricity & Internet', amount: 450, branch: 'East-002', status: 'Paid', enteredBy: 'Michael Chen' },
    { id: 3, date: '2023-10-12', category: 'Marketing', description: 'Social Media Ad Campaign', amount: 1200, branch: 'HQ-001', status: 'Pending', enteredBy: 'Emma Watson' },
    { id: 4, date: '2023-10-10', category: 'Salaries', description: 'Part-time staff wages', amount: 3400, branch: 'West-003', status: 'Paid', enteredBy: 'Sarah Jenkins' },
    { id: 5, date: '2023-10-08', category: 'Operations', description: 'Office Supplies', amount: 150, branch: 'North-004', status: 'Paid', enteredBy: 'David Rodriguez' },
  ];`;

content = content.replace(oldExpenses, newExpenses);

// Update expenses table header
const oldExpensesHeader = `                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>`;

const newExpensesHeader = `                <th className="px-6 py-4 font-medium text-right">Amount</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
                <th className="px-6 py-4 font-medium">Entered By</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>`;

content = content.replace(oldExpensesHeader, newExpensesHeader);

// Update expenses table row
const oldExpensesRow = `                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                      expense.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">`;

const newExpensesRow = `                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider",
                      expense.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{expense.enteredBy}</td>
                  <td className="px-6 py-4 text-right">`;

content = content.replace(oldExpensesRow, newExpensesRow);

// Update Mobile Money Accounts array
const oldMobileMoney = `  const accounts = [
    { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone, color: 'from-green-500 to-emerald-700', bg: 'bg-green-600', logo: 'EVC' },
    { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone, color: 'from-blue-500 to-indigo-700', bg: 'bg-blue-600', logo: 'ZAAD' },
    { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500', logo: 'SAHAL' },
  ];`;

const newMobileMoney = `  const accounts = [
    { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone, color: 'from-green-500 to-emerald-700', bg: 'bg-green-600', logo: 'EVC', purpose: 'General business transactions & local supplier payments' },
    { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone, color: 'from-blue-500 to-indigo-700', bg: 'bg-blue-600', logo: 'ZAAD', purpose: 'Northern region branch operations & payroll' },
    { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500', logo: 'SAHAL', purpose: 'Emergency funds & petty cash' },
  ];`;

content = content.replace(oldMobileMoney, newMobileMoney);

// Update Mobile Money Account card UI
const oldMobileMoneyCard = `                <div className="mb-6 mt-auto">
                  <div className="text-sm text-white/80 mb-1">Available Balance</div>
                  <div className="text-3xl font-bold text-white tracking-tight">\${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="flex items-center justify-between text-sm mt-2 border-t border-white/20 pt-4">
                  <div className="text-white/90 font-mono tracking-wider">{account.number}</div>
                  <div className="text-xs font-bold text-white bg-white/20 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md uppercase tracking-wider">
                    {account.status}
                  </div>
                </div>`;

const newMobileMoneyCard = `                <div className="mt-2 mb-6">
                  <p className="text-xs text-white/90 bg-black/20 p-2 rounded-lg leading-relaxed">{account.purpose}</p>
                </div>

                <div className="mb-6 mt-auto">
                  <div className="text-sm text-white/80 mb-1">Available Balance</div>
                  <div className="text-3xl font-bold text-white tracking-tight">\${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="flex items-center justify-between text-sm mt-2 border-t border-white/20 pt-4">
                  <div className="text-white/90 font-mono tracking-wider">{account.number}</div>
                  <div className="text-xs font-bold text-white bg-white/20 backdrop-blur-md border border-white/20 px-2 py-1 rounded-md uppercase tracking-wider">
                    {account.status}
                  </div>
                </div>`;

content = content.replace(oldMobileMoneyCard, newMobileMoneyCard);


fs.writeFileSync('src/views/Finance.tsx', content);
