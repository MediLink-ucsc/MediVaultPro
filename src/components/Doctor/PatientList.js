// src/components/Doctor/PatientList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Eye, Trash2, Calendar, FileText, Pill, Stethoscope, ClipboardList } from 'lucide-react';
import Modal from '../Common/Modal';
import LabOrderForm from './QuickActions/LabOrderForm';
import PrescriptionForm from './QuickActions/PrescriptionForm';
import QuickExamForm from './QuickActions/QuickExamForm';
import SOAPForm from './QuickActions/SOAPForm';
import PatientDetails from './PatientDetails';

const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'lab', 'prescription', 'exam', 'soap'
    patient: null
  });
  const [showActionSelector, setShowActionSelector] = useState({
    isOpen: false,
    patient: null
  });
  const [patients, setPatients] = useState([
    { id: 1, name: 'Likitha', age: 45, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-25', condition: 'Hypertension' },
    { id: 2, name: 'Dulmini', age: 32, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-24', condition: 'Diabetes' },
    { id: 3, name: 'Anji', age: 58, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-23', condition: 'Arthritis' },
    { id: 4, name: 'Sathya', age: 29, phone: 'xxx xxxx xxxx', lastVisit: '2024-06-22', condition: 'Allergy' }
  ]);

  // Remove the dropdown click outside handler since we're removing dropdowns

  const openQuickActionModal = (type, patient) => {
    setModalState({
      isOpen: true,
      type,
      patient
    });
    setShowActionSelector({ isOpen: false, patient: null });
  };

  const openActionSelector = (patient) => {
    setShowActionSelector({
      isOpen: true,
      patient
    });
  };

  const closeActionSelector = () => {
    setShowActionSelector({
      isOpen: false,
      patient: null
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      patient: null
    });
  };

  const handleQuickActionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log(`${modalState.type} form submitted for patient:`, modalState.patient?.name, data);
    
    // Here you would typically send the data to your backend
    // For now, we'll just close the modal
    closeModal();
    
    // Show success message (you could implement a toast notification here)
    alert(`${modalState.type} successfully created for ${modalState.patient?.name}`);
  };

  const handleDelete = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (window.confirm(`Are you sure you want to delete ${patient?.name}? This action cannot be undone.`)) {
      console.log('Delete patient:', patientId);
      // Remove the patient from the state
      setPatients(patients.filter(patient => patient.id !== patientId));
      alert(`${patient?.name} has been deleted successfully.`);
    }
  };

  const handleViewRecords = (patientId) => {
    console.log('View records for:', patientId);
    const patient = patients.find(p => p.id === patientId);
    setSelectedPatient(patient);
  };

  const handleScheduleCalendarEvent = (patientId) => {
    console.log('Schedule calendar event for:', patientId);
    const patient = patients.find(p => p.id === patientId);
    
    // Store patient data in localStorage to pass to calendar
    localStorage.setItem('selectedPatientForAppointment', JSON.stringify({
      id: patient?.id,
      name: patient?.name,
      phone: patient?.phone,
      condition: patient?.condition
    }));
    
    // Navigate to the calendar component in sidebar
    navigate('/doctor/calendar');
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If a patient is selected, show the patient details view
  if (selectedPatient) {
    return <PatientDetails patient={selectedPatient} onBack={handleBackToList} />;
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <div className="text-sm text-gray-500">
          💡 Click on any patient to perform quick actions
        </div>
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
                <tr 
                  key={patient.id} 
                  className="hover:bg-teal-50 cursor-pointer transition-colors"
                  onClick={() => openActionSelector(patient)}
                >
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
                        title="View Records"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewRecords(patient.id);
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="Schedule Appointment"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScheduleCalendarEvent(patient.id);
                        }}
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-orange-700 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                        title="Delete Patient"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(patient.id);
                        }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Selector Modal */}
      <Modal 
        isOpen={showActionSelector.isOpen} 
        onClose={closeActionSelector}
        title={`Select Action for ${showActionSelector.patient?.name || ''}`}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">What would you like to do with this patient?</p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => openQuickActionModal('soap', showActionSelector.patient)}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group"
            >
              <ClipboardList className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">SOAP Note</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Document patient examination</span>
            </button>

            <button
              onClick={() => openQuickActionModal('lab', showActionSelector.patient)}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group"
            >
              <FileText className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Lab Orders</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Order laboratory tests</span>
            </button>

            <button
              onClick={() => openQuickActionModal('exam', showActionSelector.patient)}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
            >
              <Stethoscope className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Quick Exam</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Record quick examination</span>
            </button>

            <button
              onClick={() => openQuickActionModal('prescription', showActionSelector.patient)}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
            >
              <Pill className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Prescription</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Prescribe medications</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Quick Action Modal */}
      <Modal 
        isOpen={modalState.isOpen} 
        onClose={closeModal}
        title={`${modalState.type === 'lab' ? 'Lab Orders' : 
                modalState.type === 'prescription' ? 'Prescription' : 
                modalState.type === 'soap' ? 'SOAP Note' :
                'Quick Exam'} - ${modalState.patient?.name || ''}`}
        size="lg"
      >
        {modalState.type === 'soap' && (
          <SOAPForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />
        )}
        {modalState.type === 'lab' && (
          <LabOrderForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />
        )}
        {modalState.type === 'prescription' && (
          <PrescriptionForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />
        )}
        {modalState.type === 'exam' && (
          <QuickExamForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />
        )}
      </Modal>
    </div>
  );
};

export default PatientList;