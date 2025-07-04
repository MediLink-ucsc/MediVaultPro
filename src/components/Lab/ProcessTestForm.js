// src/components/Lab/ProcessTestForm.js
import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ProcessTestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    testId: '',
    patientId: '',
    status: '',
    results: '',
    technician: '',
    completedDate: '',
    qualityCheck: false,
    notes: '',
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  // Mock data for pending tests
  const pendingTests = [
    { id: 'T001', patientId: 'P001', testType: 'CBC', requestDate: '2024-01-15', urgency: 'normal' },
    { id: 'T002', patientId: 'P002', testType: 'Urinalysis', requestDate: '2024-01-15', urgency: 'urgent' },
    { id: 'T003', patientId: 'P003', testType: 'Lipid Panel', requestDate: '2024-01-14', urgency: 'stat' },
    { id: 'T004', patientId: 'P004', testType: 'X-Ray Chest', requestDate: '2024-01-14', urgency: 'normal' },
  ];

  const statusOptions = [
    { value: 'in-progress', label: 'In Progress', color: 'orange' },
    { value: 'completed', label: 'Completed', color: 'teal' },
    { value: 'requires-review', label: 'Requires Review', color: 'orange' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.length > 0) {
      const results = pendingTests.filter(test => 
        test.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectTest = (test) => {
    setSelectedTest(test);
    setFormData(prev => ({
      ...prev,
      testId: test.id,
      patientId: test.patientId,
    }));
    setSearchResults([]);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'stat': return 'bg-red-100 text-red-700';
      case 'urgent': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(s => s.value === status);
    return statusObj ? statusObj.color : 'gray';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Test
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by Test ID, Patient ID, or Test Type"
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        
        {searchResults.length > 0 && (
          <div className="mt-2 border border-gray-200 rounded-md max-h-40 overflow-y-auto">
            {searchResults.map((test) => (
              <div
                key={test.id}
                onClick={() => selectTest(test)}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-800">{test.id} - {test.testType}</div>
                    <div className="text-sm text-gray-600">Patient: {test.patientId}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${getUrgencyColor(test.urgency)}`}>
                      {test.urgency.toUpperCase()}
                    </span>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTest && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Selected Test</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Test ID:</span>
              <span className="ml-2 font-medium">{selectedTest.id}</span>
            </div>
            <div>
              <span className="text-gray-600">Patient ID:</span>
              <span className="ml-2 font-medium">{selectedTest.patientId}</span>
            </div>
            <div>
              <span className="text-gray-600">Test Type:</span>
              <span className="ml-2 font-medium">{selectedTest.testType}</span>
            </div>
            <div>
              <span className="text-gray-600">Request Date:</span>
              <span className="ml-2 font-medium">{selectedTest.requestDate}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          >
            <option value="">Select status</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Technician Name
          </label>
          <input
            type="text"
            name="technician"
            value={formData.technician}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter technician name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Completion Date
        </label>
        <input
          type="datetime-local"
          name="completedDate"
          value={formData.completedDate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test Results
        </label>
        <textarea
          name="results"
          value={formData.results}
          onChange={handleInputChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter test results and findings..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Any additional notes or observations..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="qualityCheck"
          checked={formData.qualityCheck}
          onChange={handleInputChange}
          className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
        />
        <label className="text-sm font-medium text-gray-700">
          Quality check completed
        </label>
        <CheckCircle className="w-4 h-4 text-teal-600" />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Update Test Status
        </button>
      </div>
    </form>
  );
};

export default ProcessTestForm;