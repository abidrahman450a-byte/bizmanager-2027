const fs = require('fs');
let content = fs.readFileSync('src/views/Employees.tsx', 'utf-8');

// 1. Add recharts imports
if (!content.includes('recharts')) {
  content = content.replace(
    `import { motion, AnimatePresence } from 'motion/react';`,
    `import { motion, AnimatePresence } from 'motion/react';\nimport { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';`
  );
}

// 2. Add generateInitialData
if (!content.includes('generateInitialData')) {
  content = content.replace(
    `const MOCK_EMPLOYEES = [`,
    `const generateInitialData = (base: number) => Array.from({length: 15}, (_, i) => ({ val: base + Math.random() * 10 - 5, id: i }));\n\nconst MOCK_EMPLOYEES = [`
  );
}

// 3. Add initial chart state and live update logic
content = content.replace(
  `const [liveTasks, setLiveTasks] = useState(0);`,
  `const [liveTasks, setLiveTasks] = useState(0);\n  const [employeeCharts, setEmployeeCharts] = useState<Record<number, any[]>>(() => {\n    const initial: Record<number, any[]> = {};\n    MOCK_EMPLOYEES.forEach(emp => initial[emp.id] = generateInitialData(emp.performance));\n    return initial;\n  });`
);

content = content.replace(
  `setLiveTasks(prev => prev + Math.floor(Math.random() * 3));`,
  `setLiveTasks(prev => prev + Math.floor(Math.random() * 3));\n      setEmployeeCharts(prev => {\n        const next = { ...prev };\n        Object.keys(next).forEach(key => {\n          const numKey = Number(key);\n          const oldChart = next[numKey];\n          const lastVal = oldChart[oldChart.length - 1].val;\n          const newVal = Math.max(0, Math.min(100, lastVal + (Math.random() * 6 - 3)));\n          next[numKey] = [...oldChart.slice(1), { val: newVal, id: Date.now() }];\n        });\n        return next;\n      });`
);

// 4. Update the side panel to include the chart
const sidePanelBottom = `<div className="mt-auto">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" /> Live Activity
                  </h4>
                  <div className="space-y-3">
                    <motion.div 
                      key={liveTasks}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800">Task Completed</div>
                        <div className="text-xs text-slate-500">Updated {liveTasks} times in session</div>
                      </div>
                    </motion.div>
                    
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-start gap-3">
                      <Clock className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-800">Current Status</div>
                        <div className="text-xs text-slate-500">
                          {currentSelected.status} - Since 09:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`;

const sidePanelBottomReplacement = `<div className="mt-auto flex flex-col flex-1 min-h-[220px]">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-500" /> Live Performance
                  </h4>
                  <div className="flex-1 w-full bg-white/40 rounded-2xl border border-white/60 p-4 mb-4 relative overflow-hidden shadow-inner">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={employeeCharts[currentSelected.id] || []}>
                          <YAxis domain={['auto', 'auto']} hide />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            labelStyle={{ display: 'none' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="val" 
                            stroke="#10B981" 
                            strokeWidth={3} 
                            dot={false}
                            activeDot={{ r: 6, fill: '#10B981', stroke: '#fff', strokeWidth: 2 }}
                            style={{ filter: \`drop-shadow(0px 4px 6px rgba(16,185,129,0.3))\` }}
                          />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 shrink-0">
                    <motion.div 
                      key={liveTasks}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex flex-col"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-1" />
                      <div className="text-sm font-semibold text-slate-800">Tasks</div>
                      <div className="text-xs text-slate-500">{liveTasks} in session</div>
                    </motion.div>
                    
                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex flex-col">
                      <Clock className="w-5 h-5 text-slate-400 mb-1" />
                      <div className="text-sm font-semibold text-slate-800">Status</div>
                      <div className="text-xs text-slate-500 truncate">
                        {currentSelected.status}
                      </div>
                    </div>
                  </div>
                </div>`;

content = content.replace(sidePanelBottom, sidePanelBottomReplacement);

fs.writeFileSync('src/views/Employees.tsx', content);
