const fs = require('fs');

let content = fs.readFileSync('src/views/Finance.tsx', 'utf8');

// 1. OverviewTab Animations
const oldOverviewCards = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            Total Revenue
          </div>
          <div className="text-3xl font-bold text-gray-900">\${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" /> +12.5% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            Total Net Profit
          </div>
          <div className="text-3xl font-bold text-gray-900">\${totalProfit.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2">
            <TrendingUp className="w-4 h-4" /> +8.2% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            Profit Margin
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {Math.round((totalProfit / totalRevenue) * 100)}%
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500 mt-2">
            Healthy margin
          </div>
        </div>
      </div>`;

const newOverviewCards = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            Total Revenue
          </div>
          <div className="text-3xl font-bold text-gray-900 relative z-10">\${totalRevenue.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2 relative z-10">
            <TrendingUp className="w-4 h-4" /> +12.5% from last month
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            Total Net Profit
          </div>
          <div className="text-3xl font-bold text-gray-900 relative z-10">\${totalProfit.toLocaleString()}</div>
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-2 relative z-10">
            <TrendingUp className="w-4 h-4" /> +8.2% from last month
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-50 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 text-gray-500 font-medium mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            Profit Margin
          </div>
          <div className="text-3xl font-bold text-gray-900 relative z-10">
            {Math.round((totalProfit / totalRevenue) * 100)}%
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500 mt-2 relative z-10">
            Healthy margin
          </div>
        </motion.div>
      </div>`;

content = content.replace(oldOverviewCards, newOverviewCards);

const oldBranchContributions = `<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Branch Financial Contributions</h3>
        <div className="space-y-4">
          {mockBranches.map(branch => {`;

const newBranchContributions = `<motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Branch Financial Contributions</h3>
        <div className="space-y-4">
          {mockBranches.map(branch => {`;

content = content.replace(oldBranchContributions, newBranchContributions);

// Close motion.div for branch contributions
const oldBranchClose = `        </div>
      </div>
    </div>
  );
}`;

const newBranchClose = `        </div>
      </motion.div>
    </div>
  );
}`;
content = content.replace(oldBranchClose, newBranchClose);

// 2. Mobile Money Accounts
const oldMobileMoneyData = `  const accounts = [
    { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone },
    { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone },
    { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone },
  ];`;

const newMobileMoneyData = `  const accounts = [
    { id: 1, provider: 'EVC Plus', name: 'Main EVC Account', number: '+252 61 2345678', balance: 4500.00, status: 'Active', icon: Smartphone, color: 'from-green-500 to-emerald-700', bg: 'bg-green-600', logo: 'EVC' },
    { id: 2, provider: 'Zaad Service', name: 'Zaad Business', number: '+252 63 8765432', balance: 2100.50, status: 'Active', icon: Smartphone, color: 'from-blue-500 to-indigo-700', bg: 'bg-blue-600', logo: 'ZAAD' },
    { id: 3, provider: 'Sahal', name: 'Sahal Operations', number: '+252 90 1122334', balance: 850.00, status: 'Active', icon: Smartphone, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500', logo: 'SAHAL' },
  ];`;

content = content.replace(oldMobileMoneyData, newMobileMoneyData);

const oldAccountCards = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map(account => {
          const Icon = account.icon;
          return (
            <div key={account.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{account.provider}</div>
                      <div className="text-xs text-gray-500">{account.name}</div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Available Balance</div>
                  <div className="text-2xl font-bold text-gray-900">\${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-600 font-mono text-xs">{account.number}</div>
                  <div className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    {account.status}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>`;

const newAccountCards = `<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((account, idx) => {
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              key={account.id} 
              className={\`rounded-2xl shadow-lg p-6 relative overflow-hidden group bg-gradient-to-br \${account.color} text-white\`}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={\`w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-xl \${account.bg.replace('bg-', 'text-')}\`}>
                      {account.logo}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg leading-tight">{account.provider}</div>
                      <div className="text-xs text-white/80">{account.name}</div>
                    </div>
                  </div>
                  <button className="text-white/60 hover:text-white transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
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
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>`;

content = content.replace(oldAccountCards, newAccountCards);

const oldTransactions = `<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Transactions</h3>`;

const newTransactions = `<motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mt-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Transactions</h3>`;

content = content.replace(oldTransactions, newTransactions);

const oldTransactionsClose = `        </button>
      </div>
    </div>
  );
}`;

const newTransactionsClose = `        </button>
      </motion.div>
    </div>
  );
}`;

content = content.replace(oldTransactionsClose, newTransactionsClose);

fs.writeFileSync('src/views/Finance.tsx', content);
