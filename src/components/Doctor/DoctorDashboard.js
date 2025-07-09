// src/components/Doctor/DoctorDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardOverview from './DashboardOverview';
import PatientList from './PatientList';
import Appointments from './Appointments';
import Documentation from './Documentation';
import Diagnostics from './Diagnostics';
import Analytics from './Analytics';
import Settings from './Settings';

const DoctorDashboard = ({user}) => {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview user={user}/>} />
      <Route path="/patients" element={<PatientList />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/diagnostics" element={<Diagnostics />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default DoctorDashboard;