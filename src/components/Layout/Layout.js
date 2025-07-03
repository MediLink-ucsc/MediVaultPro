// src/components/Layout/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, user, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;