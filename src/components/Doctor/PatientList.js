import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  Eye,
  Calendar,
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

const PatientList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, patient: null });
  const [showActionSelector, setShowActionSelector] = useState({ isOpen: false, patient: null });
  const [patients, setPatients] = useState([]);

  // Fetch patients from API
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/auth/medvaultpro/doctor/patients");
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
      alert("Failed to load patients. Please try again.");
    }
  };

  const openQuickActionModal = (type, patient) => {
    setModalState({ isOpen: true, type, patient });
    setShowActionSelector({ isOpen: false, patient: null });
  };

  const openActionSelector = (patient) => setShowActionSelector({ isOpen: true, patient });
  const closeActionSelector = () => setShowActionSelector({ isOpen: false, patient: null });
  const closeModal = () => setModalState({ isOpen: false, type: null, patient: null });

  const handleQuickActionSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(`${modalState.type} form submitted for patient:`, modalState.patient?.name, data);

    closeModal();
    alert(`${modalState.type} successfully created for ${modalState.patient?.name}`);
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

  const handleScheduleCalendarEvent = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    localStorage.setItem(
      "selectedPatientForAppointment",
      JSON.stringify({
        id: patient?.id,
        name: `${patient?.firstName} ${patient?.lastName}`,
        phone: patient?.phone,
        condition: patient?.condition,
      })
    );
    navigate("/doctor/calendar");
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
    return <EnhancedPatientDetails patient={selectedPatient} onBack={handleBackToList} />;
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-teal-50 cursor-pointer transition-colors" onClick={() => openActionSelector(patient)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</div>
                    <div className="text-sm text-gray-500">ID: {patient.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">{patient.condition}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-teal-600 hover:text-teal-800 p-1 rounded hover:bg-teal-50"
                        title="View Records"
                        onClick={(e) => { e.stopPropagation(); handleViewRecords(patient.id); }}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                        title="Schedule Appointment"
                        onClick={(e) => { e.stopPropagation(); handleScheduleCalendarEvent(patient.id); }}
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Selector Modal */}
      <Modal isOpen={showActionSelector.isOpen} onClose={closeActionSelector} title={`Select Action for ${showActionSelector.patient ? `${showActionSelector.patient.firstName} ${showActionSelector.patient.lastName}` : ""}`} size="md">
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">What would you like to do with this patient?</p>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => openQuickActionModal("soap", showActionSelector.patient)} className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group">
              <ClipboardList className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">SOAP Note</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Document patient examination</span>
            </button>
            <button onClick={() => openQuickActionModal("lab", showActionSelector.patient)} className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all duration-200 group">
              <FileText className="w-8 h-8 text-teal-600 mb-3 group-hover:text-teal-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">Lab Orders</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Order laboratory tests</span>
            </button>
            <button onClick={() => openQuickActionModal("exam", showActionSelector.patient)} className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group">
              <Stethoscope className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Quick Exam</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Record quick examination</span>
            </button>
            <button onClick={() => openQuickActionModal("prescription", showActionSelector.patient)} className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 group">
              <Pill className="w-8 h-8 text-orange-600 mb-3 group-hover:text-orange-700" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Prescription</span>
              <span className="text-xs text-gray-500 mt-1 text-center">Prescribe medications</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Quick Action Modal */}
      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={`${modalState.type === "lab" ? "Lab Orders" : modalState.type === "prescription" ? "Prescription" : modalState.type === "soap" ? "SOAP Note" : "Quick Exam"} - ${modalState.patient ? `${modalState.patient.firstName} ${modalState.patient.lastName}` : ""}`} size="lg">
        {modalState.type === "soap" && <SOAPForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />}
        {modalState.type === "lab" && <LabOrderForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />}
        {modalState.type === "prescription" && <PrescriptionForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />}
        {modalState.type === "exam" && <QuickExamForm onSubmit={handleQuickActionSubmit} selectedPatient={modalState.patient} />}
      </Modal>
    </div>
  );
};

export default PatientList;

