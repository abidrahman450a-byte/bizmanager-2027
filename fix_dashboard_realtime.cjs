const fs = require('fs');
let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf-8');

content = content.replace(
  `const sparklineData1 = [ { val: 20 }, { val: 30 }, { val: 25 }, { val: 45 }, { val: 35 }, { val: 55 }, { val: 65 } ];
const sparklineData2 = [ { val: 10 }, { val: 25 }, { val: 20 }, { val: 40 }, { val: 30 }, { val: 50 }, { val: 70 } ];
const sparklineData3 = [ { val: 50 }, { val: 40 }, { val: 60 }, { val: 30 }, { val: 70 }, { val: 50 }, { val: 80 } ];
const sparklineData4 = [ { val: 30 }, { val: 40 }, { val: 35 }, { val: 55 }, { val: 45 }, { val: 75 }, { val: 65 } ];`,
  `const generateInitialData = (base) => Array.from({length: 10}, (_, i) => ({ val: base + Math.random() * 20 - 10, id: i }));`
);

content = content.replace(
  `import React from 'react';`,
  `import React, { useState, useEffect } from 'react';`
);

const dashboardStart = `export function Dashboard() {`;
const dashboardReplacement = `export function Dashboard() {
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
    }, 3000);
    return () => clearInterval(interval);
  }, []);
`;

content = content.replace(dashboardStart, dashboardReplacement);

content = content.replace(`data={sparklineData1}`, `data={data1}`);
content = content.replace(`data={sparklineData2}`, `data={data2}`);
content = content.replace(`data={sparklineData3}`, `data={data3}`);
content = content.replace(`data={sparklineData4}`, `data={data4}`);

content = content.replace(`percentage={38}`, `percentage={metrics[0]}`);
content = content.replace(`percentage={1.8}`, `percentage={metrics[1]}`);
content = content.replace(`percentage={1.3}`, `percentage={metrics[2]}`);
content = content.replace(`percentage={1.5}`, `percentage={metrics[3]}`);

content = content.replace(/88/, `{score}`);

const statCardDef = `function StatCard({ title, percentage, circleColor, lineColor, data, delay }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number }) {`;
const statCardReplacement = `function StatCard({ title, percentage, circleColor, lineColor, data, delay }: { title: string, percentage: number, circleColor: string, lineColor: string, data: any[], delay: number }) {
  const formattedPercentage = percentage > 10 ? percentage.toFixed(0) : percentage.toFixed(1);
`;
content = content.replace(statCardDef, statCardReplacement);

content = content.replace(/\{percentage\}%/g, `{formattedPercentage}%`);
content = content.replace(/264 - \(percentage \* 2\.64\)/g, `264 - (percentage * 2.64)`);

fs.writeFileSync('src/views/Dashboard.tsx', content);
