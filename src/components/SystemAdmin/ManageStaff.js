// src/components/SystemAdmin/ManageStaff.js
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  UserPlus,
  MoreVertical,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Modal from '../Common/Modal';
import StaffEditForm from './StaffEditForm';
import AddStaffModal from './StaffForms/AddStaffModal';

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'delete', 'add'
  const [actionMessage, setActionMessage] = useState(null);

  const itemsPerPage = 10;

  // In a real app, this would come from the logged-in admin's data
  const adminInstitute = "City General Hospital";

  // Mock data - in real app, this would come from API
  const [staffData, setStaffData] = useState([
    {
      id: 1,
      name: 'Dr. Dulmini Chathubhashini',
      email: 'dulmini.chathubhashini@cityhospital.com',
      role: 'doctor',
      department: 'Cardiology',
      institute: 'City General Hospital',
      phone: '+94 xxx xxx xxx',
      status: 'active',
      joinDate: '2022-01-15',
      licenseNumber: 'MD-12345'
    },
    {
      id: 2,
      name: 'Likitha',
      email: 'likitha@cityhospital.com',
      role: 'nurse',
      department: 'Emergency',
      institute: 'City General Hospital',
      phone: '+94 xxx xxx xxx',
      status: 'active',
      joinDate: '2022-03-20',
      licenseNumber: 'RN-67890'
    },
    {
      id: 3,
      name: 'Hansaja',
      email: 'hansaja@centrallab.com',
      role: 'lab',
      department: 'Pathology',
      institute: 'Central Diagnostic Lab',
      phone: '+94 xxx xxx xxx',
      status: 'inactive',
      joinDate: '2021-11-10',
      licenseNumber: 'LT-54321'
    },
    {
      id: 4,
      name: 'Dr. Anji',
      email: 'anji@stjohns.com',
      role: 'doctor',
      department: 'Pediatrics',
      institute: 'St. John\'s Medical Center',
      phone: '+94 xxx xxx xxx',
      status: 'active',
      joinDate: '2020-08-05',
      licenseNumber: 'MD-98765'
    },
    {
      id: 5,
      name: 'Sathya',
      email: 'sathya@quicklab.com',
      role: 'lab',
      department: 'Clinical Chemistry',
      institute: 'Quick Diagnostics',
      phone: '+94 xxx xxx xxx',
      status: 'active',
      joinDate: '2023-02-14',
      licenseNumber: 'LT-11111'
    }
  ]);

  const roles = [
    { value: '', label: 'All Roles' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'lab', label: 'Lab Technician' }
  ];

  // Filter staff to show only those from the admin's institute
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === '' || staff.role === filterRole;
    const matchesInstitute = staff.institute === adminInstitute; // Only show staff from admin's institute
    return matchesSearch && matchesRole && matchesInstitute;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStaff = filteredStaff.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setModalType('view');
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setModalType('edit');
  };

  const handleDelete = (staff) => {
    setSelectedStaff(staff);
    setModalType('delete');
  };

  const handleAddStaff = () => {
    setModalType('add');
  };

  const handleAddStaffSubmit = (newStaff) => {
    const staffWithId = {
      ...newStaff,
      id: staffData.length + 1,
      institute: adminInstitute // Ensure staff is added to admin's institute
    };
    setStaffData(prev => [...prev, staffWithId]);
    setModalType(null);
    setActionMessage({ type: 'success', text: `${newStaff.role.charAt(0).toUpperCase() + newStaff.role.slice(1)} added successfully` });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const confirmDelete = () => {
    setStaffData(prev => prev.filter(staff => staff.id !== selectedStaff.id));
    setModalType(null);
    setSelectedStaff(null);
    setActionMessage({ type: 'success', text: 'Staff member deleted successfully' });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleEditSave = (updatedStaff) => {
    setStaffData(prev => prev.map(staff => 
      staff.id === updatedStaff.id ? updatedStaff : staff
    ));
    setModalType(null);
    setSelectedStaff(null);
    setActionMessage({ type: 'success', text: 'Staff member updated successfully' });
    setTimeout(() => setActionMessage(null), 3000);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedStaff(null);
  };

  const getRoleColor = (role) => {
    const colors = {
      doctor: 'bg-teal-100 text-teal-800',
      nurse: 'bg-orange-100 text-orange-800',
      lab: 'bg-blue-100 text-blue-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Staff Data</h1>
          <p className="text-gray-600 mt-1">View, edit, and manage staff members for {adminInstitute}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleAddStaff}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Staff</span>
          </button>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div className={`rounded-lg p-4 flex items-center space-x-3 ${
          actionMessage.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          {actionMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`font-medium ${
            actionMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {actionMessage.text}
          </span>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredStaff.length} staff members
            </div>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff Member
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role & Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institute
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                      <div className="text-sm text-gray-500">{staff.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(staff.role)}`}>
                        {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">{staff.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staff.institute}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{staff.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(staff.status)}`}>
                      {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(staff)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(staff)}
                        className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(staff)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredStaff.length)} of {filteredStaff.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-teal-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={modalType === 'add'}
        onClose={closeModal}
        onSubmit={handleAddStaffSubmit}
        adminInstitute={adminInstitute}
      />

      {/* View Modal */}
      <Modal
        isOpen={modalType === 'view'}
        onClose={closeModal}
        title="Staff Details"
      >
        {selectedStaff && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-900">{selectedStaff.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedStaff.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="text-gray-900 capitalize">{selectedStaff.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="text-gray-900">{selectedStaff.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institute</label>
                <p className="text-gray-900">{selectedStaff.institute}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{selectedStaff.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Number</label>
                <p className="text-gray-900">{selectedStaff.licenseNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="text-gray-900">{new Date(selectedStaff.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={modalType === 'edit'}
        onClose={closeModal}
        title="Edit Staff Member"
      >
        {selectedStaff && (
          <StaffEditForm
            staff={selectedStaff}
            onSave={handleEditSave}
            onCancel={closeModal}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        title="Confirm Deletion"
      >
        {selectedStaff && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>{selectedStaff.name}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageStaff;
