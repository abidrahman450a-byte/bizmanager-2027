const fs = require('fs');
let code = fs.readFileSync('src/views/Dashboard.tsx', 'utf8');

code = code.replace('<cell key=', '<Cell key=');
code = code.replace(/import \{ \n  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,\n  BarChart, Bar, Line, ComposedChart\n\} from 'recharts';/, 
`import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Line, ComposedChart, Cell
} from 'recharts';`);

fs.writeFileSync('src/views/Dashboard.tsx', code);
