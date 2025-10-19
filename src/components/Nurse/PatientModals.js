import React from 'react';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';
import VitalSignsForm from './VitalSignsForm';
import CarePlanForm from './CarePlanForm';
import PatientMedicalHistory from './PatientMedicalHistory';
import Button from '../Common/Button';
import { Activity, ClipboardList } from 'lucide-react';

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
  getPatientMedications
}) => (

    
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
    <Modal
      isOpen={showMedicalHistoryModal}
      onClose={handleCloseMedicalHistory}
      title="Medical History"
      size="xl"
    >
      {selectedPatient && (
        <PatientMedicalHistory patient={selectedPatient} />
      )}
    </Modal>

    {/* Patient Details Modal */}
    {/* Patient Details Modal */}
    <Modal
      isOpen={showPatientDetailsModal}
      onClose={handleClosePatientDetails}
      title="Patient Details"
      size="xl"
    >
      {selectedPatient && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* Profile picture placeholder */}
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
              <p className={`inline-block px-2 py-1 rounded ${getConditionColor(selectedPatient.condition)}`}>
                {selectedPatient.condition}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-700 font-semibold mt-4">Additional Information</h3>
            <p className="text-gray-600">
              {/* If you have more info like address, medical notes, allergies etc., you can display here */}
              No additional information available.
            </p>
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

export default PatientModals;
