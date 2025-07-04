// src/components/Lab/UrgentSamples.js
import React from 'react';
import { FlaskConical, AlertTriangle, Clock, User } from 'lucide-react';

const UrgentSamples = () => {
  const urgentSamples = [
    { id: 'S1001', type: 'Blood Culture', patient: 'Hansaja', dueTime: '2 hours', priority: 'STAT', location: 'ICU' },
    { id: 'S1002', type: 'Cardiac Enzymes', patient: 'Likitha', dueTime: '1 hour', priority: 'URGENT', location: 'ER' },
    { id: 'S1003', type: 'Glucose Test', patient: 'Anji', dueTime: '30 mins', priority: 'STAT', location: 'Ward A' },
    { id: 'S1004', type: 'CBC', patient: 'Sathya', dueTime: '45 mins', priority: 'URGENT', location: 'Outpatient' },
  ];

  const getPriorityColor = (priority) => {
    return priority === 'STAT' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700';
  };

  const getPriorityIcon = (priority) => {
    return priority === 'STAT' ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Urgent Samples</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-800 rounded-full">
            {urgentSamples.length} Priority
          </span>
        </div>
      </div>
      <div className="space-y-3">
        {urgentSamples.map((sample) => (
          <div key={sample.id} className="flex items-center p-4 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors duration-200">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
              <FlaskConical className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{sample.id}</div>
              <div className="text-sm text-gray-700">{sample.type}</div>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <User className="w-3 h-3 mr-1" />
                {sample.patient} • {sample.location}
              </div>
              <div className="flex items-center text-xs text-red-600 font-medium mt-1">
                <Clock className="w-3 h-3 mr-1" />
                Due in {sample.dueTime}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className={`flex items-center space-x-1 text-xs font-medium px-3 py-1 rounded-full ${getPriorityColor(sample.priority)}`}>
                {getPriorityIcon(sample.priority)}
                <span>{sample.priority}</span>
              </div>
              <button className="text-xs text-red-700 hover:text-red-900 font-medium bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition-colors duration-200">
                Process →
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-red-200">
        <button className="w-full text-sm text-red-600 hover:text-red-700 font-medium">
          View All Urgent Samples →
        </button>
      </div>
    </div>
  );
};

export default UrgentSamples;