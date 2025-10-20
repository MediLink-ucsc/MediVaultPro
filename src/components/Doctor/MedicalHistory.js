// src/components/Doctor/MedicalHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Clipboard,
  TestTube,
  User,
  Stethoscope,
  Search,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import SOAPForm from "./QuickActions/SOAPForm";
import LabOrderForm from "./QuickActions/LabOrderForm";

const MedicalHistory = ({ patient }) => {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [showSOAPForm, setShowSOAPForm] = useState(false);
  const [showLabOrderForm, setShowLabOrderForm] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [labOrders, setLabOrders] = useState([]);
  const [labResults, setLabResults] = useState([]);

  // Fetch lab orders and lab results
  const fetchLabData = async () => {
    if (!patient?.id) return;

    try {
      const token = localStorage.getItem("token");

      // Fetch lab orders
      const ordersResponse = await axios.get(
        `http://localhost:3000/api/v1/patientRecords/laborder/${patient.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLabOrders(ordersResponse.data || []);

      // Fetch lab results
      const resultsResponse = await axios.get(
        `http://localhost:3000/api/v1/labReport/workflow/patients/${patient.id}/history`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLabResults(resultsResponse.data?.data || {});
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  };

  useEffect(() => {
    fetchLabData();
  }, [patient?.id]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      if (!patient?.id) return;

      try {
        // Temporary mock data
        setMedicalHistory([
          {
            id: 1,
            type: "consultation",
            title: "Regular Checkup",
            date: "2025-08-17",
            time: "09:00 AM",
            doctor: "Dr. Smith",
            department: "General Medicine",
            subjective: "Patient reports mild fever and cough for 3 days",
            objective: {
              vitals: {
                bloodPressure: "120/80",
                heartRate: "72",
                temperature: "99.1",
                respiratoryRate: "16",
                oxygenSaturation: "98%",
                weight: "70",
                height: "170",
                bmi: "24.2",
              },
              physicalExam: {
                general: "Alert and oriented",
                respiratory: "Clear breath sounds",
                cardiovascular: "Regular rhythm, no murmurs",
              },
            },
            assessment: {
              primaryDiagnosis: "Upper Respiratory Infection",
              differentials: ["Common Cold", "Allergic Rhinitis"],
            },
            plan: {
              medications: [
                {
                  name: "Acetaminophen",
                  dosage: "500mg",
                  frequency: "Every 6 hours",
                  duration: "5 days",
                  instructions: "Take with food",
                },
              ],
              followUp: "1 week if symptoms persist",
            },
          },
          {
            id: 2,
            type: "lab",
            title: "Laboratory Tests Order",
            date: "2025-08-17",
            time: "10:30 AM",
            doctor: "Dr. Smith",
            department: "Laboratory",
            orderDetails: {
              clinicalInfo:
                "Patient presenting with fatigue and unexplained weight loss. Routine health screening.",
              tests: [
                {
                  test: "Complete Blood Count (CBC)",
                  urgency: "routine",
                  status: "completed",
                  instructions: "Fasting not required",
                  results: {
                    uploadedBy: "Lab Tech John Doe",
                    uploadDate: "2025-08-17",
                    uploadTime: "14:30",
                    parameters: [
                      {
                        name: "WBC",
                        value: "7.8",
                        unit: "K/µL",
                        range: "4.5-11.0",
                        flag: "Normal",
                      },
                      {
                        name: "RBC",
                        value: "4.2",
                        unit: "M/µL",
                        range: "4.0-5.5",
                        flag: "Normal",
                      },
                      {
                        name: "Hemoglobin",
                        value: "11.8",
                        unit: "g/dL",
                        range: "12.0-15.5",
                        flag: "Low",
                      },
                      {
                        name: "Platelets",
                        value: "250",
                        unit: "K/µL",
                        range: "150-450",
                        flag: "Normal",
                      },
                    ],
                    notes: "Mild anemia detected. Recommend follow-up.",
                    attachments: ["cbc_report.pdf"],
                  },
                },
                {
                  test: "Lipid Profile",
                  urgency: "routine",
                  status: "completed",
                  instructions: "12-hour fasting required",
                  results: {
                    uploadedBy: "Lab Tech Jane Smith",
                    uploadDate: "2025-08-17",
                    uploadTime: "15:00",
                    parameters: [
                      {
                        name: "Total Cholesterol",
                        value: "210",
                        unit: "mg/dL",
                        range: "< 200",
                        flag: "High",
                      },
                      {
                        name: "HDL",
                        value: "45",
                        unit: "mg/dL",
                        range: "> 40",
                        flag: "Normal",
                      },
                      {
                        name: "LDL",
                        value: "140",
                        unit: "mg/dL",
                        range: "< 130",
                        flag: "High",
                      },
                      {
                        name: "Triglycerides",
                        value: "150",
                        unit: "mg/dL",
                        range: "< 150",
                        flag: "Borderline",
                      },
                    ],
                    notes: "Patient shows elevated cholesterol levels.",
                    attachments: ["lipid_profile.pdf"],
                  },
                },
                {
                  test: "Thyroid Function",
                  urgency: "urgent",
                  status: "pending",
                  instructions: "No special instructions",
                },
              ],
            },
          },
        ]);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };

    fetchMedicalHistory();
  }, [patient?.id]);

  const filterOptions = [
    { id: "all", label: "All Records", icon: FileText, color: "teal" },
    { id: "soap", label: "SOAP Notes", icon: Clipboard, color: "orange" },
    { id: "lab", label: "Lab Orders", icon: TestTube, color: "teal" },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case "consultation":
        return <Stethoscope className="w-4 h-4" />;
      case "lab":
        return <TestTube className="w-4 h-4" />;
      case "prescription":
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "consultation":
        return "bg-orange-100 text-orange-800";
      case "lab":
        return "bg-teal-100 text-teal-800";
      case "prescription":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-teal-100 text-teal-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-teal-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-600" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Transform lab orders and results into the format expected by the UI
  const transformLabData = () => {
    const transformedLabs = [];

    labOrders.forEach((order) => {
      // Find corresponding samples/results for this order
      const orderSamples =
        labResults.samples?.filter((sample) =>
          order.labTests?.some(
            (test) =>
              test.name === sample.testType?.value ||
              test.name === sample.testType?.label
          )
        ) || [];

      const labEntry = {
        id: order.labOrderId,
        date: new Date(order.createdAt).toLocaleDateString(),
        time: new Date(order.createdAt).toLocaleTimeString(),
        type: "lab",
        title: order.labTests?.map((t) => t.name).join(", ") || "Lab Order",
        doctor: order.doctor?.user
          ? `Dr. ${order.doctor.user.firstName} ${order.doctor.user.lastName}`
          : "Unknown Doctor",
        department: "Laboratory",
        status: orderSamples.some((s) => s.status === "completed")
          ? "completed"
          : "pending",
        orderDetails: {
          tests:
            order.labTests?.map((test) => {
              // Find matching sample for this test
              const matchingSample = orderSamples.find(
                (sample) =>
                  test.name === sample.testType?.value ||
                  test.name === sample.testType?.label
              );

              return {
                test: test.name,
                urgency: test.urgency,
                instructions: test.specialInstructions || "",
                status: matchingSample?.status || "pending",
                results: matchingSample?.labResults?.[0]
                  ? {
                      uploadedBy: "Lab Technician",
                      uploadDate: new Date(
                        matchingSample.labResults[0].createdAt
                      ).toLocaleDateString(),
                      uploadTime: new Date(
                        matchingSample.labResults[0].createdAt
                      ).toLocaleTimeString(),
                      parameters: matchingSample.labResults[0].extractedData
                        ? Object.keys(
                            matchingSample.labResults[0].extractedData
                          )
                            .filter(
                              (key) =>
                                key !== "_editMetadata" && key !== "Laboratory"
                            )
                            .map((key) => ({
                              name: key,
                              value:
                                matchingSample.labResults[0].extractedData[key]
                                  .value,
                              unit: matchingSample.labResults[0].extractedData[
                                key
                              ].unit,
                              range: "N/A",
                              flag:
                                matchingSample.labResults[0].extractedData[key]
                                  .status === "normal"
                                  ? "Normal"
                                  : "Abnormal",
                            }))
                        : [],
                      notes: matchingSample.notes || "",
                      attachments: matchingSample.labResults[0]?.reportUrl
                        ? ["Lab Report PDF"]
                        : [],
                    }
                  : null,
              };
            }) || [],
          clinicalInfo:
            order.clinicalInformation || "No clinical information provided",
        },
      };

      transformedLabs.push(labEntry);
    });

    return transformedLabs;
  };

  // Fetch SOAP notes for this patient
  const fetchSoapNotes = async () => {
    if (!patient?.id) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:3000/api/v1/patientRecords/soapnote/${patient.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const mappedSoapNotes = res.data.map((entry) => ({
        id: entry.id,
        date: new Date(entry.dateTime).toLocaleDateString(),
        time: new Date(entry.dateTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "consultation",
        title: `SOAP Note - ${entry.doctor.user.firstName} ${entry.doctor.user.lastName}`,
        doctor: `${entry.doctor.user.firstName} ${entry.doctor.user.lastName}`,
        department: entry.doctor.hospitalName + " - " + entry.doctor.specialty,
        status: "completed",
        subjective: entry.subjective,
        objective: entry.objective,
        assessment: entry.assessment,
        plan: entry.plan,
        patientId: entry.patientId,
      }));

      setMedicalHistory(mappedSoapNotes);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch SOAP notes:", error);
      setMedicalHistory([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoapNotes();
  }, [patient]);

  // Combine medical history with transformed lab data
  const combinedHistory = [...medicalHistory, ...transformLabData()];

  // Filter history entries
  const filteredHistory = combinedHistory.filter((entry) => {
    const matchesType =
      filterType === "all" ||
      (filterType === "soap" && entry.type === "consultation") ||
      (filterType === "lab" && entry.type === "lab");

    const matchesSearch =
      !searchTerm ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.department.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  // Render a single record card
  const renderRecordCard = (entry) => {
    const isSOAP = entry.type === "consultation";
    const isLab = entry.type === "lab";

    return (
      <div
        key={entry.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isSOAP ? "bg-orange-100" : isLab ? "bg-teal-100" : "bg-teal-100"
              }`}
            >
              {isSOAP ? (
                <Clipboard className="w-5 h-5 text-orange-600" />
              ) : isLab ? (
                <TestTube className="w-5 h-5 text-teal-600" />
              ) : (
                <FileText className="w-5 h-5 text-teal-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{entry.title}</h3>
              <p className="text-sm text-gray-500">{entry.date}</p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isSOAP
                ? "bg-orange-50 text-orange-700"
                : isLab
                ? "bg-teal-50 text-teal-700"
                : "bg-teal-50 text-teal-700"
            }`}
          >
            {isSOAP ? "SOAP Note" : isLab ? "Lab Order" : entry.type}
          </div>
        </div>

        <div className="space-y-3">
          {/* <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{entry.doctor}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">{entry.department}</span>
          </div> */}

          {/* SOAP Note */}
          {isSOAP && (
            <div className="mt-4 space-y-4">
              {entry.subjective && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Subjective
                  </h4>
                  <p className="text-sm text-gray-600">{entry.subjective}</p>
                </div>
              )}
              {entry.objective && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Objective
                  </h4>
                  <p className="text-sm text-gray-600">{entry.objective}</p>
                </div>
              )}
              {entry.assessment && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Assessment
                  </h4>
                  <p className="text-sm text-gray-600">{entry.assessment}</p>
                </div>
              )}
              {entry.plan && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Plan
                  </h4>
                  <p className="text-sm text-gray-600">{entry.plan}</p>
                </div>
              )}
            </div>
          )}

          {isLab && entry.orderDetails && (
            <div className="mt-4 space-y-4">
              {/* Clinical Information */}
              {entry.orderDetails.clinicalInfo && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Clinical Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    {entry.orderDetails.clinicalInfo}
                  </p>
                </div>
              )}

              {/* Individual Test Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entry.orderDetails.tests.map((test, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    {/* Test Card Header */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900">
                            {test.test}
                          </h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                test.urgency === "stat"
                                  ? "bg-red-100 text-red-800"
                                  : test.urgency === "urgent"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-teal-100 text-teal-800"
                              }`}
                            >
                              {(test.urgency?.charAt(0)?.toUpperCase() || "") +
                                (test.urgency?.slice(1) || "")}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                test.status === "completed"
                                  ? "bg-teal-100 text-teal-800"
                                  : test.status === "pending"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {(test.status?.charAt(0)?.toUpperCase() || "") +
                                (test.status?.slice(1) || "")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {test.instructions && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            Instructions:{" "}
                          </span>
                          {test.instructions}
                        </div>
                      )}
                    </div>

                    {/* Test Card Body */}
                    <div className="p-4">
                      {test.results ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <CheckCircle className="w-4 h-4 text-teal-600" />
                              <span>Results Available</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedTest(test);
                                setShowTestResults(true);
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-teal-600 text-teal-600 hover:bg-teal-50 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                            >
                              View Results
                            </button>
                          </div>
                          <div className="text-xs text-gray-500">
                            Uploaded by {test.results.uploadedBy} on{" "}
                            {test.results.uploadDate}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-12 text-sm text-gray-500">
                          Results pending
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Results Modal */}
              {showTestResults && selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto m-4">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {selectedTest.test} Results
                        </h2>
                        <p className="text-sm text-gray-500">
                          Uploaded by {selectedTest.results.uploadedBy} on{" "}
                          {selectedTest.results.uploadDate} at{" "}
                          {selectedTest.results.uploadTime}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setShowTestResults(false);
                          setSelectedTest(null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    {/* Results Content */}
                    <div className="space-y-6">
                      {/* Results Table */}
                      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">
                                Parameter
                              </th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">
                                Result
                              </th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">
                                Reference Range
                              </th>
                              <th className="px-4 py-2 text-xs font-medium text-gray-500 text-left">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {selectedTest.results.parameters.map(
                              (param, paramIdx) => (
                                <tr key={paramIdx} className="hover:bg-gray-50">
                                  <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                    {param.name}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-700">
                                    {param.value} {param.unit}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-gray-500">
                                    {param.range}
                                  </td>
                                  <td className="px-4 py-2">
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        param.flag === "High"
                                          ? "bg-orange-100 text-orange-800"
                                          : param.flag === "Low"
                                          ? "bg-orange-100 text-orange-800"
                                          : param.flag === "Borderline"
                                          ? "bg-orange-50 text-orange-800"
                                          : "bg-teal-100 text-teal-800"
                                      }`}
                                    >
                                      {param.flag}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Notes and Attachments */}
                      <div className="space-y-4">
                        {selectedTest.results.notes && (
                          <div className="bg-orange-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertCircle className="w-4 h-4 text-orange-600" />
                              <span className="font-medium text-orange-700">
                                Lab Notes
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              {selectedTest.results.notes}
                            </p>
                          </div>
                        )}

                        {selectedTest.results.attachments &&
                          selectedTest.results.attachments.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex items-center space-x-2 mb-3">
                                <FileText className="w-4 h-4 text-gray-600" />
                                <span className="font-medium text-gray-700">
                                  Attachments
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedTest.results.attachments.map(
                                  (attachment, idx) => (
                                    <button
                                      key={idx}
                                      className="inline-flex items-center px-3 py-1.5 border border-teal-600 shadow-sm text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                      onClick={() =>
                                        console.log(
                                          "Download attachment:",
                                          attachment
                                        )
                                      }
                                    >
                                      <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                      {attachment}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className="text-center py-8 text-gray-500">
        Loading medical history...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilterType(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                filterType === option.id
                  ? `bg-${option.color}-100 text-${option.color}-700 border-${option.color}-200`
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              } border`}
            >
              <option.icon className="w-4 h-4" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Search medical records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Action Button Section */}
      <div className="flex justify-end mt-4">
        {filterType === "soap" && (
          <button
            onClick={() => setShowSOAPForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New SOAP Note</span>
          </button>
        )}
        {filterType === "lab" && (
          <button
            onClick={() => setShowLabOrderForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm hover:shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Lab Order</span>
          </button>
        )}
      </div>

      {/* SOAP Form Modal */}
      {showSOAPForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                New SOAP Note
              </h2>
              <button
                onClick={() => setShowSOAPForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SOAPForm
              selectedPatient={patient}
              onSubmit={(data) => {
                console.log("SOAP Note submitted:", data);
                setShowSOAPForm(false);
                // Refresh SOAP notes
                fetchSoapNotes();
              }}
            />
          </div>
        </div>
      )}

      {/* Lab Order Form Modal */}
      {showLabOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                New Lab Order
              </h2>
              <button
                onClick={() => setShowLabOrderForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <LabOrderForm
              selectedPatient={patient}
              onSubmit={(data) => {
                console.log("Lab Order submitted:", data);
                setShowLabOrderForm(false);
                // Refresh lab data
                fetchLabData();
              }}
            />
          </div>
        </div>
      )}

      {/* Records List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No medical records found matching your criteria.
          </div>
        ) : (
          filteredHistory.map((entry) => renderRecordCard(entry))
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
