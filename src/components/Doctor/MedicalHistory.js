// src/components/Doctor/MedicalHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, 
  Clipboard, 
  TestTube, 
  User, 
  Stethoscope, 
  CheckCircle, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

const MedicalHistory = ({ patient }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterOptions = [
    { id: 'all', label: 'All Records', icon: FileText, color: 'teal' },
    { id: 'soap', label: 'SOAP Notes', icon: Clipboard, color: 'orange' },
    { id: 'lab', label: 'Lab Orders', icon: TestTube, color: 'teal' }
  ];

  // Hardcoded Lab Entries (for now)
  const hardcodedLabHistory = [
    {
      id: 2,
      date: '2024-06-20',
      time: '2:00 PM',
      type: 'lab',
      title: 'Comprehensive Metabolic Panel and Lipid Profile',
      doctor: 'Dr. Sunethra Jayasinghe',
      department: 'Laboratory - Nawaloka Hospital',
      status: 'completed',
      orderDetails: {
        tests: [
          { test: 'Comprehensive Metabolic Panel', urgency: 'Routine', instructions: '8-hour fasting required' },
          { test: 'Lipid Profile', urgency: 'Routine', instructions: '12-hour fasting required' }
        ],
        clinicalInfo: 'Monitoring diabetes and lipid management'
      },
      specimens: [
        { type: 'Blood', container: 'Gold Top SST', collectionTime: '2024-06-20 08:30 AM', collectedBy: 'Lab Tech Perera' }
      ],
      results: [
        {
          category: 'Metabolic Panel',
          tests: [
            { name: 'Glucose, Fasting', value: '142', unit: 'mg/dL', range: '70-99', flag: 'High' },
            { name: 'Creatinine', value: '0.9', unit: 'mg/dL', range: '0.6-1.2', flag: 'Normal' },
            { name: 'BUN', value: '15', unit: 'mg/dL', range: '7-20', flag: 'Normal' },
            { name: 'eGFR', value: '90', unit: 'mL/min', range: '>60', flag: 'Normal' }
          ]
        },
        {
          category: 'Lipid Panel',
          tests: [
            { name: 'Total Cholesterol', value: '195', unit: 'mg/dL', range: '<200', flag: 'Normal' },
            { name: 'Triglycerides', value: '150', unit: 'mg/dL', range: '<150', flag: 'Borderline' },
            { name: 'HDL Cholesterol', value: '45', unit: 'mg/dL', range: '>40', flag: 'Normal' },
            { name: 'LDL Cholesterol', value: '120', unit: 'mg/dL', range: '<100', flag: 'High' }
          ]
        }
      ],
      interpretation: 'Elevated fasting glucose consistent with diabetes. Lipid panel shows borderline triglycerides and elevated LDL cholesterol.',
      recommendations: [
        'Consider adjustment of diabetes management',
        'Recommend lifestyle modifications for lipid management',
        'Repeat lipid panel in 3 months after lifestyle changes'
      ]
    }
  ];

  // Fetch SOAP notes for this patient
  useEffect(() => {
    if (!patient?.id) return;

    const fetchSoapNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/v1/patientRecords/soapnote/${patient.id}`);
        
        const mappedSoapNotes = res.data.map(entry => ({
          id: entry.id,
          date: new Date(entry.dateTime).toLocaleDateString(),
          time: new Date(entry.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'consultation',
          title: `SOAP Note - ${entry.doctor.user.firstName} ${entry.doctor.user.lastName}`,
          doctor: `${entry.doctor.user.firstName} ${entry.doctor.user.lastName}`,
          department: entry.doctor.hospitalName + ' - ' + entry.doctor.specialty,
          status: 'completed',
          subjective: entry.subjective,
          objective: entry.objective,
          assessment: entry.assessment,
          plan: entry.plan,
          patientId: entry.patientId
        }));

        setMedicalHistory([...mappedSoapNotes, ...hardcodedLabHistory]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch SOAP notes:', error);
        setMedicalHistory([...hardcodedLabHistory]);
        setLoading(false);
      }
    };

    fetchSoapNotes();
  }, [patient]);

  // Filter history entries
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

  // Render a single record card
  const renderRecordCard = (entry) => {
    const isSOAP = entry.type === 'consultation';
    const isLab = entry.type === 'lab';

    return (
      <div key={entry.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isSOAP ? 'bg-orange-100' : isLab ? 'bg-teal-100' : 'bg-teal-100'}`}>
              {isSOAP ? <Clipboard className="w-5 h-5 text-orange-600" /> : isLab ? <TestTube className="w-5 h-5 text-teal-600" /> : <FileText className="w-5 h-5 text-teal-600" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.date} • {entry.time}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${isSOAP ? 'bg-orange-50 text-orange-700' : isLab ? 'bg-teal-50 text-teal-700' : 'bg-teal-50 text-teal-700'}`}>
            {isSOAP ? 'SOAP Note' : isLab ? 'Lab Order' : entry.type}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{entry.doctor}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">{entry.department}</span>
          </div>

          {/* SOAP Note */}
          {isSOAP && (
            <div className="mt-4 space-y-4">
              {entry.subjective && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Subjective</h4>
                  <p className="text-sm text-gray-600">{entry.subjective}</p>
                </div>
              )}
              {entry.objective && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Objective</h4>
                  <p className="text-sm text-gray-600">{entry.objective}</p>
                </div>
              )}
              {entry.assessment && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assessment</h4>
                  <p className="text-sm text-gray-600">{entry.assessment}</p>
                </div>
              )}
              {entry.plan && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Plan</h4>
                  <p className="text-sm text-gray-600">{entry.plan}</p>
                </div>
              )}
            </div>
          )}

          {/* Lab Note */}
          {isLab && entry.results && (
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Test Results</h4>
                {entry.results.map((category, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                    <h5 className="text-sm font-medium text-gray-600 mb-2">{category.category}</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {category.tests.map((test, testIdx) => (
                        <div key={testIdx} className="flex items-center justify-between bg-white p-2 rounded">
                          <div>
                            <span className="text-sm font-medium text-gray-700">{test.name}</span>
                            <span className="text-xs text-gray-500 ml-2">({test.range})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{test.value} {test.unit}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              test.flag === 'High' ? 'bg-red-100 text-red-800' :
                              test.flag === 'Low' ? 'bg-yellow-100 text-yellow-800' :
                              test.flag === 'Borderline' ? 'bg-orange-100 text-orange-800' :
                              'bg-green-100 text-green-800'
                            }`}>{test.flag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading medical history...</div>;

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

