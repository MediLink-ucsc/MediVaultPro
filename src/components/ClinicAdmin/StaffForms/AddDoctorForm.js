// src/components/ClinicAdmin/StaffForms/AddDoctorForm.js
import React, { useState } from 'react';
import { User, Mail, Phone, Building, Calendar, FileText, Award, MapPin } from 'lucide-react';

const AddDoctorForm = ({ onSubmit, onCancel, adminInstitute = "City General Hospital" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institute: adminInstitute, // Auto-populated from admin's institute
    department: '',
    specialization: '',
    licenseNumber: '',
    medicalDegree: '',
    experience: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    consultationFee: '',
    availableDays: [],
    consultationHours: {
      start: '',
      end: ''
    }
  });

  const [errors, setErrors] = useState({});

  const departments = [
    'Cardiology',
    'Neurology', 
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'Dermatology',
    'Psychiatry',
    'General Medicine',
    'Surgery',
    'Emergency Medicine',
    'Radiology',
    'Anesthesiology'
  ];

  const specializations = [
    'Interventional Cardiology',
    'Pediatric Cardiology',
    'Cardiac Surgery',
    'Neurosurgery',
    'Stroke Medicine',
    'Pediatric Neurology',
    'Orthopedic Surgery',
    'Sports Medicine',
    'Spine Surgery',
    'General Pediatrics',
    'Neonatology',
    'Pediatric Surgery',
    'Obstetrics',
    'Reproductive Endocrinology',
    'Cosmetic Dermatology',
    'Dermatopathology',
    'General Surgery',
    'Trauma Surgery',
    'Emergency Medicine'
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

  const handleConsultationHoursChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      consultationHours: {
        ...prev.consultationHours,
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.medicalDegree.trim()) newErrors.medicalDegree = 'Medical degree is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        role: 'doctor',
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-teal-300'
              }`}
              placeholder="Dr. John Doe"
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.name}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-teal-300'
                }`}
                placeholder="doctor@hospital.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.email}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-teal-300'
                }`}
                placeholder="+94 xxx xxx xxx"
              />
            </div>
            {errors.phone && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.phone}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-teal-300 resize-none"
                placeholder="Full address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl border border-orange-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <Building className="w-5 h-5 text-white" />
          </div>
          Professional Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institute
            </label>
            <div className="px-4 py-3 bg-gradient-to-r from-orange-100 to-orange-50 border-2 border-orange-200 rounded-xl text-gray-700 font-medium">
              {adminInstitute}
            </div>
            <p className="mt-2 text-xs text-gray-500">Staff will be added to your institute</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.department ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.department}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-orange-300"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medical License Number *
            </label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.licenseNumber ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-orange-300'
                }`}
                placeholder="MD-12345"
              />
            </div>
            {errors.licenseNumber && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.licenseNumber}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medical Degree *
            </label>
            <div className="relative">
              <Award className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="medicalDegree"
                value={formData.medicalDegree}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.medicalDegree ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-orange-300'
                }`}
                placeholder="MBBS, MD, etc."
              />
            </div>
            {errors.medicalDegree && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.medicalDegree}
            </p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Years of Experience *
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              min="0"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.experience ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-orange-300'
              }`}
              placeholder="5"
            />
            {errors.experience && <p className="mt-2 text-sm text-red-600 flex items-center">
              <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">!</span>
              {errors.experience}
            </p>}
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-6 rounded-xl border border-gray-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <Phone className="w-5 h-5 text-white" />
          </div>
          Emergency Contact
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-100 focus:border-gray-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-gray-300"
              placeholder="Contact person name"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-gray-100 focus:border-gray-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-gray-300"
              placeholder="+94 xxx xxx xxx"
            />
          </div>
        </div>
      </div>

      {/* Consultation Details */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-xl border border-teal-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          Consultation Details
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Consultation Fee (LKR)
            </label>
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-teal-300"
              placeholder="2000"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Available Days
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {daysOfWeek.map((day) => (
                <label key={day} className="group flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-xl hover:border-teal-300 transition-all duration-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.availableDays.includes(day)}
                    onChange={() => handleDaysChange(day)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consultation Start Time
              </label>
              <input
                type="time"
                value={formData.consultationHours.start}
                onChange={(e) => handleConsultationHoursChange('start', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-teal-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Consultation End Time
              </label>
              <input
                type="time"
                value={formData.consultationHours.end}
                onChange={(e) => handleConsultationHoursChange('end', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-teal-300"
              />
            </div>
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
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctorForm;
