// src/components/Lab/AddSample.js
import React, { useState } from 'react';
import { 
  FlaskConical, 
  User, 
  Calendar, 
  Clock, 
  AlertCircle,
  TestTube2,
  Beaker,
  Microscope,
  Save,
  X
} from 'lucide-react';

const AddSample = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    testType: '',
    sampleType: 'blood',
    priority: 'normal',
    receivedDate: new Date().toISOString().split('T')[0],
    receivedTime: new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    expectedTime: '',
    collectedBy: '',
    notes: '',
    volume: '',
    container: ''
  });

  const [errors, setErrors] = useState({});

  const sampleTypes = [
    { value: 'blood', label: 'Blood', icon: TestTube2, color: 'text-orange-600' },
    { value: 'urine', label: 'Urine', icon: Beaker, color: 'text-orange-400' },
    { value: 'swab', label: 'Swab', icon: Microscope, color: 'text-teal-600' },
    { value: 'other', label: 'Other', icon: FlaskConical, color: 'text-teal-500' }
  ];

  const testTypes = [
    'Complete Blood Count',
    'Urinalysis',
    'Lipid Panel',
    'Blood Culture',
    'Glucose Test',
    'Throat Culture',
    'Liver Function Test',
    'Kidney Function Test',
    'Thyroid Function Test',
    'Hemoglobin A1C',
    'Cholesterol Panel',
    'Blood Gas Analysis'
  ];

  const containers = {
    blood: ['EDTA Tube', 'SST Tube', 'Heparinized Tube', 'Fluoride Tube', 'Culture Bottle'],
    urine: ['Sterile Cup', 'Non-sterile Cup', '24-hour Container'],
    swab: ['Transport Media', 'Dry Swab', 'Viral Transport Media'],
    other: ['Plain Tube', 'Special Container']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    
    if (!formData.testType.trim()) {
      newErrors.testType = 'Test type is required';
    }
    
    if (!formData.collectedBy.trim()) {
      newErrors.collectedBy = 'Collected by is required';
    }
    
    if (!formData.volume.trim()) {
      newErrors.volume = 'Volume is required';
    }
    
    if (!formData.container.trim()) {
      newErrors.container = 'Container type is required';
    }
    
    if (!formData.expectedTime.trim()) {
      newErrors.expectedTime = 'Expected time is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate sample ID (in real app, this would be from backend)
    const sampleId = `S${String(Date.now()).slice(-3).padStart(3, '0')}`;
    const barcode = `BC${String(Date.now()).slice(-9)}`;

    const sampleData = {
      ...formData,
      id: sampleId,
      barcode,
      status: 'pending'
    };

    onSubmit(sampleData);
  };

  const getSampleTypeIcon = (type) => {
    const sampleType = sampleTypes.find(st => st.value === type);
    if (sampleType) {
      const IconComponent = sampleType.icon;
      return <IconComponent className={`w-5 h-5 ${sampleType.color}`} />;
    }
    return <FlaskConical className="w-5 h-5 text-gray-500" />;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-teal-600" />
          Patient Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient ID *
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.patientId ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., P001"
            />
            {errors.patientId && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.patientId}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name *
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.patientName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter patient name"
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.patientName}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Test and Sample Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FlaskConical className="w-5 h-5 mr-2 text-teal-600" />
          Test & Sample Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Type *
            </label>
            <select
              name="testType"
              value={formData.testType}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.testType ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select test type</option>
              {testTypes.map(test => (
                <option key={test} value={test}>{test}</option>
              ))}
            </select>
            {errors.testType && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.testType}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sample Type *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                {getSampleTypeIcon(formData.sampleType)}
              </div>
              <select
                name="sampleType"
                value={formData.sampleType}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                {sampleTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Volume *
            </label>
            <input
              type="text"
              name="volume"
              value={formData.volume}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.volume ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., 5ml, 50ml"
            />
            {errors.volume && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.volume}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Container *
            </label>
            <select
              name="container"
              value={formData.container}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.container ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select container</option>
              {containers[formData.sampleType]?.map(container => (
                <option key={container} value={container}>{container}</option>
              ))}
            </select>
            {errors.container && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.container}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            >
              <option value="normal">Normal</option>
              <option value="urgent">Urgent</option>
              <option value="stat">STAT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timing Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-teal-600" />
          Timing Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Received Date
            </label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Received Time
            </label>
            <input
              type="time"
              name="receivedTime"
              value={formData.receivedTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Completion *
            </label>
            <input
              type="text"
              name="expectedTime"
              value={formData.expectedTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.expectedTime ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., 2:30 PM, 24 hours, 48 hours"
            />
            {errors.expectedTime && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.expectedTime}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Collection Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-teal-600" />
          Collection Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collected By *
            </label>
            <input
              type="text"
              name="collectedBy"
              value={formData.collectedBy}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.collectedBy ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., Nurse Likitha"
            />
            {errors.collectedBy && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.collectedBy}
              </p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              placeholder="Additional notes about the sample..."
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-200"
        >
          <Save className="w-4 h-4" />
          <span>Add Sample</span>
        </button>
      </div>
    </form>
  );
};

export default AddSample;
