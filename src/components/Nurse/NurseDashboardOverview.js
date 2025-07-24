// src/components/Nurse/NurseDashboardOverview.js
import React from "react";
import {
  Users,
  Pill,
  Activity,
  ClipboardList,
  Stethoscope,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../Common/StatsCard";
import Button from "../Common/Button";

const NurseDashboardOverview = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Patients",
      value: "24",
      icon: Users,
      color: "teal",
      trend: "+2%",
    },
    {
      title: "Medications Due",
      value: "8",
      icon: Pill,
      color: "orange",
      trend: "0%",
    }, // Orange for urgent medications
    {
      title: "Vital Signs Pending",
      value: "12",
      icon: Activity,
      color: "teal",
      trend: "-3%",
    },
    {
      title: "Care Plans Active",
      value: "18",
      icon: ClipboardList,
      color: "teal",
      trend: "+1%",
    },
  ];

  const quickActions = [
    {
      title: "Patient Care Hub",
      icon: Users,
      color: "teal",
      description: "Access all patient activities",
      route: "/nurse/patients",
    },
    {
      title: "Med Schedule",
      icon: Clock,
      color: "orange", // Orange for urgent medication management
      description: "View medication timeline",
      route: "/nurse/medications",
    },
    {
      title: "Record Vitals",
      icon: Stethoscope,
      color: "teal",
      description: "Quick vital signs entry",
      route: "/nurse/patients",
    },
  ];

  const handleQuickAction = (action) => {
    if (action.route) {
      navigate(action.route);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Assistant Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Streamlined assistant workflow with consolidated patient care
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={index}
                onClick={() => handleQuickAction(action)}
                variant="secondary"
                role={action.color === "orange" ? "urgent" : "assistant"}
                size="lg"
                icon={IconComponent}
                className="flex-col h-auto py-6 text-center"
                fullWidth
              >
                <div className="mt-2">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Priority Patients
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    Critical Patient {i}
                  </div>
                  <div className="text-sm text-orange-600">
                    Requires immediate attention
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Medication Schedule
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">
                    Patient {i} - Medication
                  </div>
                  <div className="text-sm text-gray-600">
                    Due at {8 + i}:00 AM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboardOverview;
