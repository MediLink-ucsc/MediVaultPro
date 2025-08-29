// src/components/Nurse/NursePatients.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, Eye, User, Phone, ClipboardList, FileText, Activity, Pill } from 'lucide-react';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';
import VitalSignsForm from './VitalSignsForm';
import CarePlanForm from './CarePlanForm';
import PatientMedicalHistory from './PatientMedicalHistory';
import PatientCard from './PatientCard';
import PatientModals from './PatientModals';
import dataStore from '../../utils/dataStore';
// Backend integration removed

  const NursePatients = () => {
    const [patients, setPatients] = useState([
      {
        id: 1,
        firstName: 'Likitha',
        lastName: 'Chathubhashini',
        age: 34,
        gender: 'Female',
        phone: '071-1234567',
        condition: 'Stable',
        username: 'likitha.c',
        lastVisit: '2024-06-28',
      },
      {
        id: 2,
        firstName: 'Hansaja',
        lastName: 'Damsara',
        age: 45,
        gender: 'Male',
        phone: '072-9876543',
        condition: 'Monitoring',
        username: 'hansaja.d',
        lastVisit: '2024-06-25',
      },
      {
        id: 3,
        firstName: 'Sathya',
        lastName: 'Abeysinghe',
        age: 28,
        gender: 'Female',
        phone: '077-5551234',
        condition: 'Good',
        username: 'sathya.a',
        lastVisit: '2024-06-30',
      },
      {
        id: 4,
        firstName: 'Saranga',
        lastName: 'Dissanayake',
        age: 62,
        gender: 'Male',
        phone: '078-2223344',
        condition: 'Recovering',
        username: 'saranga.d',
        lastVisit: '2024-06-26',
      },
      {
        id: 5,
        firstName: 'Anjula',
        lastName: 'Himashi',
        age: 39,
        gender: 'Female',
        phone: '075-8889999',
        condition: 'Stable',
        username: 'anjula.h',
        lastVisit: '2024-06-29',
      },
    ]);
    const [patientVitalSigns, setPatientVitalSigns] = useState([]);
    const [patientCarePlans, setPatientCarePlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);
    const [showVitalSignsModal, setShowVitalSignsModal] = useState(false);
    const [showCarePlanModal, setShowCarePlanModal] = useState(false);
    const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
    const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedCarePlan, setSelectedCarePlan] = useState(null);
    const [latestVitalSigns, setLatestVitalSigns] = useState(null);



  // Backend fetchPatients removed

    const filteredPatients = patients.filter(patient => {
      const searchLower = searchTerm.toLowerCase();
      return (
        patient.firstName?.toLowerCase().includes(searchLower) ||
        patient.lastName?.toLowerCase().includes(searchLower) ||
        patient.condition?.toLowerCase().includes(searchLower)
      );
    });

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

  const handleNewPatientSubmit = (newPatient) => {
  console.log('New patient created:', newPatient);
  setShowNewPatientModal(false);
  // Reload patients from API
  // fetchPatients removed
  alert(`Patient ${newPatient.firstName} ${newPatient.lastName} has been registered successfully!`);
};

  const handleRecordVitals = (patient) => {
    setSelectedPatient(patient);
    setShowVitalSignsModal(true);
  };

  const handleVitalSignsSubmit = (vitalSigns) => {
    console.log('Vital signs recorded:', vitalSigns);
    setShowVitalSignsModal(false);
    setSelectedPatient(null);
    // Show success message
    alert(`Vital signs recorded successfully for ${selectedPatient.firstName} ${selectedPatient.lastName}!`);
  };

  const handleCancelVitalSigns = () => {
    setShowVitalSignsModal(false);
    setSelectedPatient(null);
  };

  const handleCreateCarePlan = (patient) => {
    setSelectedPatient(patient);
    setSelectedCarePlan(null);
    setShowCarePlanModal(true);
  };

  const handleCarePlanSubmit = (carePlan) => {
  console.log('Care plan saved:', carePlan);
  setShowCarePlanModal(false);
  setSelectedPatient(null);
  setSelectedCarePlan(null);
  // Reload patients (or care plans) from API
  // fetchPatients removed
  alert(`Care plan ${selectedCarePlan ? 'updated' : 'created'} successfully!`);
};

  const handleCancelCarePlan = () => {
    setShowCarePlanModal(false);
    setSelectedPatient(null);
    setSelectedCarePlan(null);
  };

  const handleViewMedicalHistory = (patient) => {
    setSelectedPatient(patient);
    setShowMedicalHistoryModal(true);
  };

  const handleCloseMedicalHistory = () => {
    setShowMedicalHistoryModal(false);
    setSelectedPatient(null);
  };

  const handleViewPatientDetails = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetailsModal(true);
  };

  const handleClosePatientDetails = () => {
    setShowPatientDetailsModal(false);
    setSelectedPatient(null);
  };

  const getPatientVitalSigns = (patientId) => {
    return patientVitalSigns.filter(vital => vital.patientId === patientId);
  };

  const getPatientCarePlans = (patientId) => {
    return patientCarePlans.filter(plan => plan.patientId === patientId);
  };


 const getLatestVitalSigns = (patientId) => {
   // Backend integration removed, return null or mock
   return null;
 };


  const getActiveCarePlans = (patientId) => {
    const plans = getPatientCarePlans(patientId);
    return plans.filter(plan => plan.status === 'active').length;
  };

  const getPatientMedications = (patientId) => {
    return dataStore.getMedications(patientId);
  };

  const getActiveMedications = (patientId) => {
    const medications = getPatientMedications(patientId);
    return medications.filter(med => med.status === 'Active');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Patient Care Hub</h1>
          <p className="text-gray-600 mt-2">Unified patient management with quick access to all assistant activities</p>
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
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
              <PatientCard
                key={patient.id}
                patient={patient}
                latestVitals={getLatestVitalSigns(patient.id)}
                activeCarePlans={getActiveCarePlans(patient.id)}
                onRecordVitals={handleRecordVitals}
                onCreateCarePlan={handleCreateCarePlan}
                onViewMedicalHistory={handleViewMedicalHistory}
                onViewPatientDetails={handleViewPatientDetails}
                getConditionColor={getConditionColor}
              />
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

      <PatientModals
        showNewPatientModal={showNewPatientModal}
        setShowNewPatientModal={setShowNewPatientModal}
        handleNewPatientSubmit={handleNewPatientSubmit}
        showVitalSignsModal={showVitalSignsModal}
        selectedPatient={selectedPatient}
        handleVitalSignsSubmit={handleVitalSignsSubmit}
        handleCancelVitalSigns={handleCancelVitalSigns}
        showCarePlanModal={showCarePlanModal}
        handleCancelCarePlan={handleCancelCarePlan}
        selectedCarePlan={selectedCarePlan}
        handleCarePlanSubmit={handleCarePlanSubmit}
        showMedicalHistoryModal={showMedicalHistoryModal}
        handleCloseMedicalHistory={handleCloseMedicalHistory}
        handleRecordVitals={handleRecordVitals}
        handleCreateCarePlan={handleCreateCarePlan}
        showPatientDetailsModal={showPatientDetailsModal}
        handleClosePatientDetails={handleClosePatientDetails}
        getLatestVitalSigns={getLatestVitalSigns}
        getPatientVitalSigns={getPatientVitalSigns}
        getPatientCarePlans={getPatientCarePlans}
        getActiveCarePlans={getActiveCarePlans}
        getActiveMedications={getActiveMedications}
        getPatientMedications={getPatientMedications}
      />
    </div>
  );
};

export default NursePatients;
