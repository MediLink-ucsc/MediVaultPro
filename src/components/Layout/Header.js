// src/components/Layout/Header.js
import React, { useState } from 'react';
import { Search, LogOut, User } from 'lucide-react';
import Notification from './Notification';
import Modal from '../Common/Modal';
import { getButtonClasses } from '../../utils/buttonStyles';

const Header = ({ user, onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCancel = () => setShowLogoutModal(false);
  const handleConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, calendar events..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-96"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Notification />

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-800">{user.firstName} {user.lastName}</div>
                <div className="text-gray-600 capitalize">{user.role}</div>
              </div>
              <button
                onClick={handleLogoutClick}
                className="p-2 text-gray-600 hover:text-gray-800"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Modal isOpen={showLogoutModal} onClose={handleCancel} title="Confirm Logout" size="sm">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-teal-500 to-teal-600 mb-2">
            <LogOut className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Are you sure you want to logout?</h3>
            <p className="text-gray-600 text-sm">You will be returned to the login screen.</p>
          </div>
          <div className="flex w-full gap-3 pt-2">
            <button
              onClick={handleCancel}
              className={getButtonClasses('outline', 'doctor', 'md', true)}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={getButtonClasses('primary', 'danger', 'md', true)}
            >
              Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;