// src/components/Doctor/MedicalHistory.js
import React, { useState } from 'react';
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
  // State for filters and modal
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [showSOAPForm, setShowSOAPForm] = useState(false);
  const [showLabOrderForm, setShowLabOrderForm] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Records', icon: FileText, color: 'teal' },
    { id: 'soap', label: 'SOAP Notes', icon: Clipboard, color: 'orange' },
    { id: 'lab', label: 'Lab Orders', icon: TestTube, color: 'teal' }
  ];

  // Extended medical history data
  const medicalHistory = [
    {
      id: 1,
      date: '2024-06-25',
      time: '10:30 AM',
      type: 'consultation',
      title: 'Follow-up: Diabetes Management',
      doctor: 'Dr. Priyantha Fernando',
      department: 'Internal Medicine - National Hospital Colombo',
      status: 'completed',
      subjective: 'Patient reports occasional dizzy spells and fatigue. Has been compliant with medication. Following recommended diet most days but admits to occasional sweet cravings. Exercise routine: 30min walk 3 times/week. No hypoglycemic episodes.',
      objective: 'Vitals: BP 128/82, HR 76, Temp 98.4°F, RR 16, SpO2 98%, Weight 72kg, Height 168cm, BMI 25.5\n\nPhysical Exam:\n- General: Alert and oriented, no acute distress\n- HEENT: Normocephalic, atraumatic\n- CV: Regular rate and rhythm, no murmurs\n- Resp: Clear to auscultation bilaterally\n- Neuro: Cranial nerves intact, normal sensation\n- Extremities: No edema, good peripheral pulses\n\nLab Results: Glucose 142 mg/dL, HbA1c 7.2%',
      assessment: 'Primary: Type 2 Diabetes Mellitus (E11.9) - Fair control\nNo acute complications\nRisk factors: Obesity, Family history\nDifferential diagnoses to consider:\n1. Metabolic syndrome\n2. Essential hypertension',
      plan: {
        medications: [
          { name: 'Metformin', dosage: '1000mg', frequency: 'twice daily', duration: '3 months', instructions: 'Take with meals' },
          { name: 'Glimepiride', dosage: '2mg', frequency: 'once daily', duration: '3 months', instructions: 'Take with breakfast' }
        ],
        labOrders: [
          'HbA1c - Routine - Fasting not required',
          'Comprehensive Metabolic Panel - Routine - 8-hour fasting required',
          'Lipid Profile - Routine - 12-hour fasting required'
        ],
        lifestyle: [
          'Increase exercise to 30min walk 5 times/week',
          'Continue low-carb diet',
          'Monitor blood glucose twice daily'
        ],
        followUp: 'Schedule visit in 3 months',
        patientEducation: 'Discussed importance of regular exercise and consistent medication timing. Reviewed hypoglycemia symptoms and management.'
      },
      patientId: 'P001'
    },
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
        {
          type: 'Blood',
          container: 'Gold Top SST',
          collectionTime: '2024-06-20 08:30 AM',
          collectedBy: 'Lab Tech Perera'
        }
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
    },
    {
      id: 3,
      date: '2024-06-15',
      time: '11:15 AM',
      type: 'consultation',
      title: 'New Patient Visit - Chronic Fatigue Evaluation',
      doctor: 'Dr. Kamani Wijeratne',
      department: 'Internal Medicine - Lanka Hospital',
      status: 'completed',
      subjective: 'Patient presents with 3-month history of progressive fatigue, weight gain, and cold intolerance. Reports sleeping 10+ hours but still feeling tired. No fever, night sweats, or recent illness.',
      objective: {
        vitals: {
          bloodPressure: '118/78',
          heartRate: 62,
          temperature: 98.2,
          respiratoryRate: '14',
          oxygenSaturation: '99%',
          weight: '75',
          height: '165',
          bmi: '27.5'
        },
        physicalExam: {
          general: 'Appears fatigued but in no acute distress',
          thyroid: 'Slightly enlarged, no nodules',
          skin: 'Dry, cool to touch',
          cv: 'Regular rate and rhythm, bradycardic',
          resp: 'Clear bilateral breath sounds',
          neuro: 'DTRs somewhat diminished'
        }
      },
      assessment: {
        primaryDiagnosis: 'Suspected Hypothyroidism',
        differentials: [
          'Chronic Fatigue Syndrome',
          'Depression',
          'Vitamin D Deficiency',
          'Sleep Apnea'
        ]
      },
      plan: {
        labOrders: [
          'TSH',
          'Free T4',
          'Complete Blood Count',
          'Vitamin D Level',
          'Iron Studies'
        ],
        followUp: 'Return visit in 2 weeks with lab results',
        referrals: ['Consider endocrinology referral based on thyroid results']
      }
    }
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

  // Filter history entries based on selected criteria
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
          
          <p className="text-gray-700 text-sm">{entry.summary}</p>

          {/* Lab Results Section */}
          {isLab && entry.results && (
            <div className="mt-4 space-y-4">
              {/* Order Details */}
              {entry.orderDetails && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Order Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Priority:</span>
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                        entry.orderDetails.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                        entry.orderDetails.priority === 'STAT' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {entry.orderDetails.priority}
                      </span>
                    </div>
                    {entry.orderDetails.fastingRequired && (
                      <div className="text-sm text-amber-600">
                        Fasting Required
                      </div>
                    )}
                  </div>
                  {entry.orderDetails.specialInstructions && (
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Special Instructions:</span>
                      <p className="mt-1">{entry.orderDetails.specialInstructions}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Test Results */}
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
                            }`}>
                              {test.flag}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interpretation and Recommendations */}
              {(entry.interpretation || entry.recommendations) && (
                <div className="bg-gray-50 rounded-lg p-3">
                  {entry.interpretation && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Interpretation</h4>
                      <p className="text-sm text-gray-600">{entry.interpretation}</p>
                    </div>
                  )}
                  {entry.recommendations && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Recommendations</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {entry.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
