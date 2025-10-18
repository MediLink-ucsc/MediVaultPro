// src/components/ClinicAdmin/ClinicAdminOverview.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  UserCheck,
  Activity,
  Settings as SettingsIcon,
  TrendingUp,
  Shield,
  Clock,
  Edit,
  UserPlus,
  RefreshCw,
  Loader2,
} from "lucide-react";
import StatsCard from "../Common/StatsCard";
import ApiService from "../../services/apiService";
import { getHospitalIdFromToken } from "../../utils/jwtHelper";

const ClinicAdminOverview = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch activities on component mount
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hospitalId = getHospitalIdFromToken();
      if (!hospitalId) {
        throw new Error("Hospital ID not found. Please log in again.");
      }

      const response = await ApiService.getInstituteActivities(hospitalId);

      if (response.success && response.data) {
        setActivities(response.data.activities || []);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setError(err.message || "Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };

  // Map activity types to icons and colors
  const getActivityConfig = (activityType) => {
    const configs = {
      institution_created: {
        icon: Building2,
        color: "teal",
        label: "Clinic Registered",
      },
      institution_updated: {
        icon: Edit,
        color: "teal",
        label: "Clinic Updated",
      },
      staff_added: {
        icon: UserPlus,
        color: "orange",
        label: "Staff Added",
      },
      staff_updated: {
        icon: UserCheck,
        color: "orange",
        label: "Staff Updated",
      },
      staff_removed: {
        icon: UserCheck,
        color: "orange",
        label: "Staff Removed",
      },
      system_update: {
        icon: RefreshCw,
        color: "teal",
        label: "System Update",
      },
    };

    return (
      configs[activityType] || {
        icon: Activity,
        color: "teal",
        label: "Activity",
      }
    );
  };

  // Format timestamp to relative time
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityTime) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return activityTime.toLocaleDateString();
  };

  const stats = [
    {
      title: "Total Staff",
      value: "23",
      icon: Users,
      color: "teal",
      trend: "+3",
    },
    {
      title: "Active Staff Today",
      value: "19",
      icon: UserCheck,
      color: "teal",
      trend: "+2",
    },
  ];

  const quickActions = [
    {
      title: "Clinic Profile",
      icon: Building2,
      color: "teal",
      description: "View and edit clinic information",
      path: "/clinic-admin/clinic-profile",
    },
    {
      title: "Manage Staff",
      icon: Users,
      color: "orange",
      description: "View and manage clinic staff",
      path: "/clinic-admin/manage-staff",
    },
    {
      title: "Clinic Settings",
      icon: SettingsIcon,
      color: "teal",
      description: "Configure clinic parameters",
      path: "/clinic-admin/settings",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      teal: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700",
      orange:
        "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
      // Map other colors to teal/orange for unified theme
      blue: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700",
      purple:
        "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
      green: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700",
      red: "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
    };
    return colorMap[color] || colorMap.teal;
  };

  const getActivityIconColorClasses = (color) => {
    const colorMap = {
      teal: "text-teal-600",
      orange: "text-orange-600",
      // Map other colors to teal/orange for unified theme
      green: "text-teal-600",
      blue: "text-teal-600",
      purple: "text-orange-600",
    };
    return colorMap[color] || colorMap.teal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Clinic Administration
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your clinic and staff efficiently
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div> */}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 ${getColorClasses(
                  action.color
                )}`}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      action.color === "teal" ? "bg-teal-500" : "bg-orange-500"
                    } shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activities
          </h2>
          <button
            onClick={fetchActivities}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            title="Refresh activities"
          >
            <RefreshCw
              className={`w-5 h-5 text-gray-600 ${
                isLoading ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>

        {isLoading && activities.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Loading activities...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">{error}</p>
              <button
                onClick={fetchActivities}
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Try again
              </button>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">No recent activities</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => {
              const config = getActivityConfig(activity.activityType);
              const IconComponent = config.icon;

              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      config.color === "teal" ? "bg-teal-100" : "bg-orange-100"
                    } flex-shrink-0`}
                  >
                    <IconComponent
                      className={`w-5 h-5 ${getActivityIconColorClasses(
                        config.color
                      )}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      {activity.metadata?.institutionName && (
                        <span className="flex items-center">
                          <Building2 className="w-3 h-3 mr-1" />
                          {activity.metadata.institutionName}
                        </span>
                      )}
                      {activity.source?.service && (
                        <span className="text-gray-400">
                          • {activity.source.service}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Clinic Overview
          </h3>
          <div className="space-y-3">
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            This Week
          </h3>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicAdminOverview;
