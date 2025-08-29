import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';

const PatientMedicalHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Mock patient data
  const patients = [

// ...existing code...
        {
          id: 1,
          name: 'Likitha Chathubhashini',
          age: 34,
          gender: 'Female',
          lastVisit: '2024-06-28',
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-28',
              diagnosis: 'Acute Bronchitis',
              treatment: 'Prescribed antibiotics and bronchodilators. Rest recommended.',
              medications: ['Amoxicillin 500mg', 'Salbutamol inhaler', 'Paracetamol 500mg']
            },
            {
              id: 2,
              date: '2024-05-15',
              diagnosis: 'Annual Check-up',
              treatment: 'Routine physical examination. All vitals normal.',
              medications: ['Multivitamin supplements']
            },
            {
              id: 3,
              date: '2024-03-22',
              diagnosis: 'Migraine',
              treatment: 'Pain management and lifestyle modifications advised.',
              medications: ['Sumatriptan 50mg', 'Ibuprofen 400mg']
            }
          ]
        },
        {
          id: 2,
          name: 'Hansaja Damsara',
          age: 45,
          gender: 'Male',
          lastVisit: '2024-06-25',
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-25',
              diagnosis: 'Hypertension Follow-up',
              treatment: 'Blood pressure monitoring. Medication adjustment.',
              medications: ['Lisinopril 10mg', 'Amlodipine 5mg']
            },
            {
              id: 2,
              date: '2024-04-10',
              diagnosis: 'Type 2 Diabetes Management',
              treatment: 'HbA1c monitoring. Dietary counseling provided.',
              medications: ['Metformin 850mg', 'Glipizide 5mg']
            }
          ]
        },
        {
          id: 3,
          name: 'Sathya Abeysinghe',
          age: 28,
          gender: 'Female',
          lastVisit: '2024-06-30',
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-30',
              diagnosis: 'Pregnancy Check-up (12 weeks)',
              treatment: 'Prenatal vitamins prescribed. Next appointment scheduled.',
              medications: ['Folic acid 5mg', 'Iron supplements', 'Prenatal vitamins']
            },
            {
              id: 2,
              date: '2024-06-01',
              diagnosis: 'Initial Pregnancy Consultation',
              treatment: 'Pregnancy confirmed. Basic tests ordered.',
              medications: ['Folic acid 5mg']
            }
          ]
        },
        {
          id: 4,
          name: 'Saranga Dissanayake',
          age: 62,
          gender: 'Male',
          lastVisit: '2024-06-26',
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-26',
              diagnosis: 'Osteoarthritis Management',
              treatment: 'Physical therapy recommended. Pain management plan updated.',
              medications: ['Celecoxib 200mg', 'Glucosamine supplements']
            },
            {
              id: 2,
              date: '2024-05-20',
              diagnosis: 'Cardiac Check-up',
              treatment: 'ECG normal. Continue current medications.',
              medications: ['Atorvastatin 20mg', 'Aspirin 75mg']
            }
          ]
        },
        {
          id: 5,
          name: 'Anjula Himashi',
          age: 39,
          gender: 'Female',
          lastVisit: '2024-06-29',
          medicalHistory: [
            {
              id: 1,
              date: '2024-06-29',
              diagnosis: 'Anxiety Disorder Follow-up',
              treatment: 'Therapy sessions recommended. Medication working well.',
              medications: ['Sertraline 50mg', 'Lorazepam 0.5mg (as needed)']
            }
          ]
        }
      ];

      const patient = patients.find(p => String(p.id) === String(id));

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      };

      if (!patient) {
        return (
          <Modal isOpen={true} onClose={() => navigate(-1)} title="Patient Not Found" size="lg">
            <div className="p-8 text-center text-gray-600">
              <h2 className="text-2xl font-bold mb-4">Patient Not Found</h2>
              <p>The requested patient does not exist.</p>
            </div>
          </Modal>
        );
      }

      return (
        <Modal isOpen={true} onClose={() => navigate(-1)} title={`Medical History - ${patient.name}`} size="xl">
          <div className="max-w-3xl mx-auto py-2 space-y-8">
            <div className="bg-teal-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                  {/* User Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                  <p className="text-gray-600">{patient.age} years old • {patient.gender}</p>
                  <p className="text-sm text-teal-600">Last visit: {formatDate(patient.lastVisit)}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                {/* FileText Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span>Medical History Timeline</span>
              </h4>
              <div className="space-y-6">
                {patient.medicalHistory.map((visit) => (
                  <div key={visit.id} className="relative">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto sm:mx-0">
                        {/* Calendar Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
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
                              {/* Pill Icon */}
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8 8 0 118.659 4.572a8 8 0 0110.769 10.769z" /></svg>
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
        </Modal>
      );
    };

export default PatientMedicalHistory;
