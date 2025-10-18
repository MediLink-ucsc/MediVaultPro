// src/components/ClinicAdmin/StaffForms/AddNurseForm.js
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  Award,
  MapPin,
  Heart,
} from "lucide-react";
import ApiService from "../../../services/apiService";
import { getHospitalIdFromToken } from "../../../utils/jwtHelper";

const AddNurseForm = ({
  onSubmit,
  onCancel,
  adminInstitute = "City General Hospital",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    institute: adminInstitute, // Auto-populated from admin's institute
    department: "",
    specialization: "",
    licenseNumber: "",
    qualification: "",
    experience: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    position: "",
    emergencyContact: "",
    emergencyPhone: "",
    shiftPreference: "",
    certifications: [],
    workingHours: {
      start: "",
      end: "",
    },
    availableDays: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    "Emergency",
    "Pediatrics",
    "Maternity",
    "Surgery",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Oncology",
    "Psychiatry",
    "Outpatient",
    "Day Surgery",
  ];

  const specializations = [
    "Emergency Nursing",
    "Pediatric Nursing",
    "Surgical Nursing",
    "Cardiac Nursing",
    "Oncology Nursing",
    "Psychiatric Nursing",
    "Geriatric Nursing",
    "Community Health Nursing",
    "Midwifery",
    "Anesthesia Nursing",
    "Infection Control",
    "Wound Care",
  ];

  const certifications = [
    "Basic Life Support (BLS)",
    "Advanced Cardiovascular Life Support (ACLS)",
    "Pediatric Advanced Life Support (PALS)",
    "Certified Emergency Nurse (CEN)",
    "Certified Pediatric Nurse (CPN)",
    "Certified Wound Care Nurse",
    "Infection Prevention and Control",
    "Trauma Nursing Core Course (TNCC)",
    "Certified Ambulatory Care Nurse (CACN)",
  ];

  const shiftOptions = [
    { value: "morning", label: "Morning Shift (6 AM - 2 PM)" },
    { value: "afternoon", label: "Afternoon Shift (2 PM - 10 PM)" },
    { value: "full-day", label: "Full Day (8 AM - 6 PM)" },
    { value: "flexible", label: "Flexible" },
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleWorkingHoursChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value,
      },
    }));
  };

  const handleDaysChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handleCertificationChange = (certification) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter((c) => c !== certification)
        : [...prev.certifications, certification],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsSubmitting(true);

        // Get hospital ID from token
        const hospitalId = getHospitalIdFromToken();

        if (!hospitalId) {
          throw new Error("Hospital ID not found. Please login again.");
        }

        // Prepare medical staff data for API
        const medicalStaffData = {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          username: formData.email.trim(), // Email is used as username
          position: formData.position.trim(),
          qualification: formData.qualification.trim(),
          department: formData.department,
          yearsOfExperience: parseInt(formData.experience),
          hospitalId: hospitalId,
          hospitalName: adminInstitute,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          // Additional fields that might be needed
          phone: formData.phone.trim(),
          address: formData.address.trim(),
        };

        console.log("Submitting medical staff data:", medicalStaffData);

        // Call API to register medical staff
        const response = await ApiService.registerMedicalStaff(
          medicalStaffData
        );

        console.log("Medical staff registered successfully:", response);

        // Call parent's onSubmit with the response data
        onSubmit({
          firstName: formData.firstName,
          lastName: formData.lastName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          role: "nurse",
          status: "active",
          joinDate: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error adding medical staff:", error);
        setErrors({
          submit:
            error.message || "Failed to add staff member. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-xl border border-orange-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <User className="w-5 h-5 text-white" />
          </div>
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.firstName
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-orange-300"
              }`}
              placeholder="Jane"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.lastName
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-orange-300"
              }`}
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.lastName}
              </p>
            )}
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
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.email
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                placeholder="nurse@hospital.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.email}
              </p>
            )}
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
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 hover:border-orange-300"
                }`}
                placeholder="+94 xxx xxx xxx"
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.gender
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.gender}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.dateOfBirth
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            />
            {errors.dateOfBirth && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.dateOfBirth}
              </p>
            )}
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
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-200 bg-white/70 backdrop-blur-sm hover:border-orange-300 resize-none"
                placeholder="Full address"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 p-6 rounded-xl border border-teal-200/50 shadow-soft">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-medium">
            <Building className="w-5 h-5 text-white" />
          </div>
          Professional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Institute
            </label>
            <div className="px-4 py-3 bg-gradient-to-r from-teal-100 to-teal-50 border-2 border-teal-200 rounded-xl text-gray-700 font-medium">
              {adminInstitute}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Staff will be added to your institute
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department *
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.department
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-teal-300"
              }`}
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.department}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-teal-100 focus:border-teal-500 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                errors.position
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 hover:border-teal-300"
              }`}
              placeholder="e.g., Registered Nurse, Staff Nurse"
            />
            {errors.position && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
                  !
                </span>
                {errors.position}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Select Specialization</option>
              {specializations.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualification *
            </label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                  errors.qualification ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., BSN, ADN, Diploma in Nursing"
              />
            </div>
            {errors.qualification && (
              <p className="mt-1 text-sm text-red-600">
                {errors.qualification}
              </p>
            )}
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.experience ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="3"
            />
            {errors.experience && (
              <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
            )}
          </div>
        </div>
      </div>

      {/* Work Schedule */}
      {/* <div className="bg-gray-50 p-4 rounded-lg">
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
      </div> */}

      {/* Certifications */}
      {/* <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Heart className="w-5 h-5 mr-2 text-orange-600" />
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
      </div> */}

      {/* Emergency Contact */}
      {/* <div className="bg-gray-50 p-4 rounded-lg">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="+94 xxx xxx xxx"
            />
          </div>
        </div>
      </div> */}

      {/* Form Actions */}
      {errors.submit && (
        <div className="rounded-lg p-4 bg-red-50 border border-red-200">
          <p className="text-sm text-red-600 flex items-center">
            <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center mr-2">
              !
            </span>
            {errors.submit}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200/50">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium shadow-medium hover:shadow-strong transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? "Adding Staff..." : "Add Nurse"}
        </button>
      </div>
    </form>
  );
};

export default AddNurseForm;
