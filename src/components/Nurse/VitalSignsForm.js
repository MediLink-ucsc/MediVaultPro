// src/components/Nurse/VitalSignsForm.js
import React, { useState } from 'react';
import { Save, X, User, Activity, Heart, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../Common/Button';
import dataStore from '../../utils/dataStore';

const VitalSignsForm = ({ patient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    temperature: '',
    temperatureUnit: 'F',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    weight: '',
    weightUnit: 'kg',
    height: '',
    heightUnit: 'cm',
    notes: ''
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

    if (!formData.temperature) newErrors.temperature = 'Temperature is required';
    if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required';
    if (!formData.bloodPressure) newErrors.bloodPressure = 'Blood pressure is required';
    if (!formData.respiratoryRate) newErrors.respiratoryRate = 'Respiratory rate is required';
    if (!formData.oxygenSaturation) newErrors.oxygenSaturation = 'Oxygen saturation is required';

    // Validate ranges
    const temp = parseFloat(formData.temperature);
    if (formData.temperature && (temp < 90 || temp > 110)) {
      newErrors.temperature = 'Temperature should be between 90-110°F';
    }

    const heartRate = parseInt(formData.heartRate);
    if (formData.heartRate && (heartRate < 40 || heartRate > 200)) {
      newErrors.heartRate = 'Heart rate should be between 40-200 bpm';
    }

    const oxygenSat = parseInt(formData.oxygenSaturation);
    if (formData.oxygenSaturation && (oxygenSat < 70 || oxygenSat > 100)) {
      newErrors.oxygenSaturation = 'Oxygen saturation should be between 70-100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const vitalSignsData = {
      patientId: patient.id,
      temperature: `${formData.temperature}°${formData.temperatureUnit}`,
      heartRate: `${formData.heartRate} bpm`,
      bloodPressure: formData.bloodPressure,
      respiratoryRate: `${formData.respiratoryRate}/min`,
      oxygenSaturation: `${formData.oxygenSaturation}%`,
      weight: formData.weight ? `${formData.weight} ${formData.weightUnit}` : '',
      height: formData.height ? `${formData.height} ${formData.heightUnit}` : '',
      notes: formData.notes,
      recordedBy: 'Current Nurse' // In real app, get from user context
    };

    // Save to data store
    const savedVitals = dataStore.addVitalSigns(vitalSignsData);
    
    if (onSubmit) {
      onSubmit(savedVitals);
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
                  <div className="flex">
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      step="0.1"
                      className={`flex-1 p-3 border rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.temperature ? 'border-red-300' : 'border-gray-200'
                      }`}
                      placeholder="98.6"
                    />
                    <select
                      name="temperatureUnit"
                      value={formData.temperatureUnit}
                      onChange={handleInputChange}
                      className="px-3 py-3 border-l-0 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="F">°F</option>
                      <option value="C">°C</option>
                    </select>
                  </div>
                  {errors.temperature && (
                    <p className="text-red-500 text-sm mt-1">{errors.temperature}</p>
                  )}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.heartRate ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="72"
                  />
                  {errors.heartRate && (
                    <p className="text-red-500 text-sm mt-1">{errors.heartRate}</p>
                  )}
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.bloodPressure ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="120/80"
                  />
                  {errors.bloodPressure && (
                    <p className="text-red-500 text-sm mt-1">{errors.bloodPressure}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Respiratory Rate (/min) *
                  </label>
                  <input
                    type="number"
                    name="respiratoryRate"
                    value={formData.respiratoryRate}
                    onChange={handleInputChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.respiratoryRate ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="16"
                  />
                  {errors.respiratoryRate && (
                    <p className="text-red-500 text-sm mt-1">{errors.respiratoryRate}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oxygen Saturation (%) *
                  </label>
                  <input
                    type="number"
                    name="oxygenSaturation"
                    value={formData.oxygenSaturation}
                    onChange={handleInputChange}
                    min="70"
                    max="100"
                    className={`w-full md:w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                      errors.oxygenSaturation ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="98"
                  />
                  {errors.oxygenSaturation && (
                    <p className="text-red-500 text-sm mt-1">{errors.oxygenSaturation}</p>
                  )}
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
                  <div className="flex">
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      step="0.1"
                      className="flex-1 p-3 border rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 border-gray-200"
                      placeholder="65"
                    />
                    <select
                      name="weightUnit"
                      value={formData.weightUnit}
                      onChange={handleInputChange}
                      className="px-3 py-3 border-l-0 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      step="0.1"
                      className="flex-1 p-3 border rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 border-gray-200"
                      placeholder="165"
                    />
                    <select
                      name="heightUnit"
                      value={formData.heightUnit}
                      onChange={handleInputChange}
                      className="px-3 py-3 border-l-0 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="cm">cm</option>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notes */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Additional observations or notes..."
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
