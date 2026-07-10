import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Bell, Key, Smartphone, MonitorSmartphone, Lock, LogIn, AlertTriangle, User, Mail, Globe, Palette, Users, UserPlus } from 'lucide-react';
import { cn } from '../lib/utils';

export function Settings() {
  const [activeTab, setActiveTab] = useState('Security');

  const tabs = ['Profile', 'Security', 'Notifications', 'Team Access'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white mb-1">Security & Settings</h1>
        <p className="text-text-muted">Manage your enterprise account and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={cn(
                "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === item ? "bg-white/10 text-white" : "text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'Security' ? (
              <motion.div 
                key="security"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-white">Two-Factor Authentication (2FA)</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          Authenticator App
                          <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider">Active</span>
                        </div>
                        <p className="text-sm text-text-muted mt-1">Use an app like Google Authenticator or 1Password.</p>
                      </div>
                      <button className="bg-bg-surface border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded-lg text-sm text-white font-medium transition-colors">
                        Manage
                      </button>
                    </div>
                    <div className="w-full h-px bg-white/5" />
                    <div className="flex items-center justify-between opacity-50">
                      <div>
                        <div className="font-medium text-white flex items-center gap-2">
                          Biometric / Face ID
                        </div>
                        <p className="text-sm text-text-muted mt-1">Use device biometrics for quick approval.</p>
                      </div>
                      <button className="bg-bg-surface border border-white/10 px-4 py-2 rounded-lg text-sm text-white font-medium">
                        Set Up
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MonitorSmartphone className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium text-white">Active Sessions</h3>
                    </div>
                    <button className="text-xs font-medium bg-danger/10 text-danger hover:bg-danger/20 px-3 py-1.5 rounded-lg transition-colors border border-danger/20 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      End All Sessions
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <MonitorSmartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">MacBook Pro M3 (Current)</div>
                          <div className="text-xs text-text-muted mt-0.5">192.168.1.1 &bull; San Francisco, CA &bull; Chrome &bull; Active Now</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted shrink-0">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">iPhone 15 Pro Max</div>
                          <div className="text-xs text-text-muted mt-0.5">172.56.32.11 &bull; San Francisco, CA &bull; iOS App &bull; Last active 2 hours ago</div>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-danger hover:text-danger/80 transition-colors">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <LogIn className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-white">Recent Login Events</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="text-xs text-text-muted bg-bg-surface/50 border-b border-white/5">
                        <tr>
                          <th className="px-6 py-3 font-medium">Device Signature</th>
                          <th className="px-6 py-3 font-medium">IP Address / Location</th>
                          <th className="px-6 py-3 font-medium">Date & Time</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white">MacBook Pro M3 (Chrome)</td>
                          <td className="px-6 py-4 text-text-muted text-xs">192.168.1.1<br/>San Francisco, CA</td>
                          <td className="px-6 py-4 text-text-muted">Today, 09:12 AM</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">Successful</span></td>
                        </tr>
                        <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white">iPhone 15 Pro Max (iOS App)</td>
                          <td className="px-6 py-4 text-text-muted text-xs">172.56.32.11<br/>San Francisco, CA</td>
                          <td className="px-6 py-4 text-text-muted">Yesterday, 14:30 PM</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">Successful</span></td>
                        </tr>
                        <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white">Unknown Device (Firefox)</td>
                          <td className="px-6 py-4 text-text-muted text-xs">103.45.21.9<br/>London, UK</td>
                          <td className="px-6 py-4 text-text-muted">Oct 24, 02:15 AM</td>
                          <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-danger/10 text-danger text-xs font-medium">Failed (Wrong Password)</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-bg-card border border-danger/20 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <Lock className="w-5 h-5 text-danger" />
                    <h3 className="text-lg font-medium text-white">Danger Zone</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-text-muted mb-4">Temporarily freeze all operations or initiate an emergency lockdown of the system.</p>
                    <button className="bg-danger text-white hover:bg-danger/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Emergency Lockdown
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'Profile' ? (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-white">Personal Information</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-500 overflow-hidden border-2 border-white/10 shrink-0">
                        <img src="https://ui-avatars.com/api/?name=Alexander+Pierce&background=random&color=fff&size=150" alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <button className="bg-bg-surface border border-white/10 hover:bg-black/5 dark:hover:bg-white/5 px-4 py-2 rounded-lg text-sm text-white font-medium transition-colors mb-2">
                          Change Avatar
                        </button>
                        <p className="text-xs text-text-muted">JPG, GIF or PNG. Max size of 800K</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">First Name</label>
                        <input type="text" defaultValue="Alexander" className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-white">Last Name</label>
                        <input type="text" defaultValue="Pierce" className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-sm font-medium text-white">Email Address</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                          <input type="email" defaultValue="alexander@bizmanager.com" className="w-full bg-bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-white/5 bg-bg-surface/30 flex justify-end">
                    <button className="bg-primary text-white hover:bg-primary/90 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-medium text-white">Regional Settings</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white">Language</label>
                      <select className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50">
                        <option>English (US)</option>
                        <option>Somali (SO)</option>
                        <option>Spanish (ES)</option>
                        <option>French (FR)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-white">Timezone</label>
                      <select className="w-full bg-bg-surface border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary/50">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Africa Time (EAT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Greenwich Mean Time (GMT)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'Team Access' ? (
              <motion.div 
                key="team"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-bg-card border border-white/5 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-medium text-white">Team Members</h3>
                    </div>
                    <button className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Invite Member
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      { name: 'Alexander Pierce', role: 'Owner', email: 'alexander@bizmanager.com' },
                      { name: 'Sarah Jenkins', role: 'Manager', email: 'sarah@bizmanager.com' },
                      { name: 'Michael Chen', role: 'Analyst', email: 'michael@bizmanager.com' }
                    ].map((member, i) => (
                      <div key={i} className="p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-bg-surface flex items-center justify-center font-bold text-white border border-white/10 shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-xs text-text-muted mt-0.5">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            member.role === 'Owner' ? "bg-primary/10 text-primary" : "bg-white/10 text-text-muted"
                          )}>
                            {member.role}
                          </span>
                          <button className="text-sm font-medium text-text-muted hover:text-white transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-bg-card border border-white/5 rounded-2xl p-12 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-bg-surface border border-white/10 flex items-center justify-center mx-auto mb-4 text-text-muted">
                  <Bell className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{activeTab} Settings</h3>
                <p className="text-sm text-text-muted max-w-sm mx-auto">
                  Configure your notification preferences and alert thresholds.
                </p>
                <button className="mt-6 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-lg text-sm text-white font-medium transition-colors">
                  Coming Soon
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
