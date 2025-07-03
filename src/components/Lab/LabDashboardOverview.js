// src/components/Lab/LabDashboardOverview.js
import React from 'react';
import { FlaskConical, TestTube, Clock, CheckCircle } from 'lucide-react';
import StatsCard from '../Common/StatsCard';

const LabDashboardOverview = () => {
  const stats = [
    { title: 'Pending Samples', value: '34', icon: FlaskConical, color: 'teal', trend: '+5%' },
    { title: 'Tests in Progress', value: '12', icon: TestTube, color: 'orange', trend: '+2%' },
    { title: 'Results Ready', value: '28', icon: CheckCircle, color: 'teal', trend: '+8%' },
    { title: 'Avg Turnaround', value: '2.4h', icon: Clock, color: 'orange', trend: '-12%' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Lab Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, Lab Operator</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Urgent Samples</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Sample #{1000 + i}</div>
                  <div className="text-sm text-red-600">Priority - Due in {i} hours</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Results</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Test Result #{2000 + i}</div>
                  <div className="text-sm text-gray-600">Completed {i} minutes ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboardOverview;