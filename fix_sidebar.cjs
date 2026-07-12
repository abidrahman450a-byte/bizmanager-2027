const fs = require('fs');

let content = fs.readFileSync('src/views/Settings.tsx', 'utf8');

const newNavSections = `  const navSections = [
    {
      title: 'Workspace',
      items: [
        { name: 'Company Profile', icon: Building2 },
        { name: 'Business Information', icon: FileText },
        { name: 'Branches', icon: Building },
      ]
    },
    {
      title: 'Access & Security',
      items: [
        { name: 'Team & Roles', icon: Users },
        { name: 'Security', icon: Shield },
        { name: 'API Keys', icon: Key },
        { name: 'Audit Logs', icon: Activity },
      ]
    },
    {
      title: 'System Settings',
      items: [
        { name: 'Notifications', icon: Bell },
        { name: 'AI Preferences', icon: Sparkles },
        { name: 'Appearance', icon: Palette },
        { name: 'Languages', icon: Globe },
      ]
    },
    {
      title: 'Billing & Add-ons',
      items: [
        { name: 'Billing & Subscription', icon: CreditCard },
        { name: 'Integrations', icon: Link2 },
      ]
    },
    {
      title: 'Maintenance',
      items: [
        { name: 'Backup & Restore', icon: HardDrive },
        { name: 'Support', icon: LifeBuoy }
      ]
    }
  ];

  // Flatten for mobile select
  const navItems = navSections.flatMap(section => section.items);`;

content = content.replace(/const navItems = \[\s*{ name: 'Company Profile', icon: Building2 },[\s\S]*?{ name: 'Support', icon: LifeBuoy }\s*\];/m, newNavSections);

const oldSidebar = `<div className="w-64 shrink-0 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
          <div className="p-4 space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-blue-600" : "text-gray-400")} />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>`;

const newSidebar = `<div className="w-64 shrink-0 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
          <div className="p-4 space-y-6">
            {navSections.map(section => (
              <div key={section.title} className="space-y-1">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">{section.title}</h3>
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => setActiveTab(item.name)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive 
                          ? "bg-blue-50 text-blue-700 shadow-sm shadow-blue-100/50" 
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn("w-4 h-4", isActive ? "text-blue-600" : "text-gray-400")} />
                      {item.name}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>`;

content = content.replace(oldSidebar, newSidebar);

fs.writeFileSync('src/views/Settings.tsx', content);

