// src/components/Lab/RecentResults.js
import React from 'react';
import { CheckCircle, Eye, Download, Clock } from 'lucide-react';

const RecentResults = () => {
  const recentResults = [
    { id: 'T2001', type: 'Blood Test - CBC', patient: 'Hansaja', completedTime: '15 mins ago', status: 'completed' },
    { id: 'T2002', type: 'Urinalysis', patient: 'Likitha', completedTime: '32 mins ago', status: 'completed' },
    { id: 'T2003', type: 'X-Ray Chest', patient: 'Anji', completedTime: '1 hour ago', status: 'completed' },
    { id: 'T2004', type: 'Lipid Panel', patient: 'Sathya', completedTime: '2 hours ago', status: 'completed' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Results</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
          <span className="text-sm text-gray-500">{recentResults.length} completed</span>
        </div>
      </div>
      <div className="space-y-3">
        {recentResults.map((result) => (
          <div key={result.id} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mr-4">
              <CheckCircle className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{result.id}</div>
              <div className="text-sm text-gray-600">{result.type}</div>
              <div className="text-sm text-gray-500">Patient: {result.patient}</div>
              <div className="flex items-center text-xs text-teal-600 mt-1">
                <Clock className="w-3 h-3 mr-1" />
                Completed {result.completedTime}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200" title="View Report">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200" title="Download">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-gray-200">
        <button className="w-full text-sm text-teal-600 hover:text-teal-700 font-medium">
          View All Results →
        </button>
      </div>
    </div>
  );
};

export default RecentResults;