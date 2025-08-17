// src/components/Doctor/MedicalHistory.js
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Stethoscope, 
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Clipboard,
  TestTube,
  User,
  MapPin,
  Plus,
  X
} from 'lucide-react';
import SOAPForm from './QuickActions/SOAPForm';
import LabOrderForm from './QuickActions/LabOrderForm';

const MedicalHistory = ({ patient }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showSOAPForm, setShowSOAPForm] = useState(false);
  const [showLabOrderForm, setShowLabOrderForm] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      if (!patient?.id) return;
      
      try {
        // TODO: Replace this with actual API call
        // const response = await fetch(`/api/patients/${patient.id}/medical-history`);
        // const data = await response.json();
        // setMedicalHistory(data);
        
        // Temporary mock data
        setMedicalHistory([
          {
            id: 1,
            type: 'consultation',
            title: 'Regular Checkup',
            date: '2025-08-17',
            time: '09:00 AM',
            doctor: 'Dr. Smith',
            department: 'General Medicine',
            subjective: 'Patient reports mild fever and cough for 3 days',
            objective: {
              vitals: {
                bloodPressure: '120/80',
                heartRate: '72',
                temperature: '99.1',
                respiratoryRate: '16',
                oxygenSaturation: '98%',
                weight: '70',
                height: '170',
                bmi: '24.2'
              },
              physicalExam: {
                general: 'Alert and oriented',
                respiratory: 'Clear breath sounds',
                cardiovascular: 'Regular rhythm, no murmurs'
              }
            },
            assessment: {
              primaryDiagnosis: 'Upper Respiratory Infection',
              differentials: ['Common Cold', 'Allergic Rhinitis']
            },
            plan: {
              medications: [
                {
                  name: 'Acetaminophen',
                  dosage: '500mg',
                  frequency: 'Every 6 hours',
                  duration: '5 days',
                  instructions: 'Take with food'
                }
              ],
              followUp: '1 week if symptoms persist'
            }
          },
          {
            id: 2,
            type: 'lab',
            title: 'Laboratory Tests Order',
            date: '2025-08-17',
            time: '10:30 AM',
            doctor: 'Dr. Smith',
            department: 'Laboratory',
            orderDetails: {
              clinicalInfo: 'Patient presenting with fatigue and unexplained weight loss. Routine health screening.',
              tests: [
                {
                  test: 'Complete Blood Count (CBC)',
                  urgency: 'routine',
                  status: 'completed',
                  instructions: 'Fasting not required',
                  results: {
                    uploadedBy: 'Lab Tech John Doe',
                    uploadDate: '2025-08-17',
                    uploadTime: '14:30',
                    parameters: [
                      {
                        name: 'WBC',
                        value: '7.8',
                        unit: 'K/µL',
                        range: '4.5-11.0',
                        flag: 'Normal'
                      },
                      {
                        name: 'RBC',
                        value: '4.2',
                        unit: 'M/µL',
                        range: '4.0-5.5',
                        flag: 'Normal'
                      },
                      {
                        name: 'Hemoglobin',
                        value: '11.8',
                        unit: 'g/dL',
                        range: '12.0-15.5',
                        flag: 'Low'
                      },
                      {
                        name: 'Platelets',
                        value: '250',
                        unit: 'K/µL',
                        range: '150-450',
                        flag: 'Normal'
                      }
                    ],
                    notes: 'Mild anemia detected. Recommend follow-up.',
                    attachments: ['cbc_report.pdf']
                  }
                },
                {
                  test: 'Lipid Profile',
                  urgency: 'routine',
                  status: 'completed',
                  instructions: '12-hour fasting required',
                  results: {
                    uploadedBy: 'Lab Tech Jane Smith',
                    uploadDate: '2025-08-17',
                    uploadTime: '15:00',
                    parameters: [
                      {
                        name: 'Total Cholesterol',
                        value: '210',
                        unit: 'mg/dL',
                        range: '< 200',
                        flag: 'High'
                      },
                      {
                        name: 'HDL',
                        value: '45',
                        unit: 'mg/dL',
                        range: '> 40',
                        flag: 'Normal'
                      },
                      {
                        name: 'LDL',
                        value: '140',
                        unit: 'mg/dL',
                        range: '< 130',
                        flag: 'High'
                      },
                      {
                        name: 'Triglycerides',
                        value: '150',
                        unit: 'mg/dL',
                        range: '< 150',
                        flag: 'Borderline'
                      }
                    ],
                    notes: 'Patient shows elevated cholesterol levels.',
                    attachments: ['lipid_profile.pdf']
                  }
                },
                {
                  test: 'Thyroid Function',
                  urgency: 'urgent',
                  status: 'pending',
                  instructions: 'No special instructions'
                }
              ]
            }
          }
        ]);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistory();
  }, [patient?.id]);

  const filterOptions = [
    { id: 'all', label: 'All Records', icon: FileText, color: 'teal' },
    { id: 'soap', label: 'SOAP Notes', icon: Clipboard, color: 'orange' },
    { id: 'lab', label: 'Lab Orders', icon: TestTube, color: 'teal' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-4 h-4" />;
      case 'lab':
        return <TestTube className="w-4 h-4" />;
      case 'prescription':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation':
        return 'bg-orange-100 text-orange-800';
      case 'lab':
        return 'bg-teal-100 text-teal-800';
      case 'prescription':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-teal-100 text-teal-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-teal-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredHistory = medicalHistory.filter(entry => {
    const matchesType = filterType === 'all' || 
      (filterType === 'soap' && entry.type === 'consultation') ||
      (filterType === 'lab' && entry.type === 'lab');
    
    const matchesSearch = !searchTerm || 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const renderRecordCard = (entry) => {
    const isSOAP = entry.type.toLowerCase() === 'consultation';
    const isLab = entry.type.toLowerCase() === 'lab';
    
    return (
      <div key={entry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isSOAP ? 'bg-orange-100' : 
              isLab ? 'bg-teal-100' : 
              'bg-teal-100'
            }`}>
              {isSOAP ? <Clipboard className="w-5 h-5 text-orange-600" /> : 
               isLab ? <TestTube className="w-5 h-5 text-teal-600" /> : 
               <FileText className="w-5 h-5 text-teal-600" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-500">
                {entry.date} • {entry.time}
              </p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isSOAP ? 'bg-orange-50 text-orange-700' :
            isLab ? 'bg-teal-50 text-teal-700' :
            'bg-teal-50 text-teal-700'
          }`}>
            {isSOAP ? 'SOAP Note' : isLab ? 'Lab Order' : entry.type}
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{entry.doctor}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">{entry.department}</span>
          </div>
          
          {entry.summary && (
            <p className="text-gray-700 text-sm">{entry.summary}</p>
          )}

          {/* Lab Order Section */}
          {isLab && entry.orderDetails && (
            <div className="mt-4 space-y-4">
              {/* Clinical Information */}
              {entry.orderDetails.clinicalInfo && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Clinical Information</h4>
                  <p className="text-sm text-gray-600">{entry.orderDetails.clinicalInfo}</p>
                </div>
              )}

              {/* Individual Test Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entry.orderDetails.tests.map((test, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Test Card Header */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900">{test.test}</h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              test.urgency === 'stat' ? 'bg-red-100 text-red-800' :
                              test.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                              'bg-teal-100 text-teal-800'
                            }`}>
                              {test.urgency.charAt(0).toUpperCase() + test.urgency.slice(1)}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              test.status === 'completed' ? 'bg-teal-100 text-teal-800' :
                              test.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {test.instructions && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-medium text-gray-700">Instructions: </span>
                          {test.instructions}
                        </div>
                      )}
                    </div>

                    {/* Test Card Body */}
                    <div className="p-4">
                      {test.results ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <CheckCircle className="w-4 h-4 text-teal-600" />
                              <span>Results Available</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedTest(test);
                                setShowTestResults(true);
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-teal-600 text-teal-600 hover:bg-teal-50 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                            >
                              View Results
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">
                            Uploaded by {test.results.uploadedBy} on {test.results.uploadDate}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-12 text-sm text-gray-500">
                          Results pending
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Modal */}
              {showTestResults && selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto m-4">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{selectedTest.test} Results</h2>
                        <p className="text-sm text-gray-500">
                          Uploaded by {selectedTest.results.uploadedBy} on {selectedTest.results.uploadDate} at {selectedTest.results.uploadTime}
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setShowTestResults(false);
                          setSelectedTest(null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Results Content */}
                    <div className="space-y-6">
                      {/* Results Table */}
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Parameter</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Result</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Reference Range</th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {selectedTest.results.parameters.map((param, paramIdx) => (
                              <tr key={paramIdx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm font-medium text-gray-900">{param.name}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{param.value} {param.unit}</td>
                                <td className="px-4 py-2 text-sm text-gray-500">{param.range}</td>
                                <td className="px-4 py-2">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    param.flag === 'High' ? 'bg-orange-100 text-orange-800' :
                                    param.flag === 'Low' ? 'bg-orange-100 text-orange-800' :
                                    param.flag === 'Borderline' ? 'bg-orange-50 text-orange-800' :
                                    'bg-teal-100 text-teal-800'
                                  }`}>
                                    {param.flag}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Notes and Attachments */}
                      <div className="space-y-4">
                        {selectedTest.results.notes && (
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-orange-600" />
                              <span className="font-medium text-orange-700">Lab Notes</span>
                            </div>
                            <p className="text-sm text-gray-700">{selectedTest.results.notes}</p>
                          </div>
                        )}

                        {selectedTest.results.attachments && selectedTest.results.attachments.length > 0 && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-3">
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="font-medium text-gray-700">Attachments</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedTest.results.attachments.map((attachment, idx) => (
                                <button
                                  key={idx}
                                  className="inline-flex items-center px-3 py-1.5 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                  onClick={() => console.log('Download attachment:', attachment)}
                                >
                                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                  {attachment}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SOAP Note Details */}
          {isSOAP && (
            <div className="mt-4 space-y-4">
              {/* Subjective */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Subjective</h4>
                <p className="text-sm text-gray-600">{entry.subjective}</p>
              </div>

              {/* Objective */}
              {entry.objective && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Objective</h4>
                  
                  {/* Vitals */}
                  {entry.objective.vitals && (
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Vital Signs</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="text-xs">
                          <span className="text-gray-500">BP:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.bloodPressure}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">HR:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.heartRate} bpm</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Temp:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.temperature}°F</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">RR:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.respiratoryRate}/min</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">SpO2:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.oxygenSaturation}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Weight:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.weight} kg</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Height:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.height} cm</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">BMI:</span>
                          <span className="ml-1 font-medium">{entry.objective.vitals.bmi}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Physical Exam */}
                  {entry.objective.physicalExam && (
                    <div>
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Physical Examination</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(entry.objective.physicalExam).map(([key, value]) => (
                          <div key={key} className="text-xs">
                            <span className="text-gray-500 capitalize">{key}:</span>
                            <span className="ml-1 text-gray-700">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Assessment */}
              {entry.assessment && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assessment</h4>
                  <div className="space-y-2">
                    {entry.assessment.primaryDiagnosis && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Primary Diagnosis:</span>
                        <span className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {entry.assessment.primaryDiagnosis}
                        </span>
                      </div>
                    )}
                    {entry.assessment.differentials && (
                      <div>
                        <span className="text-sm font-medium text-gray-600">Differential Diagnoses:</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {entry.assessment.differentials.map((d, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Plan */}
              {entry.plan && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Plan</h4>
                  
                  {/* Medications */}
                  {entry.plan.medications && (
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Medications</h5>
                      <div className="space-y-2">
                        {entry.plan.medications.map((med, idx) => (
                          <div key={idx} className="bg-white p-2 rounded text-sm">
                            <div className="font-medium text-gray-700">
                              {med.name} {med.dosage}
                            </div>
                            <div className="text-gray-600 text-xs">
                              {med.frequency} for {med.duration} - {med.instructions}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lab Orders */}
                  {entry.plan.labOrders && (
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Ordered Tests</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {entry.plan.labOrders.map((test, idx) => (
                          <li key={idx}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lifestyle/Instructions */}
                  {entry.plan.lifestyle && (
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-600 mb-2">Lifestyle Modifications</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {entry.plan.lifestyle.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Follow-up */}
                  {entry.plan.followUp && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Follow-up:</span> {entry.plan.followUp}
                    </div>
                  )}
                </div>
              )}

              {/* Patient Education */}
              {entry.patientEducation && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Patient Education</h4>
                  <p className="text-sm text-gray-600">{entry.patientEducation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilterType(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                filterType === option.id
                  ? `bg-${option.color}-100 text-${option.color}-700 border-${option.color}-200`
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              } border`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search medical records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Action Button Section */}
      <div className="flex justify-end mt-4">
        {filterType === 'soap' && (
          <button 
            onClick={() => setShowSOAPForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New SOAP Note</span>
          </button>
        )}
        {filterType === 'lab' && (
          <button 
            onClick={() => setShowLabOrderForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Lab Order</span>
          </button>
        )}
      </div>

      {/* SOAP Form Modal */}
      {showSOAPForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">New SOAP Note</h2>
              <button 
                onClick={() => setShowSOAPForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SOAPForm 
              selectedPatient={patient}
              onSubmit={(data) => {
                console.log('SOAP Note submitted:', data);
                setShowSOAPForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Lab Order Form Modal */}
      {showLabOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">New Lab Order</h2>
              <button 
                onClick={() => setShowLabOrderForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <LabOrderForm 
              selectedPatient={patient}
              onSubmit={(data) => {
                console.log('Lab Order submitted:', data);
                setShowLabOrderForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Records List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No medical records found matching your criteria.
          </div>
        ) : (
          filteredHistory.map(entry => renderRecordCard(entry))
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
