const fs = require('fs');

const imports = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2, Building, Users, Shield, Bell, CreditCard,
  Link2, Key, Activity, HardDrive, Sparkles, Palette,
  Globe, LifeBuoy, Search, Save, Upload, CheckCircle2,
  Smartphone, MonitorSmartphone, Mail, MessageSquare, AlertTriangle,
  Settings as SettingsIcon, LayoutGrid, FileText, CalendarDays,
  ChevronDown, ArrowUpRight, Plus, MoreVertical, KeyRound, Clock,
  Download, RefreshCw, Sun, Moon, Laptop, Eye, Fingerprint, Lock,
  Database, Zap, Trash2, Edit2, RotateCw, ExternalLink, Hash, PlayCircle,
  ToggleRight, Check, CheckSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
`;

const components = `
const SettingsSection = ({ title, description, children, action }: { title: string, description: string, children: React.ReactNode, action?: React.ReactNode }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center gap-4">
      <div>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const Toggle = ({ enabled = false }: { enabled?: boolean }) => (
  <div className={cn("w-11 h-6 rounded-full relative cursor-pointer transition-colors shadow-inner", enabled ? "bg-blue-600" : "bg-gray-200")}>
    <div className={cn("w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all", enabled ? "left-[22px]" : "left-0.5")} />
  </div>
);

const SwitchRow = ({ icon: Icon, title, desc, enabled }: { icon: any, title: string, desc: string, enabled?: boolean }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0 last:pb-0 first:pt-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
      </div>
    </div>
    <Toggle enabled={enabled} />
  </div>
);

function CompanyProfileTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Company Profile" description="Update your enterprise profile information and branding.">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="shrink-0 text-center">
            <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative mx-auto mb-4 hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-2 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">Upload Logo</span>
              <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                <Upload className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">JPG, PNG (Max 2MB)</div>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Company Name</label>
              <input type="text" defaultValue="Hassan Enterprise" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Business Type</label>
              <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
                <option>Corporate Enterprise</option>
                <option>LLC</option>
                <option>Sole Proprietorship</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Registration Number</label>
              <input type="text" defaultValue="REG-992384-ENT" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Tax Number (TIN)</label>
              <input type="text" defaultValue="TX-44590211" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input type="email" defaultValue="admin@hassanenterprise.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Phone Number</label>
              <input type="text" defaultValue="+252 61 0000000" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Website</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="https://hassanenterprise.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
                <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors shrink-0 shadow-sm text-gray-600">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Business Address</label>
              <textarea rows={3} defaultValue="123 Enterprise Tower, Business District&#10;Mogadishu, Somalia" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none"></textarea>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function BusinessInformationTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Legal & Operational Details" description="View and edit core business operational records.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Date of Incorporation</label>
            <input type="date" defaultValue="2018-05-15" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Operating Currency</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>USD ($)</option>
              <option>SOS (Sh)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Financial Year End</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>December 31</option>
              <option>March 31</option>
              <option>June 30</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Time Zone</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>Africa/Mogadishu (GMT+3)</option>
              <option>UTC (GMT+0)</option>
            </select>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function BranchesTab() {
  const branches = [
    { id: 'HQ', name: 'Mogadishu Headquarters', address: '123 Main St', status: 'Active', isDefault: true },
    { id: 'BR-1', name: 'Hargeisa Branch', address: '45 Trade Ave', status: 'Active', isDefault: false },
    { id: 'BR-2', name: 'Bosaso Port Office', address: '12 Marina Road', status: 'Maintenance', isDefault: false },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">Total Branches</div>
          <div className="text-2xl font-bold text-gray-900">12</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">Active Branches</div>
          <div className="text-2xl font-bold text-green-600">11</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="text-gray-500 text-sm font-medium mb-1">Default Branch</div>
          <div className="text-lg font-bold text-gray-900 truncate mt-1.5">Mogadishu HQ</div>
        </div>
      </div>

      <SettingsSection 
        title="Branch Management" 
        description="Manage your organizational branches and locations."
        action={
          <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Branch
          </button>
        }
      >
        <div className="space-y-3">
          {branches.map(branch => (
            <div key={branch.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-md hover:shadow-blue-500/5 transition-all bg-white group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{branch.name}</span>
                    {branch.isDefault && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Default</span>}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">{branch.id} &bull; {branch.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider", branch.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700')}>
                  {branch.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}

function TeamRolesTab() {
  const users = [
    { name: 'Ahmed Hassan', role: 'Owner', email: 'ahmed@example.com' },
    { name: 'Sarah Jenkins', role: 'Manager', email: 'sarah@example.com' },
    { name: 'Ali Mohamed', role: 'Accountant', email: 'ali@example.com' },
    { name: 'David Smith', role: 'Viewer', email: 'david@example.com' }
  ];

  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Users & Permissions" 
        description="Manage team members, roles, and access control."
        action={
          <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Invite User
          </button>
        }
      >
        <div className="space-y-4 mb-8">
          {users.map((user, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select defaultValue={user.role} className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm cursor-pointer">
                  <option value="Owner">Owner</option>
                  <option value="Manager">Manager</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Permission Matrix</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Permission</th>
                  <th className="py-3 px-4 text-center">Owner</th>
                  <th className="py-3 px-4 text-center">Manager</th>
                  <th className="py-3 px-4 text-center">Accountant</th>
                  <th className="py-3 px-4 text-center">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {[
                  'View Dashboard', 'Manage Branches', 'View Financials', 'Manage Users', 'Edit Settings'
                ].map((perm, i) => (
                  <tr key={i}>
                    <td className="py-3 px-4 font-medium text-gray-700">{perm}</td>
                    <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /></td>
                    <td className="py-3 px-4 text-center">{i !== 3 && i !== 4 && <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" />}</td>
                    <td className="py-3 px-4 text-center">{i === 0 || i === 2 ? <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /> : '-'}</td>
                    <td className="py-3 px-4 text-center">{i === 0 ? <CheckCircle2 className="w-4 h-4 text-blue-600 mx-auto" /> : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Authentication Methods" description="Secure your account with multi-factor authentication and biometrics.">
        <SwitchRow icon={Smartphone} title="Two-Factor Authentication" desc="Use an authenticator app to generate one time security codes." enabled={true} />
        <SwitchRow icon={KeyRound} title="Passkeys" desc="Use your device's biometric sensor to securely sign in without passwords." enabled={false} />
        <SwitchRow icon={Fingerprint} title="Biometric Login (Mobile)" desc="Allow FaceID or TouchID for mobile app access." enabled={true} />
      </SettingsSection>

      <SettingsSection title="Session Management" description="Manage active sessions and trusted devices.">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <div className="flex items-center gap-4">
              <Laptop className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  MacBook Pro 16"
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Current Device</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Mogadishu, Somalia &bull; Safari &bull; Active now</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <Smartphone className="w-8 h-8 text-gray-400" />
              <div>
                <div className="text-sm font-bold text-gray-900">iPhone 14 Pro</div>
                <div className="text-xs text-gray-500 mt-1">Nairobi, Kenya &bull; Mobile App &bull; Active 2 hours ago</div>
              </div>
            </div>
            <button className="text-xs font-semibold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Revoke</button>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
            View full login history <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="API Security" description="Manage access controls for external API usage.">
        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
          <div>
            <div className="text-sm font-bold text-gray-900">Global API Key Rotation</div>
            <div className="text-xs text-gray-500 mt-0.5">Force all API keys to expire immediately.</div>
          </div>
          <button className="bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2">
            <RotateCw className="w-4 h-4" /> Rotate Keys
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Delivery Channels" description="Where should we send your notifications?">
        <SwitchRow icon={Mail} title="Email Notifications" desc="Receive detailed updates via email." enabled={true} />
        <SwitchRow icon={Bell} title="Push Notifications" desc="Browser and mobile app push alerts." enabled={true} />
        <SwitchRow icon={MessageSquare} title="WhatsApp Notifications" desc="Get urgent alerts directly to WhatsApp." enabled={false} />
        <SwitchRow icon={Smartphone} title="SMS Alerts" desc="Critical security alerts via SMS." enabled={true} />
      </SettingsSection>

      <SettingsSection title="Event Subscriptions" description="What types of events do you want to be notified about?">
        <SwitchRow icon={AlertTriangle} title="Low Stock Alerts" desc="When inventory drops below the defined minimum." enabled={true} />
        <SwitchRow icon={CreditCard} title="Sales Alerts" desc="When high-value transactions occur." enabled={false} />
      </SettingsSection>
      
      <SettingsSection title="Automated Reports" description="Scheduled business summaries.">
        <SwitchRow icon={CalendarDays} title="Daily Report" desc="End of day sales summary." enabled={true} />
        <SwitchRow icon={CalendarDays} title="Weekly Report" desc="End of week comprehensive review." enabled={true} />
        <SwitchRow icon={CalendarDays} title="Monthly Report" desc="End of month financial statement." enabled={true} />
        <SwitchRow icon={Sparkles} title="AI Summary" desc="Attach AI generated insights to reports." enabled={true} />
      </SettingsSection>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Subscription Plan" description="Manage your current plan and usage limits.">
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-xl font-bold">Enterprise Plan</h4>
                <span className="bg-blue-500/20 text-blue-200 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold">$299</span>
                <span className="text-blue-200 text-sm">/month</span>
              </div>
              <p className="text-sm text-blue-200 mt-2">Renews automatically on Oct 15, 2026</p>
            </div>
            <div className="flex flex-col gap-3 min-w-[200px]">
              <button className="w-full bg-white text-gray-900 hover:bg-gray-50 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg text-center">
                Upgrade Plan
              </button>
              <button className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-center">
                Cancel Subscription
              </button>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Payment Method" description="Manage how you pay for your subscription.">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center font-bold text-blue-800 italic text-sm">VISA</div>
            <div>
              <div className="text-sm font-bold text-gray-900">Visa ending in 4242</div>
              <div className="text-xs text-gray-500 mt-0.5">Expires 12/28</div>
            </div>
          </div>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">Update</button>
        </div>
      </SettingsSection>

      <SettingsSection title="Invoices" description="Past billing statements and receipts.">
        <div className="space-y-3">
          {[
            { id: 'INV-2026-009', date: 'Sep 15, 2026', amount: '$299.00', status: 'Paid' },
            { id: 'INV-2026-008', date: 'Aug 15, 2026', amount: '$299.00', status: 'Paid' },
            { id: 'INV-2026-007', date: 'Jul 15, 2026', amount: '$299.00', status: 'Paid' },
          ].map(inv => (
            <div key={inv.id} className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 last:pb-0 first:pt-0 hover:bg-gray-50 transition-colors rounded-lg">
              <div>
                <div className="text-sm font-bold text-gray-900">{inv.amount}</div>
                <div className="text-xs text-gray-500 mt-0.5">{inv.id} &bull; {inv.date}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-md">{inv.status}</span>
                <button className="text-gray-400 hover:text-gray-900 transition-colors p-1"><Download className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: 'Stripe Payments', desc: 'Accept credit card payments directly.', icon: CreditCard, connected: true },
    { name: 'Supabase Data', desc: 'Real-time database syncing.', icon: Database, connected: true },
    { name: 'WhatsApp Business', desc: 'Send receipts and updates via WA.', icon: MessageSquare, connected: false },
    { name: 'Xero Accounting', desc: 'Sync financials with Xero.', icon: Building2, connected: false },
    { name: 'Mailchimp', desc: 'Email marketing campaigns.', icon: Mail, connected: true },
    { name: 'Custom POS', desc: 'Hardware POS bridge API.', icon: MonitorSmartphone, connected: false },
  ];

  return (
    <div className="space-y-6">
      <SettingsSection title="Connected Services" description="Manage third-party integrations and bridges.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map(int => (
            <div key={int.name} className="border border-gray-200 rounded-xl p-4 flex flex-col h-full hover:border-blue-200 transition-colors group bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border", int.connected ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-gray-50 text-gray-500 border-gray-100")}>
                  <int.icon className="w-5 h-5" />
                </div>
                {int.connected && <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Connected</span>}
              </div>
              <h4 className="text-sm font-bold text-gray-900">{int.name}</h4>
              <p className="text-xs text-gray-500 mt-1 mb-4 flex-1">{int.desc}</p>
              <button className={cn("w-full py-2 rounded-lg text-sm font-semibold transition-all shadow-sm", int.connected ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700")}>
                {int.connected ? 'Configure' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}

function ApiKeysTab() {
  return (
    <div className="space-y-6">
      <SettingsSection 
        title="API Keys" 
        description="Manage keys for REST and GraphQL API access."
        action={
          <button className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate Key
          </button>
        }
      >
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">Production API Key</span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live</span>
              </div>
              <div className="text-xs text-gray-500">Created Sep 10, 2026</div>
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 font-mono">
                pk_live_********************************
              </code>
              <button className="bg-white border border-gray-200 hover:bg-gray-50 p-2 rounded-lg text-gray-600 shadow-sm transition-colors" title="Copy">
                <Download className="w-4 h-4 rotate-90" />
              </button>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Last used: 2 minutes ago</span>
              <button className="text-red-600 font-semibold hover:underline">Revoke Key</button>
            </div>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Webhooks" description="Configure webhook URLs for real-time events.">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Webhook URL</label>
            <input type="text" defaultValue="https://api.hassanenterprise.com/webhooks/bizmanager" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Webhook Secret</label>
            <div className="flex gap-2">
              <input type="password" defaultValue="whsec_1234567890abcdef" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" />
              <button className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors shrink-0 shadow-sm text-gray-600">
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function AuditLogsTab() {
  const logs = [
    { id: 1, action: 'User role updated', user: 'Ahmed Hassan', target: 'Sarah Jenkins', time: '10 mins ago', type: 'security' },
    { id: 2, action: 'Branch created', user: 'System', target: 'Mogadishu HQ', time: '1 hour ago', type: 'system' },
    { id: 3, action: 'API Key generated', user: 'Ahmed Hassan', target: 'Production Key', time: '2 days ago', type: 'security' },
    { id: 4, action: 'Large transaction ($10k+)', user: 'POS Terminal 1', target: 'INV-001', time: '3 days ago', type: 'finance' },
  ];

  return (
    <div className="space-y-6">
      <SettingsSection 
        title="Audit Logs" 
        description="A complete history of all administrative actions in the workspace."
        action={
          <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{log.action}</td>
                  <td className="py-3 px-4 text-gray-600">{log.user}</td>
                  <td className="py-3 px-4 text-gray-600">{log.target}</td>
                  <td className="py-3 px-4 text-gray-500 text-right">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsSection>
    </div>
  );
}

function BackupRestoreTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Automated Backups" description="Configure how often your workspace data is backed up automatically.">
        <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Last backup completed successfully</div>
              <div className="text-xs text-gray-500 mt-0.5">Today at 02:00 AM UTC (45MB)</div>
            </div>
          </div>
          <button className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
            Download Latest
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Backup Frequency</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>Daily at 02:00 AM</option>
              <option>Weekly on Sunday</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Retention Period</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>30 Days</option>
              <option>90 Days</option>
              <option>1 Year</option>
            </select>
          </div>
        </div>
      </SettingsSection>
      
      <SettingsSection title="Manual Operations" description="Create or restore from a point-in-time snapshot.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5 hover:border-blue-200 transition-colors">
            <h4 className="font-bold text-gray-900 mb-2">Manual Backup</h4>
            <p className="text-xs text-gray-500 mb-4">Create an immediate snapshot of your database and files.</p>
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2 rounded-lg transition-colors shadow-sm">
              Create Backup Now
            </button>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h4 className="font-bold text-red-900 mb-2">Restore Data</h4>
            <p className="text-xs text-red-700/80 mb-4">Warning: This will overwrite current live data with the backup state.</p>
            <button className="w-full bg-white border border-red-200 text-red-700 hover:bg-red-50 text-sm font-semibold py-2 rounded-lg transition-colors shadow-sm">
              Restore from Backup
            </button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function AiPreferencesTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Business AI Assistant" description="Configure how AI interprets and interacts with your workspace data.">
        <SwitchRow icon={Sparkles} title="Enable AI Assistant" desc="Allow AI to analyze data and provide suggestions." enabled={true} />
        <SwitchRow icon={Activity} title="Forecasting" desc="Generate predictive revenue models based on history." enabled={true} />
        <SwitchRow icon={SettingsIcon} title="Automated Recommendations" desc="Proactively suggest inventory reorders and staffing changes." enabled={true} />
      </SettingsSection>

      <SettingsSection title="AI Persona & Output" description="Customize the tone and language of AI reports.">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Communication Tone</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>Professional & Direct</option>
              <option>Friendly & Encouraging</option>
              <option>Highly Technical</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Default Output Language</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>English</option>
              <option>Somali</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function AppearanceTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Interface Theme" description="Select or customize your UI theme.">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="cursor-pointer group">
            <div className="h-24 bg-gray-100 rounded-xl border-2 border-blue-600 flex items-center justify-center mb-2">
              <Sun className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-center text-sm font-bold text-gray-900">Light</div>
          </div>
          <div className="cursor-pointer group">
            <div className="h-24 bg-gray-900 rounded-xl border-2 border-transparent group-hover:border-gray-400 transition-colors flex items-center justify-center mb-2">
              <Moon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center text-sm font-medium text-gray-600 group-hover:text-gray-900">Dark</div>
          </div>
          <div className="cursor-pointer group">
            <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-900 rounded-xl border-2 border-transparent group-hover:border-gray-400 transition-colors flex items-center justify-center mb-2">
              <Laptop className="w-8 h-8 text-gray-500" />
            </div>
            <div className="text-center text-sm font-medium text-gray-600 group-hover:text-gray-900">System</div>
          </div>
        </div>
      </SettingsSection>
      
      <SettingsSection title="Layout & UX" description="Customize density and animations.">
        <SwitchRow icon={LayoutGrid} title="Compact Layout" desc="Reduce padding to show more data on screen." enabled={false} />
        <SwitchRow icon={PlayCircle} title="Interface Animations" desc="Smooth transitions between states and pages." enabled={true} />
      </SettingsSection>
    </div>
  );
}

function LanguagesTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Regional Settings" description="Set language and localization defaults.">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Display Language</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>English (US)</option>
              <option>Somali</option>
              <option>Arabic</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Date & Time Format</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>MM/DD/YYYY (12-hour)</option>
              <option>DD/MM/YYYY (24-hour)</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Number Format</label>
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm appearance-none">
              <option>1,234,567.89</option>
              <option>1.234.567,89</option>
            </select>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

function SupportTab() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Help & Support" description="Get help with BizManager or contact our enterprise support team.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Help Center</div>
              <div className="text-xs text-gray-500 mt-0.5">Read guides and tutorials.</div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Live Chat</div>
              <div className="text-xs text-gray-500 mt-0.5">Talk to enterprise support.</div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Report Bug</div>
              <div className="text-xs text-gray-500 mt-0.5">Create a support ticket.</div>
            </div>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Request Feature</div>
              <div className="text-xs text-gray-500 mt-0.5">Suggest improvements.</div>
            </div>
          </div>
        </div>
      </SettingsSection>
      
      <SettingsSection title="About BizManager" description="System information.">
        <div className="flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-600/20">
            <Activity className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-gray-900">BizManager Enterprise</h4>
          <p className="text-sm text-gray-500 mt-1">Version 3.2.0 (Build 2409)</p>
          <div className="flex items-center gap-4 mt-6 text-xs font-semibold text-blue-600">
            <a href="#" className="hover:underline">Terms of Service</a>
            <span className="text-gray-300">&bull;</span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span className="text-gray-300">&bull;</span>
            <a href="#" className="hover:underline">Open Source Licenses</a>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState('Company Profile');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navItems = [
    { name: 'Company Profile', icon: Building2 },
    { name: 'Business Information', icon: FileText },
    { name: 'Branches', icon: Building },
    { name: 'Team & Roles', icon: Users },
    { name: 'Security', icon: Shield },
    { name: 'Notifications', icon: Bell },
    { name: 'Billing & Subscription', icon: CreditCard },
    { name: 'Integrations', icon: Link2 },
    { name: 'API Keys', icon: Key },
    { name: 'Audit Logs', icon: Activity },
    { name: 'Backup & Restore', icon: HardDrive },
    { name: 'AI Preferences', icon: Sparkles },
    { name: 'Appearance', icon: Palette },
    { name: 'Languages', icon: Globe },
    { name: 'Support', icon: LifeBuoy }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'Company Profile': return <CompanyProfileTab />;
      case 'Business Information': return <BusinessInformationTab />;
      case 'Branches': return <BranchesTab />;
      case 'Team & Roles': return <TeamRolesTab />;
      case 'Security': return <SecurityTab />;
      case 'Notifications': return <NotificationsTab />;
      case 'Billing & Subscription': return <BillingTab />;
      case 'Integrations': return <IntegrationsTab />;
      case 'API Keys': return <ApiKeysTab />;
      case 'Audit Logs': return <AuditLogsTab />;
      case 'Backup & Restore': return <BackupRestoreTab />;
      case 'AI Preferences': return <AiPreferencesTab />;
      case 'Appearance': return <AppearanceTab />;
      case 'Languages': return <LanguagesTab />;
      case 'Support': return <SupportTab />;
      default: return <CompanyProfileTab />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h2>
          <p className="text-sm text-gray-500 mt-0.5">Manage your enterprise workspace preferences</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search settings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <div className="hidden lg:block text-xs text-gray-400 font-medium whitespace-nowrap">
            Last updated: Just now
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all shadow-sm shadow-blue-600/20 flex items-center justify-center gap-2 shrink-0 group w-full md:w-auto">
            <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 shrink-0 bg-white border-r border-gray-200 overflow-y-auto hidden lg:block">
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
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-4xl mx-auto pb-12">
            
            {/* Mobile Nav Selection (visible only on small screens) */}
            <div className="lg:hidden mb-6">
               <select 
                 value={activeTab}
                 onChange={(e) => setActiveTab(e.target.value)}
                 className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none"
               >
                 {navItems.map(item => (
                   <option key={item.name} value={item.name}>{item.name}</option>
                 ))}
               </select>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/views/Settings.tsx', imports + components);
