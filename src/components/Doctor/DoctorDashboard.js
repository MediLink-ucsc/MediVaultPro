// src/components/Doctor/DoctorDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import PatientList from './PatientList';
import Calendar from './Calendar';
import Analytics from './Analytics';
import Settings from './Settings';

const DoctorDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DoctorDashboard;