// src/components/Nurse/CarePlans.js
import React, { useState } from 'react';
import { ClipboardList, User, Calendar, CheckCircle, Circle, Search, Plus } from 'lucide-react';

const CarePlans = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock care plans data
  const [carePlans] = useState([
    {
      id: 1,
      patient: 'Likitha Chathubhashini',
      room: 'ICU-101',
      planType: 'Post-Surgical Care',
      startDate: '2024-06-28',
      endDate: '2024-07-05',
      progress: 75,
      tasks: [
        { id: 1, task: 'Monitor vital signs every 2 hours', completed: true },
        { id: 2, task: 'Administer pain medication as needed', completed: true },
        { id: 3, task: 'Encourage deep breathing exercises', completed: false },
        { id: 4, task: 'Assist with mobility as tolerated', completed: false }
      ]
    },
    {
      id: 2,
      patient: 'Hansaja Damsara',
      room: 'Ward-205',
      planType: 'Diabetes Management',
      startDate: '2024-06-25',
      endDate: '2024-07-25',
      progress: 60,
      tasks: [
        { id: 1, task: 'Monitor blood glucose levels', completed: true },
        { id: 2, task: 'Dietary counseling and education', completed: true },
        { id: 3, task: 'Medication compliance review', completed: false },
        { id: 4, task: 'Foot care assessment', completed: false }
      ]
    },
    {
      id: 3,
      patient: 'Sathya Abeysinghe',
      room: 'Maternity-302',
      planType: 'Prenatal Care',
      startDate: '2024-06-01',
      endDate: '2024-12-01',
      progress: 40,
      tasks: [
        { id: 1, task: 'Weekly prenatal check-ups', completed: true },
        { id: 2, task: 'Nutritional guidance', completed: true },
        { id: 3, task: 'Birthing class enrollment', completed: false },
        { id: 4, task: 'Pediatrician selection assistance', completed: false }
      ]
    }
  ]);

  const filteredCarePlans = carePlans.filter(plan =>
    plan.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.planType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-teal-500';
    if (progress >= 60) return 'bg-teal-400';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Care Plans</h1>
          <p className="text-gray-600 mt-2">Manage and track patient care plans</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200 flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Care Plan</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search care plans, patients, or rooms..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {filteredCarePlans.map((plan) => (
              <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{plan.patient}</h3>
                      <p className="text-sm text-gray-600">{plan.room} • {plan.planType}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(plan.progress)}`}
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{plan.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                    <ClipboardList className="w-5 h-5 text-orange-600" />
                    <span>Care Plan Tasks</span>
                  </h4>
                  
                  <div className="space-y-2">
                    {plan.tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3">
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-teal-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {plan.tasks.filter(task => task.completed).length} of {plan.tasks.length} tasks completed
                    </span>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                      Update Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCarePlans.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No care plans found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarePlans;
