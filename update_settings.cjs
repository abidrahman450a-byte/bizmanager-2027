const fs = require('fs');

let content = fs.readFileSync('src/views/Settings.tsx', 'utf8');

// Replace the grid container start and add conditional rendering
content = content.replace(
  /{[\s\S]*?\/\* Main Content \(The Grid\) \*\/\s*<div className="flex-1 grid grid-cols-12 gap-6 items-start">/m,
  `        {/* Main Content */}
        <div className="flex-1 max-w-4xl">`
);

// We need to inject conditional rendering before each card and close it after each card.
// Also update the col-span classes since we are no longer in a grid.
const replacements = [
  {
    regex: /{\/\* Card 1: Company Profile \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `{activeTab === 'Company Profile' && (\n          <div className="bg-white`
  },
  {
    // Need to close the previous condition and open the new one
    regex: /{\/\* Card 2: Business Information \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 2: Business Information */}\n          {activeTab === 'Business Information' && (\n          <div className="bg-white`
  },
  {
    regex: /{\/\* Card 3: System Preferences \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 3: System Preferences */}\n          {activeTab === 'System Preferences' && (\n          <div className="bg-white`
  },
  {
    regex: /{\/\* Card 4: Current Plan \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 4: Current Plan */}\n          {activeTab === 'Subscription Plan' && (\n          <div className="bg-white`
  },
  {
    regex: /{\/\* Card 5: Security & Access \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 5: Security & Access */}\n          {activeTab === 'Security & Access' && (\n          <div className="bg-white`
  },
  {
    regex: /{\/\* Card 6: Notification Preferences \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 6: Notification Preferences */}\n          {activeTab === 'Notification Preferences' && (\n          <div className="bg-white`
  },
  {
    regex: /{\/\* Card 7: Integrations \*\/}\s*<div className="col-span-12 xl:col-span-[0-9]+ bg-white/g,
    replacement: `)}\n\n          {/* Card 7: Integrations */}\n          {activeTab === 'Integrations' && (\n          <div className="bg-white`
  },
];

replacements.forEach(({regex, replacement}) => {
  content = content.replace(regex, replacement);
});

// Add the closing brace for the last card (Integrations) and placeholder fallback
content = content.replace(
  /<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\);\s*}/g,
  `          )}\n\n          {/* Placeholder for unimplemented tabs */}\n          {!['Company Profile', 'Business Information', 'System Preferences', 'Subscription Plan', 'Security & Access', 'Notification Preferences', 'Integrations'].includes(activeTab) && (\n            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">\n              <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-400">\n                <SettingsIcon className="w-6 h-6" />\n              </div>\n              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">{activeTab} Settings</h3>\n              <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">\n                This section is currently being revamped with a new premium design.\n              </p>\n              <button className="bg-white border border-gray-200 hover:bg-gray-50 px-6 py-2.5 rounded-lg text-sm text-gray-700 font-semibold transition-all hover:scale-105 shadow-sm">\n                Coming Soon\n              </button>\n            </div>\n          )}\n\n        </div>\n      </div>\n    </div>\n  );\n}`
);

// We also need to update the navSections to include Notification Preferences and Integrations
content = content.replace(
  /items: \['System Preferences', 'Email Templates'/g,
  `items: ['System Preferences', 'Notification Preferences', 'Email Templates'`
);
content = content.replace(
  /items: \['POS Settings', 'Third Party Apps'/g,
  `items: ['Integrations', 'POS Settings', 'Third Party Apps'`
);

fs.writeFileSync('src/views/Settings.tsx', content);
