// src/components/ClinicAdmin/ClinicProfile.js
import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Save,
  Edit3,
  AlertCircle,
  CheckCircle,
  FileText
} from 'lucide-react';
import Button from '../Common/Button';

const ClinicProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  
  // Auto-filled data that would come from the registration
  const [clinicData, setClinicData] = useState({
    // Basic Information (matching registration form)
    instituteName: 'Nawaloka Medical Center',
    clinicType: 'Medical Center',
    registrationNumber: 'REG-2024-001',
    licenseNumber: 'LIC-NMC-2024',
    
    // Contact Information (matching registration form)
    email: 'admin@nawaloka.lk',
    phone: '+94 11 234 5678',
    alternatePhone: '+94 11 234 5679',
    website: 'https://www.nawaloka.lk',
    
    // Address Information (matching registration form - using "address" and "state")
    address: '23, Deshamanya H. K. Dharmadasa Mawatha',
    city: 'Colombo',
    district: 'Colombo',
    state: 'Western Province', // Changed from "province" to match registration
    zipCode: '00200', // Changed from "postalCode" to match registration
    country: 'Sri Lanka',
    
    // Operational Information (Sri Lankan context)
    establishedYear: '1985',
    specializations: ['General Medicine', 'Cardiology', 'Pediatrics', 'OB/GYN', 'ENT'],
    operatingHours: '6:00 AM - 10:00 PM',
    emergencyServices: true,
    
    // Administrative (matching registration form)
    adminName: 'Dr. Priyani Fernando',
    adminPosition: 'Medical Director',
    adminEmail: 'priyani.fernando@nawaloka.lk',
    adminPhone: '+94 77 123 4567',
    
    // Additional field from registration
    logo: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinicData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the clinic data
    console.log('Saving clinic data:', clinicData);
    
    setSaveMessage({
      type: 'success',
      text: 'Clinic profile updated successfully!'
    });
    
    setIsEditing(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In a real app, you might want to reset the form to original values
  };

  const clinicTypes = [
    'Medical Center',
    'Clinic',
    'Diagnostic Center',
    'Laboratory',
    'Specialized Clinic',
    'Dispensary'
  ];

  const sriLankanProvinces = [
    'Western Province',
    'Central Province',
    'Southern Province',
    'Northern Province',
    'Eastern Province',
    'North Western Province',
    'North Central Province',
    'Uva Province',
    'Sabaragamuwa Province'
  ];

  // Sri Lankan medical specializations appropriate for small scale institutions
  const commonSpecializations = [
    'General Medicine',
    'Pediatrics',
    'OB/GYN',
    'Cardiology',
    'ENT',
    'Dermatology',
    'Orthopedics',
    'Ophthalmology',
    'Psychiatry',
    'Radiology',
    'Pathology',
    'Emergency Medicine',
    'Family Medicine',
    'Internal Medicine'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Institution Profile</h1>
          <p className="text-gray-600 mt-1">View and manage your institution information and details</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              variant="primary"
              role="clinicadmin"
              size="md"
              icon={Edit3}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button 
                onClick={handleCancel}
                variant="secondary"
                role="neutral"
                size="md"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                variant="primary"
                role="clinicadmin"
                size="md"
                icon={Save}
              >
                Save Changes
              </Button>
            </div>
          )}
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saveMessage && (
        <div className={`rounded-lg p-4 flex items-center space-x-3 ${
          saveMessage.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {saveMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-medium ${
            saveMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {saveMessage.text}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-teal-600" />
            <span>Basic Information</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Name
              </label>
              <input
                type="text"
                name="instituteName"
                value={clinicData.instituteName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Type
              </label>
              <select
                name="clinicType"
                value={clinicData.clinicType}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              >
                {clinicTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={clinicData.registrationNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={clinicData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year
                </label>
                <input
                  type="number"
                  name="establishedYear"
                  value={clinicData.establishedYear}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Mail className="w-5 h-5 text-teal-600" />
            <span>Contact Information</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={clinicData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={clinicData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Phone
                </label>
                <input
                  type="tel"
                  name="alternatePhone"
                  value={clinicData.alternatePhone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={clinicData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating Hours
              </label>
              <select
                name="operatingHours"
                value={clinicData.operatingHours}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <option value="6:00 AM - 10:00 PM">6:00 AM - 10:00 PM</option>
                <option value="7:00 AM - 9:00 PM">7:00 AM - 9:00 PM</option>
                <option value="8:00 AM - 8:00 PM">8:00 AM - 8:00 PM</option>
                <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                <option value="24/7">24/7</option>
                <option value="Custom">Custom Hours</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="emergencyServices"
                name="emergencyServices"
                checked={clinicData.emergencyServices}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="emergencyServices" className="text-sm font-medium text-gray-700">
                24/7 Emergency Services Available
              </label>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-teal-600" />
            <span>Address Information</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={clinicData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
                placeholder="Street address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={clinicData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={clinicData.district}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Province/State
                </label>
                <select
                  name="state"
                  value={clinicData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {sriLankanProvinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={clinicData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder="e.g., 00200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={clinicData.country}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Specializations & Administrative */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Specializations & Administration</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Specializations
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3">
                {commonSpecializations.map(specialization => (
                  <label key={specialization} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={clinicData.specializations.includes(specialization)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setClinicData(prev => ({
                            ...prev,
                            specializations: [...prev.specializations, specialization]
                          }));
                        } else {
                          setClinicData(prev => ({
                            ...prev,
                            specializations: prev.specializations.filter(s => s !== specialization)
                          }));
                        }
                      }}
                      disabled={!isEditing}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{specialization}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select the medical specializations available at your institution
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setClinicData(prev => ({
                    ...prev,
                    logo: file
                  }));
                }}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
              {clinicData.logo && (
                <p className="mt-1 text-sm text-green-600">
                  {typeof clinicData.logo === 'string' ? 'Current logo uploaded' : clinicData.logo.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Name
              </label>
              <input
                type="text"
                name="adminName"
                value={clinicData.adminName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Position
              </label>
              <input
                type="text"
                name="adminPosition"
                value={clinicData.adminPosition}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Email
              </label>
              <input
                type="email"
                name="adminEmail"
                value={clinicData.adminEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Administrator Phone
              </label>
              <input
                type="tel"
                name="adminPhone"
                value={clinicData.adminPhone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
