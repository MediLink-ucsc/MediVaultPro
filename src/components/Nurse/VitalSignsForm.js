// src/components/Nurse/VitalSignsForm.js
import React, { useState } from 'react';
import { Save, X, User, Activity, Heart, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../Common/Button';
import dataStore from '../../utils/dataStore';
import axios from 'axios';

const VitalSignsForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
  temperature: '',
  temperatureUnit: 'F',
  heartRate: '',
  bloodPressure: '',
  respiratoryRate: '',
  spo2: '', // <-- change from oxygenSaturation to spo2
  weight: '',
  weightUnit: 'kg',
  height: '',
  heightUnit: 'cm',
  notes: '',
  generalAppearance: '',
  cardiovascular: '',
  respiratory: '',
  abdominal: '',
  neurological: '',
  additionalNotes: ''
});

  const [errors, setErrors] = useState({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
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

  // Required fields
  if (!formData.temperature) newErrors.temperature = 'Temperature is required';
  if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required';
  if (!formData.bloodPressure) newErrors.bloodPressure = 'Blood pressure is required';
  if (!formData.spo2) newErrors.spo2 = 'Oxygen saturation is required';


  setErrors(newErrors);
  console.log("Validation Errors:", newErrors);
  return Object.keys(newErrors).length === 0;
};



  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handleSubmit called");

  if (!validateForm()) {
    console.log("Form Data (invalid):", formData);
    return;
  }
  const doctorId = JSON.parse(localStorage.getItem('user'))?.id;
  console.log("Doctor ID:", doctorId);
  // Prepare payload based on API structure
  const payload = {
  patientId: patient.id.toString(),
  doctorUserId: doctorId !== undefined ? doctorId : null,// current logged-in doctor ID
  bloodPressure: formData.bloodPressure,
  heartRate: formData.heartRate ? Number(formData.heartRate) : undefined,
  temperature: formData.temperature ? Number(formData.temperature) : undefined,
  spo2: formData.spo2 ? Number(formData.spo2) : undefined,
  weight: formData.weight ? Number(formData.weight) : undefined,
  height: formData.height ? parseInt(formData.height, 10) : undefined,
  generalAppearance: formData.generalAppearance || "",
  cardiovascular: formData.cardiovascular || "",
  respiratory: formData.respiratory || "",
  abdominal: formData.abdominal || "",
  neurological: formData.neurological || "",
  additionalNotes: formData.additionalNotes || formData.notes || ""
};

  console.log('Submitting vital signs:', payload);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:3000/api/v1/patientRecords/quickexams/insert',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // token should be a variable holding the JWT
        }
      }
    );

    // Handle success
    if (response.status === 200 || response.status === 201) {
      if (onSubmit) {
        onSubmit(response.data);
      }
    }
  } catch (error) {
    console.error('Error saving vital signs:', error);
    alert('Failed to save vital signs. Please try again.');
  }
};

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <motion.div
      className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Activity className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Record Vital Signs</h2>
            <p className="text-sm text-gray-600">
              Patient: {patient.firstName} {patient.lastName} (ID: {patient.id})
            </p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <motion.div className="space-y-6" variants={containerVariants}>
          {/* Primary Vitals */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Heart className="w-5 h-5 text-orange-500 mr-2" />
              Primary Vital Signs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature *
                </label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  step="0.1"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 ${
                    errors.temperature ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="36.6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heart Rate (bpm) *
                </label>
                <input
                  type="number"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 ${
                    errors.heartRate ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="72"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Pressure *
                </label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 ${
                    errors.bloodPressure ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="120/80"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SpO₂ (%) *
                </label>
                <input
                  type="number"
                  name="spo2"
                  value={formData.spo2}
                  onChange={handleInputChange}
                  min="70"
                  max="100"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 ${
                    errors.spo2 ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="98"
                />
              </div>
            </div>
          </motion.div>

          {/* Physical Measurements */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 text-orange-500 mr-2" />
              Physical Measurements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 border-gray-200"
                  placeholder="70.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  step="0.1"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 border-gray-200"
                  placeholder="175"
                />
              </div>
            </div>
          </motion.div>

          {/* System Examination Notes */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Examination Notes</h3>
            <div className="space-y-4">
              <textarea
                name="generalAppearance"
                value={formData.generalAppearance}
                onChange={handleInputChange}
                placeholder="General Appearance"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
              <textarea
                name="cardiovascular"
                value={formData.cardiovascular}
                onChange={handleInputChange}
                placeholder="Cardiovascular"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
              <textarea
                name="respiratory"
                value={formData.respiratory}
                onChange={handleInputChange}
                placeholder="Respiratory"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
              <textarea
                name="abdominal"
                value={formData.abdominal}
                onChange={handleInputChange}
                placeholder="Abdominal"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
              <textarea
                name="neurological"
                value={formData.neurological}
                onChange={handleInputChange}
                placeholder="Neurological"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
                rows="2"
              />
            </div>
          </motion.div>

          {/* Additional Notes */}
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Patient advised to continue current medication."
            />
          </motion.div>

          {/* Form Actions */}
          <motion.div
            className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200"
            variants={itemVariants}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              role="nurse"
              icon={Save}
              className="shadow-lg hover:shadow-orange-200"
            >
              Save Vital Signs
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  </div>
);

};

export default VitalSignsForm;
