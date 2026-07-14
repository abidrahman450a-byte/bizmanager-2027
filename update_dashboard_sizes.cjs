const fs = require('fs');
let content = fs.readFileSync('src/views/Dashboard.tsx', 'utf8');

// Update Grid layout
content = content.replace(
  'className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10 items-center"',
  'className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 mb-8 relative z-10 items-center justify-center"'
);

// Increase the size of the center gauge
content = content.replace(
  'className="relative w-80 h-80 md:w-[420px] md:h-[420px] flex items-center justify-center group"',
  'className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] flex items-center justify-center group"'
);

// Reduce padding and sizing of the side cards
content = content.replace(
  'className="p-5 md:p-6 flex-1 flex flex-col justify-between relative overflow-visible group bg-[#eef2f6] rounded-[2rem] shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,1)] border border-white/50"',
  'className="p-4 md:p-5 flex-1 flex flex-col justify-between relative overflow-visible group bg-[#eef2f6] rounded-[1.5rem] shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,1)] border border-white/50"'
);

// Reduce gauge circle in side cards
content = content.replace(
  'className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shrink-0"',
  'className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shrink-0"'
);

// Decrease the stroke thickness of the inner ring in the side cards
content = content.replace(
  /strokeWidth="6"/g,
  'strokeWidth="5"'
);

// Ensure the central gauge looks bigger and proportional
content = content.replace(
  'strokeWidth="24"',
  'strokeWidth="32"' // Outer track
);
content = content.replace(
  'strokeWidth="24"',
  'strokeWidth="32"' // Inner active track
);

// Adjust inner glass dome size of the central gauge
content = content.replace(
  'className="absolute inset-16 md:inset-20 rounded-full bg-[#eef2f6] shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,0.9),inset_3px_3px_6px_rgba(255,255,255,0.8)] z-30 border border-white/80"',
  'className="absolute inset-20 md:inset-24 rounded-full bg-[#eef2f6] shadow-[10px_10px_24px_rgba(163,177,198,0.4),-10px_-10px_24px_rgba(255,255,255,0.9),inset_3px_3px_6px_rgba(255,255,255,0.8)] z-30 border border-white/80"'
);

fs.writeFileSync('src/views/Dashboard.tsx', content);
