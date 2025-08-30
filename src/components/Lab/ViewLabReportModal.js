// src/components/Lab/ViewLabReportModal.js
import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Calendar,
  User,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader,
  Download,
  Printer,
  Edit3,
  Save,
  XCircle,
} from "lucide-react";
import ApiService from "../../services/apiService";

const ViewLabReportModal = ({ isOpen, onClose, reportId }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch lab report details
  const fetchLabReportDetails = async () => {
    if (!reportId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getLabResult(reportId);

      if (response.success && response.data) {
        setReportData(response.data);
      } else {
        throw new Error("Failed to fetch lab report details");
      }
    } catch (err) {
      setError(err.message || "Failed to load lab report");
      console.error("Error fetching lab report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && reportId) {
      fetchLabReportDetails();
    }
  }, [isOpen, reportId]);

  // Reset edit state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsEditing(false);
      setEditedData({});
      setEditNotes("");
    }
  }, [isOpen]);

  // Initialize edit data when entering edit mode
  const handleStartEdit = () => {
    if (reportData?.extractedData) {
      const initData = {};
      Object.entries(reportData.extractedData)
        .filter(([key]) => !["Patient", "Date", "Doctor"].includes(key))
        .forEach(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            // New object format: { "value": 35, "unit": "U/L", "status": "normal" }
            initData[key] = {
              value: value.value || 0,
              unit: value.unit || "",
              status: value.status || "normal",
            };
          } else {
            // Old string format: "35 U/L"
            const valueStr = value.toString();
            const numericMatch = valueStr.match(/[\d.]+/);
            const unitMatch = valueStr.match(/[a-zA-Z\/]+$/);

            initData[key] = {
              value: numericMatch ? parseFloat(numericMatch[0]) : valueStr,
              unit: unitMatch ? unitMatch[0] : "",
              status: "normal",
            };
          }
        });
      setEditedData(initData);
    }
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({});
    setEditNotes("");
  };

  const handleSaveEdit = async () => {
    try {
      setSaving(true);

      const updatePayload = {
        extractedData: editedData,
        notes: editNotes.trim() || undefined,
        editedBy: "current_user", // This should come from user context
      };

      await ApiService.editLabResult(reportId, updatePayload);

      // Refresh the report data
      await fetchLabReportDetails();

      // Exit edit mode
      setIsEditing(false);
      setEditedData({});
      setEditNotes("");

      // Show success message (you might want to use a toast notification instead)
      alert("Lab result updated successfully!");
    } catch (err) {
      console.error("Error updating lab result:", err);
      alert("Failed to update lab result. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (fieldName, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        [field]: value,
      },
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-teal-100 text-teal-700 border-teal-200";
      case "pending-review":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "pending-review":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseResults = (results) => {
    try {
      if (typeof results === "string") {
        return JSON.parse(results);
      }
      return results || {};
    } catch (e) {
      console.error("Error parsing results:", e);
      return {};
    }
  };

  const renderResultValue = (key, value, normalRange) => {
    if (isEditing && editedData[key]) {
      // Editing mode - show editable fields
      const editValue = editedData[key];
      return (
        <div className="flex items-center justify-between py-4 px-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex-1 mr-4">
            <div className="font-medium text-gray-900 mb-2">{key}</div>
            <div className="text-sm text-gray-500 mb-3">
              Normal: {normalRange || "N/A"}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editValue.value}
                  onChange={(e) =>
                    handleFieldChange(
                      key,
                      "value",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={editValue.unit}
                  onChange={(e) =>
                    handleFieldChange(key, "unit", e.target.value)
                  }
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-blue-600">
              {editValue.value} {editValue.unit}
            </div>
            <select
              value={editValue.status}
              onChange={(e) => handleFieldChange(key, "status", e.target.value)}
              className="text-xs px-2 py-1 rounded border border-gray-300 mt-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
            </select>
          </div>
        </div>
      );
    }

    // View mode - handle both old string format and new object format
    let displayValue, statusFromData;

    if (typeof value === "object" && value !== null) {
      // New object format: { "value": 35, "unit": "U/L", "status": "normal" }
      displayValue = `${value.value} ${value.unit || ""}`.trim();
      statusFromData = value.status || "normal";

      const numericValue = parseFloat(value.value);
      const isNumeric = !isNaN(numericValue);

      // Override status based on normal range if available
      if (isNumeric && normalRange) {
        if (normalRange.includes("-")) {
          const [min, max] = normalRange
            .split("-")
            .map((v) => parseFloat(v.trim()));
          if (!isNaN(min) && !isNaN(max)) {
            if (numericValue < min || numericValue > max) {
              statusFromData = "abnormal";
            }
          }
        } else if (normalRange.startsWith(">")) {
          const min = parseFloat(normalRange.substring(1));
          if (!isNaN(min) && numericValue <= min) {
            statusFromData = "abnormal";
          }
        } else if (normalRange.startsWith("<")) {
          const max = parseFloat(normalRange.substring(1));
          if (!isNaN(max) && numericValue >= max) {
            statusFromData = "abnormal";
          }
        }
      }
    } else {
      // Old string format: "35 U/L"
      displayValue = value.toString();
      const numericMatch = displayValue.match(/[\d.]+/);
      const numericValue = numericMatch ? parseFloat(numericMatch[0]) : null;
      const isNumeric = numericValue !== null && !isNaN(numericValue);
      statusFromData = "normal";

      if (isNumeric && normalRange) {
        // Parse normal range
        if (normalRange.includes("-")) {
          const [min, max] = normalRange
            .split("-")
            .map((v) => parseFloat(v.trim()));
          if (!isNaN(min) && !isNaN(max)) {
            if (numericValue < min || numericValue > max) {
              statusFromData = "abnormal";
            }
          }
        } else if (normalRange.startsWith(">")) {
          const min = parseFloat(normalRange.substring(1));
          if (!isNaN(min) && numericValue <= min) {
            statusFromData = "abnormal";
          }
        } else if (normalRange.startsWith("<")) {
          const max = parseFloat(normalRange.substring(1));
          if (!isNaN(max) && numericValue >= max) {
            statusFromData = "abnormal";
          }
        }
      }
    }

    return (
      <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
        <div>
          <div className="font-medium text-gray-900">{key}</div>
          <div className="text-sm text-gray-500">
            Normal: {normalRange || "N/A"}
          </div>
        </div>
        <div className="text-right">
          <div
            className={`font-semibold ${
              statusFromData === "abnormal" ? "text-red-600" : "text-green-600"
            }`}
          >
            {displayValue}
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
              statusFromData === "abnormal"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {statusFromData === "abnormal" ? "Abnormal" : "Normal"}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Lab Report Details
                  </h3>
                  <p className="text-sm text-gray-500">Report ID: {reportId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing ? (
                  <button
                    onClick={handleStartEdit}
                    disabled={loading || !reportData?.extractedData}
                    className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Edit Lab Results"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSaveEdit}
                      disabled={saving}
                      className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Save Changes"
                    >
                      {saving ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {saving ? "Saving..." : "Save"}
                      </span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      title="Cancel Editing"
                    >
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Cancel</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => window.print()}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  title="Print Report"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading lab report...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                  <div>
                    <h3 className="text-red-800 font-medium">
                      Error loading report
                    </h3>
                    <p className="text-red-600 mt-1">{error}</p>
                    <button
                      onClick={fetchLabReportDetails}
                      className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {reportData && !loading && !error && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Patient Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>Name:</strong>{" "}
                          {reportData.extractedData?.Patient ||
                            reportData.labSample?.patient?.name ||
                            "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clipboard className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>ID:</strong>{" "}
                          {reportData.labSample?.patientId || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>Test Date:</strong>{" "}
                          {reportData.extractedData?.Date ||
                            (reportData.createdAt
                              ? formatDate(reportData.createdAt)
                              : "N/A")}
                        </span>
                      </div>
                      {reportData.extractedData?.Doctor && (
                        <div className="flex items-center">
                          <User className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm">
                            <strong>Doctor:</strong>{" "}
                            {reportData.extractedData.Doctor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Test Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>Test Type:</strong>{" "}
                          {reportData.labSample?.testType?.label || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>Sample Date:</strong>{" "}
                          {formatDate(reportData.labSample?.sampleDate)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">
                          <strong>Report Date:</strong>{" "}
                          {formatDate(reportData.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Status
                  </h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {getStatusIcon(reportData.status)}
                      <span
                        className={`ml-2 inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(
                          reportData.status
                        )}`}
                      >
                        {(reportData.status || "pending")
                          .replace("-", " ")
                          .toUpperCase()}
                      </span>
                    </div>
                    {reportData.labSample?.priority && (
                      <div className="flex items-center">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="ml-2 text-sm text-orange-600 font-medium">
                          Priority:{" "}
                          {reportData.labSample.priority.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Test Results */}
                {reportData.extractedData && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">
                      Test Results
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(reportData.extractedData)
                        .filter(
                          ([key]) =>
                            !["Patient", "Date", "Doctor"].includes(key)
                        ) // Filter out non-test fields
                        .map(([key, value]) => {
                          // Try to get normal range from test type
                          const testType = reportData.labSample?.testType;
                          let normalRange = null;

                          if (testType?.referenceRangesJson) {
                            try {
                              const ranges = JSON.parse(
                                testType.referenceRangesJson
                              );
                              normalRange = ranges[key]?.normalRange;
                            } catch (e) {
                              console.error(
                                "Error parsing reference ranges:",
                                e
                              );
                            }
                          }

                          return renderResultValue(key, value, normalRange);
                        })}
                    </div>

                    {/* Edit Notes Section - only visible in edit mode */}
                    {isEditing && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Edit Notes (Optional)
                        </label>
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add notes about changes made to the lab results..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          These notes will be saved with the edited results for
                          audit purposes.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* PDF Report */}
                {reportData.reportUrl && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Original Report
                    </h4>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <FileText className="w-8 h-8 text-red-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Lab Report PDF
                          </p>
                          <p className="text-xs text-gray-500">
                            Original lab report document
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          window.open(reportData.reportUrl, "_blank")
                        }
                        className="flex items-center px-3 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments/Notes */}
                {(reportData.comments || reportData.labSample?.notes) && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                      Comments & Notes
                    </h4>
                    {reportData.comments && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Report Comments:
                        </p>
                        <p className="text-sm text-gray-600">
                          {reportData.comments}
                        </p>
                      </div>
                    )}
                    {reportData.labSample?.notes && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Sample Notes:
                        </p>
                        <p className="text-sm text-gray-600">
                          {reportData.labSample.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Technician Information */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Report Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm">
                        <strong>Processed By:</strong>{" "}
                        {reportData.createdBy?.name || "System"}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">
                        <strong>Last Updated:</strong>{" "}
                        {formatDate(reportData.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLabReportModal;
