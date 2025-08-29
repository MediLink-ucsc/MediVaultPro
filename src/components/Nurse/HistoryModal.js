import React from 'react';
import { X, User, Calendar, FileText, Pill } from 'lucide-react';

const HistoryModal = ({ show, patient, onClose }) => {
  if (!show || !patient) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Medical History - {patient.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Patient Info Header */}
            <div className="bg-teal-50 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  <User className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
                  <p className="text-sm text-teal-600">Last visit: {formatDate(patient.lastVisit)}</p>
                </div>
              </div>
            </div>

            {/* Medical History Timeline */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-orange-600" />
                <span>Medical History Timeline</span>
              </h4>
              <div className="space-y-4">
                {patient.medicalHistory.map((visit, index) => (
                  <div key={visit.id} className="relative">
                    {index < patient.medicalHistory.length - 1 && (
                      <div className="hidden sm:block absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                          <h5 className="font-semibold text-gray-800">{visit.diagnosis}</h5>
                          <span className="text-sm text-gray-500">{formatDate(visit.date)}</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h6 className="text-sm font-medium text-gray-700 mb-1">Treatment Summary:</h6>
                            <p className="text-sm text-gray-600">{visit.treatment}</p>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-gray-700 mb-2 flex items-center space-x-1">
                              <Pill className="w-4 h-4 text-orange-600" />
                              <span>Prescribed Medications:</span>
                            </h6>
                            <div className="flex flex-wrap gap-2">
                              {visit.medications.map((medication, medIndex) => (
                                <span
                                  key={medIndex}
                                  className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                                >
                                  {medication}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
