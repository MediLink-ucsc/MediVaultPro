// src/components/Nurse/NursePatients.js
import React, { useState, useEffect } from 'react';
import { Search, Filter, UserPlus, Eye, User, Phone, ClipboardList, FileText, Activity, Pill } from 'lucide-react';
import Button from '../Common/Button';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';
import VitalSignsForm from './VitalSignsForm';
import CarePlanForm from './CarePlanForm';
import dataStore from '../../utils/dataStore';
import axios from 'axios';

  const NursePatients = () => {
    const [patients, setPatients] = useState([]);
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

    useEffect(() => {
      fetchPatients();
    }, []);

    const fetchPatients = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(
      'http://localhost:3000/api/v1/auth/medvaultpro/doctor/patients',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Transform the API response to match the expected patient structure
    const transformedPatients = data.map(patient => ({
      id: patient.patientId,
      firstName: patient.user.firstName,
      lastName: patient.user.lastName,
      age: patient.age,
      gender: patient.gender,
      condition: patient.condition,
      lastVisit: patient.lastVisited,
      phone: patient.user.username, // Assuming username is phone number based on your data
      email: patient.user.email || '', // Add if available in API
      address: patient.user.address || '', // Add if available in API
      emergencyContact: patient.user.emergencyContact || '', // Add if available in API
      dateOfBirth: patient.user.dateOfBirth || '' // Add if available in API
    }));

    setPatients(transformedPatients);

    // If your API returns vitals/carePlans separately, set them too
    // setPatientVitalSigns(data.vitals || []);
    // setPatientCarePlans(data.carePlans || []);
  } catch (error) {
    console.error('Error fetching patients:', error);
    alert('Failed to fetch patients. Please try again.');
  } finally {
    setLoading(false);
  }
};

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
  fetchPatients();
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
  fetchPatients();
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


 const getLatestVitalSigns = async (patientId) => {
  try {
    const token = localStorage.getItem('token'); // JWT token
    const response = await axios.get(
      `http://localhost:3000/api/v1/patientRecords/quickexam/${patientId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

    setLatestVitalSigns(response.data);
    console.log('Latest vital signs:', response.data);
    console.log("Latest vital signs:", latestVitalSigns);


    // Return the first item since API returns descending order (latest first)
    return latestVitalSigns;
  } catch (error) {
    console.error('Error fetching latest vital signs:', error);
    return null;
  }
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
            {filteredPatients.map((patient) => {
              const latestVitals = getLatestVitalSigns(patient.id);
              const activeCarePlans = getActiveCarePlans(patient.id);
              
              return (
                <div key={patient.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
                        <p className="text-xs text-gray-500">ID: {patient.id}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionColor(patient.condition)}`}>
                      {patient.condition}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{patient.phone}</span>
                    </div>
                  </div>

                  {/* Patient Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Last Vitals</div>
                      <div className="text-sm font-medium text-gray-800">
                        {latestVitals ? new Date(latestVitals.recordedAt).toLocaleDateString() : 'None'}
                      </div>
                    </div>
                    <div className="text-center border-l border-gray-200">
                      <div className="text-xs text-gray-500">Care Plans</div>
                      <div className="text-sm font-medium text-orange-600">{activeCarePlans}</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Button
                      variant="primary"
                      role="nurse"
                      size="sm"
                      icon={Activity}
                      onClick={() => handleRecordVitals(patient)}
                      fullWidth
                    >
                      Record Vitals
                    </Button>
                    <Button
                      variant="outline"
                      role="nurse"
                      size="sm"
                      icon={ClipboardList}
                      onClick={() => handleCreateCarePlan(patient)}
                      fullWidth
                    >
                      Care Plan
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      role="nurse"
                      size="sm"
                      icon={FileText}
                      onClick={() => handleViewMedicalHistory(patient)}
                      fullWidth
                    >
                      History
                    </Button>
                    <Button
                      variant="secondary"
                      role="nurse"
                      size="sm"
                      icon={Eye}
                      onClick={() => handleViewPatientDetails(patient)}
                      fullWidth
                    >
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
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

      {/* Vital Signs Modal */}
      {showVitalSignsModal && selectedPatient && (
        <VitalSignsForm
          patient={selectedPatient}
          onSubmit={handleVitalSignsSubmit}
          onCancel={handleCancelVitalSigns}
        />
      )}

      {/* Care Plan Modal */}
      <Modal
        isOpen={showCarePlanModal}
        onClose={handleCancelCarePlan}
        title={selectedCarePlan ? "Edit Care Plan" : "Create Care Plan"}
        size="xl"
      >
        {selectedPatient && (
          <CarePlanForm
            patient={selectedPatient}
            onSubmit={handleCarePlanSubmit}
            onCancel={handleCancelCarePlan}
            existingPlan={selectedCarePlan}
          />
        )}
      </Modal>

      {/* Medical History Modal */}
      <Modal
        isOpen={showMedicalHistoryModal}
        onClose={handleCloseMedicalHistory}
        title="Medical History"
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {selectedPatient.firstName} {selectedPatient.lastName}
                </h3>
                <p className="text-sm text-gray-600">{selectedPatient.age} years • {selectedPatient.gender}</p>
              </div>
            </div>

            {/* Recent Vital Signs */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-orange-600" />
                <span>Recent Vital Signs</span>
              </h4>
              <div className="space-y-2">
                {getPatientVitalSigns(selectedPatient.id).slice(-3).map((vital, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">
                      {new Date(vital.recordedAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-4 text-gray-800">
                      <span>BP: {vital.bloodPressure}</span>
                      <span>HR: {vital.heartRate}</span>
                      <span>Temp: {vital.temperature}°{vital.temperatureUnit}</span>
                    </div>
                  </div>
                ))}
                {getPatientVitalSigns(selectedPatient.id).length === 0 && (
                  <p className="text-gray-500 text-sm">No vital signs recorded yet.</p>
                )}
              </div>
            </div>

            {/* Active Care Plans */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-orange-600" />
                <span>Active Care Plans</span>
              </h4>
              <div className="space-y-2">
                {getPatientCarePlans(selectedPatient.id).filter(plan => plan.status === 'active').map((plan, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                    <span className="font-medium text-gray-800">{plan.planType}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">
                        {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        plan.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        plan.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-teal-100 text-teal-800'
                      }`}>
                        {plan.priority}
                      </span>
                    </div>
                  </div>
                ))}
                {getPatientCarePlans(selectedPatient.id).filter(plan => plan.status === 'active').length === 0 && (
                  <p className="text-gray-500 text-sm">No active care plans.</p>
                )}
              </div>
            </div>

            {/* Medication History */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                <Pill className="w-5 h-5 text-orange-600" />
                <span>Medication History</span>
              </h4>
              <div className="space-y-3">
                {(() => {
                  const allMedications = getPatientMedications(selectedPatient.id);
                  if (allMedications.length > 0) {
                    return allMedications.map((medication, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-l-orange-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-800">{medication.medicationName}</span>
                              <span className="text-sm text-gray-600">{medication.dosage}</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                medication.status === 'Active' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {medication.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              {medication.frequency} • {medication.route}
                            </div>
                            <div className="text-xs text-gray-500 mb-1">
                              Prescribed by {medication.prescribedBy}
                            </div>
                            {medication.instructions && (
                              <div className="text-xs text-gray-500 italic">
                                Instructions: {medication.instructions}
                              </div>
                            )}
                          </div>
                          <div className="text-right text-xs text-gray-500 ml-4">
                            <div className="mb-1">
                              {medication.startDate} - {medication.endDate}
                            </div>
                            {medication.administeredBy && medication.administeredBy.length > 0 && (
                              <div className="text-teal-600 font-medium">
                                Administered: {medication.administeredBy.length} times
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ));
                  } else {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <Pill className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>No medications prescribed yet.</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Patient Details Modal */}
      <Modal
        isOpen={showPatientDetailsModal}
        onClose={handleClosePatientDetails}
        title="Patient Details"
        size="xl"
      >
        {selectedPatient && (
          <div className="space-y-6">
            {/* Patient Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedPatient.firstName} {selectedPatient.lastName}
                  </h3>
                  <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.gender}</p>
                  <p className="text-sm text-orange-600">Patient ID: {selectedPatient.id}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getConditionColor(selectedPatient.condition)}`}>
                {selectedPatient.condition}
              </span>
            </div>

            {/* Patient Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <User className="w-5 h-5 text-orange-600" />
                  <span>Personal Information</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">First Nameeee:</span>
                    <span className="font-medium">{selectedPatient.firstName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Name:</span>
                    <span className="font-medium">{selectedPatient.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Username:</span>
                    <span className="font-medium">{selectedPatient.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Age:</span>
                    <span className="font-medium">{selectedPatient.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gender:</span>
                    <span className="font-medium">{selectedPatient.gender}</span>
                  </div>
                </div>
              
            </div>


              {/* Current Vital Signs */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-orange-600" />
                  <span>Current Vital Signs</span>
                </h4>
                {(() => {
                  const latestVitals = getLatestVitalSigns(selectedPatient.id); // should fetch last quick exam
                  if (latestVitals) {
                    return (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-teal-50 rounded-lg">
                            <div className="text-lg font-bold text-teal-600">{latestVitals.bloodPressure}</div>
                            <div className="text-xs text-gray-600">Blood Pressure</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">{latestVitals.heartRate} bpm</div>
                            <div className="text-xs text-gray-600">Heart Rate</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-teal-50 rounded-lg">
                            <div className="text-lg font-bold text-teal-600">{latestVitals.temperature}°C</div>
                            <div className="text-xs text-gray-600">Temperature</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">{latestVitals.spo2 ?? 'N/A'}%</div>
                            <div className="text-xs text-gray-600">Oxygen Saturation</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-3">
                          <div className="text-center p-3 bg-teal-50 rounded-lg">
                            <div className="text-lg font-bold text-teal-600">{latestVitals.weight} kg</div>
                            <div className="text-xs text-gray-600">Weight</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">{latestVitals.height} cm</div>
                            <div className="text-xs text-gray-600">Height</div>
                          </div>
                        </div>

                        <div className="text-center text-sm text-gray-600 mt-2">
                          Last recorded: {new Date(latestVitals.createdAt).toLocaleString()}
                        </div>

                        {/* Optional: Display Doctor Info */}
                        {latestVitals.doctor && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <h5 className="text-sm font-medium text-gray-700 mb-1">Recorded by:</h5>
                            <p className="text-xs text-gray-600">
                              Dr. {latestVitals.doctor.user.firstName} {latestVitals.doctor.user.lastName} ({latestVitals.doctor.specialty})
                            </p>
                            <p className="text-xs text-gray-600">Hospital: {latestVitals.doctor.hospitalName}</p>
                          </div>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <Activity className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>No vital signs recorded yet</p>
                        <button
                          onClick={() => {
                            handleClosePatientDetails();
                            handleRecordVitals(selectedPatient);
                          }}
                          className="mt-2 text-orange-600 hover:text-orange-700 text-sm"
                        >
                          Record first vital signs
                        </button>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>


            {/* Current Medications */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                <Pill className="w-5 h-5 text-orange-600" />
                <span>Current Medications</span>
              </h4>
              <div className="space-y-3">
                {(() => {
                  const activeMedications = getActiveMedications(selectedPatient.id);
                  if (activeMedications.length > 0) {
                    return activeMedications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{medication.medicationName}</span>
                            <span className="text-sm text-gray-600">{medication.dosage}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {medication.frequency} • {medication.route}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Prescribed by {medication.prescribedBy}
                          </div>
                          {medication.instructions && (
                            <div className="text-xs text-gray-500 mt-1 italic">
                              {medication.instructions}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">
                            {medication.startDate} - {medication.endDate}
                          </div>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            medication.status === 'Active' ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {medication.status}
                          </span>
                        </div>
                      </div>
                    ));
                  } else {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <Pill className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>No active medications</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{getPatientVitalSigns(selectedPatient.id).length}</div>
                <div className="text-sm text-gray-600">Vital Sign Records</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{getActiveCarePlans(selectedPatient.id)}</div>
                <div className="text-sm text-gray-600">Active Care Plans</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{getActiveMedications(selectedPatient.id).length}</div>
                <div className="text-sm text-gray-600">Active Medications</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {selectedPatient.lastVisit ? new Date(selectedPatient.lastVisit).toLocaleDateString() : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Last Visit</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                role="nurse"
                size="md"
                icon={Activity}
                onClick={() => {
                  handleClosePatientDetails();
                  handleRecordVitals(selectedPatient);
                }}
              >
                Record Vitals
              </Button>
              <Button
                variant="outline"
                role="nurse"
                size="md"
                icon={ClipboardList}
                onClick={() => {
                  handleClosePatientDetails();
                  handleCreateCarePlan(selectedPatient);
                }}
              >
                Create Care Plan
              </Button>
              <Button
                variant="primary"
                role="nurse"
                size="md"
                onClick={handleClosePatientDetails}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NursePatients;
