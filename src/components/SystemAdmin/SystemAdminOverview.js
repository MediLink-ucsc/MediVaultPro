// src/components/SystemAdmin/SystemAdminOverview.js
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  UserCheck, 
  Activity, 
  Plus, 
  Settings as SettingsIcon,
  TrendingUp,
  Shield
} from 'lucide-react';
import StatsCard from '../Common/StatsCard';

const SystemAdminOverview = () => {
  const stats = [
    { title: 'Total Staff', value: '2,341', icon: Users, color: 'orange', trend: '+12%' },
    { title: 'Active Staff Today', value: '1,987', icon: UserCheck, color: 'blue', trend: '+8%' },
    { title: 'System Health', value: '99.8%', icon: Activity, color: 'green', trend: '+0.2%' },
  ];

  const quickActions = [
    { 
      title: 'Register Institute', 
      icon: Building2, 
      color: 'teal', 
      description: 'Add new medical institute',
      path: '/system-admin/register-institute'
    },
    { 
      title: 'Manage Staff', 
      icon: Users, 
      color: 'orange', 
      description: 'View and edit staff data',
      path: '/system-admin/manage-staff'
    },
    { 
      title: 'System Settings', 
      icon: SettingsIcon, 
      color: 'blue', 
      description: 'Configure system parameters',
      path: '/system-admin/settings'
    },
    { 
      title: 'Analytics', 
      icon: TrendingUp, 
      color: 'purple', 
      description: 'View system analytics',
      path: '/system-admin/analytics'
    },
  ];

  const recentActivities = [
    { 
      type: 'institute_added', 
      message: 'New hospital "City General Hospital" registered', 
      time: '2 hours ago',
      icon: Building2,
      color: 'teal'
    },
    { 
      type: 'staff_updated', 
      message: 'Staff profile updated for Dr. Likitha Chathubhashini', 
      time: '4 hours ago',
      icon: UserCheck,
      color: 'orange'
    },
    { 
      type: 'system_update', 
      message: 'System maintenance completed successfully', 
      time: '1 day ago',
      icon: Shield,
      color: 'green'
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
      blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700',
      purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700',
      green: 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700',
    };
    return colorMap[color] || colorMap.teal;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      teal: 'text-teal-600',
      orange: 'text-orange-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
    };
    return colorMap[color] || colorMap.teal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
          <p className="text-gray-600 mt-1">Manage medical institutes and staff across the platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => window.location.href = action.path}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${getColorClasses(action.color)}`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center`}>
                  <action.icon className={`w-6 h-6 ${getIconColorClasses(action.color)}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{action.title}</h3>
                  <p className="text-xs opacity-80 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{activity.message}</p>
                <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemAdminOverview;
