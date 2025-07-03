// src/components/Nurse/NurseDashboardOverview.js
import React from 'react';
import { Users, Pill, Activity, ClipboardList } from 'lucide-react';
import StatsCard from '../Common/StatsCard';

const NurseDashboardOverview = () => {
  const stats = [
    { title: 'Assigned Patients', value: '24', icon: Users, color: 'teal', trend: '+2%' },
    { title: 'Medications Due', value: '8', icon: Pill, color: 'orange', trend: '0%' },
    { title: 'Vital Signs Pending', value: '12', icon: Activity, color: 'teal', trend: '-3%' },
    { title: 'Care Plans Active', value: '18', icon: ClipboardList, color: 'orange', trend: '+1%' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Nurse Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Nurse Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Priority Patients</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Critical Patient {i}</div>
                  <div className="text-sm text-red-600">Requires immediate attention</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Medication Schedule</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Patient {i} - Medication</div>
                  <div className="text-sm text-gray-600">Due at {8 + i}:00 AM</div>
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
