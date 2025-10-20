import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  Eye,
  FileText,
  Pill,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import Modal from "../Common/Modal";
import LabOrderForm from "./QuickActions/LabOrderForm";
import PrescriptionForm from "./QuickActions/PrescriptionForm";
import QuickExamForm from "./QuickActions/QuickExamForm";
import SOAPForm from "./QuickActions/SOAPForm";
import EnhancedPatientDetails from "./EnhancedPatientDetails";
import dataStore from "../../utils/dataStore";

const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'lab', 'prescription', 'exam', 'soap'
    patient: null,
  });
  const [showActionSelector, setShowActionSelector] = useState({
    isOpen: false,
    patient: null,
  });
  const [editConditionModal, setEditConditionModal] = useState({
    isOpen: false,
    patient: null,
    condition: "",
  });

  const [editLastVisitModal, setEditLastVisitModal] = useState({
    isOpen: false,
    patient: null,
    lastVisit: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const conditionOptions = [
    "Stable",
    "Critical",
    "Serious",
    "Fair",
    "Good",
    "Recovering",
    "Under Observation",
    "Intensive Care",
    "Emergency",
  ];
  const [patients, setPatients] = useState([]);

  // Fetch patients from API
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {

      const token = localStorage.getItem("token"); // or sessionStorage

      const res = await axios.get(
      "http://localhost:3000/api/v1/patientRecords/visitedpatients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      // Map API response to the structure used in the table
      const mappedPatients = res.data.map((p) => ({
        id: p.patientId,
        age: p.age,
        gender: p.gender,
        lastVisit: p.lastVisited,
        condition: p.condition,
        firstName: p.user.firstName,
        lastName: p.user.lastName,
        phone: p.user.username,
      }));
      setPatients(mappedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setErrorMessage("Failed to load patients. Please try again later.");
    }
  };

  const openQuickActionModal = (type, patient) => {
    setModalState({ isOpen: true, type, patient });
    setShowActionSelector({ isOpen: false, patient: null });
  };

  const openActionSelector = (patient) =>
    setShowActionSelector({ isOpen: true, patient });
  const closeActionSelector = () =>
    setShowActionSelector({ isOpen: false, patient: null });
  const closeModal = () =>
    setModalState({ isOpen: false, type: null, patient: null });

  const handleQuickActionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(
      `${modalState.type} form submitted for patient:`,
      modalState.patient?.name,
      data
    );

    closeModal();

    // Show success message (you could implement a toast notification here)
    alert(
      `${modalState.type} successfully created for ${modalState.patient?.name}`
    );
  };

  const openEditCondition = (e, patient) => {
    e.stopPropagation();
    setEditConditionModal({
      isOpen: true,
      patient,
      condition: patient.condition,
    });
  };

  const openEditLastVisit = (e, patient) => {
    e.stopPropagation();
    setEditLastVisitModal({
      isOpen: true,
      patient,
      lastVisit: patient.lastVisit,
    });
  };

  const handleLastVisitSubmit = async (e) => {
      e.preventDefault();
      const { patient, lastVisit } = editLastVisitModal;

      try {
        const token = localStorage.getItem("token"); // or wherever you store it
        console.log("Token:", token);

        await axios.patch(
          `http://localhost:3000/api/v1/auth/medvaultpro/patient/${patient.id}/last-visited`,
          { lastVisited: lastVisit },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPatients((prevPatients) =>
          prevPatients.map((p) =>
            p.id === patient.id ? { ...p, lastVisit } : p
          )
        );

        setEditLastVisitModal({ isOpen: false, patient: null, lastVisit: "" });
        // alert("Last visited date updated successfully.");
      } catch (error) {
        console.error(error);
        alert("Failed to update last visited date. Please try again.");
      }
    };


  const handleConditionSubmit = async (e) => {
    e.preventDefault();
    const { patient, condition } = editConditionModal;
    console.log("Updating condition for patient:", patient.id, condition);

    try {
      const token = localStorage.getItem("token"); // or wherever you store it
      console.log("Token:", token);

      await axios.patch(
        `http://localhost:3000/api/v1/auth/medvaultpro/patient/${patient.id}/condition`,
        { condition },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients((prevPatients) =>
        prevPatients.map((p) =>
          p.id === patient.id ? { ...p, condition } : p
        )
      );

      setEditConditionModal({ isOpen: false, patient: null, condition: "" });
      // alert("Patient condition updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update condition. Please try again.");
    }
  };


  const handleDelete = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    if (
      window.confirm(
        `Are you sure you want to delete ${patient?.name}? This action cannot be undone.`
      )
    ) {
      console.log("Delete patient:", patientId);
      // Remove the patient from the state
      setPatients(patients.filter((patient) => patient.id !== patientId));
      alert(`${patient?.name} has been deleted successfully.`);
    }
  };

  const handleViewRecords = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient) {
      setSelectedPatient({
        ...patient,
        name: `${patient.firstName} ${patient.lastName}`,
      });
    }
  };

  const handleBackToList = () => setSelectedPatient(null);

  const filteredPatients = patients.filter((patient) => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    return (
      fullName.includes(searchLower) ||
      patient.condition.toLowerCase().includes(searchLower) ||
      patient.id.toString().includes(searchLower)
    );
  });

  if (selectedPatient) {
    return (
      <EnhancedPatientDetails
        patient={selectedPatient}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
        <div className="text-sm text-gray-500">
          💡 Click on any patient to perform quick actions
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Search */}
        <div className="p-6 border-b border-gray-200 flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Condition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500 text-sm italic"
                  >
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-teal-50 cursor-pointer transition-colors"
                    onClick={() => openActionSelector(patient)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {patient.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{patient.lastVisit}</span>
                        <button
                          onClick={(e) => openEditLastVisit(e, patient)}
                          className="text-gray-400 hover:text-teal-600 p-1 rounded hover:bg-teal-50"
                          title="Edit Last Visit Date"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            patient.condition === "Critical"
                              ? "bg-orange-200 text-orange-900"
                              : patient.condition === "Serious"
                              ? "bg-orange-100 text-orange-800"
                              : patient.condition === "Fair"
                              ? "bg-teal-50 text-teal-700"
                              : patient.condition === "Good"
                              ? "bg-teal-100 text-teal-800"
                              : patient.condition === "Stable"
                              ? "bg-teal-200 text-teal-900"
                              : patient.condition === "Recovering"
                              ? "bg-teal-100 text-teal-800"
                              : patient.condition === "Under Observation"
                              ? "bg-orange-50 text-orange-700"
                              : patient.condition === "Intensive Care"
                              ? "bg-orange-200 text-orange-900"
                              : patient.condition === "Emergency"
                              ? "bg-orange-300 text-orange-900"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {patient.condition}
                        </span>
                        <button
                          onClick={(e) => openEditCondition(e, patient)}
                          className="text-gray-400 hover:text-teal-600 p-1 rounded hover:bg-teal-50"
                          title="Edit Condition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-teal-600 hover:text-teal-800 p-1 rounded hover:bg-teal-50"
                          title="View Records"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewRecords(patient.id);
                          }}
                        >
                          <Eye className="w-5 h-5" />
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

      {/* Action Selector Modal */}
      <Modal
        isOpen={showActionSelector.isOpen}
        onClose={closeActionSelector}
        title={`Select Action for ${
          showActionSelector.patient
            ? `${showActionSelector.patient.firstName} ${showActionSelector.patient.lastName}`
            : ""
        }`}
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">
            What would you like to do with this patient?
          </p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() =>
                openQuickActionModal("soap", showActionSelector.patient)
              }
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group"
            >
              <ClipboardList className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                SOAP Note
              </span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Document patient examination
              </span>
            </button>
            <button
              onClick={() =>
                openQuickActionModal("lab", showActionSelector.patient)
              }
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group"
            >
              <FileText className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                Lab Orders
              </span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Order laboratory tests
              </span>
            </button>
            <button
              onClick={() =>
                openQuickActionModal("exam", showActionSelector.patient)
              }
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
            >
              <Stethoscope className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                Quick Exam
              </span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Record quick examination
              </span>
            </button>
            <button
              onClick={() =>
                openQuickActionModal("prescription", showActionSelector.patient)
              }
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group"
            >
              <Pill className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                Prescription
              </span>
              <span className="text-xs text-gray-500 mt-1 text-center">
                Prescribe medications
              </span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Quick Action Modal */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={`${
          modalState.type === "lab"
            ? "Lab Orders"
            : modalState.type === "prescription"
            ? "Prescription"
            : modalState.type === "soap"
            ? "SOAP Note"
            : "Quick Exam"
        } - ${
          modalState.patient
            ? `${modalState.patient.firstName} ${modalState.patient.lastName}`
            : ""
        }`}
        size="lg"
      >
        {modalState.type === "soap" && (
          <SOAPForm
            onSubmit={handleQuickActionSubmit}
            selectedPatient={modalState.patient}
          />
        )}
        {modalState.type === "lab" && (
          <LabOrderForm
            onSubmit={handleQuickActionSubmit}
            selectedPatient={modalState.patient}
          />
        )}
        {modalState.type === "prescription" && (
          <PrescriptionForm
            onSubmit={handleQuickActionSubmit}
            selectedPatient={modalState.patient}
          />
        )}
        {modalState.type === "exam" && (
          <QuickExamForm
            onSubmit={handleQuickActionSubmit}
            selectedPatient={modalState.patient}
          />
        )}
      </Modal>

      {/* Edit Condition Modal */}
      <Modal
        isOpen={editConditionModal.isOpen}
        onClose={() =>
          setEditConditionModal({ isOpen: false, patient: null, condition: "" })
        }
        title={`Edit Patient Condition - ${editConditionModal.patient?.firstName} ${editConditionModal.patient?.lastName}`}
        size="sm"
      >
        <form onSubmit={handleConditionSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="condition"
              className="block text-sm font-medium text-gray-700"
            >
              Patient Condition
            </label>
            <select
              id="condition"
              value={editConditionModal.condition}
              onChange={(e) =>
                setEditConditionModal((prev) => ({
                  ...prev,
                  condition: e.target.value,
                }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white"
              required
            >
              <option value="">Select condition</option>
              {conditionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() =>
                setEditConditionModal({
                  isOpen: false,
                  patient: null,
                  condition: "",
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Last Visit Modal */}
      <Modal
        isOpen={editLastVisitModal.isOpen}
        onClose={() =>
          setEditLastVisitModal({ isOpen: false, patient: null, lastVisit: "" })
        }
        title={`Update Last Visit - ${editLastVisitModal.patient?.firstName} ${editLastVisitModal.patient?.lastName}`}
        size="sm"
      >
        <form onSubmit={handleLastVisitSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="lastVisit"
              className="block text-sm font-medium text-gray-700"
            >
              Last Visit Date
            </label>
            <input
              type="date"
              id="lastVisit"
              value={editLastVisitModal.lastVisit}
              onChange={(e) =>
                setEditLastVisitModal((prev) => ({
                  ...prev,
                  lastVisit: e.target.value,
                }))
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() =>
                setEditLastVisitModal({
                  isOpen: false,
                  patient: null,
                  lastVisit: "",
                })
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PatientList;
