// src/components/Doctor/DoctorDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import PatientList from './PatientList';
import Calendar from './Calendar';
import Settings from './Settings';

const DoctorDashboard = ({user}) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview user={user}/>} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DoctorDashboard;