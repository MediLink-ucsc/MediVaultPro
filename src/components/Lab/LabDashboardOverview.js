// src/components/Lab/LabDashboardOverview.js
import React, { useState, useEffect } from "react";
import {
  FlaskConical,
  Upload,
  FileText,
  Clock,
  TestTube,
  Microscope,
  FileCheck,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import StatsCard from "../Common/StatsCard";
import Modal from "../Common/Modal";
import ProcessTestForm from "./ProcessTestForm";
import UploadReportForm from "./UploadReportForm";
import ApiService from "../../services/apiService";

const LabDashboardOverview = ({ user }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both dashboard stats and recent activities in parallel
      const [statsResponse, activitiesResponse] = await Promise.all([
        ApiService.getLabDashboardStats(),
        ApiService.getLabActivities(user.labId || "1"),
      ]);

      if (statsResponse.success) {
        setDashboardStats(statsResponse.data);
      } else {
        setError("Failed to fetch dashboard statistics");
      }

      if (activitiesResponse.success) {
        setRecentActivities(activitiesResponse.data.activities || []);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = fetchDashboardData;

  const stats = dashboardStats
    ? [
        {
          title: "Pending Tests",
          value: dashboardStats.pendingTests.toString(),
          icon: Clock,
          color: "orange",
          trend:
            dashboardStats.pendingTests > 0
              ? "+" + dashboardStats.pendingTests
              : "0",
          description: "Tests awaiting processing",
        },
        {
          title: "Completed Today",
          value: dashboardStats.completedToday.toString(),
          icon: FileCheck,
          color: "teal",
          trend: "+" + dashboardStats.completedToday,
          description: "Successfully completed",
        },
        {
          title: "Total Reports",
          value: dashboardStats.totalReports.toString(),
          icon: FileText,
          color: "teal",
          trend:
            dashboardStats.totalReports > 0
              ? "+" +
                Math.round(
                  (dashboardStats.completedToday /
                    dashboardStats.totalReports) *
                    100
                ) +
                "%"
              : "0%",
          description: "All time reports",
        },
        {
          title: "Urgent Tests",
          value: dashboardStats.urgentTests.toString(),
          icon: AlertCircle,
          color: "orange",
          trend:
            dashboardStats.urgentTests > 0
              ? dashboardStats.urgentTests.toString()
              : "0",
          description: "High priority items",
        },
      ]
    : [
        {
          title: "Pending Tests",
          value: "0",
          icon: Clock,
          color: "orange",
          trend: "0",
          description: "Tests awaiting processing",
        },
        {
          title: "Completed Today",
          value: "0",
          icon: FileCheck,
          color: "teal",
          trend: "0",
          description: "Successfully completed",
        },
        {
          title: "Total Reports",
          value: "0",
          icon: FileText,
          color: "teal",
          trend: "0",
          description: "All time reports",
        },
        {
          title: "Urgent Tests",
          value: "0",
          icon: AlertCircle,
          color: "orange",
          trend: "0",
          description: "High priority items",
        },
      ];

  const getColorClasses = (color) => {
    const colorMap = {
      teal: "bg-teal-50 border-teal-200 hover:bg-teal-100 text-teal-700",
      orange:
        "bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700",
    };
    return colorMap[color] || colorMap.teal;
  };

  const getIconColorClasses = (color) => {
    const colorMap = {
      teal: "text-teal-600",
      orange: "text-orange-600",
    };
    return colorMap[color] || colorMap.teal;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted for:", activeModal);
    setActiveModal(null);
  };

  const getModalContent = () => {
    switch (activeModal) {
      case "Process Test":
        return <ProcessTestForm onSubmit={handleSubmit} />;
      case "Upload Report":
        return <UploadReportForm onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case "lab_sample_created":
        return Upload;
      case "lab_report_completed":
      case "lab_test_completed":
        return FileCheck;
      case "lab_test_in_progress":
        return TestTube;
      default:
        return FileText;
    }
  };

  const getActivityColor = (activityType) => {
    switch (activityType) {
      case "lab_sample_created":
        return "teal";
      case "lab_report_completed":
      case "lab_test_completed":
        return "teal";
      case "lab_test_in_progress":
        return "orange";
      default:
        return "gray";
    }
  };

  const getActivityStatus = (metadata) => {
    const status = metadata?.status || "unknown";
    return {
      text: status,
      className:
        status === "completed"
          ? "bg-teal-100 text-teal-700"
          : status === "pending"
          ? "bg-orange-100 text-orange-700"
          : "bg-gray-100 text-gray-700",
    };
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  const getActivityTitle = (activity) => {
    const { activityType, metadata } = activity;

    switch (activityType) {
      case "lab_sample_created":
        return `Sample Created - ${metadata?.sampleType || "Sample"}`;
      case "lab_report_completed":
        return "Lab Report Completed";
      case "lab_test_completed":
        return "Test Completed";
      case "lab_test_in_progress":
        return "Test In Progress";
      default:
        return activity.description || "Lab Activity";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Lab Operator Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user.firstName} {user.lastName}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchDashboardStats}
              className="ml-auto text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <stat.icon
                        className={`w-5 h-5 ${getIconColorClasses(stat.color)}`}
                      />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {stat.description}
                      </p>
                      <div
                        className={`flex items-center text-xs font-medium ${
                          stat.trend.startsWith("+")
                            ? "text-teal-600"
                            : "text-orange-600"
                        }`}
                      >
                        <TrendingUp
                          className={`w-3 h-3 mr-1 ${
                            stat.trend.startsWith("-")
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                        {stat.trend}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Stats Section */}
          {/* {dashboardStats?.additionalStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      In Progress
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.additionalStats.inProgressTests}
                    </p>
                  </div>
                  <TestTube className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Failed Tests
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.additionalStats.failedTests}
                    </p>
                  </div>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      High Priority
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.additionalStats.highPriorityTests}
                    </p>
                  </div>
                  <Microscope className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Samples
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {dashboardStats.additionalStats.totalSamples}
                    </p>
                  </div>
                  <FlaskConical className="w-5 h-5 text-teal-600" />
                </div>
              </div>
            </div>
          )} */}
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Urgent Tests
            </h3>
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              {dashboardStats?.urgentTests || 0} Active
            </span>
          </div>
          <div className="space-y-3">
            {!dashboardStats ||
            !dashboardStats.urgentTestsDetails ||
            dashboardStats.urgentTestsDetails.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No urgent tests at the moment</p>
              </div>
            ) : (
              dashboardStats.urgentTestsDetails.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center space-x-4 p-4 bg-red-50 rounded-xl border border-red-200 hover:bg-red-100 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">
                      {test.testType} - Patient {test.patientId}
                    </div>
                    <div className="text-sm text-red-600 font-medium">
                      {test.dueStatus.isOverdue
                        ? `Overdue: ${test.timeElapsed.displayText}`
                        : test.dueStatus.displayText}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <span>Sample ID: {test.barcode}</span>
                      <span className="mx-2">•</span>
                      <span>Sample Type: {test.sampleType}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        test.dueStatus.isOverdue
                          ? "bg-red-600 text-white"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {test.dueStatus.isOverdue ? "OVERDUE" : "URGENT"}
                    </div>
                    <button
                      onClick={() => setActiveModal("Process Test")}
                      className="text-xs text-red-600 hover:text-red-800 font-medium"
                    >
                      Process →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h3>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No recent activities</p>
              </div>
            ) : (
              recentActivities.slice(0, 4).map((activity) => {
                const ActivityIcon = getActivityIcon(activity.activityType);
                const color = getActivityColor(activity.activityType);
                const status = getActivityStatus(activity.metadata);

                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        color === "teal" ? "bg-teal-100" : "bg-orange-100"
                      }`}
                    >
                      <ActivityIcon
                        className={`w-6 h-6 ${
                          color === "teal" ? "text-teal-600" : "text-orange-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">
                        {getActivityTitle(activity)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Patient {activity.metadata?.patientId || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTimestamp(activity.timestamp)}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-3 py-1 rounded-full font-medium ${status.className}`}
                    >
                      {status.text}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal}
      >
        {getModalContent()}
      </Modal>
    </div>
  );
};

export default LabDashboardOverview;
