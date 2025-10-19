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
import axios from 'axios';
// Backend integration removed

  const NursePatients = () => {

   
    const [patientVitalSigns, setPatientVitalSigns] = useState([]);
    const [patientCarePlans, setPatientCarePlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);
    const [showCarePlanModal, setShowCarePlanModal] = useState(false);
    const [showViewCarePlansModal, setShowViewCarePlansModal] = useState(false);
    const [showMedicalHistoryModal, setShowMedicalHistoryModal] = useState(false);
    const [showPatientDetailsModal, setShowPatientDetailsModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedCarePlan, setSelectedCarePlan] = useState(null);
    const [latestVitalSigns, setLatestVitalSigns] = useState(null);

    const [patients, setPatients] = useState([]);

    useEffect(() => {
      const fetchPatients = async () => {
        try {
           const token = localStorage.getItem('token'); // or sessionStorage, depending on login flow

          const response = await axios.get(
            'http://localhost:3000/api/v1/patientRecords/patientlist',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = response.data;
          // Map API data to your PatientCard format
          const formattedPatients = data.map((item) => ({
            id: item.patientId,
            firstName: item.user.firstName,
            lastName: item.user.lastName,
            age: item.age,
            gender: item.gender,
            phone: item.user.username,
            condition: item.condition,
            lastVisit: item.lastVisited,
          }));

          setPatients(formattedPatients);
        } catch (error) {
          console.error('Error fetching patients:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPatients();
    }, []);



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
      return 'bg-green-100 text-green-800';
    case 'recovering':
      return 'bg-yellow-100 text-yellow-800';
    case 'monitoring':
      return 'bg-orange-100 text-orange-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'emergency':
      return 'bg-red-200 text-red-900';
    case 'serious':
      return 'bg-red-300 text-red-900';
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

  const handleViewCarePlans = (patient) => {
    setSelectedPatient(patient);
    setShowViewCarePlansModal(true);
  };

  const handleCloseViewCarePlans = () => {
    setShowViewCarePlansModal(false);
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

  const handleUpdateCarePlan = (carePlan) => {
    setSelectedCarePlan(carePlan);
    setSelectedPatient(patients.find(p => p.id === carePlan.patientId));
    setShowViewCarePlansModal(false);
    setShowCarePlanModal(true);
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

  // Sample care plans data for demonstration
  const getSampleCarePlans = (patientId) => {
    return [
      {
        id: 1,
        patientId: patientId,
        planType: "Post-Surgical Care",
        priority: "High",
        startDate: "2024-10-15",
        endDate: "2024-11-15",
        description: "Comprehensive post-surgical care plan focusing on recovery and preventing complications. Monitor patient's healing progress and manage pain effectively.",
        goals: "Full recovery without complications, return to normal activities within 4 weeks, pain management, infection prevention",
        status: "Active",
        progress: 75,
        tasks: [
          { 
            id: 1, 
            task: "Monitor vital signs every 4 hours", 
            dueDate: "2024-10-20",
            priority: "High",
            completed: true,
            completedDate: "2024-10-16",
            completedBy: "Nurse Sarah Johnson"
          },
          { 
            id: 2, 
            task: "Administer pain medication as prescribed", 
            dueDate: "2024-10-25",
            priority: "High",
            completed: true,
            completedDate: "2024-10-17",
            completedBy: "Nurse Sarah Johnson"
          },
          { 
            id: 3, 
            task: "Encourage mobility and walking exercises", 
            dueDate: "2024-10-30",
            priority: "Medium",
            completed: true,
            completedDate: "2024-10-18",
            completedBy: "Nurse Sarah Johnson"
          },
          { 
            id: 4, 
            task: "Monitor surgical site for infection signs", 
            dueDate: "2024-11-10",
            priority: "High",
            completed: false 
          },
          { 
            id: 5, 
            task: "Coordinate physical therapy sessions", 
            dueDate: "2024-11-15",
            priority: "Medium",
            completed: false 
          }
        ],
        createdBy: "Nurse Sarah Johnson",
        createdDate: "2024-10-15"
      },
      {
        id: 2,
        patientId: patientId,
        planType: "Diabetes Management",
        priority: "Medium",
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        description: "Long-term diabetes management plan to maintain optimal blood glucose levels and prevent complications. Includes dietary monitoring and medication compliance.",
        goals: "Maintain HbA1c below 7%, prevent diabetic complications, improve quality of life through proper glucose management",
        status: "Active",
        progress: 60,
        tasks: [
          { 
            id: 1, 
            task: "Check blood glucose levels twice daily", 
            dueDate: "2024-12-31",
            priority: "High",
            completed: true,
            completedDate: "2024-10-10",
            completedBy: "Nurse Maria Garcia"
          },
          { 
            id: 2, 
            task: "Administer insulin as prescribed", 
            dueDate: "2024-12-31",
            priority: "High",
            completed: true,
            completedDate: "2024-10-12",
            completedBy: "Nurse Maria Garcia"
          },
          { 
            id: 3, 
            task: "Monitor diet and carbohydrate intake", 
            dueDate: "2024-11-30",
            priority: "Medium",
            completed: false 
          },
          { 
            id: 4, 
            task: "Daily foot inspection for diabetic complications", 
            dueDate: "2024-12-31",
            priority: "Medium",
            completed: true,
            completedDate: "2024-10-14",
            completedBy: "Nurse Maria Garcia"
          },
          { 
            id: 5, 
            task: "Weekly weight monitoring", 
            dueDate: "2024-12-31",
            priority: "Low",
            completed: false 
          }
        ],
        createdBy: "Nurse Maria Garcia",
        createdDate: "2024-10-01"
      },
      {
        id: 3,
        patientId: patientId,
        planType: "Medication Management",
        priority: "Medium",
        startDate: "2024-09-20",
        endDate: "2024-10-20",
        description: "Ensure proper medication compliance and monitor for adverse effects. Patient education on medication schedules and side effects.",
        goals: "100% medication compliance, no adverse drug reactions, patient understanding of medication regimen",
        status: "Completed",
        progress: 100,
        tasks: [
          { 
            id: 1, 
            task: "Patient education on medication schedule", 
            dueDate: "2024-09-25",
            priority: "High",
            completed: true,
            completedDate: "2024-09-22",
            completedBy: "Nurse John Smith"
          },
          { 
            id: 2, 
            task: "Set up pill organizer system", 
            dueDate: "2024-09-30",
            priority: "Medium",
            completed: true,
            completedDate: "2024-09-25",
            completedBy: "Nurse John Smith"
          },
          { 
            id: 3, 
            task: "Family education on medication support", 
            dueDate: "2024-10-05",
            priority: "Medium",
            completed: true,
            completedDate: "2024-10-02",
            completedBy: "Nurse John Smith"
          },
          { 
            id: 4, 
            task: "Final compliance assessment", 
            dueDate: "2024-10-20",
            priority: "High",
            completed: true,
            completedDate: "2024-10-18",
            completedBy: "Nurse John Smith"
          }
        ],
        createdBy: "Nurse John Smith",
        createdDate: "2024-09-20"
      }
    ];
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
                patientCarePlans={getPatientCarePlans(patient.id)}
                patientVitalSigns={getPatientVitalSigns(patient.id)}
                activeMedications={getActiveMedications(patient.id)}
                allMedications={getPatientMedications(patient.id)}
                onViewCarePlans={handleViewCarePlans}
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
        selectedPatient={selectedPatient}
        showCarePlanModal={showCarePlanModal}
        handleCancelCarePlan={handleCancelCarePlan}
        selectedCarePlan={selectedCarePlan}
        handleCarePlanSubmit={handleCarePlanSubmit}
        showViewCarePlansModal={showViewCarePlansModal}
        handleCloseViewCarePlans={handleCloseViewCarePlans}
        handleUpdateCarePlan={handleUpdateCarePlan}
        getSampleCarePlans={getSampleCarePlans}
        showMedicalHistoryModal={showMedicalHistoryModal}
        handleCloseMedicalHistory={handleCloseMedicalHistory}
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
