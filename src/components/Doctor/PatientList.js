// src/components/Doctor/PatientList.js
import React, { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical, X } from 'lucide-react';
import NewPatientForm from './QuickActions/NewPatientForm';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showNewPatientModal, setShowNewPatientModal] = useState(false);
  const [patients, setPatients] = useState([
    { id: 1, name: 'Hansaja Boss', age: 45, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-25', condition: 'Hypertension' },
    { id: 2, name: 'Greatest Dulmini', age: 32, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-24', condition: 'Diabetes' },
    { id: 3, name: 'Moda Anji', age: 58, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-23', condition: 'Arthritis' },
    { id: 4, name: 'Cute Sathya', age: 29, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-22', condition: 'Allergy' }
  ]);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };



  const handleEdit = (patientId) => {
    console.log('Edit patient:', patientId);
    setActiveDropdown(null);
  };

  const handleDelete = (patientId) => {
    console.log('Delete patient:', patientId);
    // Remove the patient from the state
    setPatients(patients.filter(patient => patient.id !== patientId));
    setActiveDropdown(null);
  };

  const handleViewRecords = (patientId) => {
    console.log('View records for:', patientId);
    setActiveDropdown(null);
  };

  const handleScheduleAppointment = (patientId) => {
    console.log('Schedule appointment for:', patientId);
    setActiveDropdown(null);
  };

  const handleAddPatient = () => {
    setShowNewPatientModal(true);
  };

  const handleCloseModal = () => {
    setShowNewPatientModal(false);
  };

  const handleSubmitNewPatient = (patientData) => {
    console.log('New patient data:', patientData);
    // Add the new patient to the state
    const newPatient = {
      id: patients.length + 1,
      name: patientData.name,
      age: patientData.age,
      phone: patientData.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      condition: patientData.condition || 'General'
    };
    setPatients([...patients, newPatient]);
    setShowNewPatientModal(false);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <button 
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 flex items-center space-x-2"
          onClick={handleAddPatient}
        >
          <Plus className="w-5 h-5" />
          <span>Add Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Search and filter section remains the same */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Patient table remains the same */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="text-teal-600 hover:text-teal-800 p-1 rounded hover:bg-teal-50"
                        title="View"
                        onClick={() => handleViewRecords(patient.id)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="Edit"
                        onClick={() => handleEdit(patient.id)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                        title="Delete"
                        onClick={() => handleDelete(patient.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="relative">
                        <button 
                          className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-50"
                          onClick={() => toggleDropdown(patient.id)}
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        {activeDropdown === patient.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <div className="py-1">
                              <button
                                onClick={() => handleScheduleAppointment(patient.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Schedule Appointment
                              </button>
                              <button
                                onClick={() => handleViewRecords(patient.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                View Medical Records
                              </button>
                              <button
                                onClick={() => handleEdit(patient.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit Profile
                              </button>
                              <button
                                onClick={() => handleDelete(patient.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Delete Patient
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Patient Modal */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Add New Patient</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <NewPatientForm 
                onSubmit={handleSubmitNewPatient} 
                onCancel={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;