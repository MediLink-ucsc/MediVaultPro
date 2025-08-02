// src/components/Lab/UploadReportForm.js
import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Activity,
  FileCheck,
} from "lucide-react";
import ApiService from "../../services/apiService";

const UploadReportForm = ({ onSubmit, sampleData }) => {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    testType: "",
    reportFile: null,
    urgency: "normal",
    notes: "",
    resultDate: new Date().toISOString().split("T")[0],
    technician: "",
    department: "",
    referringPhysician: "",
    criticalValues: false,
    followUpRequired: false,
    sampleId: "",
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [testTypes, setTestTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);

  // const testTypes = [
  //   { value: 'blood-cbc', label: 'Blood Test - CBC', category: 'Hematology' },
  //   { value: 'blood-lipid', label: 'Blood Test - Lipid Panel', category: 'Clinical Chemistry' },
  //   { value: 'blood-glucose', label: 'Blood Test - Glucose', category: 'Clinical Chemistry' },
  //   { value: 'blood-hba1c', label: 'Blood Test - HbA1c', category: 'Clinical Chemistry' },
  //   { value: 'urinalysis', label: 'Urinalysis', category: 'Clinical Chemistry' },
  //   { value: 'urine-culture', label: 'Urine Culture', category: 'Microbiology' },
  //   { value: 'xray-chest', label: 'X-Ray - Chest', category: 'Radiology' },
  //   { value: 'xray-abdomen', label: 'X-Ray - Abdomen', category: 'Radiology' },
  //   { value: 'ct-scan', label: 'CT Scan', category: 'Radiology' },
  //   { value: 'mri', label: 'MRI', category: 'Radiology' },
  //   { value: 'ultrasound', label: 'Ultrasound', category: 'Radiology' },
  //   { value: 'ecg', label: 'ECG', category: 'Cardiology' },
  //   { value: 'echo', label: 'Echocardiogram', category: 'Cardiology' },
  //   { value: 'culture-blood', label: 'Blood Culture', category: 'Microbiology' },
  //   { value: 'culture-wound', label: 'Wound Culture', category: 'Microbiology' },
  //   { value: 'biopsy', label: 'Biopsy', category: 'Histopathology' },
  //   { value: 'pap-smear', label: 'Pap Smear', category: 'Cytology' },
  // ];

  // const departments = [
  //   'Hematology',
  //   'Clinical Chemistry',
  //   'Microbiology',
  //   'Radiology',
  //   'Cardiology',
  //   'Histopathology',
  //   'Cytology',
  //   'Immunology',
  //   'Molecular Biology',
  // ];

  const urgencyLevels = [
    { value: "routine", label: "Routine", color: "bg-teal-100 text-teal-800" },
    {
      value: "urgent",
      label: "Urgent",
      color: "bg-orange-100 text-orange-800",
    },
    { value: "stat", label: "STAT", color: "bg-red-100 text-red-800" },
    { value: "critical", label: "Critical", color: "bg-red-100 text-red-800" },
  ];

  // Validation functions
  const validatePatientId = (id) => {
    const patientIdRegex = /^[A-Z]{2}\d{6}$/;
    return patientIdRegex.test(id);
  };

  const validateFile = (file) => {
    if (!file) return false;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    return file.size <= maxSize && allowedTypes.includes(file.type);
  };

  const validateForm = () => {
    const newErrors = {};

    // Patient information is now always pre-populated from sample, so no validation needed

    // Test type and department are also pre-populated from sample, so no validation needed

    if (!formData.reportFile) {
      newErrors.reportFile = "Report file is required";
    } else if (!validateFile(formData.reportFile)) {
      newErrors.reportFile = "Invalid file type or size too large (max 10MB)";
    }

    if (!formData.resultDate) {
      newErrors.resultDate = "Result date is required";
    } else if (new Date(formData.resultDate) > new Date()) {
      newErrors.resultDate = "Result date cannot be in the future";
    }

    if (!formData.technician.trim()) {
      newErrors.technician = "Technician name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    console.log("Fetching test types...", sampleData);
    const fetchTestTypes = async () => {
      try {
        setLoading(true);

        if (sampleData && sampleData.testTypeId) {
          // If we have sample data with a testTypeId, fetch that specific test type
          const response = await ApiService.getTestTypeById(
            sampleData.testTypeId
          );
          console.log("Test type response:", response);

          if (response.success && response.data) {
            // Since getTestTypeById returns a single object, wrap it in an array
            setTestTypes([response.data]);
            setDepartments([response.data.category]);
          } else {
            console.error("Invalid test type response format");
            setTestTypes([]);
            setDepartments([]);
          }
        } else {
          // If no sample data, fetch all test types using getTestTypes
          const response = await ApiService.getTestTypes();
          console.log("All test types response:", response);

          if (response.success && Array.isArray(response.data)) {
            setTestTypes(response.data);

            // Extract unique departments from test types
            const uniqueDepartments = [
              ...new Set(response.data.map((test) => test.category)),
            ];
            setDepartments(uniqueDepartments);
          } else {
            console.error("Invalid test types response format");
            setTestTypes([]);
            setDepartments([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch test types:", error);
        setTestTypes([]);
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTestTypes();
  }, [sampleData]);

  // Auto-populate department based on test type
  useEffect(() => {
    if (formData.testType) {
      const selectedTest = testTypes.find(
        (test) => test.id.toString() === formData.testType
      );
      if (selectedTest) {
        setFormData((prev) => ({
          ...prev,
          department: selectedTest.category,
        }));
      }
    }
  }, [formData.testType, testTypes]);

  // Populate form with sample data when provided
  useEffect(() => {
    if (sampleData && testTypes.length > 0) {
      // Find matching test type by label or use testTypeId if available
      let matchingTest;
      if (sampleData.testTypeId) {
        matchingTest = testTypes.find(
          (test) => test.id === parseInt(sampleData.testTypeId)
        );
      } else {
        matchingTest = testTypes.find(
          (test) => test.label === sampleData.testType
        );
      }

      setFormData((prev) => ({
        ...prev,
        patientId: sampleData.patientId || "",
        patientName: sampleData.patientName || "",
        testType: matchingTest ? matchingTest.id.toString() : "",
        urgency:
          sampleData.priority === "stat"
            ? "stat"
            : sampleData.priority === "urgent"
            ? "urgent"
            : "routine",
        notes: sampleData.notes || "",
        sampleId: sampleData.id || "",
        department: matchingTest ? matchingTest.category : "",
      }));
    }
  }, [sampleData, testTypes]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePatientIdChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData((prev) => ({
      ...prev,
      patientId: value,
    }));

    // Clear error when user starts typing
    if (errors.patientId) {
      setErrors((prev) => ({
        ...prev,
        patientId: "",
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setFormData((prev) => ({
          ...prev,
          reportFile: file,
        }));
        setErrors((prev) => ({
          ...prev,
          reportFile: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          reportFile: "Invalid file type or size too large (max 10MB)",
        }));
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setFormData((prev) => ({
          ...prev,
          reportFile: file,
        }));
        setErrors((prev) => ({
          ...prev,
          reportFile: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          reportFile: "Invalid file type or size too large (max 10MB)",
        }));
      }
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      reportFile: null,
    }));
  };

  const handleSubmit = async (e) => {
    // Safety check for event object
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    // Prevent double submissions
    if (isUploading) {
      console.warn("Upload already in progress, ignoring duplicate submission");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress for file upload
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 70) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      setUploadProgress(80);

      // Create FormData for file upload (multipart/form-data)
      const formDataToSend = new FormData();
      formDataToSend.append("reportFilePath", formData.reportFile); // The actual file
      formDataToSend.append("technician", formData.technician);
      formDataToSend.append("resultDate", formData.resultDate);
      formDataToSend.append("urgency", formData.urgency);
      formDataToSend.append("notes", formData.notes);
      formDataToSend.append("referringPhysician", formData.referringPhysician);
      formDataToSend.append(
        "criticalValues",
        formData.criticalValues.toString()
      );
      formDataToSend.append(
        "followUpRequired",
        formData.followUpRequired.toString()
      );

      console.log("Processing report for sample:", formData.sampleId);
      console.log("FormData entries:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await ApiService.processLabReport(
        formData.sampleId,
        formDataToSend
      );
      console.log("Lab report processing response:", response);

      setUploadProgress(100);

      if (response.success) {
        // Call the parent's onSubmit with the response data
        const reportData = {
          ...formData,
          reportId: `RPT${Date.now()}`,
          uploadedAt: new Date().toISOString(),
          status: response.data.status,
          labSampleId: response.data.labSampleId,
          message: response.data.message,
          apiResponse: response.data,
        };

        // Reset uploading state immediately
        setIsUploading(false);
        setUploadProgress(100);

        // Reset form data immediately
        setFormData({
          patientId: "",
          patientName: "",
          testType: "",
          reportFile: null,
          urgency: "routine",
          notes: "",
          resultDate: new Date().toISOString().split("T")[0],
          technician: "",
          department: "",
          referringPhysician: "",
          criticalValues: false,
          followUpRequired: false,
          sampleId: "",
        });
        setUploadProgress(0);

        // Call parent's onSubmit to handle successful upload and close form
        // Pass the report data for updating the parent state, then signal to close
        onSubmit(reportData);

        // Fallback: Force close the form if parent doesn't handle it properly
        setTimeout(() => {
          console.log("Attempting to force close form...");
          onSubmit(null);
        }, 500);
      } else {
        throw new Error(response.message || "Failed to process lab report");
      }
    } catch (error) {
      console.error("Upload failed:", error);

      // Ensure we always reset the uploading state
      setIsUploading(false);
      setUploadProgress(0);

      // Show error message to user
      // const errorMessage =
      //   error?.message || "An unexpected error occurred during upload";
      // alert(`Upload failed: ${errorMessage}`);
    } finally {
      // Additional safety net to ensure state is reset
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 100);
    }
  };
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <FileCheck className="w-6 h-6 mr-2 text-teal-600" />
          Upload Lab Report
        </h2>
        <p className="text-gray-600 mt-1">
          Upload and process laboratory test reports
        </p>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Upload Progress
            </span>
            <span className="text-sm text-gray-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sample Information Section - Only show when sample data is provided */}
        {sampleData && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileCheck className="w-5 h-5 mr-2 text-teal-600" />
              Sample Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample ID
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleData.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sample Type
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleData.sampleType}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleData.volume}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collected By
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleData.collectedBy}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Received Date
                </label>
                <p className="text-sm font-semibold text-gray-900">
                  {sampleData.receivedDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    sampleData.status === "pending"
                      ? "bg-orange-100 text-orange-700"
                      : sampleData.status === "in-progress"
                      ? "bg-teal-100 text-teal-700"
                      : sampleData.status === "completed"
                      ? "bg-teal-100 text-teal-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {sampleData.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Patient Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
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
                onChange={handlePatientIdChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
                placeholder="Patient ID from sample"
                maxLength={8}
                disabled
                required
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
                placeholder="Patient name from sample"
                disabled
                required
              />
            </div>
          </div>
        </div>

        {/* Test Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-teal-600" />
            Test Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Test Type *
              </label>
              <input
                type="text"
                name="testTypeDisplay"
                value={
                  testTypes.length > 0 && formData.testType
                    ? `${
                        testTypes.find(
                          (t) => t.id.toString() === formData.testType
                        )?.label || ""
                      } (${
                        testTypes.find(
                          (t) => t.id.toString() === formData.testType
                        )?.category || ""
                      })`
                    : loading
                    ? "Loading test type..."
                    : "Test type from sample"
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
                disabled
                required
              />
              <input type="hidden" name="testType" value={formData.testType} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <input
                type="text"
                name="departmentDisplay"
                value={
                  formData.department ||
                  (loading
                    ? "Loading department..."
                    : "Department from test type")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
                disabled
                required
              />
              <input
                type="hidden"
                name="department"
                value={formData.department}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Result Date *
              </label>
              <input
                type="date"
                name="resultDate"
                value={formData.resultDate}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.resultDate ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.resultDate && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.resultDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
              {formData.urgency && (
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    urgencyLevels.find((l) => l.value === formData.urgency)
                      ?.color
                  }`}
                >
                  {
                    urgencyLevels.find((l) => l.value === formData.urgency)
                      ?.label
                  }
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technician Name *
              </label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.technician ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter technician name"
                required
              />
              {errors.technician && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.technician}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referring Physician
              </label>
              <input
                type="text"
                name="referringPhysician"
                value={formData.referringPhysician}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter referring physician name"
              />
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-teal-600" />
            Upload Report File
          </h3>

          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? "border-teal-400 bg-teal-50"
                : errors.reportFile
                ? "border-red-300 bg-red-50"
                : "border-gray-300 hover:border-teal-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {formData.reportFile ? (
              <div className="flex items-center justify-center space-x-4">
                <FileText className="w-12 h-12 text-teal-600" />
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-800 text-lg">
                    {formData.reportFile.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {(formData.reportFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="text-xs text-gray-500">
                    {formData.reportFile.type}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-teal-500" />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2 text-lg">
                  Drag and drop your report file here, or click to select
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 cursor-pointer transition-all duration-200"
                >
                  Select File
                </label>
                <p className="text-xs text-gray-500 mt-3">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>

          {errors.reportFile && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.reportFile}
            </p>
          )}
        </div>

        {/* Additional Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-teal-600" />
            Additional Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Any additional notes about the report, special instructions, or observations..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="criticalValues"
                  name="criticalValues"
                  checked={formData.criticalValues}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label
                  htmlFor="criticalValues"
                  className="text-sm font-medium text-gray-700"
                >
                  Contains Critical Values
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  name="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label
                  htmlFor="followUpRequired"
                  className="text-sm font-medium text-gray-700"
                >
                  Follow-up Required
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Upload Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadReportForm;
