import React from "react";
import { Routes, Route } from "react-router-dom";
import NurseDashboardOverview from "./NurseDashboardOverview";
import NursePatients from "./NursePatients";
import Medications from "./Medications";
import NurseSettings from "./NurseSettings";
import PatientMedicalHistory from "./PatientMedicalHistory";

const NurseDashboard = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardOverview />} />
      <Route path="/patients" element={<NursePatients />} />
      <Route path="/patients/history/:id" element={<PatientMedicalHistory />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/settings" element={<NurseSettings />} />
    </Routes>
  );
};

export default NurseDashboard;
