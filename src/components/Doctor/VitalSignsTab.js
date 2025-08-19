import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Plus } from 'lucide-react';
import Modal from '../Common/Modal';
import QuickExamForm from './QuickActions/QuickExamForm';

const VitalSignsTab = ({ patientData, onNewVitalsAdded }) => {
  const [isQuickExamModalOpen, setIsQuickExamModalOpen] = useState(false);
  const [vitals, setVitals] = useState([]);

  // Fetch Quick Exam data from API
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming token is stored in localStorage
        const response = await axios.get(
          `http://localhost:3000/api/v1/patientRecords/quickExam/${patientData.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVitals(response.data);
      } catch (error) {
        console.error('Error fetching quick exam data:', error);
      }
    };

    fetchVitals();
  }, [patientData.id]);

  const getVitalStatus = (vital) => {
    const tempValue = parseFloat(vital.temperature);
    const heartRateValue = parseInt(vital.heartRate);
    const oxygenValue = parseInt(vital.spo2); // make sure this matches API field

    if (tempValue > 100.4 || heartRateValue > 100 || oxygenValue < 95) {
      return { status: 'concerning', color: 'text-red-600' };
    } else if (tempValue > 99.5 || heartRateValue > 90 || oxygenValue < 97) {
      return { status: 'elevated', color: 'text-orange-600' };
    } else {
      return { status: 'normal', color: 'text-green-600' };
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const time = new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} at ${time}`;
  };

  const handleQuickExamSubmit = (examData) => {
    // Add new vitals to state
    setVitals(prev => [examData, ...prev]);
    onNewVitalsAdded(examData);
    setIsQuickExamModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-teal-800">Vital Signs History</h3>
        <button
          onClick={() => setIsQuickExamModalOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Quick Exam</span>
        </button>
      </div>

      <div className="space-y-4">
        {vitals.map((vital, index) => {
          const status = getVitalStatus(vital);
          return (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow transition-all duration-200 hover:border-teal-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-teal-500" />
                  <span className="text-sm font-medium text-teal-700">
                    {formatDateTime(vital.createdAt)}
                  </span>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                  status.status === 'normal' ? 'bg-teal-100 text-teal-800' :
                  status.status === 'elevated' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                </span>
              </div>

              {/* Vitals grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                  <p className="text-xs text-teal-600 font-medium mb-1">Temperature</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.temperature} °C</p>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                  <p className="text-xs text-teal-600 font-medium mb-1">Heart Rate</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.heartRate} bpm</p>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                  <p className="text-xs text-teal-600 font-medium mb-1">Blood Pressure</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.bloodPressure} mmHg</p>
                </div>
                <div className="text-center p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                  <p className="text-xs text-teal-600 font-medium mb-1">O2 Saturation</p>
                  <p className={`text-lg font-semibold ${status.color}`}>{vital.spo2}%</p>
                </div>
              </div>

              {/* Optional additional info */}
              {(vital.weight || vital.height) && (
                <div className="grid grid-cols-2 gap-4 border-t border-teal-100 pt-4">
                  {vital.weight && (
                    <div className="text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                      <p className="text-xs text-orange-600 font-medium mb-1">Weight</p>
                      <p className="text-lg font-semibold text-orange-800">{vital.weight} kg</p>
                    </div>
                  )}
                  {vital.height && (
                    <div className="text-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                      <p className="text-xs text-orange-600 font-medium mb-1">Height</p>
                      <p className="text-lg font-semibold text-orange-800">{vital.height} cm</p>
                    </div>
                  )}
                </div>
              )}

              {vital.generalAppearance && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">General Appearance</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.generalAppearance}</p>
                </div>
              )}

              {/* System Reviews */}
              {vital.cardiovascular && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">Cardiovascular</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.cardiovascular}</p>
                </div>
              )}

              {vital.respiratory && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">Respiratory</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.respiratory}</p>
                </div>
              )}

              {vital.abdominal && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">Abdominal</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.abdominal}</p>
                </div>
              )}

              {vital.neurological && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">Neurological</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.neurological}</p>
                </div>
              )}

              {/* Additional Notes */}
              {vital.additionalNotes && (
                <div className="border-t border-teal-100 pt-4">
                  <p className="text-sm font-medium text-teal-700 mb-2">Additional Notes</p>
                  <p className="text-sm text-teal-600 bg-teal-50 p-3 rounded-lg">{vital.additionalNotes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isQuickExamModalOpen}
        onClose={() => setIsQuickExamModalOpen(false)}
        title="Quick Examination"
      >
        <QuickExamForm
          onSubmit={handleQuickExamSubmit}
          selectedPatient={patientData}
        />
      </Modal>
    </div>
  );
};

export default VitalSignsTab;

