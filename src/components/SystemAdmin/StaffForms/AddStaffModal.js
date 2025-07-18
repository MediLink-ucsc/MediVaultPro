// src/components/SystemAdmin/StaffForms/AddStaffModal.js
import React, { useState } from 'react';
import { Users, Heart, TestTube, ArrowLeft } from 'lucide-react';
import Modal from '../../Common/Modal';
import AddDoctorForm from './AddDoctorForm';
import AddNurseForm from './AddNurseForm';
import AddLabTechForm from './AddLabTechForm';

const AddStaffModal = ({ isOpen, onClose, onSubmit, adminInstitute = "City General Hospital" }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  // The admin can only add staff to their own institute

  const roles = [
    {
      id: 'doctor',
      title: 'Doctor',
      description: 'Add medical doctors and specialists',
      icon: Users,
      color: 'teal',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-200'
    },
    {
      id: 'nurse',
      title: 'Nurse',
      description: 'Add registered nurses and nursing staff',
      icon: Heart,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    },
    {
      id: 'lab',
      title: 'Lab Technician',
      description: 'Add laboratory technicians and staff',
      icon: TestTube,
      color: 'teal',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      borderColor: 'border-teal-200'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
    setSelectedRole(null);
  };

  const handleModalClose = () => {
    setSelectedRole(null);
    onClose();
  };

  const renderRoleSelection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Add New Staff Member</h2>
        <p className="text-lg text-gray-600">Select the type of staff member you want to add</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:shadow-strong ${role.bgColor} ${role.borderColor} hover:border-${role.color}-400 group hover:-translate-y-1`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${role.color}-500 to-${role.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-medium`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderForm = () => {
    const commonProps = {
      onSubmit: handleFormSubmit,
      onCancel: handleBack,
      adminInstitute
    };

    switch (selectedRole) {
      case 'doctor':
        return <AddDoctorForm {...commonProps} />;
      case 'nurse':
        return <AddNurseForm {...commonProps} />;
      case 'lab':
        return <AddLabTechForm {...commonProps} />;
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    const roleNames = {
      doctor: 'Add New Doctor',
      nurse: 'Add New Nurse',
      lab: 'Add New Lab Technician'
    };
    return roleNames[selectedRole] || 'Add Staff Member';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={selectedRole ? getFormTitle() : 'Add Staff Member'}
      size="4xl"
    >
      <div className="space-y-6">
        {selectedRole && (
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-teal-600 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to role selection</span>
            </button>
          </div>
        )}

        {selectedRole ? renderForm() : renderRoleSelection()}
      </div>
    </Modal>
  );
};

export default AddStaffModal;
