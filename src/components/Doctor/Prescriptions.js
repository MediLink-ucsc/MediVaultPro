// src/components/Doctor/Prescriptions.js
import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Pill,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Download,
  X
} from 'lucide-react';
import PrescriptionForm from './QuickActions/PrescriptionForm';

const Prescriptions = ({ patient }) => {
  // State for filters and search
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  const filterOptions = [
    { id: 'all', label: 'All Prescriptions', icon: FileText },
    { id: 'active', label: 'Active', icon: CheckCircle },
    { id: 'completed', label: 'Completed', icon: AlertCircle }
  ];

  // Mock prescription data - replace with actual data from your dataStore
  const prescriptionHistory = [
    {
      id: 1,
      patientId: 'P001',
      date: '2024-06-25',
      time: '10:30 AM',
      status: 'active',
      medications: [
        {
          name: 'Metformin',
          dosage: '1000mg',
          frequency: 'twice',  // matches form select options: once, twice, thrice, four, as-needed
          duration: '3 months',
          instructions: 'Take with meals'
        },
        {
          name: 'Glimepiride',
          dosage: '2mg',
          frequency: 'once',
          duration: '3 months',
          instructions: 'Take with breakfast'
        }
      ],
      prescribedBy: 'Dr. Priyantha Fernando',
      department: 'Internal Medicine',
      additionalInstructions: 'Patient responding well to current medication regimen. Continue monitoring blood glucose levels.'
    },
    {
      id: 2,
      patientId: 'P002',
      date: '2024-05-15',
      time: '14:45 PM',
      status: 'completed',
      medications: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'thrice',
          duration: '7 days',
          instructions: 'Take until completed'
        }
      ],
      prescribedBy: 'Dr. Kamani Wijeratne',
      department: 'General Medicine',
      additionalInstructions: 'Complete full course of antibiotics even if symptoms improve.'
    }
  ];

  // Filter prescriptions based on status and search term
  const filteredPrescriptions = prescriptionHistory.filter(prescription => {
    const matchesStatus = filterStatus === 'all' || prescription.status === filterStatus;
    const matchesSearch = !searchTerm || 
      prescription.medications.some(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      prescription.prescribedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderPrescriptionCard = (prescription) => {
    const isActive = prescription.status === 'active';
    return (
      <div key={prescription.id} className="bg-white rounded-lg border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              isActive ? 'bg-orange-100' : 'bg-gray-100'
            }`}>
              <Pill className={`w-5 h-5 ${
                isActive ? 'text-orange-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {formatDate(prescription.date)}
                </span>
                <Clock className="w-4 h-4 text-gray-400 ml-2" />
                <span className="text-sm text-gray-600">{prescription.time}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{prescription.prescribedBy}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{prescription.department}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isActive 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-teal-100 text-teal-800'
          }`}>
            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
          </span>
        </div>

        {/* Diagnosis */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Diagnosis:</h4>
          <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
            {prescription.diagnosis}
          </span>
        </div>

        {/* Medications List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Prescribed Medications:</h4>
          {prescription.medications.map((medication, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800">{medication.name}</span>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-600">Dosage:</span>
                  <span className="ml-2 text-gray-800">{medication.dosage}</span>
                </div>
                <div>
                  <span className="text-gray-600">Frequency:</span>
                  <span className="ml-2 text-gray-800">
                    {medication.frequency === 'once' && 'Once daily'}
                    {medication.frequency === 'twice' && 'Twice daily'}
                    {medication.frequency === 'thrice' && 'Three times daily'}
                    {medication.frequency === 'four' && 'Four times daily'}
                    {medication.frequency === 'as-needed' && 'As needed'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <span className="ml-2 text-gray-800">{medication.duration}</span>
                </div>
                <div>
                  <span className="text-gray-600">Instructions:</span>
                  <span className="ml-2 text-gray-800">{medication.instructions}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">Instructions:</span>
                <span className="ml-2">{medication.instructions}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        {prescription.additionalInstructions && (
          <div className="mt-4 text-sm">
            <span className="font-medium text-gray-700">Additional Instructions:</span>
            <p className="mt-1 text-gray-600">{prescription.additionalInstructions}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Download PDF</span>
          </button>
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
              onClick={() => setFilterStatus(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                filterStatus === option.id
                  ? 'bg-teal-100 text-teal-700 border-teal-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              } border`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Add New Prescription Button */}
      <div className="flex justify-end">
        <button 
          onClick={() => setShowPrescriptionForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Prescription Form Modal */}
      {showPrescriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">New Prescription</h2>
              <button 
                onClick={() => setShowPrescriptionForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <PrescriptionForm 
              selectedPatient={patient}
              onSubmit={(data) => {
                // Handle form submission here
                console.log('Prescription submitted:', data);
                setShowPrescriptionForm(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No prescriptions found matching your criteria.
          </div>
        ) : (
          filteredPrescriptions.map(prescription => renderPrescriptionCard(prescription))
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
