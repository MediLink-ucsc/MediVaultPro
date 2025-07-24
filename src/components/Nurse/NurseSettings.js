// src/components/Nurse/NurseSettings.js
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Save,
  Info,
  Eye,
  EyeOff,
  Check,
  AlertCircle
} from 'lucide-react';
import Button from '../Common/Button';

const NurseSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [settings, setSettings] = useState({
    profile: {
      name: 'Likitha Chathubhashini',
      email: 'likitha.chathubhashini@medivaultpro.com',
      phone: '+94 77 123 4567',
      shift: 'Day Shift (7:00 AM - 7:00 PM)',
      department: 'General Care',
      license: 'RN-2024-001',
      specialization: 'Medical-Surgical Nursing'
    },
    notifications: {
      patientAlerts: true,
      medicationReminders: true,
      shiftReminders: true,
      systemAlerts: true,
      emergencyAlerts: true,
      emailNotifications: true,
      smsNotifications: false
    },
    preferences: {
      theme: 'light',
      defaultView: 'patients',
      itemsPerPage: 20,
      autoRefresh: true,
      refreshInterval: 30,
      language: 'en',
      timezone: 'Asia/Colombo'
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password changed successfully');
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            placeholder="Enter your full name"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            placeholder="Enter your email address"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            placeholder="Enter your phone number"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="General Care">General Care</option>
            <option value="Primary Care">Primary Care</option>
            <option value="Emergency Care">Emergency Care</option>
            <option value="Pediatric Care">Pediatric Care</option>
            <option value="Women's Health">Women's Health</option>
            <option value="Preventive Care">Preventive Care</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
          <input
            type="text"
            value={settings.profile.license}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, license: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
            placeholder="Enter your license number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Work Shift</label>
          <select
            value={settings.profile.shift}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, shift: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="Day Shift (7:00 AM - 7:00 PM)">Day Shift (7:00 AM - 7:00 PM)</option>
            <option value="Night Shift (7:00 PM - 7:00 AM)">Night Shift (7:00 PM - 7:00 AM)</option>
            <option value="Rotating Shift">Rotating Shift</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <select
            value={settings.profile.specialization}
            onChange={(e) => setSettings({
              ...settings,
              profile: { ...settings.profile, specialization: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="Medical-Surgical Nursing">Medical-Surgical Nursing</option>
            <option value="Critical Care Nursing">Critical Care Nursing</option>
            <option value="Pediatric Nursing">Pediatric Nursing</option>
            <option value="Emergency Nursing">Emergency Nursing</option>
            <option value="Community Health Nursing">Community Health Nursing</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => {
          const descriptions = {
            patientAlerts: 'Receive immediate notifications for patient status changes',
            medicationReminders: 'Get reminders for medication administration times',
            shiftReminders: 'Receive notifications about upcoming shift changes',
            systemAlerts: 'Receive system maintenance and error alerts',
            emergencyAlerts: 'Get notified immediately for emergency situations',
            emailNotifications: 'Enable email notifications for all alerts',
            smsNotifications: 'Enable SMS notifications for urgent alerts only'
          };

          return (
            <div key={key} className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600">
                  {descriptions[key]}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, [key]: e.target.checked }
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-orange-600 peer-checked:shadow-lg peer-checked:shadow-orange-200"></div>
              </label>
            </div>
          );
        })}
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="patients">Patients</option>
            <option value="medications">Medications</option>
            <option value="dashboard">Dashboard</option>
            <option value="care-plans">Care Plans</option>
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.preferences.language}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, language: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="en">English</option>
            <option value="si">Sinhala</option>
            <option value="ta">Tamil</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auto Refresh Interval (seconds)</label>
          <select
            value={settings.preferences.refreshInterval}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, refreshInterval: parseInt(e.target.value) }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.preferences.timezone}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, timezone: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
          >
            <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
            <option value="UTC">UTC (UTC+0:00)</option>
            <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
          </select>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-800 mb-1">Auto Refresh</h4>
          <p className="text-sm text-gray-600">Automatically refresh patient data at set intervals</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.preferences.autoRefresh}
            onChange={(e) => setSettings({
              ...settings,
              preferences: { ...settings.preferences, autoRefresh: e.target.checked }
            })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-orange-600 peer-checked:shadow-lg peer-checked:shadow-orange-200"></div>
        </label>
      </div>
    </div>
  );
  const renderSecuritySettings = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Password Change Form - Left Column */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type={showPassword.current ? "text" : "password"}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({
                ...passwordData,
                currentPassword: e.target.value
              })}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('current')}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type={showPassword.new ? "text" : "password"}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({
                ...passwordData,
                newPassword: e.target.value
              })}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value
              })}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            onClick={handlePasswordChange}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Change Password
          </button>
        </div>
      </div>
      
      {/* Security Best Practices - Right Column */}
      <div className="p-5 bg-orange-50 border border-orange-200 rounded-lg h-fit">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-orange-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-orange-800 mb-2">Security Best Practices</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Use a strong password with at least 8 characters</li>
              <li>• Include uppercase, lowercase, numbers, and special characters</li>
              <li>• Never share your password with anyone</li>
              <li>• Change your password regularly (every 3-6 months)</li>
              <li>• Log out when using shared computers</li>
            </ul>
          </div>
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
        return renderSecuritySettings();
      default:
        return renderProfileSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your assistant profile, preferences and configurations</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
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
          <div className="p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <Button
        onClick={handleSave}
        variant="primary"
        role="nurse"
        size="md"
        icon={Save}
        disabled={saveStatus === 'saving'}
        loading={saveStatus === 'saving'}
        className={`fixed bottom-6 right-6 rounded-full shadow-lg transition-all duration-300 ${
          saveStatus === 'saved' 
            ? 'bg-orange-600 text-white' 
            : 'hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default NurseSettings;
