// src/components/Doctor/DoctorDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import Appointments from './Appointments';
// import PatientList from './PatientList'; 


const DoctorDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
};

export default DoctorDashboard;