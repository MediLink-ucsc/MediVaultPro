// src/components/Doctor/Analytics.js
import React from 'react';
import { BarChart3, Activity, TrendingUp, Users } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    { title: 'Patient Visits', value: '245', change: '+12%', icon: Users },
    { title: 'Prescriptions', value: '189', change: '+8%', icon: Activity },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600 mt-2">Practice performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <p className={`mt-3 text-sm ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change} from last month
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-gray-300" />
          <p className="ml-2 text-gray-400">Chart visualization will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;