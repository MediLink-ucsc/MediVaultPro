// src/components/Doctor/MedicalHistory.js
import React, { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Stethoscope, 
  Plus, 
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const MedicalHistory = ({ patient }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  // Extended medical history data
  const medicalHistory = [
    {
      id: 1,
      date: '2024-06-25',
      time: '10:30 AM',
      type: 'consultation',
      title: 'Routine Follow-up for Hypertension',
      doctor: 'Dr. Priyantha Fernando',
      department: 'Cardiology - National Hospital Colombo',
      status: 'completed',
      summary: 'Patient reports feeling well. Blood pressure under control with current medication. Continue with Lisinopril 10mg daily.',
      vitals: {
        bloodPressure: '120/80',
        heartRate: 72,
        temperature: 98.6,
        weight: 165
      },
      diagnosis: ['Essential Hypertension'],
      medications: [
        { name: 'Lisinopril', dosage: '10mg', instruction: 'Continue current dose' }
      ],
      followUp: 'Schedule follow-up in 3 months at Cardiology OPD'
    },
    {
      id: 2,
      date: '2024-06-20',
      time: '2:00 PM',
      type: 'lab',
      title: 'Laboratory Results - HbA1c and Lipid Panel',
      doctor: 'Dr. Sunethra Jayasinghe',
      department: 'Laboratory - Nawaloka Hospital',
      status: 'completed',
      summary: 'Blood work shows elevated HbA1c at 6.8%. Lipid panel within normal limits.',
      results: [
        { test: 'HbA1c', value: '6.8%', normal: '< 5.7%', flag: 'High' },
        { test: 'Total Cholesterol', value: '195 mg/dL', normal: '< 200 mg/dL', flag: 'Normal' },
        { test: 'HDL', value: '45 mg/dL', normal: '> 40 mg/dL', flag: 'Normal' },
        { test: 'LDL', value: '120 mg/dL', normal: '< 130 mg/dL', flag: 'Normal' }
      ],
      recommendations: ['Consider diabetes management consultation', 'Dietary counseling with nutritionist']
    },
    {
      id: 3,
      date: '2024-06-15',
      time: '11:15 AM',
      type: 'consultation',
      title: 'Chest Pain Evaluation',
      doctor: 'Dr. Priyantha Fernando',
      department: 'Cardiology - Asiri Medical Hospital',
      status: 'completed',
      summary: 'Patient presented with mild chest discomfort. ECG normal, chest X-ray clear. Likely musculoskeletal origin.',
      vitals: {
        bloodPressure: '118/78',
        heartRate: 70,
        temperature: 98.5,
        weight: 164
      },
      diagnosis: ['Chest wall pain', 'Rule out cardiac cause'],
      procedures: ['12-lead ECG', 'Chest X-ray'],
      followUp: 'Return if symptoms worsen or persist'
    },
    {
      id: 4,
      date: '2024-06-01',
      time: '9:00 AM',
      type: 'prescription',
      title: 'Medication Adjustment',
      doctor: 'Dr. Priyantha Fernando',
      department: 'Cardiology - National Hospital Colombo',
      status: 'completed',
      summary: 'Started patient on Lisinopril for blood pressure management due to persistently elevated readings.',
      medications: [
        { name: 'Lisinopril', dosage: '10mg', instruction: 'Take once daily in the morning' }
      ],
      followUp: 'Return in 2 weeks to check blood pressure response'
    },
    {
      id: 5,
      date: '2024-05-15',
      time: '3:30 PM',
      type: 'consultation',
      title: 'Annual Physical Examination',
      doctor: 'Dr. Kamani Wijeratne',
      department: 'General Medicine - Lanka Hospital',
      status: 'completed',
      summary: 'Comprehensive annual physical examination. Overall health good. Noted elevated blood pressure readings.',
      vitals: {
        bloodPressure: '145/92',
        heartRate: 75,
        temperature: 98.4,
        weight: 166
      },
      diagnosis: ['Hypertension, Stage 1'],
      procedures: ['Complete physical exam', 'Blood work ordered'],
      recommendations: ['Lifestyle modifications', 'Follow-up with cardiology', 'Reduce salt intake']
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'consultation':
        return <Stethoscope className="w-4 h-4" />;
      case 'lab':
        return <Activity className="w-4 h-4" />;
      case 'prescription':
        return <Pill className="w-4 h-4" />;
      case 'procedure':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'consultation':
        return 'bg-teal-100 text-teal-800';
      case 'lab':
        return 'bg-orange-100 text-orange-800';
      case 'prescription':
        return 'bg-teal-100 text-teal-800';
      case 'procedure':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Medical History</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          <Plus className="w-4 h-4" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search medical history..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="consultation">Consultations</option>
            <option value="lab">Lab Results</option>
            <option value="prescription">Prescriptions</option>
            <option value="procedure">Procedures</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Medical History Timeline */}
      <div className="space-y-4">
        {filteredHistory.map((entry) => (
          <div key={entry.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getTypeColor(entry.type)}`}>
                  {getTypeIcon(entry.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{entry.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.date} at {entry.time}</span>
                    </span>
                    <span>{entry.doctor} - {entry.department}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(entry.status)}
                <span className="text-sm text-gray-600 capitalize">{entry.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Summary</h4>
                <p className="text-gray-600">{entry.summary}</p>
              </div>

              {entry.vitals && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Vital Signs</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Blood Pressure</p>
                      <p className="font-semibold">{entry.vitals.bloodPressure}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Heart Rate</p>
                      <p className="font-semibold">{entry.vitals.heartRate} bpm</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Temperature</p>
                      <p className="font-semibold">{entry.vitals.temperature}°F</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Weight</p>
                      <p className="font-semibold">{entry.vitals.weight} lbs</p>
                    </div>
                  </div>
                </div>
              )}

              {entry.results && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Lab Results</h4>
                  <div className="space-y-2">
                    {entry.results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{result.test}</span>
                        <div className="flex items-center space-x-2">
                          <span>{result.value}</span>
                          <span className="text-xs text-gray-500">({result.normal})</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            result.flag === 'High' ? 'bg-orange-100 text-orange-800' :
                            result.flag === 'Low' ? 'bg-teal-100 text-teal-800' :
                            'bg-teal-100 text-teal-800'
                          }`}>
                            {result.flag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entry.diagnosis && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Diagnosis</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.diagnosis.map((diag, index) => (
                      <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                        {diag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.medications && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Medications</h4>
                  <div className="space-y-2">
                    {entry.medications.map((med, index) => (
                      <div key={index} className="p-2 bg-teal-50 rounded">
                        <span className="font-medium">{med.name} {med.dosage}</span>
                        <span className="text-gray-600 ml-2">- {med.instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {entry.procedures && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Procedures</h4>
                  <div className="flex flex-wrap gap-2">
                    {entry.procedures.map((proc, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                        {proc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.recommendations && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {entry.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {entry.followUp && (
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Follow-up</h4>
                  <p className="text-gray-600 italic">{entry.followUp}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No medical history entries found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
