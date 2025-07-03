// src/components/LabOperator/Analytics.js
import React from 'react';

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Categories</h3>
        <div className="space-y-3">
          {[
            { name: 'Blood Tests', count: 23, color: 'teal' },
            { name: 'Urine Tests', count: 15, color: 'orange' },
            { name: 'Imaging', count: 8, color: 'teal' },
            { name: 'Cultures', count: 6, color: 'orange' },
          ].map((category, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color === 'teal' ? 'bg-teal-500' : 'bg-orange-500'}`}></div>
                <span className="font-medium text-gray-800">{category.name}</span>
              </div>
              <span className="text-sm text-gray-600">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Equipment Status</h3>
        <div className="space-y-3">
          {[
            { name: 'Microscope A', status: 'Active', color: 'teal' },
            { name: 'Analyzer B', status: 'Active', color: 'teal' },
            { name: 'Centrifuge C', status: 'Maintenance', color: 'orange' },
            { name: 'X-Ray Machine', status: 'Active', color: 'teal' },
          ].map((equipment, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-800">{equipment.name}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                equipment.color === 'teal' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {equipment.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h3>
        <div className="space-y-4">
          <div className="text-center p-4 bg-teal-50 rounded-lg">
            <div className="text-2xl font-bold text-teal-600">23</div>
            <div className="text-sm text-teal-700">Tests Completed</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">47</div>
            <div className="text-sm text-orange-700">Tests Pending</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-600">92%</div>
            <div className="text-sm text-gray-700">Efficiency Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;