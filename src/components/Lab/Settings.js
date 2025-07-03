// src/components/Lab/Settings.js
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Monitor,
  Save,
  RefreshCw 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'Lab Technician',
      email: 'lab@medivault.com',
      phone: '+94 xxx xxxx xxx',
      department: 'Laboratory',
      shift: 'Morning (8:00 AM - 4:00 PM)'
    },
    notifications: {
      urgentTests: true,
      testCompletion: true,
      systemAlerts: true,
      dailyReports: false,
      weeklyReports: true
    },
    preferences: {
      theme: 'light',
      defaultView: 'samples',
      itemsPerPage: 20,
      autoRefresh: true,
      refreshInterval: 30
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, name: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, email: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, phone: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            value={settings.profile.department}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, department: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="Laboratory">Laboratory</option>
            <option value="Pathology">Pathology</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Biochemistry">Biochemistry</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-800 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <p className="text-sm text-gray-600">
                {key === 'urgentTests' && 'Receive notifications for urgent test requests'}
                {key === 'testCompletion' && 'Get notified when tests are completed'}
                {key === 'systemAlerts' && 'Receive system maintenance and error alerts'}
                {key === 'dailyReports' && 'Get daily lab performance reports'}
                {key === 'weeklyReports' && 'Receive weekly summary reports'}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <select
            value={settings.preferences.theme}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, theme: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
          <select
            value={settings.preferences.defaultView}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, defaultView: e.target.value }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="samples">Samples</option>
            <option value="reports">Reports</option>
            <option value="analytics">Analytics</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Items per Page</label>
          <select
            value={settings.preferences.itemsPerPage}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, itemsPerPage: parseInt(e.target.value) }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'preferences':
        return renderPreferencesSettings();
      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800 mb-2">Security Settings</h3>
              <p className="text-yellow-700">Security settings are managed by your system administrator. Contact IT support for password changes or security concerns.</p>
            </div>
          </div>
        );
      
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lab Settings</h1>
        <p className="text-gray-600">Manage your laboratory preferences and configurations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
