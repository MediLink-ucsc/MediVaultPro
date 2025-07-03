// src/components/Doctor/DoctorDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';


const DoctorDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
    </Routes>
  );
};

export default DoctorDashboard;