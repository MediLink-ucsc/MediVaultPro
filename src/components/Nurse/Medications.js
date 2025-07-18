// src/components/Nurse/Medications.js
import React, { useState } from 'react';
import { Clock, User, Pill, Check, AlertTriangle, Search } from 'lucide-react';
import Button from '../Common/Button';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTime, setSelectedTime] = useState('all');

  // Mock medication schedule data
  const [medications] = useState([
    {
      id: 1,
      patient: 'Likitha Chathubhashini',
      room: 'ICU-101',
      medication: 'Amoxicillin 500mg',
      time: '08:00',
      frequency: 'Every 8 hours',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      patient: 'Hansaja Damsara',
      room: 'Ward-205',
      medication: 'Lisinopril 10mg',
      time: '09:00',
      frequency: 'Once daily',
      status: 'completed',
      priority: 'normal'
    },
    {
      id: 3,
      patient: 'Sathya Abeysinghe',
      room: 'Maternity-302',
      medication: 'Prenatal vitamins',
      time: '10:00',
      frequency: 'Once daily',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: 4,
      patient: 'Saranga Dissanayake',
      room: 'Ward-108',
      medication: 'Celecoxib 200mg',
      time: '12:00',
      frequency: 'Twice daily',
      status: 'overdue',
      priority: 'high'
    }
  ]);

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTime = selectedTime === 'all' || med.status === selectedTime;
    return matchesSearch && matchesTime;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-teal-100 text-teal-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'overdue':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    }
    return null;
  };

  const handleMarkCompleted = (id) => {
    // Handle marking medication as completed
    console.log('Mark completed:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Medication Schedule</h1>
        <p className="text-gray-600 mt-2">Track and administer patient medications</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medications, patients, or rooms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredMedications.map((med) => (
              <div key={med.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                          <span>{med.medication}</span>
                          {getPriorityIcon(med.priority)}
                        </h3>
                        <p className="text-sm text-gray-600">{med.frequency}</p>
                      </div>
                    </div>
                    
                    <div className="ml-13 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{med.patient} - {med.room}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Scheduled: {med.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(med.status)}`}>
                      {med.status.charAt(0).toUpperCase() + med.status.slice(1)}
                    </span>
                    
                    {med.status !== 'completed' && (
                      <Button
                        variant="secondary"
                        role="nurse"
                        size="sm"
                        icon={Check}
                        onClick={() => handleMarkCompleted(med.id)}
                      >
                        Mark Given
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMedications.length === 0 && (
            <div className="text-center py-12">
              <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No medications found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medications;
