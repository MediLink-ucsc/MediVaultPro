// src/components/ClinicAdmin/Settings.js
import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Database, 
  Shield, 
  Bell, 
  Globe, 
  Save,
  AlertCircle,
  CheckCircle,
  User,
  Info,
  Eye,
  EyeOff
} from 'lucide-react';
import Button from '../Common/Button';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [settings, setSettings] = useState({
    general: {
      systemName: 'My Clinic Portal',
      sessionTimeout: 30,
      maintenanceMode: false,
      userRegistration: true,
      timezone: 'Asia/Colombo'
    },
    security: {
      securityLevel: 'high',
      dataRetentionDays: 365,
      maxFileSize: 10,
      allowedFileTypes: 'pdf,jpg,png,docx',
      twoFactorAuth: true,
      passwordExpiry: 90
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      systemAlerts: true,
      maintenanceAlerts: true,
      securityAlerts: true,
      reportNotifications: true
    },
    backup: {
      backupFrequency: 'daily',
      autoBackup: true,
      retentionPeriod: 30,
      compressionEnabled: true
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveStatus, setSaveStatus] = useState(null);

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'backup', label: 'Backup', icon: Database },
  ];

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

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

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Portal Name</label>
          <input
            type="text"
            value={settings.general.systemName}
            onChange={(e) => handleInputChange('general', 'systemName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
            placeholder="Enter clinic portal name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.general.sessionTimeout}
            onChange={(e) => handleInputChange('general', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
            placeholder="Session timeout in minutes"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
          >
            <option value="Asia/Colombo">Asia/Colombo (UTC+5:30)</option>
            <option value="UTC">UTC (UTC+0:00)</option>
            <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">Maintenance Mode</h4>
            <p className="text-sm text-gray-600">Put the clinic system in maintenance mode</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => handleInputChange('general', 'maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-teal-600 peer-checked:shadow-lg peer-checked:shadow-teal-200"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">Staff Registration</h4>
            <p className="text-sm text-gray-600">Allow new staff members to register accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={settings.general.userRegistration}
              onChange={(e) => handleInputChange('general', 'userRegistration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-teal-600 peer-checked:shadow-lg peer-checked:shadow-teal-200"></div>
          </label>
        </div>
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
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
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
            className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            Change Password
          </button>
        </div>

        {/* Security Best Practices - Under Password Form */}
        <div className="mt-6 p-5 bg-orange-50 border border-orange-200 rounded-lg">
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
                <li>• Avoid using personal information in passwords</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* System Security Settings - Right Column */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">System Security</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Security Level</label>
            <select
              value={settings.security.securityLevel}
              onChange={(e) => handleInputChange('security', 'securityLevel', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention (days)</label>
            <input
              type="number"
              value={settings.security.dataRetentionDays}
              onChange={(e) => handleInputChange('security', 'dataRetentionDays', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              placeholder="Days to retain data"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
            <input
              type="number"
              value={settings.security.maxFileSize}
              onChange={(e) => handleInputChange('security', 'maxFileSize', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              placeholder="Maximum file size in MB"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
            <input
              type="number"
              value={settings.security.passwordExpiry}
              onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              placeholder="Password expiry in days"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Types</label>
            <input
              type="text"
              value={settings.security.allowedFileTypes}
              onChange={(e) => handleInputChange('security', 'allowedFileTypes', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
              placeholder="pdf,jpg,png,docx"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 mb-1">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Require two-factor authentication for all users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={settings.security.twoFactorAuth}
                onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-teal-600 peer-checked:shadow-lg peer-checked:shadow-teal-200"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">

        {/* Notification settings have been removed */}
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
          <select
            value={settings.backup.backupFrequency}
            onChange={(e) => handleInputChange('backup', 'backupFrequency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
          <input
            type="number"
            value={settings.backup.retentionPeriod}
            onChange={(e) => handleInputChange('backup', 'retentionPeriod', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
            placeholder="Backup retention in days"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">Automatic Backup</h4>
            <p className="text-sm text-gray-600">Enable automatic backup based on the set frequency</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={settings.backup.autoBackup}
              onChange={(e) => handleInputChange('backup', 'autoBackup', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-teal-600 peer-checked:shadow-lg peer-checked:shadow-teal-200"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">Compression</h4>
            <p className="text-sm text-gray-600">Enable compression to reduce backup file sizes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={settings.backup.compressionEnabled}
              onChange={(e) => handleInputChange('backup', 'compressionEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 peer-focus:ring-opacity-50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-teal-600 peer-checked:shadow-lg peer-checked:shadow-teal-200"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure clinic-wide parameters, security, and system preferences</p>
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
          <div className="p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <Button
        onClick={handleSave}
        variant="primary"
        role="clinicadmin"
        size="md"
        icon={Save}
        disabled={saveStatus === 'saving'}
        loading={saveStatus === 'saving'}
        className={`fixed bottom-6 right-6 rounded-full shadow-lg transition-all duration-300 ${
          saveStatus === 'saved' 
            ? 'bg-teal-600 text-white' 
            : 'hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default Settings;
