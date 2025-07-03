// src/components/Doctor/Diagnostics.js
import React from 'react';
import { FlaskConical, Scan, Plus } from 'lucide-react';

const Diagnostics = () => {
  const tests = [
    { name: 'CBC', date: '2023-05-15', status: 'Completed' },
    { name: 'Lipid Panel', date: '2023-05-10', status: 'Pending' },
    { name: 'MRI Brain', date: '2023-05-05', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Diagnostics</h1>
        <p className="text-gray-600 mt-2">View and order diagnostic tests</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Recent Tests</h3>
          <button className="flex items-center space-x-1 text-teal-600 hover:text-teal-800">
            <Plus className="w-4 h-4" />
            <span>New Order</span>
          </button>
        </div>

        <div className="space-y-4">
          {tests.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  {test.name.includes('MRI') ? (
                    <Scan className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FlaskConical className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{test.name}</div>
                  <div className="text-sm text-gray-500">{test.date}</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${
                test.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {test.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;