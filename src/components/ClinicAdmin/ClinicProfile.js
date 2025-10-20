// src/components/ClinicAdmin/ClinicProfile.js
import React, { useState, useEffect } from "react";
import {
  Building2,
  Mail,
  MapPin,
  Save,
  Edit3,
  AlertCircle,
  CheckCircle,
  FileText,
  Loader2,
} from "lucide-react";
import Button from "../Common/Button";
import ApiService from "../../services/apiService";

const ClinicProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Clinic data state - mapped from API response
  const [clinicData, setClinicData] = useState({
    instituteName: "",
    clinicType: "Medical Center",
    licenseNumber: "",

    email: "",
    phone: "",
    website: "",

    address: "",
    city: "",
    state: "",
    zipCode: "",

    // Additional fields not in API but needed for UI
    alternatePhone: "",
    district: "",
    country: "Sri Lanka",
    establishedYear: "",
    specializations: [],
    operatingHours: "6:00 AM - 10:00 PM",
    emergencyServices: false,
    adminName: "",
    adminPosition: "",
    adminEmail: "",
    adminPhone: "",
    logo: null,
  });

  const [originalData, setOriginalData] = useState(null);

  // Fetch clinic info on component mount
  useEffect(() => {
    fetchClinicInfo();
  }, []);

  const fetchClinicInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.getClinicInfo();

      if (response.data) {
        // Map API response to component state
        const apiData = response.data;
        const mappedData = {
          instituteName: apiData.institutionName || "",
          clinicType: "Medical Center", // Not in API response
          licenseNumber: apiData.licenseNumber || "",

          email: apiData.emailAddress || "",
          phone: apiData.phoneNumber || "",
          website: apiData.website || "",

          address: apiData.address || "",
          city: apiData.city || "",
          state: apiData.provinceState || "",
          zipCode: apiData.postalCode || "",

          // Fields not in API
          alternatePhone: "",
          district: "",
          country: "Sri Lanka",
          establishedYear: "",
          specializations: [],
          operatingHours: "6:00 AM - 10:00 PM",
          emergencyServices: false,
          adminName: "",
          adminPosition: "",
          adminEmail: "",
          adminPhone: "",
          logo: apiData.institutionLogo || null,
        };

        setClinicData(mappedData);
        setOriginalData(mappedData);
      }
    } catch (err) {
      console.error("Error fetching clinic info:", err);

      let errorMessage = "Failed to load clinic information";

      // Handle specific error cases
      if (err.message.includes("Hospital ID not found")) {
        errorMessage = "Authentication error. Please log in again.";
      } else if (err.message.includes("not valid JSON")) {
        errorMessage =
          "Server configuration error. Please check if you are logged in with the correct credentials.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setSaveMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setClinicData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      // Map component state to API request format
      const updateData = {
        institutionName: clinicData.instituteName,
        address: clinicData.address,
        city: clinicData.city,
        provinceState: clinicData.state,
        postalCode: clinicData.zipCode,
        phoneNumber: clinicData.phone,
        emailAddress: clinicData.email,
        website: clinicData.website,
        licenseNumber: clinicData.licenseNumber,
        institutionLogo: clinicData.logo || "",
      };

      const response = await ApiService.updateClinicInfo(updateData);

      if (response.data) {
        setSaveMessage({
          type: "success",
          text: response.message || "Clinic profile updated successfully!",
        });

        setIsEditing(false);
        setOriginalData(clinicData);

        // Refresh the data from server
        await fetchClinicInfo();

        // Clear message after 3 seconds
        setTimeout(() => setSaveMessage(null), 3000);
      }
    } catch (err) {
      console.error("Error updating clinic info:", err);

      let errorMessage = "Failed to update clinic profile";

      // Handle specific error cases
      if (err.message.includes("Hospital ID not found")) {
        errorMessage = "Authentication error. Please log in again.";
      } else if (err.message.includes("not valid JSON")) {
        errorMessage = "Server error. Please try again or contact support.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setSaveMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    if (originalData) {
      setClinicData(originalData);
    }
    setSaveMessage(null);
  };

  const clinicTypes = [
    "Medical Center",
    "Clinic",
    "Diagnostic Center",
    "Laboratory",
    "Specialized Clinic",
    "Dispensary",
  ];

  const sriLankanProvinces = [
    "Western Province",
    "Central Province",
    "Southern Province",
    "Northern Province",
    "Eastern Province",
    "North Western Province",
    "North Central Province",
    "Uva Province",
    "Sabaragamuwa Province",
  ];

  // Sri Lankan medical specializations appropriate for small scale institutions
  const commonSpecializations = [
    "General Medicine",
    "Pediatrics",
    "OB/GYN",
    "Cardiology",
    "ENT",
    "Dermatology",
    "Orthopedics",
    "Ophthalmology",
    "Psychiatry",
    "Radiology",
    "Pathology",
    "Emergency Medicine",
    "Family Medicine",
    "Internal Medicine",
  ];

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading clinic information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Institution Profile
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage your institution information and details
          </p>
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
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                role="clinicadmin"
                size="md"
                icon={isSaving ? Loader2 : Save}
                disabled={isSaving}
                className=""
              >
                {isSaving ? "Saving..." : "Save Changes"}
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
        <div
          className={`rounded-lg p-4 flex items-center space-x-3 ${
            saveMessage.type === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {saveMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span
            className={`font-medium ${
              saveMessage.type === "success" ? "text-green-800" : "text-red-800"
            }`}
          >
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                {clinicTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
              <label
                htmlFor="emergencyServices"
                className="text-sm font-medium text-gray-700"
              >
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  {sriLankanProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
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
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                {commonSpecializations.map((specialization) => (
                  <label
                    key={specialization}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={clinicData.specializations.includes(
                        specialization
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setClinicData((prev) => ({
                            ...prev,
                            specializations: [
                              ...prev.specializations,
                              specialization,
                            ],
                          }));
                        } else {
                          setClinicData((prev) => ({
                            ...prev,
                            specializations: prev.specializations.filter(
                              (s) => s !== specialization
                            ),
                          }));
                        }
                      }}
                      disabled={!isEditing}
                      className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      {specialization}
                    </span>
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
                  setClinicData((prev) => ({
                    ...prev,
                    logo: file,
                  }));
                }}
                disabled={!isEditing}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
                }`}
              />
              {clinicData.logo && (
                <p className="mt-1 text-sm text-green-600">
                  {typeof clinicData.logo === "string"
                    ? "Current logo uploaded"
                    : clinicData.logo.name}
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
                  isEditing
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-50"
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
