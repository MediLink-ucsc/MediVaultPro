import React from 'react';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';
import VitalSignsForm from './VitalSignsForm';
import CarePlanForm from './CarePlanForm';
import PatientMedicalHistory from './PatientMedicalHistory';
import Button from '../Common/Button';
import { Activity, ClipboardList, CheckCircle, Circle, Calendar, User } from 'lucide-react';
import { pre } from 'framer-motion/client';

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

const PatientModals = ({
  showNewPatientModal,
  setShowNewPatientModal,
  handleNewPatientSubmit,
  showVitalSignsModal,
  selectedPatient,
  handleVitalSignsSubmit,
  handleCancelVitalSigns,
  showCarePlanModal,
  handleCancelCarePlan,
  selectedCarePlan,
  handleCarePlanSubmit,
  showViewCarePlansModal,
  handleCloseViewCarePlans,
  carePlans,
  showMedicalHistoryModal,
  handleCloseMedicalHistory,
  handleRecordVitals,
  handleCreateCarePlan,
  showPatientDetailsModal,
  handleClosePatientDetails,
  getLatestVitalSigns,
  getPatientVitalSigns,
  getPatientCarePlans,
  getActiveCarePlans,
  getActiveMedications,
  getPatientMedications,
  latestVitalSigns,
  prescriptions
}) => {

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-teal-100 text-teal-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (

    
  <>
    {/* New Patient Modal */}
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
    {/* <Modal
      isOpen={showMedicalHistoryModal}
      onClose={handleCloseMedicalHistory}
      title="Medical History"
      size="xl"
    >
      {selectedPatient && (
        <PatientMedicalHistory patient={selectedPatient} />
      )}
    </Modal> */}

     <Modal
      isOpen={showMedicalHistoryModal}
      onClose={handleCloseMedicalHistory}
      title="Medical History"
      size="xl"
    >
      {selectedPatient && (
        <PatientMedicalHistory
          show={showMedicalHistoryModal}
          prescriptions={prescriptions}
          onClose={handleCloseMedicalHistory}
          patientInfo={selectedPatient}
        />
      )}
    </Modal>

    {/* View Care Plans Modal */}
    <Modal
      isOpen={showViewCarePlansModal}
      onClose={handleCloseViewCarePlans}
      title={`Care Plans - ${selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : ''}`}
      size="xl"
    >
      {selectedPatient && (
        <div className="space-y-4">
          {carePlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{plan.planType}</h3>
                    <p className="text-sm text-gray-600">Priority: {plan.priority}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formatDate(plan.startDate)} - {formatDate(plan.endDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Description</h4>
                  <p className="text-sm text-gray-700">{plan.description || 'No description provided.'}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-1">Goals</h4>
                  <p className="text-sm text-gray-700">{plan.goals || 'No goals specified.'}</p>
                </div>

                <div className="text-sm text-gray-500 mt-4">
                  <p><strong>Issued Date:</strong> {formatDate(plan.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}

          {carePlans.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No care plans found</h3>
              <p className="text-gray-500">This patient doesn't have any care plans yet.</p>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 mr-2"
              onClick={handleCloseViewCarePlans}
            >
              Close
            </button>
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
    <div className="space-y-4">
      {/* Header section */}
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          {selectedPatient.firstName[0]}{selectedPatient.lastName[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedPatient.firstName} {selectedPatient.lastName}
          </h2>
          <p className="text-gray-600">Username: {selectedPatient.username}</p>
          <p className="text-gray-600">Phone: {selectedPatient.phone}</p>
        </div>
      </div>

      {/* Basic details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Age</p>
          <p className="text-gray-800">{selectedPatient.age} years</p>
        </div>
        <div>
          <p className="text-gray-500">Gender</p>
          <p className="text-gray-800">{selectedPatient.gender}</p>
        </div>
        <div>
          <p className="text-gray-500">Last Visit</p>
          <p className="text-gray-800">{selectedPatient.lastVisit || 'Not Updated'}</p>
        </div>
        <div>
          <p className="text-gray-500">Condition</p>
          <p
            className={`inline-block px-2 py-1 rounded ${getConditionColor(
              selectedPatient.condition
            )}`}
          >
            {selectedPatient.condition}
          </p>
        </div>
      </div>

      {/* ✅ Latest Vitals Card */}
      {latestVitalSigns && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Latest Vitals</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-gray-500">Blood Pressure</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.bloodPressure}</p>
            </div>
            <div>
              <p className="text-gray-500">Heart Rate</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.heartRate} bpm</p>
            </div>
            <div>
              <p className="text-gray-500">Temperature</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.temperature} °C</p>
            </div>
            <div>
              <p className="text-gray-500">SpO₂</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.spo2} %</p>
            </div>
            <div>
              <p className="text-gray-500">Weight</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.weight} kg</p>
            </div>
            <div>
              <p className="text-gray-500">Height</p>
              <p className="text-gray-800 font-medium">{latestVitalSigns.height} cm</p>
            </div>
          </div>

          {/* Optional detailed info */}
          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p><strong>General Appearance:</strong> {latestVitalSigns.generalAppearance}</p>
            <p><strong>Cardiovascular:</strong> {latestVitalSigns.cardiovascular}</p>
            <p><strong>Respiratory:</strong> {latestVitalSigns.respiratory}</p>
            <p><strong>Abdominal:</strong> {latestVitalSigns.abdominal}</p>
            <p><strong>Neurological:</strong> {latestVitalSigns.neurological}</p>
            {latestVitalSigns.additionalNotes && (
              <p><strong>Notes:</strong> {latestVitalSigns.additionalNotes}</p>
            )}
          </div>
        </div>
      )}

      {/* Additional info */}
      <div>
        <h3 className="text-gray-700 font-semibold mt-4">Additional Information</h3>
        <p className="text-gray-600">No additional information available.</p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          onClick={handleClosePatientDetails}
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>

  </>
);
};

export default PatientModals;
