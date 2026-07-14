const fs = require('fs');
let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf-8');

// Ensure AnimatePresence is imported from motion/react
if (!content.includes('AnimatePresence')) {
  content = content.replace(
    `import { motion } from 'motion/react';`,
    `import { motion, AnimatePresence } from 'motion/react';`
  );
}

// Modify StatCard definition to include useState
content = content.replace(
  `function StatCard({ title, percentage, circleColor, lineColor, data, delay, topRightIcon = 'arrow' }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number, topRightIcon?: 'dots' | 'arrow' }) {`,
  `function StatCard({ title, percentage, circleColor, lineColor, data, delay, topRightIcon = 'arrow' }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number, topRightIcon?: 'dots' | 'arrow' }) {
  const [menuOpen, setMenuOpen] = React.useState(false);`
);

// Replace the MoreVertical button with a dropdown
const oldHeader = `<button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>`;
const newHeader = `<div className="relative">
            <button 
              className="text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-8 w-36 bg-white/90 backdrop-blur-xl border border-white shadow-lg rounded-xl overflow-hidden z-50 flex flex-col p-1"
                >
                  <button className="px-3 py-2 text-xs text-left font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>View Details</button>
                  <button className="px-3 py-2 text-xs text-left font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Export Data</button>
                  <div className="h-[1px] bg-slate-200/50 my-1 mx-2"></div>
                  <button className="px-3 py-2 text-xs text-left font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMenuOpen(false)}>Hide Metric</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>`;
content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/views/Dashboard.tsx', content);
