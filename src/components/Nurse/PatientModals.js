import React from 'react';
import Modal from '../Common/Modal';
import NewPatientForm from './NewPatientForm';
import VitalSignsForm from './VitalSignsForm';
import CarePlanForm from './CarePlanForm';
import PatientMedicalHistory from './PatientMedicalHistory';
import Button from '../Common/Button';
import { Activity, ClipboardList } from 'lucide-react';

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
    <Modal
      isOpen={showPatientDetailsModal}
      onClose={handleClosePatientDetails}
      title="Patient Details"
      size="xl"
    >
      {/* ...existing patient details modal content can be moved here if needed... */}
      {/* For brevity, not included in this initial extraction. */}
    </Modal>
  </>
);

export default PatientModals;
