// src/components/Lab/UrgentSamples.js
import React from 'react';
import { FlaskConical } from 'lucide-react';

const UrgentSamples = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Urgent Samples</h3>
        <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-800 rounded-full">
          Priority
        </span>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
              <FlaskConical className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Sample #{1000 + i}</div>
              <div className="text-sm text-red-600">Due in {i} hour{i !== 1 ? 's' : ''}</div>
            </div>
            <div className="text-xs font-medium text-red-800">High</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrgentSamples;