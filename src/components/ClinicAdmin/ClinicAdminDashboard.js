// src/components/ClinicAdmin/ClinicAdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClinicAdminOverview from './ClinicAdminOverview';
import ClinicProfile from './ClinicProfile';
import ManageStaff from './ManageStaff';
import Settings from './Settings';

const ClinicAdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<ClinicAdminOverview />} />
      <Route path="/clinic-profile" element={<ClinicProfile />} />
      <Route path="/manage-staff" element={<ManageStaff />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default ClinicAdminDashboard;
