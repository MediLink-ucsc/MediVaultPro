// src/components/Nurse/NursePatients.js
import React, { useState } from 'react';
import { Search, Filter, UserPlus, Eye, Stethoscope, Plus, Pill, Activity, User, MapPin, Phone } from 'lucide-react';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';

const NursePatients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);

  // Mock patient data for nurses
  const [patients] = useState([
    {
      id: 1,
      name: 'Likitha Chathubhashini',
      age: 34,
      gender: 'Female',
      room: 'ICU-101',
      condition: 'Stable',
      phone: '+94 1234 5678',
      assignedNurse: 'Current User'
    },
    {
      id: 2,
      name: 'Hansaja Damsara',
      age: 45,
      gender: 'Male',
      room: 'Ward-205',
      condition: 'Recovering',
      phone: '+94 1234 5678',
      assignedNurse: 'Current User'
    },
    {
      id: 3,
      name: 'Sathya Abeysinghe',
      age: 28,
      gender: 'Female',
      room: 'Maternity-302',
      condition: 'Good',
      phone: '+94 1234 5678',
      assignedNurse: 'Current User'
    },
    {
      id: 4,
      name: 'Saranga Dissanayake',
      age: 62,
      gender: 'Male',
      room: 'Ward-108',
      condition: 'Monitoring',
      phone: '+94 1234 5678',
      assignedNurse: 'Current User'
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'stable':
        return 'bg-teal-100 text-teal-800';
      case 'good':
        return 'bg-teal-100 text-teal-800';
      case 'recovering':
        return 'bg-teal-100 text-teal-800';
      case 'monitoring':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewPatientSubmit = (e) => {
    e.preventDefault();
    console.log('New patient form submitted');
    setShowNewPatientModal(false);
    // Here you would typically handle the form submission
    // and update the patients list
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your assigned patients</p>
        </div>
        <Button
          variant="primary"
          role="nurse"
          size="md"
          icon={UserPlus}
          onClick={() => setShowNewPatientModal(true)}
        >
          Add New Patient
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients or rooms..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              role="nurse"
              size="sm"
              icon={Filter}
            >
              Filter
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(patient.condition)}`}>
                    {patient.condition}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Room: {patient.room}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{patient.phone}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    role="nurse"
                    size="sm"
                    icon={Eye}
                    fullWidth
                  >
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    role="nurse"
                    size="sm"
                    fullWidth
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showNewPatientModal}
        onClose={() => setShowNewPatientModal(false)}
        title="Register New Patient"
        size="lg"
      >
        <NewPatientForm onSubmit={handleNewPatientSubmit} />
      </Modal>
    </div>
  );
};

export default NursePatients;
