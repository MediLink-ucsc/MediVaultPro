// src/components/Lab/RecentResults.js
import React from 'react';
import { CheckCircle } from 'lucide-react';

const RecentResults = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Results</h3>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Test #{2000 + i}</div>
              <div className="text-sm text-gray-600">Completed {i * 15} mins ago</div>
            </div>
            <button className="text-xs font-medium text-teal-600 hover:text-teal-800">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentResults;