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
import { jwtDecode } from 'jwt-decode'; // correct for your version
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
const token = localStorage.getItem('token');
if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded); // nurse info should show
}

const NurseDashboardOverview = () => {

   const navigate = useNavigate();

    const [stats, setStats] = useState([
      {
        title: "Total Patients",
        value: "-",
        icon: Users,
        color: "teal",
        description: "Patients assigned to you",
      },
      {
        title: "Prescriptions Count",
        value: "-",
        icon: Pill,
        color: "orange",
        description: "Prescriptions scheduled for today",
      },
       {
        title: "Emergency Patients",
        value: "-",
        icon: Stethoscope,
        color: "red",
        description: "Patients currently marked as emergency",
      },
    ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch both APIs in parallel
        const [patientRes, prescriptionRes, emergencyRes] = await Promise.all([
          axios.get(
            "http://localhost:3000/api/v1/patientRecords/nurse/patientcount",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "http://localhost:3000/api/v1/patientRecords/nurse/prescriptioncount",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "http://localhost:3000/api/v1/patientRecords/nurse/emergencypatients",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);


        const patientCount = patientRes.data.patientCount ?? 0;
        const prescriptionCount = prescriptionRes.data.todayPrescriptionCount ?? 0;
        const emergencyPatientCount = emergencyRes.data.emergencyPatientCount ?? 0;


        console.log("Fetched Stats:", { patientCount, prescriptionCount, emergencyPatientCount });

        setStats((prev) =>
          prev.map((s) => {
            if (s.title === "Total Patients") return { ...s, value: String(patientCount) };
            if (s.title === "Prescriptions Count") return { ...s, value: String(prescriptionCount) };
            if (s.title === "Emergency Patients") return { ...s, value: String(emergencyPatientCount) };
            return s;
          })
        );
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);
 
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
      title: "Give Care Plan",
      icon: Stethoscope,
      color: "teal",
      description: "Care plan entry",
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Assistant Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Streamlined assistant workflow with consolidated patient care
        </p>
      </div>

      {/* Stats Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-lg shadow p-6 border-l-4 border-${stat.color}-500 flex flex-col justify-between min-h-[140px] space-y-3`}
            >
              <div className="flex items-center space-x-2">
                <IconComponent className={`w-6 h-6 text-${stat.color}-500`} />
                <span className="text-gray-700 font-semibold text-lg">{stat.title}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
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
                className="flex-col h-auto min-h-[160px] py-8 text-center" // increased height
                fullWidth
              >
                <div className="mt-2">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs opacity-80 mt-1">{action.description}</div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

    </div>

  );
};

export default NurseDashboardOverview;
