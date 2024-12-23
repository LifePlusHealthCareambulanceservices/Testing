import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Users, Building } from 'lucide-react';

const navItems = [
  { icon: Building, label: 'Company Profile' },
  { icon: Bell, label: 'Notifications' },
  { icon: Shield, label: 'Security' },
  { icon: CreditCard, label: 'Billing' },
  { icon: Users, label: 'Team' },
  { icon: SettingsIcon, label: 'Preferences' },
];

function SettingsNav() {
  return (
    <nav className="p-4">
      <div className="space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50"
          >
            <item.icon className="w-5 h-5 mr-3 text-gray-500" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default SettingsNav;