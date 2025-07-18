// src/components/SystemAdmin/StaffForms/AddLabTechForm.js
import React, { useState } from 'react';
import { User, Mail, Phone, Building, Calendar, FileText, Award, MapPin, TestTube } from 'lucide-react';

const AddLabTechForm = ({ onSubmit, onCancel, adminInstitute = "Central Diagnostic Lab" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institute: adminInstitute, // Auto-populated from admin's institute
    department: '',
    specialization: '',
    licenseNumber: '',
    degree: '',
    experience: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    shiftPreference: '',
    certifications: [],
    equipmentExpertise: [],
    workingHours: {
      start: '',
      end: ''
    },
    availableDays: []
  });

  const [errors, setErrors] = useState({});

  const departments = [
    'Clinical Chemistry',
    'Hematology',
    'Microbiology',
    'Immunology',
    'Pathology',
    'Blood Bank',
    'Molecular Biology',
    'Cytology',
    'Histopathology',
    'Toxicology',
    'Endocrinology',
    'Genetics',
    'Virology'
  ];

  const specializations = [
    'Clinical Laboratory Science',
    'Medical Technology',
    'Biomedical Science',
    'Microbiology & Immunology',
    'Clinical Chemistry',
    'Hematology & Coagulation',
    'Molecular Diagnostics',
    'Cytotechnology',
    'Histotechnology',
    'Phlebotomy',
    'Blood Banking',
    'Point-of-Care Testing'
  ];

  const certifications = [
    'Medical Laboratory Scientist (MLS)',
    'Medical Laboratory Technician (MLT)',
    'American Society for Clinical Pathology (ASCP)',
    'Phlebotomy Technician Certification',
    'Clinical Laboratory Improvement Amendments (CLIA)',
    'Biosafety Certification',
    'Quality Control Certification',
    'Molecular Diagnostics Certification',
    'Cytotechnology Certification',
    'Histotechnology Certification'
  ];

  const equipmentList = [
    'Automated Chemistry Analyzers',
    'Hematology Analyzers',
    'Immunoassay Analyzers',
    'Blood Gas Analyzers',
    'Microscopes (Light & Fluorescence)',
    'Centrifuges',
    'Incubators',
    'Autoclave',
    'PCR Machines',
    'ELISA Readers',
    'Spectrophotometers',
    'Cell Counters',
    'Coagulation Analyzers',
    'Molecular Sequencers'
  ];

  const shiftOptions = [
    { value: 'day', label: 'Day Shift (7 AM - 3 PM)' },
    { value: 'evening', label: 'Evening Shift (3 PM - 11 PM)' },
    { value: 'night', label: 'Night Shift (11 PM - 7 AM)' },
    { value: 'rotating', label: 'Rotating Shifts' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

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

  const handleWorkingHoursChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value
      }
    }));
  };

  const handleDaysChange = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter(d => d !== day)
        : [...prev.availableDays, day]
    }));
  };

  const handleCertificationChange = (certification) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification]
    }));
  };

  const handleEquipmentChange = (equipment) => {
    setFormData(prev => ({
      ...prev,
      equipmentExpertise: prev.equipmentExpertise.includes(equipment)
        ? prev.equipmentExpertise.filter(e => e !== equipment)
        : [...prev.equipmentExpertise, equipment]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        role: 'lab',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-xl border border-teal-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <User className="w-5 h-5 text-white" />
          </div>
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Wilson"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="labtech@lab.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="+94 xxx xxx xxx"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Full address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-orange-600" />
          Professional Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institute
            </label>
            <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
              {adminInstitute}
            </div>
            <p className="mt-1 text-xs text-gray-500">Staff will be added to your institute</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.department ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Number *
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.licenseNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="LT-12345"
              />
            </div>
            {errors.licenseNumber && <p className="mt-1 text-sm text-red-600">{errors.licenseNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree/Qualification *
            </label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.degree ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="BSc in Medical Laboratory Technology"
              />
            </div>
            {errors.degree && <p className="mt-1 text-sm text-red-600">{errors.degree}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience *
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.experience ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="2"
            />
            {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
          </div>
        </div>
      </div>

      {/* Work Schedule */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-orange-600" />
          Work Schedule
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shift Preference
            </label>
            <select
              name="shiftPreference"
              value={formData.shiftPreference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Shift Preference</option>
              {shiftOptions.map((shift) => (
                <option key={shift.value} value={shift.value}>
                  {shift.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Days
            </label>
            <div className="grid grid-cols-4 gap-2">
              {daysOfWeek.map((day) => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleDaysChange(day)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Start Time
              </label>
              <input
                type="time"
                value={formData.workingHours.start}
                onChange={(e) => handleWorkingHoursChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred End Time
              </label>
              <input
                type="time"
                value={formData.workingHours.end}
                onChange={(e) => handleWorkingHoursChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Expertise */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TestTube className="w-5 h-5 mr-2 text-teal-600" />
          Equipment Expertise
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {equipmentList.map((equipment) => (
            <label key={equipment} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.equipmentExpertise.includes(equipment)}
                onChange={() => handleEquipmentChange(equipment)}
                className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">{equipment}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-orange-600" />
          Certifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {certifications.map((certification) => (
            <label key={certification} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.certifications.includes(certification)}
                onChange={() => handleCertificationChange(certification)}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-700">{certification}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Emergency Contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Contact person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="+94 xxx xxx xxx"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200/50">
        <button
          type="button"
          onClick={onCancel}
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-soft"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 font-medium shadow-medium hover:shadow-strong transform hover:-translate-y-0.5"
        >
          Add Lab Technician
        </button>
      </div>
    </form>
  );
};

export default AddLabTechForm;
