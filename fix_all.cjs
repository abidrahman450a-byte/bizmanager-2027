const fs = require('fs');

const fullFile = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, Bell, Key, Smartphone, MonitorSmartphone, Lock, 
  LogIn, AlertTriangle, User, Mail, Globe, Palette, 
  Users, UserPlus, Search, ChevronRight, Activity, 
  CreditCard, CheckCircle2, X
} from 'lucide-react';
import { cn } from '../lib/utils';

const TABS = [
  { id: 'Profile', icon: User, description: 'Personal info & avatar' },
  { id: 'Security', icon: Shield, description: 'Passwords & 2FA' },
  { id: 'Notifications', icon: Bell, description: 'Email & push alerts' },
  { id: 'Team Access', icon: Users, description: 'Roles & permissions' },
  { id: 'Billing', icon: CreditCard, description: 'Payment & invoices' },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-6rem)] flex flex-col">
      {/* Header Area */}
      <div className="flex-shrink-0 pb-6 pt-3">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-main mb-1.5">Enterprise Settings</h1>
            <p className="text-text-muted text-sm">Manage your workspace preferences, security, and team members.</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search settings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-surface border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Navigation Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full md:w-64 flex-shrink-0 overflow-y-auto scrollbar-hide space-y-1.5 pb-10"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all relative group",
                  isActive 
                    ? "bg-bg-surface/80" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn(
                  "p-1.5 rounded-lg shrink-0 transition-colors relative z-10",
                  isActive ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-bg-card border border-white/10 text-text-muted group-hover:text-text-main"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="relative z-10">
                  <div className={cn(
                    "font-semibold text-sm leading-tight",
                    isActive ? "text-primary dark:text-white" : "text-text-main"
                  )}>
                    {tab.id}
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">{tab.description}</div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="max-w-3xl"
            >
              {activeTab === 'Security' && <SecuritySettings />}
              {activeTab === 'Profile' && <ProfileSettings />}
              {activeTab === 'Team Access' && <TeamSettings />}
              {['Notifications', 'Billing'].includes(activeTab) && <PlaceholderSettings title={activeTab} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstName: 'Alexander',
    lastName: 'Pierce',
    email: 'alexander@bizmanager.com',
    bio: 'CEO and Founder at BizManager. Passionate about building enterprise software that empowers businesses to scale globally.',
    language: 'English (United States)',
    timezone: 'Pacific Time (PT) - US & Canada'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <section className="bg-bg-card border border-white/5 rounded-2xl p-1 relative overflow-hidden group">
        <div className="bg-bg-surface/50 rounded-xl p-5 sm:p-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main tracking-tight">Personal Information</h3>
              <p className="text-xs text-text-muted mt-0.5">Update your personal details and public profile.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-500 overflow-hidden border-[3px] border-bg-surface shadow-lg shrink-0 relative group/avatar cursor-pointer">
                <img src={\`https://ui-avatars.com/api/?name=\${profile.firstName}+\${profile.lastName}&background=random&color=fff&size=100\`} alt="Avatar" className="w-full h-full object-cover transition-transform group-hover/avatar:scale-110" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <button className="bg-bg-card border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded-lg text-xs text-text-main font-semibold transition-colors shadow-sm">
                    Upload New
                  </button>
                  <button className="text-danger hover:bg-danger/10 px-3 py-2 rounded-lg text-xs font-medium transition-colors">
                    Remove
                  </button>
                </div>
                <p className="text-[11px] text-text-muted">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-main">First Name</label>
                <input 
                  type="text" 
                  value={profile.firstName}
                  onChange={e => setProfile({...profile, firstName: e.target.value})}
                  className="w-full bg-bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-main">Last Name</label>
                <input 
                  type="text" 
                  value={profile.lastName}
                  onChange={e => setProfile({...profile, lastName: e.target.value})}
                  className="w-full bg-bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm" 
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-text-main">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={e => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-bg-card border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm" 
                  />
                </div>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-text-main">Bio</label>
                <textarea 
                  rows={2} 
                  value={profile.bio}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  className="w-full bg-bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-sm resize-none" 
                />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-md shadow-primary/20 flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSaving ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : showSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Saved!
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg-card border border-white/5 rounded-2xl p-1">
        <div className="bg-bg-surface/50 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-main shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main tracking-tight">Regional Settings</h3>
              <p className="text-xs text-text-muted mt-0.5">Customize your language and time zone preferences.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-main">Language</label>
              <select 
                value={profile.language}
                onChange={e => setProfile({...profile, language: e.target.value})}
                className="w-full bg-bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 appearance-none shadow-sm cursor-pointer"
              >
                <option>English (United States)</option>
                <option>Somali (SO)</option>
                <option>Spanish (ES)</option>
                <option>French (FR)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-main">Timezone</label>
              <select 
                value={profile.timezone}
                onChange={e => setProfile({...profile, timezone: e.target.value})}
                className="w-full bg-bg-card border border-white/10 rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary/50 appearance-none shadow-sm cursor-pointer"
              >
                <option>Pacific Time (PT) - US & Canada</option>
                <option>Eastern Africa Time (EAT)</option>
                <option>Eastern Time (ET)</option>
                <option>Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

fs.writeFileSync('src/views/Settings.tsx', fullFile);
