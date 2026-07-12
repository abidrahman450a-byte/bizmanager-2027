const fs = require('fs');
let content = fs.readFileSync('src/views/Settings.tsx', 'utf8');

// The file might be slightly broken now, let's just find and replace the whole return statement.
