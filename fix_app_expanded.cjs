const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  `const [currentView, setCurrentView] = useState<ViewState>('dashboard');`,
  `const [currentView, setCurrentView] = useState<ViewState>('dashboard');\n  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);`
);

content = content.replace(
  `<Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={() => setIsAuthenticated(false)} />`,
  `<Sidebar currentView={currentView} onViewChange={setCurrentView} onLogout={() => setIsAuthenticated(false)} isExpanded={isSidebarExpanded} onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} />`
);

fs.writeFileSync('src/App.tsx', content);
