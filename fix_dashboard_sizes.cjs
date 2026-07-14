const fs = require('fs');

const content = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, MoreVertical, ChevronDown, Sparkles } from 'lucide-react';
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const generateInitialData = (base) => Array.from({length: 8}, (_, i) => ({ val: base + Math.random() * 20 - 10, id: i }));

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
      
      // Randomly fluctuate score smoothly
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
    <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen relative font-sans overflow-hidden bg-[#eef2f6]">
      {/* Background Grid & Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]" 
           style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '80px 80px', backgroundPosition: 'center' }}>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(238, 242, 246, 0.8) 100%)' }}>
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-700 tracking-tight flex items-center gap-3 drop-shadow-sm">
            BizManager
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/60 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-3 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,1)] border border-white/80 text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
            <span className="text-sm font-bold uppercase tracking-wider">Live View</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 mb-10 relative z-10 items-center justify-center">
        
        {/* Left Column Cards */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1 w-full max-w-sm mx-auto">
          <StatCard 
            title="Revenue Health" 
            percentage={metrics[0]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data1}
            topRightIcon="dots"
          />
          <StatCard 
            title="Profit Health" 
            percentage={metrics[1]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data2}
            topRightIcon="arrow"
          />
        </div>

        {/* Center Main Gauge */}
        <div className="flex justify-center items-center order-1 lg:order-2 py-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex items-center justify-center group mx-auto"
          >
             {/* Outer Thick Glass Ring (Neumorphic base) */}
             <div className="absolute inset-0 rounded-full bg-[#eef2f6] shadow-[12px_12px_32px_rgba(163,177,198,0.4),-12px_-12px_32px_rgba(255,255,255,1)] z-0"></div>
             
             <div className="absolute inset-3 md:inset-4 rounded-full bg-transparent border-2 border-white/50 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] z-10"></div>

             {/* The Glowing Gauge Arc */}
             <div className="absolute inset-8 md:inset-10 z-20 pointer-events-none drop-shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-transform duration-700">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="50%" cy="50%" r="42%" stroke="#cbd5e1" strokeWidth="24" fill="none" opacity="0.25" strokeLinecap="round" />
                   <motion.circle 
                     cx="50%" cy="50%" r="42%" 
                     stroke="url(#emeraldGradient)" 
                     strokeWidth="24" fill="none" 
                     strokeDasharray="264%" 
                     animate={{ strokeDashoffset: 264 - (score * 2.64) }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     strokeLinecap="round" 
                   />
                   <defs>
                     <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34D399" />
                        <stop offset="50%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#059669" />
                     </linearGradient>
                   </defs>
                </svg>
             </div>

             {/* Inner Glass Dome */}
             <div className="absolute inset-16 md:inset-20 rounded-full bg-[#eef2f6] shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,0.9),inset_3px_3px_6px_rgba(255,255,255,0.8)] z-30 border border-white/80"></div>
             
             {/* Center Content */}
             <div className="text-center z-40 flex flex-col items-center">
               <div className="flex items-start justify-center mt-2 md:mt-3">
                  <motion.span 
                    key="score-val"
                    className="text-[4.5rem] md:text-[6rem] font-bold text-slate-700 tracking-tighter leading-none"
                    style={{ textShadow: '2px 2px 4px rgba(163,177,198,0.3)' }}
                  >
                    {score}
                  </motion.span>
                  <span className="text-2xl md:text-3xl font-bold text-slate-500 mt-2 md:mt-4">%</span>
               </div>
               <p className="text-slate-500 font-semibold text-xs md:text-sm mt-1 md:mt-2 uppercase tracking-widest flex items-center gap-1">
                 Health Score <ArrowUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" strokeWidth={3} />
               </p>
             </div>
          </motion.div>
        </div>

        {/* Right Column Cards */}
        <div className="flex flex-col gap-6 md:gap-8 order-3 w-full max-w-sm mx-auto">
          <StatCard 
            title="Cash Health" 
            percentage={metrics[2]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data3}
            topRightIcon="arrow"
          />
          <StatCard 
            title="Cash Flow" 
            percentage={metrics[3]} 
            circleColor="#3B82F6"
            lineColor="#10B981" 
            data={data4}
            topRightIcon="dots"
          />
        </div>
      </div>

      {/* Bottom Table Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden bg-[#eef2f6] rounded-3xl p-6 md:p-8 shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,1)] border border-white/60 z-10 mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
             <h3 className="text-xl font-bold text-slate-700 tracking-wide">Total Activity</h3>
             <span className="px-3 py-1 bg-slate-200/50 text-slate-600 text-xs font-bold rounded-lg shadow-inner">Rates</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-[#eef2f6] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] text-xs font-bold text-slate-600">7 / 30d</button>
            <button className="px-4 py-2 rounded-xl bg-[#eef2f6] shadow-[4px_4px_8px_rgba(163,177,198,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] text-xs font-bold text-slate-600 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95">
              Status <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 relative z-10 pb-2">
           {/* Connecting Line Tracker */}
           <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-200/50 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                animate={{ width: \`\${30 + Math.random() * 20}%\` }}
                transition={{ duration: 2 }}
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              ></motion.div>
           </div>
           
           <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Total</span>
              <span className="text-xl md:text-2xl font-bold text-slate-700">714 6.061+</span>
           </div>
           
           <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Performance</span>
              <span className="text-xl md:text-2xl font-bold text-emerald-500 drop-shadow-sm">+3.91.3%</span>
           </div>
           
           <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Offices</span>
              <span className="text-xl md:text-2xl font-bold text-slate-700">120.004</span>
           </div>
           
           <div className="flex flex-col gap-1">
              <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wide">Def Rate</span>
              <span className="text-xl md:text-2xl font-bold text-slate-700">$3,65.800</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, percentage, circleColor, lineColor, data, topRightIcon = 'arrow' }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], topRightIcon?: 'dots' | 'arrow' }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const formattedPercentage = percentage > 10 ? percentage.toFixed(0) : percentage.toFixed(1);

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-5 flex-1 flex flex-col justify-between relative overflow-visible group bg-[#eef2f6] rounded-[1.5rem] shadow-[8px_8px_20px_rgba(163,177,198,0.4),-8px_-8px_20px_rgba(255,255,255,1)] border border-white/50 w-full"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h4 className="text-[1rem] font-bold text-slate-600 drop-shadow-sm">{title}</h4>
        {topRightIcon === 'arrow' ? (
          <div className="w-7 h-7 rounded-full bg-[#eef2f6] shadow-[2px_2px_5px_rgba(163,177,198,0.3),-2px_-2px_5px_rgba(255,255,255,0.9)] flex items-center justify-center">
            <ArrowUp className="w-3.5 h-3.5 text-emerald-500" strokeWidth={3} />
          </div>
        ) : (
          <div className="relative">
            <button 
              className="w-7 h-7 rounded-full bg-[#eef2f6] shadow-[2px_2px_5px_rgba(163,177,198,0.3),-2px_-2px_5px_rgba(255,255,255,0.9)] flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors active:shadow-[inset_2px_2px_4px_rgba(163,177,198,0.3),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  className="absolute right-0 top-10 w-32 bg-[#eef2f6] shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.9)] border border-white/50 rounded-xl overflow-hidden z-50 flex flex-col p-1"
                >
                  <button className="px-3 py-1.5 text-xs text-left font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Options</button>
                  <button className="px-3 py-1.5 text-xs text-left font-bold text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Export</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mt-auto relative z-10 w-full">
        {/* Mini Neumorphic Gauge */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0">
           {/* Inner inset shadow container */}
           <div className="absolute inset-1.5 rounded-full bg-[#eef2f6] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.9)] z-0"></div>
           
           <svg className="absolute inset-0 w-full h-full transform -rotate-90 z-10 overflow-visible">
              <motion.circle 
                cx="50%" cy="50%" r="38%" 
                stroke={circleColor} strokeWidth="5" fill="none" 
                strokeDasharray="238%" 
                animate={{ strokeDashoffset: 238 - (percentage * 2.38) }}
                transition={{ duration: 0.5 }}
                strokeLinecap="round" 
                style={{ filter: \`drop-shadow(0px 0px 4px \${circleColor}50)\` }} 
              />
           </svg>
           {/* Outer bevel ring */}
           <div className="absolute inset-[2px] rounded-full border border-white/60 z-20 pointer-events-none"></div>

           <motion.span 
             key={formattedPercentage}
             initial={{ opacity: 0.8, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-lg md:text-xl font-bold text-slate-700 z-30 drop-shadow-sm"
           >
             {formattedPercentage}%
           </motion.span>
        </div>
        
        {/* Animated Line Chart */}
        <div className="flex-1 h-12 md:h-14 opacity-90 group-hover:opacity-100 transition-opacity ml-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', fontSize: '12px', padding: '4px 8px' }}
                cursor={false}
                labelStyle={{display: 'none'}}
              />
              <Line 
                isAnimationActive={true}
                animationDuration={500}
                type="monotone" 
                dataKey="val" 
                stroke={lineColor} 
                strokeWidth={2.5} 
                dot={{ fill: lineColor, strokeWidth: 2, r: 3, stroke: '#fff' }} 
                activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: lineColor }}
                style={{ filter: \`drop-shadow(0px 4px 4px \${lineColor}30)\` }}
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
