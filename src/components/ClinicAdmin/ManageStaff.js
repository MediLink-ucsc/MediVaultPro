// src/components/ClinicAdmin/ManageStaff.js
import React, { useState, useEffect } from "react";
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
  CheckCircle,
} from "lucide-react";
import Modal from "../Common/Modal";
import StaffEditForm from "./StaffEditForm";
import AddStaffModal from "./StaffForms/AddStaffModal";
import Button from "../Common/Button";
import ApiService from "../../services/apiService";
import { getHospitalIdFromToken } from "../../utils/jwtHelper";

const ManageStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view', 'edit', 'delete', 'add'
  const [actionMessage, setActionMessage] = useState(null);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adminInstitute, setAdminInstitute] = useState("");
  const [clinicId, setClinicId] = useState(null);

  const itemsPerPage = 10;

  // Fetch clinic staff data on component mount
  useEffect(() => {
    fetchClinicStaff();
  }, []);

  const fetchClinicStaff = async () => {
    try {
      setLoading(true);

      // Get hospital/clinic ID from JWT token
      const hospitalId = getHospitalIdFromToken();

      if (!hospitalId) {
        throw new Error("Hospital ID not found in token. Please login again.");
      }

      console.log("Fetching staff for hospital ID:", hospitalId);

      // Fetch staff data using the clinic ID from token
      const response = await ApiService.getClinicStaff(hospitalId);

      console.log("Staff data response:", response);

      // Extract clinic info and set it
      setClinicId(hospitalId);
      setAdminInstitute(response.data?.clinic?.institutionName || "");

      // Transform API response to match component's data structure
      const transformedStaff = transformStaffData(response.data);
      setStaffData(transformedStaff);
    } catch (error) {
      console.error("Error fetching clinic staff:", error);
      setActionMessage({
        type: "error",
        text: error.message || "Failed to load staff data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Transform API response to component's expected format
  const transformStaffData = (data) => {
    const staff = [];

    // Transform doctors
    if (data.doctors && Array.isArray(data.doctors)) {
      data.doctors.forEach((doctor) => {
        staff.push({
          id: `doctor-${doctor.doctorId}`,
          rawId: doctor.doctorId,
          name: `${doctor.user.firstName} ${doctor.user.lastName}`,
          email: doctor.user.username,
          role: "doctor",
          department: doctor.specialty || "General Medicine",
          institute: data.clinic?.institutionName || "",
          phone: doctor.contactNo || "N/A",
          status: "active",
          joinDate: doctor.createdAt,
          licenseNumber: doctor.licenseNumber || "N/A",
          yearsOfExperience: doctor.yearsOfExperience,
          gender: doctor.gender || "N/A",
          dateOfBirth: doctor.dateOfBirth,
        });
      });
    }

    // Transform medical staff (nurses and other staff)
    if (data.medicalStaff && Array.isArray(data.medicalStaff)) {
      data.medicalStaff.forEach((medStaff) => {
        staff.push({
          id: `staff-${medStaff.staffId}`,
          rawId: medStaff.staffId,
          name: `${medStaff.user.firstName} ${medStaff.user.lastName}`,
          email: medStaff.user.username,
          role: "nurse", // Assuming medical staff are nurses, can be adjusted based on position
          department: medStaff.department || "General",
          institute: data.clinic?.institutionName || "",
          phone: medStaff.contactNo || "N/A",
          status: "active",
          joinDate: medStaff.createdAt,
          licenseNumber: medStaff.qualification || "N/A",
          yearsOfExperience: medStaff.yearsOfExperience,
          position: medStaff.position,
          qualification: medStaff.qualification,
          gender: medStaff.gender || "N/A",
          dateOfBirth: medStaff.dateOfBirth,
        });
      });
    }

    return staff;
  };

  const roles = [
    { value: "", label: "All Roles" },
    { value: "doctor", label: "Doctor" },
    { value: "nurse", label: "Assistant" },
    { value: "lab", label: "Lab Technician" },
  ];

  // Filter staff to show only those from the admin's institute
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "" || staff.role === filterRole;
    return matchesSearch && matchesRole;
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
    setModalType("view");
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setModalType("edit");
  };

  const handleDelete = (staff) => {
    setSelectedStaff(staff);
    setModalType("delete");
  };

  const handleAddStaff = () => {
    setModalType("add");
  };

  const handleAddStaffSubmit = async (newStaff) => {
    // Close modal
    setModalType(null);

    // Show success message
    setActionMessage({
      type: "success",
      text: `${getRoleDisplayName(newStaff.role)} added successfully`,
    });

    // Refresh staff list from API
    await fetchClinicStaff();

    setTimeout(() => setActionMessage(null), 3000);
  };

  const confirmDelete = () => {
    setStaffData((prev) =>
      prev.filter((staff) => staff.id !== selectedStaff.id)
    );
    setModalType(null);
    setSelectedStaff(null);
    setActionMessage({
      type: "success",
      text: "Staff member deleted successfully",
    });
    setTimeout(() => setActionMessage(null), 3000);
    // TODO: Call API to delete staff member
  };

  const handleEditSave = async (updatedStaff) => {
    try {
      // Determine which API endpoint to use based on role
      let response;
      const staffId = updatedStaff.rawId; // Use the raw ID from the backend

      // Prepare the data based on staff type
      if (updatedStaff.role === "doctor") {
        const doctorData = {
          firstName: updatedStaff.name.split(" ")[0],
          lastName: updatedStaff.name.split(" ").slice(1).join(" "),
          licenseNumber: updatedStaff.licenseNumber,
          specialty: updatedStaff.department,
          yearsOfExperience: updatedStaff.yearsOfExperience,
          gender: updatedStaff.gender,
          dateOfBirth: updatedStaff.dateOfBirth,
        };
        response = await ApiService.editDoctor(staffId, doctorData);
      } else if (updatedStaff.role === "nurse") {
        const medicalStaffData = {
          firstName: updatedStaff.name.split(" ")[0],
          lastName: updatedStaff.name.split(" ").slice(1).join(" "),
          position: updatedStaff.position,
          department: updatedStaff.department,
          qualification:
            updatedStaff.qualification || updatedStaff.licenseNumber,
          yearsOfExperience: updatedStaff.yearsOfExperience,
          gender: updatedStaff.gender,
          dateOfBirth: updatedStaff.dateOfBirth,
        };
        response = await ApiService.editMedicalStaff(staffId, medicalStaffData);
      } else if (updatedStaff.role === "lab") {
        const labAssistantData = {
          firstName: updatedStaff.name.split(" ")[0],
          lastName: updatedStaff.name.split(" ").slice(1).join(" "),
          department: updatedStaff.department,
          qualification:
            updatedStaff.qualification || updatedStaff.licenseNumber,
          yearsOfExperience: updatedStaff.yearsOfExperience,
          gender: updatedStaff.gender,
          dateOfBirth: updatedStaff.dateOfBirth,
        };
        response = await ApiService.editLabAssistant(staffId, labAssistantData);
      }

      if (response && response.success) {
        // Update local state with the updated data
        setStaffData((prev) =>
          prev.map((staff) =>
            staff.id === updatedStaff.id ? updatedStaff : staff
          )
        );

        setModalType(null);
        setSelectedStaff(null);

        setActionMessage({
          type: "success",
          text: response.message || "Staff member updated successfully",
        });

        // Refresh staff list from API to get the latest data
        await fetchClinicStaff();

        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      setActionMessage({
        type: "error",
        text:
          error.message || "Failed to update staff member. Please try again.",
      });
      setTimeout(() => setActionMessage(null), 5000);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedStaff(null);
  };

  const getRoleColor = (role) => {
    const colors = {
      doctor: "bg-teal-100 text-teal-800",
      nurse: "bg-teal-100 text-teal-800", // Changed from orange to teal for unified scheme
      lab: "bg-teal-100 text-teal-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getRoleDisplayName = (role) => {
    const displayNames = {
      doctor: "Doctor",
      nurse: "Assistant",
      lab: "Lab Technician",
    };
    return displayNames[role] || role.charAt(0).toUpperCase() + role.slice(1);
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Clinic Staff
          </h1>
          <p className="text-gray-600 mt-1">
            View, edit, and manage staff members for{" "}
            {adminInstitute || "your clinic"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleAddStaff}
            variant="primary"
            role="clinicadmin"
            size="md"
            icon={UserPlus}
            disabled={loading}
          >
            Add Staff
          </Button>
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Action Message */}
      {actionMessage && (
        <div
          className={`rounded-lg p-4 flex items-center space-x-3 ${
            actionMessage.type === "success"
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          {actionMessage.type === "success" ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span
            className={`font-medium ${
              actionMessage.type === "success"
                ? "text-green-800"
                : "text-red-800"
            }`}
          >
            {actionMessage.text}
          </span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading staff data...</p>
          </div>
        </div>
      ) : (
        <>
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
                    {roles.map((role) => (
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
                    <tr
                      key={staff.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {staff.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {staff.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                              staff.role
                            )}`}
                          >
                            {getRoleDisplayName(staff.role)}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">
                            {staff.department}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {staff.institute}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {staff.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            staff.status
                          )}`}
                        >
                          {staff.status.charAt(0).toUpperCase() +
                            staff.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            role="lab"
                            size="xs"
                            icon={Eye}
                            onClick={() => handleView(staff)}
                            className="p-1"
                          />
                          <Button
                            variant="ghost"
                            role="lab"
                            size="xs"
                            icon={Edit3}
                            onClick={() => handleEdit(staff)}
                            className="p-1"
                          />
                          <Button
                            variant="ghost"
                            role="danger"
                            size="xs"
                            icon={Trash2}
                            onClick={() => handleDelete(staff)}
                            className="p-1"
                          />
                          <Button
                            variant="ghost"
                            role="neutral"
                            size="xs"
                            icon={MoreVertical}
                            onClick={() => {}}
                            className="p-1"
                          />
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
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredStaff.length)} of{" "}
                  {filteredStaff.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    role="neutral"
                    size="sm"
                    icon={ChevronLeft}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2"
                  />

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "primary" : "ghost"}
                        role="lab"
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="px-3 py-2"
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="ghost"
                    role="neutral"
                    size="sm"
                    icon={ChevronRight}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modals */}
          {/* Add Staff Modal */}
          <AddStaffModal
            isOpen={modalType === "add"}
            onClose={closeModal}
            onSubmit={handleAddStaffSubmit}
            adminInstitute={adminInstitute}
          />

          {/* View Modal */}
          <Modal
            isOpen={modalType === "view"}
            onClose={closeModal}
            title="Staff Details"
          >
            {selectedStaff && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="text-gray-900">{selectedStaff.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900">{selectedStaff.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <p className="text-gray-900 capitalize">
                      {getRoleDisplayName(selectedStaff.role)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <p className="text-gray-900">{selectedStaff.department}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Institute
                    </label>
                    <p className="text-gray-900">{selectedStaff.institute}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <p className="text-gray-900">{selectedStaff.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      License/Qualification
                    </label>
                    <p className="text-gray-900">
                      {selectedStaff.licenseNumber}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Join Date
                    </label>
                    <p className="text-gray-900">
                      {new Date(selectedStaff.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedStaff.yearsOfExperience && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <p className="text-gray-900">
                        {selectedStaff.yearsOfExperience} years
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Modal>

          {/* Edit Modal */}
          <Modal
            isOpen={modalType === "edit"}
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
            isOpen={modalType === "delete"}
            onClose={closeModal}
            title="Confirm Deletion"
          >
            {selectedStaff && (
              <div className="space-y-4">
                <p className="text-gray-700">
                  Are you sure you want to delete{" "}
                  <strong>{selectedStaff.name}</strong>? This action cannot be
                  undone.
                </p>
                <div className="flex items-center justify-end space-x-3">
                  <Button
                    variant="ghost"
                    role="neutral"
                    size="md"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    role="danger"
                    size="md"
                    onClick={confirmDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ManageStaff;
