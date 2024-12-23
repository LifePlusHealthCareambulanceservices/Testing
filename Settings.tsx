import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, CreditCard, Users, Building } from 'lucide-react';
import SettingsNav from './components/SettingsNav';
import CompanyProfile from './components/CompanyProfile';

function Settings() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
          <SettingsNav />
          <div className="col-span-2 p-6">
            <CompanyProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;