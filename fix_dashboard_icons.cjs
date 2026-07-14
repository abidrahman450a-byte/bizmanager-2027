const fs = require('fs');
let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf-8');

content = content.replace(
  `delay={0.1}\n          />`,
  `delay={0.1}\n            topRightIcon="dots"\n          />`
);

content = content.replace(
  `delay={0.2}\n          />`,
  `delay={0.2}\n            topRightIcon="arrow"\n          />`
);

content = content.replace(
  `delay={0.3}\n          />`,
  `delay={0.3}\n            topRightIcon="arrow"\n          />`
);

content = content.replace(
  `delay={0.4}\n          />`,
  `delay={0.4}\n            topRightIcon="dots"\n          />`
);

const statCardDefOld = `function StatCard({ title, percentage, circleColor, lineColor, data, delay }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number }) {`;
const statCardDefNew = `function StatCard({ title, percentage, circleColor, lineColor, data, delay, topRightIcon = 'arrow' }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number, topRightIcon?: 'dots' | 'arrow' }) {`;
content = content.replace(statCardDefOld, statCardDefNew);

const oldHeader = `<h4 className="text-lg font-semibold text-slate-700">{title}</h4>
        <ArrowUp className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />`;
const newHeader = `<h4 className="text-lg font-semibold text-slate-700">{title}</h4>
        {topRightIcon === 'arrow' ? (
          <ArrowUp className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
        ) : (
          <button className="text-slate-400 hover:text-slate-600 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        )}`;
content = content.replace(oldHeader, newHeader);

// Let's add more motion to the numbers!
content = content.replace(
  `<span className="text-7xl md:text-8xl font-bold font-display text-slate-800 tracking-tighter leading-none">{score}</span>`,
  `<motion.span 
    key={score}
    initial={{ opacity: 0.8, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-7xl md:text-8xl font-bold font-display text-slate-800 tracking-tighter leading-none"
  >{score}</motion.span>`
);

content = content.replace(
  `<span className="text-xl font-bold font-display text-slate-800">{formattedPercentage}%</span>`,
  `<motion.span 
    key={formattedPercentage}
    initial={{ opacity: 0.8, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-xl font-bold font-display text-slate-800"
  >{formattedPercentage}%</motion.span>`
);

fs.writeFileSync('src/views/Dashboard.tsx', content);
