// src/components/Doctor/PatientDetails.js
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  FileText, 
  Stethoscope, 
  Pill, 
  Activity, 
  AlertCircle,
  Plus,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import MedicalHistory from './MedicalHistory';

const PatientDetails = ({ patient, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    vitals: true,
    medications: true,
    allergies: true,
    labResults: false,
    medicalHistory: true
  });

  // Mock data for comprehensive patient information
  const patientData = {
    ...patient,
    email: 'patient@gmail.com',
    address: 'No. 45, Galle Road, Colombo 03, Sri Lanka',
    emergencyContact: {
      name: 'Nimal Perera',
      relationship: 'Spouse',
      phone: '+94 77 123 4567'
    },
    insurance: {
      provider: 'Sri Lanka Insurance Corporation',
      policyNumber: 'SLIC123456789',
      groupNumber: 'GRP456'
    },
    vitals: [
      { date: '2024-06-25', bloodPressure: '120/80', heartRate: 72, temperature: 98.6, weight: 165, height: '5\'8"' },
      { date: '2024-06-20', bloodPressure: '125/82', heartRate: 75, temperature: 98.4, weight: 166, height: '5\'8"' },
      { date: '2024-06-15', bloodPressure: '118/78', heartRate: 70, temperature: 98.5, weight: 164, height: '5\'8"' }
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', prescribedDate: '2024-06-01', prescribedBy: 'Dr. Priyantha Fernando' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedDate: '2024-05-15', prescribedBy: 'Dr. Sunethra Jayasinghe' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', prescribedDate: '2024-04-20', prescribedBy: 'Dr. Priyantha Fernando' }
    ],
    allergies: [
      { allergen: 'Penicillin', reaction: 'Skin rash', severity: 'Moderate' },
      { allergen: 'Shellfish', reaction: 'Anaphylaxis', severity: 'Severe' }
    ],
    labResults: [
      { date: '2024-06-20', test: 'Complete Blood Count', result: 'Normal', doctor: 'Dr. Priyantha Fernando' },
      { date: '2024-06-20', test: 'HbA1c', result: '6.8%', doctor: 'Dr. Sunethra Jayasinghe', flag: 'High' },
      { date: '2024-06-15', test: 'Lipid Panel', result: 'Total Cholesterol: 195 mg/dL', doctor: 'Dr. Priyantha Fernando' }
    ],
    medicalHistory: [
      { date: '2024-06-25', type: 'Visit', description: 'Routine follow-up for hypertension at National Hospital Colombo', doctor: 'Dr. Priyantha Fernando' },
      { date: '2024-06-20', type: 'Lab', description: 'Blood work for diabetes monitoring at Nawaloka Hospital', doctor: 'Dr. Sunethra Jayasinghe' },
      { date: '2024-06-15', type: 'Visit', description: 'Consultation for chest pain at Asiri Medical Hospital', doctor: 'Dr. Priyantha Fernando' },
      { date: '2024-06-01', type: 'Prescription', description: 'Started on Lisinopril for blood pressure control', doctor: 'Dr. Priyantha Fernando' }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'history', label: 'Medical History', icon: FileText },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'labs', label: 'Lab Results', icon: Activity }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Patient Basic Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Full Name:</span>
              <span className="text-sm font-medium">{patientData.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Age:</span>
              <span className="text-sm font-medium">{patientData.age} years</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Phone:</span>
              <span className="text-sm font-medium">{patientData.phone}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Address:</span>
              <span className="text-sm font-medium">{patientData.address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Primary Condition:</span>
              <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                {patientData.condition}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-600">Name:</span>
            <p className="font-medium">{patientData.emergencyContact.name}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Relationship:</span>
            <p className="font-medium">{patientData.emergencyContact.relationship}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Phone:</span>
            <p className="font-medium">{patientData.emergencyContact.phone}</p>
          </div>
        </div>
      </div>

      {/* Latest Vitals */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Latest Vital Signs</h3>
          <button 
            onClick={() => toggleSection('vitals')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.vitals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {expandedSections.vitals && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Blood Pressure</p>
              <p className="text-lg font-semibold text-teal-600">{patientData.vitals[0].bloodPressure}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Heart Rate</p>
              <p className="text-lg font-semibold text-orange-600">{patientData.vitals[0].heartRate} bpm</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-lg font-semibold text-teal-600">{patientData.vitals[0].temperature}°F</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Weight</p>
              <p className="text-lg font-semibold text-orange-600">{patientData.vitals[0].weight} lbs</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Height</p>
              <p className="text-lg font-semibold text-teal-600">{patientData.vitals[0].height}</p>
            </div>
          </div>
        )}
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Current Medications</h3>
          <button 
            onClick={() => toggleSection('medications')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.medications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {expandedSections.medications && (
          <div className="space-y-3">
            {patientData.medications.map((med, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{med.name}</h4>
                  <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Prescribed by {med.prescribedBy}</p>
                  <p className="text-xs text-gray-500">{med.prescribedDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Allergies */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Allergies</h3>
          <button 
            onClick={() => toggleSection('allergies')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.allergies ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
        {expandedSections.allergies && (
          <div className="space-y-2">
            {patientData.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">{allergy.allergen}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-700">{allergy.reaction}</p>
                  <p className="text-xs text-red-600">Severity: {allergy.severity}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMedicalHistory = () => (
    <MedicalHistory patient={patientData} />
  );

  const renderMedications = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Medications</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          <Plus className="w-4 h-4" />
          <span>Add Medication</span>
        </button>
      </div>
      <div className="space-y-4">
        {patientData.medications.map((med, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-800">{med.name}</h4>
                <p className="text-gray-600">{med.dosage} - {med.frequency}</p>
                <p className="text-sm text-gray-500">Prescribed by {med.prescribedBy} on {med.prescribedDate}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-orange-600 hover:text-orange-800">
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLabResults = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Laboratory Results</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          <Download className="w-4 h-4" />
          <span>Download Report</span>
        </button>
      </div>
      <div className="space-y-4">
        {patientData.labResults.map((result, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-gray-800">{result.test}</h4>
                <p className="text-gray-600">{result.result}</p>
                <p className="text-sm text-gray-500">Ordered by {result.doctor} on {result.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                {result.flag && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    result.flag === 'High' ? 'bg-orange-100 text-orange-800' :
                    result.flag === 'Low' ? 'bg-teal-100 text-teal-800' :
                    'bg-teal-100 text-teal-800'
                  }`}>
                    {result.flag}
                  </span>
                )}
                <button className="text-teal-600 hover:text-teal-800">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Patient List</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-gray-600">Patient ID: {patient.id} • Last Visit: {patient.lastVisit}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Print Summary
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'history' && renderMedicalHistory()}
        {activeTab === 'medications' && renderMedications()}
        {activeTab === 'labs' && renderLabResults()}
      </div>
    </div>
  );
};

export default PatientDetails;
