const fs = require('fs');

let content = fs.readFileSync('src/views/Branches.tsx', 'utf8');

const oldBranchCard = `<motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedBranch(branch)}
              className={\`p-5 rounded-2xl border cursor-pointer transition-all \${
                selectedBranch?.id === branch.id 
                  ? 'bg-primary border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white border-gray-200 hover:border-primary/50 shadow-sm'
              }\`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className={\`font-bold text-lg \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                    {branch.name}
                  </h3>
                  <div className={\`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1 \${
                    selectedBranch?.id === branch.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }\`}>
                    {branch.code}
                  </div>
                </div>
                <div className={\`flex items-center gap-1 text-sm font-bold \${
                  branch.growth >= 0 
                    ? selectedBranch?.id === branch.id ? 'text-green-300' : 'text-green-500'
                    : selectedBranch?.id === branch.id ? 'text-red-300' : 'text-red-500'
                }\`}>
                  {branch.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {Math.abs(branch.growth)}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className={\`text-xs mb-1 \${selectedBranch?.id === branch.id ? 'text-white/70' : 'text-gray-500'}\`}>Revenue</div>
                  <div className={\`font-semibold \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                    \${branch.revenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className={\`text-xs mb-1 \${selectedBranch?.id === branch.id ? 'text-white/70' : 'text-gray-500'}\`}>Employees</div>
                  <div className={\`font-semibold \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                    {branch.employees}
                  </div>
                </div>
              </div>
            </motion.div>`;

const newBranchCard = `<motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedBranch(branch)}
              className={\`relative overflow-hidden p-5 rounded-2xl border cursor-pointer transition-all \${
                selectedBranch?.id === branch.id 
                  ? 'border-transparent shadow-lg shadow-primary/20 text-white' 
                  : 'bg-white border-gray-200 hover:border-primary/50 shadow-sm'
              }\`}
            >
              {/* @ts-ignore */}
              {selectedBranch?.id === branch.id && branch.color && (
                // @ts-ignore
                <div className={\`absolute inset-0 bg-gradient-to-br \${branch.color} opacity-100\`} />
              )}
              {selectedBranch?.id !== branch.id && branch.image && (
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                  <img src={branch.image} className="w-full h-full object-cover rounded-bl-full" alt="" />
                </div>
              )}
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className={\`font-bold text-lg \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                      {branch.name}
                    </h3>
                    <div className={\`text-xs font-medium px-2 py-0.5 rounded-full inline-block mt-1 \${
                      selectedBranch?.id === branch.id ? 'bg-white/20 text-white backdrop-blur-md border border-white/20' : 'bg-gray-100 text-gray-600'
                    }\`}>
                      {branch.code}
                    </div>
                  </div>
                  <div className={\`flex items-center gap-1 text-sm font-bold \${
                    branch.growth >= 0 
                      ? selectedBranch?.id === branch.id ? 'text-green-100' : 'text-green-500'
                      : selectedBranch?.id === branch.id ? 'text-red-100' : 'text-red-500'
                  }\`}>
                    {branch.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {Math.abs(branch.growth)}%
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className={\`text-xs mb-1 \${selectedBranch?.id === branch.id ? 'text-white/80' : 'text-gray-500'}\`}>Revenue</div>
                    <div className={\`font-semibold \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                      \${branch.revenue.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className={\`text-xs mb-1 \${selectedBranch?.id === branch.id ? 'text-white/80' : 'text-gray-500'}\`}>Employees</div>
                    <div className={\`font-semibold \${selectedBranch?.id === branch.id ? 'text-white' : 'text-gray-900'}\`}>
                      {branch.employees}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>`;

content = content.replace(oldBranchCard, newBranchCard);

// Also let's update the details view header to be more colorful
const oldDetailsHeader = `<div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedBranch.name} Details</h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {selectedBranch.code} | Managed by {selectedBranch.manager}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 shadow-sm">
                    <Download className="w-4 h-4" /> Export Report
                  </button>
                </div>`;

const newDetailsHeader = `<div className="relative p-6 border-b border-gray-100 flex justify-between items-end overflow-hidden h-40">
                  {/* @ts-ignore */}
                  {selectedBranch.image && (
                    <>
                      {/* @ts-ignore */}
                      <img src={selectedBranch.image} alt={selectedBranch.name} className="absolute inset-0 w-full h-full object-cover" />
                      {/* @ts-ignore */}
                      <div className={\`absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-90\`} />
                    </>
                  )}
                  <div className="relative z-10 w-full flex justify-between items-end">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedBranch.name} Details</h3>
                      <p className="text-sm text-gray-300 mt-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {selectedBranch.code} | Managed by {selectedBranch.manager}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-sm font-medium hover:bg-white/20 text-white shadow-sm transition-all">
                      <Download className="w-4 h-4" /> Export Report
                    </button>
                  </div>
                </div>`;

content = content.replace(oldDetailsHeader, newDetailsHeader);

fs.writeFileSync('src/views/Branches.tsx', content);

