// src/components/Nurse/PatientMedicalHistory.js
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  ChevronRight, 
  Calendar, 
  User, 
  Clock,
  FileText,
  Pill,
  Activity,
  X
} from 'lucide-react';

const PatientMedicalHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Mock patient data
  const [patients] = useState([
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
  ]);

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setShowHistoryModal(true);
  };

  const closeHistoryModal = () => {
    setShowHistoryModal(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = filterGender === 'all' || patient.gender.toLowerCase() === filterGender.toLowerCase();
    return matchesSearch && matchesGender;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="hover:text-teal-600 cursor-pointer">Dashboard</span>
        <ChevronRight className="w-4 h-4" />
        <span className="hover:text-teal-600 cursor-pointer">Medical Records</span>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 font-medium">Patient History</span>
      </div>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Patient Medical History</h1>
        <p className="text-gray-600 mt-2">Access and review comprehensive medical records of registered patients</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={filterGender}
                onChange={(e) => setFilterGender(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Patient Cards/Table */}
        <div className="p-6">
          {/* Desktop Table View */}
          <div className="hidden lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-teal-600" />
                          </div>
                          <div className="font-medium text-gray-900">{patient.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.gender}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(patient.lastVisit)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          {patient.medicalHistory.length} record(s)
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleViewHistory(patient)}
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View History</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPatients.map((patient) => (
                <div key={patient.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-600">{patient.age} years • {patient.gender}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Last visit: {formatDate(patient.lastVisit)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Activity className="w-4 h-4" />
                      <span>{patient.medicalHistory.length} medical record(s)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewHistory(patient)}
                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Full History</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {filteredPatients.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No patients found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Medical History Modal */}
      {showHistoryModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Medical History - {selectedPatient.name}</h2>
              <button
                onClick={closeHistoryModal}
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
                      <h3 className="text-lg font-semibold text-gray-800">{selectedPatient.name}</h3>
                      <p className="text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
                      <p className="text-sm text-teal-600">Last visit: {formatDate(selectedPatient.lastVisit)}</p>
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
                    {selectedPatient.medicalHistory.map((visit, index) => (
                      <div key={visit.id} className="relative">
                        {/* Timeline line - hidden on mobile */}
                        {index < selectedPatient.medicalHistory.length - 1 && (
                          <div className="hidden sm:block absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                        )}
                        
                        {/* Visit card */}
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
      )}
    </div>
  );
};

export default PatientMedicalHistory;
