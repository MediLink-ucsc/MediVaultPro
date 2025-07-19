// src/components/ClinicAdmin/ClinicAdminOverview.js
import React from 'react';
import { 
  Building2,
  Users, 
  UserCheck, 
  Activity, 
  Settings as SettingsIcon,
  TrendingUp,
  Shield
} from 'lucide-react';
import StatsCard from '../Common/StatsCard';

const ClinicAdminOverview = () => {
  const stats = [
    { title: 'Total Staff', value: '23', icon: Users, color: 'teal', trend: '+3' }, 
    { title: 'Active Staff Today', value: '19', icon: UserCheck, color: 'teal', trend: '+2' },
    { title: 'Clinic Health', value: '99.8%', icon: Activity, color: 'teal', trend: '+0.2%' },
  ];

  const quickActions = [
    { 
      title: 'Clinic Profile', 
      icon: Building2, 
      color: 'teal', 
      description: 'View and edit clinic information',
      path: '/clinic-admin/clinic-profile'
    },
    { 
      title: 'Manage Staff', 
      icon: Users, 
      color: 'orange', 
      description: 'View and manage clinic staff',
      path: '/clinic-admin/manage-staff'
    },
    { 
      title: 'Clinic Settings', 
      icon: SettingsIcon, 
      color: 'teal', 
      description: 'Configure clinic parameters',
      path: '/clinic-admin/settings'
    },
    { 
      title: 'Analytics', 
      icon: TrendingUp, 
      color: 'orange', 
      description: 'View clinic analytics',
      path: '/clinic-admin/analytics'
    },
  ];

  const recentActivities = [
    { 
      type: 'clinic_registered', 
      message: 'Your clinic "City Medical Center" has been successfully registered', 
      time: '2 hours ago',
      icon: Shield,
      color: 'teal'
    },
    { 
      type: 'staff_added', 
      message: 'New doctor Dr. John Smith added to clinic', 
      time: '3 hours ago',
      icon: UserCheck,
      color: 'orange'
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
      message: 'Clinic system configuration updated successfully', 
      time: '1 day ago',
      icon: Shield,
      color: 'teal'
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      teal: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
      orange: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
      // Map other colors to teal/orange for unified theme
      blue: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
      purple: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
      green: 'bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700',
      red: 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700',
    };
    return colorMap[color] || colorMap.teal;
  };

  const getActivityIconColorClasses = (color) => {
    const colorMap = {
      teal: 'text-teal-600',
      orange: 'text-orange-600',
      // Map other colors to teal/orange for unified theme
      green: 'text-teal-600',
      blue: 'text-teal-600',
      purple: 'text-orange-600',
    };
    return colorMap[color] || colorMap.teal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinic Administration</h1>
          <p className="text-gray-600 mt-1">Manage your clinic and staff efficiently</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button 
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 ${getColorClasses(action.color)}`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    action.color === 'teal' ? 'bg-teal-500' : 'bg-orange-500'
                  } shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.color === 'teal' ? 'bg-teal-100' : 'bg-orange-100'
                } flex-shrink-0`}>
                  <IconComponent className={`w-5 h-5 ${getActivityIconColorClasses(activity.color)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Clinic Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Departments</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doctors</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Nurses</span>
              <span className="font-semibold text-gray-900">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lab Technicians</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">This Week</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Staff Added</span>
              <span className="font-semibold text-gray-900">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Staff Updates</span>
              <span className="font-semibold text-gray-900">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">System Updates</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Settings Changed</span>
              <span className="font-semibold text-gray-900">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicAdminOverview;
