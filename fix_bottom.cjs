const fs = require('fs');
let code = fs.readFileSync('src/views/Settings.tsx', 'utf8');

const additional = `
function SecuritySettings() {
  return (
    <div className="space-y-6">
      {/* 2FA Section */}
      <section className="bg-bg-card border border-white/5 rounded-2xl p-1 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
        
        <div className="bg-bg-surface/50 rounded-xl p-5 sm:p-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main tracking-tight">Two-Factor Authentication</h3>
              <p className="text-xs text-text-muted mt-0.5">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-bg-card border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-white/10">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-7 h-7 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-text-main text-sm flex items-center gap-2">
                    Authenticator App
                    <span className="px-1.5 py-0.5 rounded-md bg-success/10 text-success text-[9px] font-bold uppercase tracking-wider">Active</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1 max-w-sm">Use an app like Google Authenticator or 1Password to generate codes.</p>
                </div>
              </div>
              <button className="bg-bg-surface border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded-lg text-xs text-text-main font-semibold transition-all hover:scale-105 shrink-0">
                Manage
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamSettings() {
  const team = [
    { name: 'Alexander Pierce', role: 'Owner', email: 'alexander@bizmanager.com', active: true },
    { name: 'Sarah Jenkins', role: 'Admin', email: 'sarah@bizmanager.com', active: true },
    { name: 'Michael Chen', role: 'Manager', email: 'michael@bizmanager.com', active: false },
    { name: 'Emily Rodriguez', role: 'Viewer', email: 'emily@bizmanager.com', active: true },
  ];
  return (
    <div className="space-y-6">
      <section className="bg-bg-card border border-white/5 rounded-2xl p-1 relative overflow-hidden">
        <div className="bg-bg-surface/50 rounded-xl p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-main tracking-tight">Team Members</h3>
                <p className="text-xs text-text-muted mt-0.5">Manage who has access to this workspace.</p>
              </div>
            </div>
            <button className="bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 shadow-md shadow-primary/20 flex items-center justify-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              Invite Member
            </button>
          </div>
          <div className="space-y-2.5">
            {team.map((member, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-bg-card border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-bg-surface to-bg-card border border-white/10 flex items-center justify-center font-bold text-text-main text-sm shrink-0 shadow-sm relative">
                    {member.name.charAt(0)}
                    {member.active && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-bg-card rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-text-main text-sm flex items-center gap-1.5">
                      {member.name}
                      {member.role === 'Owner' && <Shield className="w-3 h-3 text-primary" />}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select className="bg-bg-surface border border-white/5 rounded-md px-2.5 py-1 text-xs font-medium text-text-main focus:outline-none focus:border-primary/50 cursor-pointer appearance-none text-center min-w-[90px]">
                    <option value="Owner" disabled>Owner</option>
                    <option value="Admin" selected={member.role === 'Admin'}>Admin</option>
                    <option value="Manager" selected={member.role === 'Manager'}>Manager</option>
                    <option value="Viewer" selected={member.role === 'Viewer'}>Viewer</option>
                  </select>
                  <button className="w-7 h-7 rounded-md flex items-center justify-center text-text-muted hover:text-text-main hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function PlaceholderSettings({ title }: { title: string }) {
  return (
    <div className="bg-bg-card border border-white/5 rounded-2xl p-10 text-center">
      <div className="w-14 h-14 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center mx-auto mb-4 text-text-muted">
        <Activity className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-text-main tracking-tight mb-2">{title} Settings</h3>
      <p className="text-sm text-text-muted max-w-sm mx-auto mb-6">
        This section is currently being revamped with a new premium design.
      </p>
      <button className="bg-bg-surface border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-6 py-2.5 rounded-lg text-sm text-text-main font-semibold transition-all hover:scale-105 shadow-sm">
        Coming Soon
      </button>
    </div>
  );
}
`;

// Find where ProfileSettings ends (the last closing brace after <section className="bg-bg-card border border-white/5 rounded-2xl p-1">)
// and replace everything after it with additional
const regex = /(<section className="bg-bg-card border border-white\/5 rounded-2xl p-1">[\s\S]*?<\/section>\s*<\/div>\s*\);\s*\})[\s\S]*$/;
code = code.replace(regex, "$1\n\n" + additional);
fs.writeFileSync('src/views/Settings.tsx', code);
