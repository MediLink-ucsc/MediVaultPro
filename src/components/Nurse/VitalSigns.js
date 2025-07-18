// src/components/Nurse/VitalSigns.js
import React, { useState } from 'react';
import { Activity, Heart, Thermometer, User, Search, Plus, TrendingUp } from 'lucide-react';
import Button from '../Common/Button';

const VitalSigns = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock vital signs data
  const [vitalSigns] = useState([
    {
      id: 1,
      patient: 'Likitha Chathubhashini',
      room: 'ICU-101',
      temperature: '98.6°F',
      heartRate: '72 bpm',
      bloodPressure: '120/80',
      respiratoryRate: '16/min',
      oxygenSaturation: '98%',
      lastUpdated: '2 hours ago',
      status: 'normal'
    },
    {
      id: 2,
      patient: 'Hansaja Damsara',
      room: 'Ward-205',
      temperature: '99.2°F',
      heartRate: '85 bpm',
      bloodPressure: '140/90',
      respiratoryRate: '18/min',
      oxygenSaturation: '96%',
      lastUpdated: '1 hour ago',
      status: 'elevated'
    },
    {
      id: 3,
      patient: 'Sathya Abeysinghe',
      room: 'Maternity-302',
      temperature: '98.4°F',
      heartRate: '78 bpm',
      bloodPressure: '115/75',
      respiratoryRate: '14/min',
      oxygenSaturation: '99%',
      lastUpdated: '30 minutes ago',
      status: 'normal'
    },
    {
      id: 4,
      patient: 'Saranga Dissanayake',
      room: 'Ward-108',
      temperature: '100.1°F',
      heartRate: '95 bpm',
      bloodPressure: '150/95',
      respiratoryRate: '20/min',
      oxygenSaturation: '94%',
      lastUpdated: '15 minutes ago',
      status: 'concerning'
    }
  ]);

  const filteredVitalSigns = vitalSigns.filter(vital =>
    vital.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vital.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-teal-100 text-teal-800';
      case 'elevated':
        return 'bg-orange-100 text-orange-800';
      case 'concerning':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal':
        return <Activity className="w-4 h-4 text-teal-600" />;
      case 'elevated':
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'concerning':
        return <Heart className="w-4 h-4 text-orange-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Vital Signs Monitor</h1>
          <p className="text-gray-600 mt-2">Track and record patient vital signs</p>
        </div>
        <Button
          variant="primary"
          role="nurse"
          size="md"
          icon={Plus}
          onClick={() => {}}
        >
          Record Vitals
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients or rooms..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredVitalSigns.map((vital) => (
              <div key={vital.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{vital.patient}</h3>
                      <p className="text-sm text-gray-600">{vital.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(vital.status)}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                      {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Thermometer className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-medium text-gray-600">Temperature</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.temperature}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Heart className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-medium text-gray-600">Heart Rate</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.heartRate}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <span className="text-xs font-medium text-gray-600">Blood Pressure</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.bloodPressure}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <span className="text-xs font-medium text-gray-600">O2 Saturation</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{vital.oxygenSaturation}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">Last updated: {vital.lastUpdated}</span>
                  <Button
                    variant="secondary"
                    role="nurse"
                    size="sm"
                    onClick={() => {}}
                  >
                    Update Vitals
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredVitalSigns.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No vital signs found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
