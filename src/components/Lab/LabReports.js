// src/components/Lab/LabReports.js
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Upload,
  FileText,
  Calendar,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader,
} from "lucide-react";
import Modal from "../Common/Modal";
import UploadReportForm from "./UploadReportForm";
import ViewLabReportModal from "./ViewLabReportModal";
import ApiService from "../../services/apiService";

const LabReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDateRange, setFilterDateRange] = useState("all");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform API lab results to reports format
  const transformLabResultToReport = (labResult) => {
    return {
      id: labResult.id || `R${labResult.id}`,
      patientId: labResult.labSample?.patientId || "Unknown",
      patientName: labResult.labSample?.patient?.name || "Patient",
      testType:
        labResult.labSample?.testType?.label ||
        labResult.testType ||
        "Unknown Test",
      status: labResult.status || "pending",
      uploadDate: labResult.createdAt
        ? new Date(labResult.createdAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      technician:
        labResult.createdBy?.name || labResult.technician || "In-house",
      urgency: labResult.labSample?.priority || labResult.priority || "normal",
      fileSize: labResult.fileSize || "Unknown",
      fileType: labResult.fileType || "PDF",
      reportUrl: labResult.reportUrl,
      results: labResult.results || {},
    };
  };

  // Fetch lab reports from API
  const fetchLabReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.getLabResults();

      if (response.success && response.data) {
        const transformedReports = response.data.map(
          transformLabResultToReport
        );
        setReports(transformedReports);
      } else {
        throw new Error("Failed to fetch lab reports");
      }
    } catch (err) {
      setError(err.message || "Failed to load lab reports");
      console.error("Error fetching lab reports:", err);
      // Fallback to empty array on error
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reports on component mount
  useEffect(() => {
    fetchLabReports();
  }, []);

  const handleUploadSubmit = async (formData) => {
    if (formData === null) {
      // User cancelled
      setIsUploadModalOpen(false);
      return;
    }

    try {
      // In a real application, this would make an API call to upload the report
      console.log("Uploading report:", formData);

      // For now, we'll just show a success message and refresh the data
      alert("Report uploaded successfully!");
      setIsUploadModalOpen(false);

      // Refresh the reports list
      await fetchLabReports();
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Failed to upload report. Please try again.");
    }
  };

  const handleViewReport = (reportId) => {
    setSelectedReportId(reportId);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedReportId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-teal-100 text-teal-700 border-teal-200";
      case "pending-review":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "in-progress":
        return "bg-teal-100 text-teal-700 border-teal-200";
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "stat":
        return "bg-red-100 text-red-700 border-red-200";
      case "urgent":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case "stat":
        return <AlertCircle className="w-3 h-3" />;
      case "urgent":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.testType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading lab reports...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-red-800 font-medium">
                Error loading lab reports
              </h3>
              <p className="text-red-600 mt-1">{error}</p>
              <button
                onClick={fetchLabReports}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Lab Reports</h1>
              <p className="text-gray-600 mt-2">
                Manage and track laboratory reports
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchLabReports}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Loader
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Report</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Total Reports
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {reports.length}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    All time reports
                  </div>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Pending Review
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {
                      reports.filter((r) => r.status === "pending-review")
                        .length
                    }
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    Awaiting review
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Completed
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {
                      reports.filter(
                        (r) =>
                          r.status === "manually_edited" ||
                          r.status === "processed"
                      ).length
                    }
                  </div>
                  <div className="text-xs text-teal-600 mt-1">
                    Successfully completed
                  </div>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    Urgent
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {
                      reports.filter(
                        (r) => r.urgency === "urgent" || r.urgency === "stat"
                      ).length
                    }
                  </div>
                  <div className="text-xs text-red-600 mt-1">High priority</div>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="relative flex-1 lg:mr-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by patient name, ID, or test type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending-review">Pending Review</option>
                  <option value="in-progress">In Progress</option>
                </select>

                <select
                  value={filterDateRange}
                  onChange={(e) => setFilterDateRange(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>

                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technician
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <FileText className="w-12 h-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No lab reports found
                          </h3>
                          <p className="text-gray-500 mb-4">
                            {reports.length === 0
                              ? "There are no lab reports in the system yet."
                              : "No reports match your current filters."}
                          </p>
                          {reports.length === 0 && (
                            <button
                              onClick={() => setIsUploadModalOpen(true)}
                              className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                            >
                              <Upload className="w-4 h-4" />
                              <span>Upload First Report</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-teal-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {report.id}
                              </div>
                              <div className="text-sm text-gray-500">
                                {report.testType}
                              </div>
                              <div className="text-xs text-gray-400">
                                {report.fileType}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {report.patientName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {report.patientId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                              {getStatusIcon(report.status)}
                              <span
                                className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                  report.status
                                )}`}
                              >
                                {report.status.replace("-", " ").toUpperCase()}
                              </span>
                            </div>
                            {(report.urgency === "urgent" ||
                              report.urgency === "stat") && (
                              <div className="flex items-center">
                                {getUrgencyIcon(report.urgency)}
                                <span
                                  className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getUrgencyColor(
                                    report.urgency
                                  )}`}
                                >
                                  {report.urgency.toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {report.uploadDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.technician}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleViewReport(report.id)}
                              className="text-teal-600 hover:text-teal-900 p-2 rounded-lg hover:bg-teal-50 transition-colors duration-200"
                              title="View Report"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              className="text-orange-600 hover:text-orange-900 p-2 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                              title="Download Report"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upload Report Modal */}
          <Modal
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            title="Upload Lab Report"
          >
            <UploadReportForm onSubmit={handleUploadSubmit} />
          </Modal>

          {/* View Lab Report Modal */}
          <ViewLabReportModal
            isOpen={isViewModalOpen}
            onClose={handleCloseViewModal}
            reportId={selectedReportId}
          />
        </>
      )}
    </div>
  );
};

export default LabReports;
