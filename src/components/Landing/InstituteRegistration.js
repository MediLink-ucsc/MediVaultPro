import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Stethoscope, 
  FlaskConical, 
  ArrowRight, 
  ArrowLeft,
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Upload, 
  Save, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const InstituteRegistration = ({ onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState('type'); // 'type', 'details', 'confirmation'
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    instituteName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    licenseNumber: '',
    website: '',
    logo: null,
    adminName: '',
    adminEmail: '',
    adminPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const instituteTypes = [
    {
      type: 'clinic',
      title: 'Medical Clinic',
      description: 'For clinics and medical centers providing outpatient care services',
      icon: <Stethoscope className="w-12 h-12" />,
      color: 'from-teal-500 to-teal-600',
      features: [
        'Patient Management System',
        'Prescription & Treatment Records',
        'Lab Integration & Reports',
        'Electronic Health Records',
        'Multi-role Access (Doctors, Nurses, Admin)'
      ]
    },
    {
      type: 'lab',
      title: 'Diagnostic Laboratory',
      description: 'For diagnostic labs, pathology centers, and medical testing facilities',
      icon: <FlaskConical className="w-12 h-12" />,
      color: 'from-teal-500 to-teal-600',
      features: [
        'Sample Management & Tracking',
        'Test Processing & Results',
        'Digital Report Generation',
        'Clinic Integration Support',
        'Lab Technician & Admin Access'
      ]
    },
    {
      type: 'clinic_lab',
      title: 'Medical Center + Lab',
      description: 'For medical centers with integrated in-house laboratory services',
      icon: <Building2 className="w-12 h-12" />,
      color: 'from-orange-500 to-orange-600',
      features: [
        'Complete Patient Management',
        'Integrated Lab Services',
        'Seamless Test Processing',
        'Unified Patient Reports',
        'All Roles Access (Doctors, Nurses, Lab Techs, Admin)'
      ]
    }
  ];

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setCurrentStep('details');
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          logo: 'Please select a valid image file (JPEG, PNG, or GIF)'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          logo: 'File size must be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      setErrors(prev => ({
        ...prev,
        logo: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.instituteName.trim()) {
      newErrors.instituteName = 'Institute name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Province is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Postal code is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.adminName.trim()) {
      newErrors.adminName = 'Administrator name is required';
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = 'Administrator email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.adminEmail)) {
      newErrors.adminEmail = 'Administrator email is invalid';
    }

    if (!formData.adminPhone.trim()) {
      newErrors.adminPhone = 'Administrator phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const registrationData = {
        ...formData,
        instituteType: selectedType,
        registrationDate: new Date().toISOString()
      };
      
      console.log('Institute Registration Data:', registrationData);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      instituteName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
      licenseNumber: '',
      website: '',
      logo: null,
      adminName: '',
      adminEmail: '',
      adminPhone: ''
    });
    setErrors({});
    setSelectedType('');
    setCurrentStep('type');
  };

  const selectedTypeData = instituteTypes.find(type => type.type === selectedType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2"
          >
            Join the MediLink Ecosystem
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Register your institution and start transforming healthcare delivery
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Institute Type Selection */}
          {currentStep === 'type' && (
            <motion.div
              key="type-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">What type of institution are you?</h2>
                <p className="text-gray-600">Choose the option that best describes your healthcare facility</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {instituteTypes.map((institute, index) => (
                  <motion.div
                    key={institute.type}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleTypeSelection(institute.type)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-gray-200"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${institute.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}>
                      {React.cloneElement(institute.icon, { className: "w-8 h-8" })}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{institute.title}</h3>
                    <p className="text-gray-600 mb-4 text-center text-sm">{institute.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Features:</h4>
                      {institute.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <motion.div 
                      className={`mt-4 bg-gradient-to-r ${institute.color} text-white py-2 px-4 rounded-lg text-center font-semibold flex items-center justify-center space-x-2 text-sm`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Select {institute.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Institute Details Form */}
          {currentStep === 'details' && (
            <motion.div
              key="details-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentStep('type')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Change Institute Type</span>
                  </button>
                  
                  {selectedTypeData && (
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${selectedTypeData.color} rounded-lg flex items-center justify-center text-white`}>
                        {React.cloneElement(selectedTypeData.icon, { className: "w-6 h-6" })}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedTypeData.title}</div>
                        <div className="text-sm text-gray-500">Registration</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Institution Details</h2>
                <p className="text-gray-600">Please provide your institution information</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Institution Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Institution Name *
                    </label>
                    <input
                      type="text"
                      name="instituteName"
                      value={formData.instituteName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.instituteName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Nawaloka Medical Center"
                    />
                    {errors.instituteName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.instituteName}
                      </p>
                    )}
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 23, Deshamanya H. K. Dharmadasa Mawatha"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Colombo"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Province/State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select Province</option>
                      <option value="Western Province">Western Province</option>
                      <option value="Central Province">Central Province</option>
                      <option value="Southern Province">Southern Province</option>
                      <option value="Northern Province">Northern Province</option>
                      <option value="Eastern Province">Eastern Province</option>
                      <option value="North Western Province">North Western Province</option>
                      <option value="North Central Province">North Central Province</option>
                      <option value="Uva Province">Uva Province</option>
                      <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., 00200"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="+94 11 234 5678"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="admin@nawaloka.lk"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Medical license number (SLMC)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="https://www.nawaloka.lk"
                    />
                  </div>
                </div>

                {/* Administrator Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Administrator Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Administrator Name *</label>
                      <input
                        type="text"
                        name="adminName"
                        value={formData.adminName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.adminName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Dr. Priyani Fernando"
                      />
                      {errors.adminName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.adminName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Administrator Email *</label>
                      <input
                        type="email"
                        name="adminEmail"
                        value={formData.adminEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.adminEmail ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="priyani.fernando@nawaloka.lk"
                      />
                      {errors.adminEmail && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.adminEmail}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Administrator Phone *</label>
                      <input
                        type="tel"
                        name="adminPhone"
                        value={formData.adminPhone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.adminPhone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+94 77 123 4567"
                      />
                      {errors.adminPhone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.adminPhone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Institution Logo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                      {errors.logo && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.logo}
                        </p>
                      )}
                      {formData.logo && (
                        <p className="mt-1 text-sm text-green-600 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {formData.logo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                <div className="flex space-x-4 pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 bg-gradient-to-r ${selectedTypeData?.color || 'from-teal-500 to-teal-600'} text-white py-4 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Register Institution</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-2xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
              <p className="text-xl text-gray-600 mb-6">
                Welcome to the MediLink ecosystem! Your {selectedTypeData?.title.toLowerCase()} registration has been submitted.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Our team will review your registration within 24-48 hours</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">You'll receive an email confirmation with setup instructions</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Our support team will contact you to schedule onboarding</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Access credentials will be sent to the administrator email</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => onComplete?.()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Continue to Dashboard
                </motion.button>
                <motion.button
                  onClick={resetForm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Register Another
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstituteRegistration;
