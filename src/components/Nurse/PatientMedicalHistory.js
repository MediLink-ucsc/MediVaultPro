import React from 'react';
import Modal from '../Common/Modal';
import { User, Pill } from 'lucide-react';

const PatientMedicalHistory = ({ show, prescriptions, onClose, patientInfo }) => {
  console.log('Prescriptions in PatientMedicalHistory:', prescriptions);
  console.log('Patient Info in PatientMedicalHistory:', patientInfo);
  if (!show || !prescriptions || prescriptions.length === 0) return null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  // Get patient info from the first prescription

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={`Medical History - ${patientInfo.firstName} ${patientInfo.lastName}`}
      size="xl"
    >
      <div className="max-w-3xl mx-auto py-2 space-y-8">
        {/* Patient Info */}
        <div className="bg-teal-50 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <User className="w-8 h-8 text-teal-600" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {patientInfo.firstName} {patientInfo.lastName}
              </h3>
              <p className="text-gray-600">
                {patientInfo.age} years
              </p>
            </div>
          </div>
        </div>

        {/* Prescription Timeline */}
        <div className="space-y-6">
          {prescriptions.map((prescription) => (
            <div key={prescription.prescriptionId} className="relative">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  <User className="w-6 h-6 text-teal-600" />
                </div>

                <div className="flex-1 bg-gray-50 rounded-lg p-4 space-y-3">
                  {/* Doctor & Hospital */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-800">
                        Dr. {prescription.doctor.user.firstName} {prescription.doctor.user.lastName} ({prescription.doctor.specialty})
                      </h5>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <User className="w-4 h-4 text-gray-500" /> {prescription.doctor.hospitalName}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(prescription.createdAt)}</span>
                  </div>

                  {/* Medications */}
                  <div>
                    <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Pill className="w-4 h-4 text-orange-600" /> Medications
                    </h6>
                    <div className="flex flex-col gap-2">
                      {prescription.medications.map((med) => (
                        <div
                          key={med.medicationId}
                          className="px-3 py-2 bg-orange-100 text-orange-800 text-sm font-medium rounded-lg"
                        >
                          <p><strong>{med.medicineName}</strong></p>
                          <p>Dosage: {med.dosage}</p>
                          <p>Frequency: {med.frequency}</p>
                          <p>Duration: {med.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Instructions */}
                  {prescription.additionalInstructions && (
                    <div>
                      <h6 className="text-sm font-medium text-gray-700 mb-1">Additional Instructions</h6>
                      <p className="text-sm text-gray-600">{prescription.additionalInstructions}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default PatientMedicalHistory;


