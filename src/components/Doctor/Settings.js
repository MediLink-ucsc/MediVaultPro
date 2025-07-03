// src/components/Doctor/Settings.js
import React from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Share2 } from 'lucide-react';

const Settings = () => {
  const settingsCategories = [
    { title: 'Profile', icon: User, items: ['Personal Info', 'Professional Details', 'Signature'] },
    { title: 'Notifications', icon: Bell, items: ['Appointment Alerts', 'Lab Results', 'System Updates'] },
    { title: 'Security', icon: Lock, items: ['Password', 'Two-Factor Auth', 'Session Timeout'] },
    { title: 'Integrations', icon: Share2, items: ['EHR Systems', 'Lab Connections', 'Billing Software'] },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 hover:text-teal-600 cursor-pointer py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;