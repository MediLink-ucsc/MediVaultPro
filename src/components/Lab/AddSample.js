// src/components/Lab/AddSample.js
import React, { useEffect, useState } from "react";
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
  X,
} from "lucide-react";
import ApiService from "../../services/apiService";
import Button from "../Common/Button";
import { useToast } from "../Common/Toast";

// Utility function to decode JWT token and extract labId
const getLabIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Decoded token:", token);
    if (!token) return null;

    // Decode JWT token (split and parse the payload)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);
    console.log("Decoded token payload:", decoded);
    return decoded.labId || decoded.lab_id || decoded.hospitalId || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const AddSample = ({ onSubmit, onCancel }) => {
  const { showToast, ToastComponent } = useToast();

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    testTypeId: "",
    sampleType: "Whole Blood",
    priority: "routine",
    receivedDate: new Date().toISOString().split("T")[0],
    receivedTime: new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
    expectedDate: new Date().toISOString().split("T")[0],
    expectedTime: "",
    collectedBy: "",
    notes: "",
    volume: "",
    container: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [patientLoading, setPatientLoading] = useState(false);
  const [testTypesLoading, setTestTypesLoading] = useState(false);
  const [testTypes, setTestTypes] = useState([]);
  const [username, setUsername] = useState("");
  const [fetchedPatient, setFetchedPatient] = useState(null);

  const sampleTypes = [
    {
      value: "Whole Blood",
      label: "Whole Blood",
      icon: TestTube2,
      color: "text-red-600",
    },
    {
      value: "Serum",
      label: "Serum",
      icon: TestTube2,
      color: "text-orange-600",
    },
    {
      value: "Plasma",
      label: "Plasma",
      icon: TestTube2,
      color: "text-orange-500",
    },
    {
      value: "Urine",
      label: "Urine",
      icon: Beaker,
      color: "text-yellow-600",
    },
    {
      value: "Throat Swab",
      label: "Throat Swab",
      icon: Microscope,
      color: "text-teal-600",
    },
    {
      value: "Nasal Swab",
      label: "Nasal Swab",
      icon: Microscope,
      color: "text-teal-600",
    },
    {
      value: "Other",
      label: "Other",
      icon: FlaskConical,
      color: "text-gray-500",
    },
  ];

  // const testTypes = [
  //   "Complete Blood Count",
  //   "Urinalysis",
  //   "Lipid Panel",
  //   "Blood Culture",
  //   "Glucose Test",
  //   "Throat Culture",
  //   "Liver Function Test",
  //   "Kidney Function Test",
  //   "Thyroid Function Test",
  //   "Hemoglobin A1C",
  //   "Cholesterol Panel",
  //   "Blood Gas Analysis",
  // ];

  const containers = {
    "Whole Blood": [
      "EDTA Tube",
      "Heparinized Tube",
      "Fluoride Tube",
      "Culture Bottle",
    ],
    Serum: ["SST Tube", "Red-top tube", "Gold-top tube"],
    Plasma: ["EDTA Tube", "Heparinized Tube", "Citrate Tube"],
    Urine: ["Sterile Cup", "Non-sterile Cup", "24-hour Container"],
    "Throat Swab": ["Transport Media", "Dry Swab", "Viral Transport Media"],
    "Nasal Swab": ["Transport Media", "Dry Swab", "Viral Transport Media"],
    Other: ["Plain Tube", "Special Container"],
  };

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) {
      newErrors.patientId = "Please fetch a patient first";
    }

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Please fetch a patient first";
    }

    if (!formData.testTypeId.trim()) {
      newErrors.testTypeId = "Test type is required";
    }

    if (!formData.collectedBy.trim()) {
      newErrors.collectedBy = "Collected by is required";
    }

    if (!formData.volume.trim()) {
      newErrors.volume = "Volume is required";
    }

    if (!formData.container.trim()) {
      newErrors.container = "Container type is required";
    }

    if (!formData.expectedDate.trim()) {
      newErrors.expectedDate = "Expected date is required";
    }

    if (!formData.expectedTime.trim()) {
      newErrors.expectedTime = "Expected time is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Get labId from token
    const labId = getLabIdFromToken();
    if (!labId) {
      showToast("Lab ID not found in token. Please login again.", "error");
      return;
    }

    try {
      setLoading(true);

      // Create the expected payload format
      const expectedDateTime = new Date(
        `${formData.expectedDate}T${formData.expectedTime}:00.000Z`
      );

      const samplePayload = {
        labId: labId.toString(),
        barcode: `REN-${String(Date.now()).slice(-5).padStart(5, "0")}`, // Generate barcode similar to example
        testTypeId: parseInt(formData.testTypeId),
        sampleType: formData.sampleType,
        volume: formData.volume,
        container: formData.container,
        patientId: formData.patientId.toString(),
        expectedTime: expectedDateTime.toISOString(),
        priority: formData.priority.toUpperCase(), // Convert to uppercase as per API format
        notes: formData.notes || "",
      };

      // Validate payload before sending
      const requiredFields = [
        "labId",
        "barcode",
        "testTypeId",
        "sampleType",
        "patientId",
        "expectedTime",
      ];
      const missingFields = requiredFields.filter(
        (field) => !samplePayload[field]
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Additional validation
      if (isNaN(samplePayload.testTypeId)) {
        throw new Error("Test Type ID must be a valid number");
      }

      if (!samplePayload.labId || samplePayload.labId === "null") {
        throw new Error("Lab ID is invalid. Please login again.");
      }

      console.log("Sample Payload to Submit:", samplePayload);
      console.log(
        "Payload validation - all required fields present:",
        requiredFields.every((field) => samplePayload[field])
      );

      const response = await ApiService.createLabSample(samplePayload);
      console.log("Create sample response:", response);

      if (response && response.success) {
        showToast("Sample created successfully!", "success");

        // Reset form after successful submission
        setFormData({
          patientId: "",
          patientName: "",
          testTypeId: "",
          sampleType: "Whole Blood",
          priority: "routine",
          receivedDate: new Date().toISOString().split("T")[0],
          receivedTime: new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          expectedDate: new Date().toISOString().split("T")[0],
          expectedTime: "",
          collectedBy: "",
          notes: "",
          volume: "",
          container: "",
        });
        setUsername("");
        setFetchedPatient(null);
        setErrors({});

        // Call the onSubmit callback with the response data if provided
        if (onSubmit) {
          onSubmit(response);
        }
      } else {
        throw new Error(response?.message || "Failed to create sample");
      }
    } catch (error) {
      console.error("Failed to create sample:", error);
      showToast(error.message || "Failed to create sample", "error");
    } finally {
      setLoading(false);
    }
  };

  const getSampleTypeIcon = (type) => {
    const sampleType = sampleTypes.find((st) => st.value === type);
    if (sampleType) {
      const IconComponent = sampleType.icon;
      return <IconComponent className={`w-5 h-5 ${sampleType.color}`} />;
    }
    return <FlaskConical className="w-5 h-5 text-gray-500" />;
  };

  const fetchPatientByUsername = async () => {
    if (!username) {
      showToast("Please enter username/contact number", "warning");
      return;
    }

    try {
      setPatientLoading(true);
      const response = await ApiService.getPatientByUsername(username);
      console.log("Patient response:", response);

      if (response && response.patientId) {
        setFetchedPatient(response);
        setFormData((prev) => ({
          ...prev,
          patientId: response.patientId.toString(),
          patientName: `${response.user.firstName} ${response.user.lastName}`,
        }));
      } else {
        console.error("Invalid patient response format");
        showToast("Patient not found", "error");
        setFetchedPatient(null);
        setFormData((prev) => ({
          ...prev,
          patientId: "",
          patientName: "",
        }));
      }
    } catch (error) {
      console.error("Failed to fetch patient:", error);
      showToast(error.message || "Failed to fetch patient", "error");
      setFetchedPatient(null);
      setFormData((prev) => ({
        ...prev,
        patientId: "",
        patientName: "",
      }));
    } finally {
      setPatientLoading(false);
    }
  };

  useEffect(() => {
    const fetchTestTypes = async () => {
      try {
        setTestTypesLoading(true);
        const response = await ApiService.getTestTypes();
        console.log("Test types response:", response);

        if (response.success && Array.isArray(response.data)) {
          setTestTypes(response.data);
        } else {
          console.error("Invalid test types response format");
          setTestTypes([]);
        }
      } catch (error) {
        console.error("Failed to fetch test types:", error);
        setTestTypes([]);
      } finally {
        setTestTypesLoading(false);
      }
    };
    fetchTestTypes();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Patient Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-teal-600" />
          Patient Information
        </h3>

        {/* Username & Fetch */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Username / Contact *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter username or contact"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              type="button"
              onClick={fetchPatientByUsername}
              size="sm"
              disabled={patientLoading}
            >
              {patientLoading ? "Loading..." : "Get Patient"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient ID *
            </label>
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
              placeholder="Fetch patient first"
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
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
              placeholder="Fetch patient first"
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.patientName}
              </p>
            )}
          </div>
        </div>

        {fetchedPatient && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✓ Patient found:{" "}
              <span className="font-medium">
                {fetchedPatient.user.firstName} {fetchedPatient.user.lastName}
              </span>{" "}
              ({fetchedPatient.user.username})
            </p>
          </div>
        )}
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
              name="testTypeId" // Changed from testType to testTypeId
              value={formData.testTypeId}
              onChange={handleInputChange}
              disabled={testTypesLoading}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.testTypeId ? "border-red-300" : "border-gray-300"
              } ${testTypesLoading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">
                {testTypesLoading
                  ? "Loading test types..."
                  : "Select test type"}
              </option>
              {testTypes.map((test) => (
                <option key={test.id} value={test.id}>
                  {test.label} ({test.category})
                </option>
              ))}
            </select>
            {errors.testTypeId && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.testTypeId}
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
                {sampleTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
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
                errors.volume ? "border-red-300" : "border-gray-300"
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
                errors.container ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Select container</option>
              {containers[formData.sampleType]?.map((container) => (
                <option key={container} value={container}>
                  {container}
                </option>
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
              <option value="routine">Routine</option>
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
              Expected Completion Date *
            </label>
            <input
              type="date"
              name="expectedDate"
              value={formData.expectedDate || formData.receivedDate}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.expectedDate ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.expectedDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.expectedDate}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Completion Time *
            </label>
            <input
              type="time"
              name="expectedTime"
              value={formData.expectedTime}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${
                errors.expectedTime ? "border-red-300" : "border-gray-300"
              }`}
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
                errors.collectedBy ? "border-red-300" : "border-gray-300"
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
          disabled={loading}
          className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          }`}
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Creating Sample..." : "Add Sample"}</span>
        </button>
      </div>

      <ToastComponent />
    </form>
  );
};

export default AddSample;
