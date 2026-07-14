const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MoreVertical, ChevronDown } from 'lucide-react';
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const generateInitialData = (base) => Array.from({length: 12}, (_, i) => ({ val: base + Math.random() * 20 - 10, id: i }));

export function Dashboard() {
  const [data1, setData1] = useState(generateInitialData(40));
  const [data2, setData2] = useState(generateInitialData(30));
  const [data3, setData3] = useState(generateInitialData(60));
  const [data4, setData4] = useState(generateInitialData(50));
  
  const [score, setScore] = useState(88);
  const [metrics, setMetrics] = useState([38, 1.8, 1.3, 1.5]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate charts by pushing new data and removing old
      setData1(prev => [...prev.slice(1), { val: 40 + Math.random() * 20 - 10, id: Date.now() }]);
      setData2(prev => [...prev.slice(1), { val: 30 + Math.random() * 20 - 10, id: Date.now() }]);
      setData3(prev => [...prev.slice(1), { val: 60 + Math.random() * 20 - 10, id: Date.now() }]);
      setData4(prev => [...prev.slice(1), { val: 50 + Math.random() * 20 - 10, id: Date.now() }]);
      
      // Randomly fluctuate score
      setScore(prev => {
        const newScore = prev + (Math.random() > 0.5 ? 1 : -1);
        return newScore > 100 ? 100 : newScore < 0 ? 0 : newScore;
      });

      // Randomly fluctuate metrics
      setMetrics(prev => [
        Math.max(0, prev[0] + (Math.random() * 2 - 1)),
        Math.max(0, prev[1] + (Math.random() * 0.2 - 0.1)),
        Math.max(0, prev[2] + (Math.random() * 0.2 - 0.1)),
        Math.max(0, prev[3] + (Math.random() * 0.2 - 0.1)),
      ]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 md:p-10 lg:p-14 w-full max-w-[1800px] mx-auto min-h-screen relative flex flex-col justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" 
           style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '100px 100px', backgroundPosition: 'center' }}>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 font-display tracking-tight">BizManager</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-200/50 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            <span className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 xl:gap-16 mb-10 relative z-10 items-center justify-center">
        
        {/* Left Column Cards */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 w-full lg:max-w-md mx-auto lg:ml-auto lg:mr-0">
          <StatCard 
            title="Revenue Health" 
            percentage={metrics[0]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data1}
            delay={0.1}
            topRightIcon="dots"
          />
          <StatCard 
            title="Profit Health" 
            percentage={metrics[1]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data2}
            delay={0.2}
            topRightIcon="arrow"
          />
        </div>

        {/* Center Main Gauge */}
        <div className="flex justify-center items-center order-1 lg:order-2 py-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: "spring" }}
            className="relative w-[340px] h-[340px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] xl:w-[550px] xl:h-[550px] flex items-center justify-center group mx-auto"
          >
             {/* Outer Glass Ring */}
             <div className="absolute inset-0 rounded-full border-[1.5px] border-white/40 bg-white/10 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.02)] z-10"></div>
             
             {/* Middle Thick Glowing Arc (The actual gauge) */}
             <div className="absolute inset-5 md:inset-8 lg:inset-10 z-20 pointer-events-none drop-shadow-[0_0_25px_rgba(16,185,129,0.35)]">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="50%" cy="50%" r="44%" stroke="#E2E8F0" strokeWidth="20" fill="none" opacity="0.4" strokeLinecap="round" />
                   <motion.circle 
                     cx="50%" cy="50%" r="44%" 
                     stroke="url(#greenGradient)" 
                     strokeWidth="24" fill="none" 
                     strokeDasharray="276%" 
                     animate={{ strokeDashoffset: 276 - (score * 2.76) }}
                     transition={{ duration: 0.5 }}
                     strokeLinecap="round" 
                   />
                   <defs>
                     <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#34D399" />
                     </linearGradient>
                   </defs>
                </svg>
             </div>

             {/* Inner Glass Plate */}
             <div className="absolute inset-[3.5rem] md:inset-[5rem] lg:inset-[6.5rem] rounded-full border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.05)] z-20 pointer-events-none"></div>
             
             {/* Inner faint circle */}
             <div className="absolute inset-[4.5rem] md:inset-[6.5rem] lg:inset-[8rem] rounded-full border-[1px] border-emerald-500/10 shadow-[inset_0_0_30px_rgba(16,185,129,0.05)] z-10"></div>

             {/* Center Content */}
             <div className="text-center z-30 flex flex-col items-center">
               <div className="flex items-start">
                  <motion.span 
                    key={score}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-7xl md:text-8xl lg:text-9xl font-bold font-display text-slate-800 tracking-tighter leading-none"
                  >
                    {score}
                  </motion.span>
                  <span className="text-3xl lg:text-5xl font-bold font-display text-slate-800 mt-2 lg:mt-4">%</span>
               </div>
               <p className="text-slate-500 font-medium text-sm lg:text-base mt-4 uppercase tracking-wide">Business Health Score</p>
               <ArrowUp className="w-6 h-6 lg:w-8 lg:h-8 text-emerald-500 mt-3" strokeWidth={3} />
             </div>
          </motion.div>
        </div>

        {/* Right Column Cards */}
        <div className="flex flex-col gap-6 md:gap-8 order-3 w-full lg:max-w-md mx-auto lg:mr-auto lg:ml-0">
          <StatCard 
            title="Cash Health" 
            percentage={metrics[2]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data3}
            delay={0.3}
            topRightIcon="arrow"
          />
          <StatCard 
            title="Cash Flow" 
            percentage={metrics[3]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data4}
            delay={0.4}
            topRightIcon="dots"
          />
        </div>
      </div>

      {/* Bottom Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }}
        className="p-6 md:p-10 relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] mx-auto w-full max-w-[1500px]"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
          <div className="flex items-center gap-3">
             <h3 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-wide">Total Activity</h3>
             <span className="px-3 py-1.5 bg-slate-200/50 text-slate-600 text-xs font-semibold rounded-md">Rates</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2 rounded-xl bg-slate-200/50 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors">7 / 30d</button>
            <button className="px-5 py-2 rounded-xl bg-white border border-white/60 shadow-sm text-sm font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              Status <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 relative z-10 pb-4">
           {/* Connecting Line */}
           <div className="absolute bottom-0 left-0 w-full h-[4px] bg-slate-200/80 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: \`\${30 + Math.random() * 20}%\` }}
                transition={{ duration: 1.5 }}
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              ></motion.div>
           </div>
           
           <div>
              <div className="text-sm lg:text-base font-medium text-slate-500 mb-2">Total</div>
              <div className="text-3xl lg:text-4xl font-bold font-display text-slate-800">714 6.061+</div>
           </div>
           
           <div>
              <div className="text-sm lg:text-base font-medium text-slate-500 mb-2">Performance charged</div>
              <div className="text-xl lg:text-3xl font-bold text-emerald-500 drop-shadow-sm">+3.91.3%</div>
           </div>
           
           <div>
              <div className="text-sm lg:text-base font-medium text-slate-500 mb-2">Market Offices</div>
              <div className="text-xl lg:text-3xl font-bold text-slate-800">120.004</div>
           </div>
           
           <div>
              <div className="text-sm lg:text-base font-medium text-slate-500 mb-2">Def Rate</div>
              <div className="text-xl lg:text-3xl font-bold text-slate-800">$3,65.800</div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, percentage, circleColor, lineColor, data, delay, topRightIcon = 'arrow' }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number, topRightIcon?: 'dots' | 'arrow' }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const formattedPercentage = percentage > 10 ? percentage.toFixed(0) : percentage.toFixed(1);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay }}
      className="p-6 md:p-8 flex-1 flex flex-col justify-between relative overflow-hidden group bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.03)] w-full"
    >
      <div className="flex justify-between items-start mb-6 relative z-10">
        <h4 className="text-lg lg:text-xl font-bold text-slate-700">{title}</h4>
        {topRightIcon === 'arrow' ? (
          <ArrowUp className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" strokeWidth={2.5} />
        ) : (
          <div className="relative">
            <button 
              className="text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreVertical className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-8 w-40 bg-white/95 backdrop-blur-xl border border-white shadow-lg rounded-xl overflow-hidden z-50 flex flex-col p-1.5"
                >
                  <button className="px-3 py-2 text-sm text-left font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>View Details</button>
                  <button className="px-3 py-2 text-sm text-left font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Export Data</button>
                  <div className="h-[1px] bg-slate-200/50 my-1 mx-2"></div>
                  <button className="px-3 py-2 text-sm text-left font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Hide Metric</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5 mt-auto relative z-10">
        <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center shrink-0">
           <svg className="absolute inset-0 w-full h-full transform -rotate-90 drop-shadow-sm">
              <circle cx="50%" cy="50%" r="42%" stroke="#E2E8F0" strokeWidth="8" fill="none" opacity="0.6" />
              <motion.circle 
                cx="50%" cy="50%" r="42%" 
                stroke={circleColor} strokeWidth="8" fill="none" 
                strokeDasharray="264%" 
                animate={{ strokeDashoffset: 264 - (percentage * 2.64) }}
                transition={{ duration: 0.5 }}
                strokeLinecap="round" 
                style={{ filter: \`drop-shadow(0px 2px 6px \${circleColor}40)\` }} 
              />
           </svg>
           <motion.span 
             key={formattedPercentage}
             initial={{ opacity: 0.8, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-xl md:text-2xl lg:text-3xl font-bold font-display text-slate-800"
           >
             {formattedPercentage}%
           </motion.span>
        </div>
        
        <div className="flex-1 h-16 md:h-20 lg:h-24 opacity-90 group-hover:opacity-100 transition-opacity ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
              <Tooltip 
                contentStyle={{ display: 'none' }}
                cursor={false}
              />
              <Line 
                isAnimationActive={false}
                type="monotone" 
                dataKey="val" 
                stroke={lineColor} 
                strokeWidth={3} 
                dot={{ fill: lineColor, strokeWidth: 2, r: 4, stroke: '#fff' }} 
                activeDot={{ r: 6 }}
                style={{ filter: \`drop-shadow(0px 4px 6px \${lineColor}40)\` }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
`

fs.writeFileSync('src/views/Dashboard.tsx', content);
