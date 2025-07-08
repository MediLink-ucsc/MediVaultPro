// src/components/SystemAdmin/SystemAdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SystemAdminOverview from './SystemAdminOverview';
import RegisterInstitute from './RegisterInstitute';
import ManageStaff from './ManageStaff';
import Settings from './Settings';

const SystemAdminDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<SystemAdminOverview />} />
      <Route path="/register-institute" element={<RegisterInstitute />} />
      <Route path="/manage-staff" element={<ManageStaff />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default SystemAdminDashboard;
