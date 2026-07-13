const fs = require('fs');
let code = fs.readFileSync('src/views/Dashboard.tsx', 'utf8');

code = code.replace(/\\`/g, '`');
code = code.replace(/\\\$/g, '$');

fs.writeFileSync('src/views/Dashboard.tsx', code);
