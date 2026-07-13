const fs = require('fs');

let content = fs.readFileSync('src/views/Finance.tsx', 'utf8');
content = content.replace(/\(doc\)\.lastAutoTable/g, '(doc as any).lastAutoTable');
fs.writeFileSync('src/views/Finance.tsx', content);
