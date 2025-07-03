// src/components/LabOperator/LabReports.js
import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Upload, FileText, Calendar, User } from 'lucide-react';
import Modal from '../Common/Modal';
import UploadReportForm from './UploadReportForm';

const LabReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Mock data for lab reports
  const reports = [
    {
      id: 'R001',
      patientId: 'P001',
      patientName: 'Hansaja',
      testType: 'Complete Blood Count',
      status: 'completed',
      uploadDate: '2024-01-15',
      technician: 'Saranga',
      urgency: 'normal',
      fileSize: '2.1 MB',
      fileType: 'PDF'
    },
    {
      id: 'R002',
      patientId: 'P002',
      patientName: 'Likitha',
      testType: 'Urinalysis',
      status: 'pending-review',
      uploadDate: '2024-01-15',
      technician: 'Dulmini',
      urgency: 'urgent',
      fileSize: '1.8 MB',
      fileType: 'PDF'
    },
    {
      id: 'R003',
      patientId: 'P003',
      patientName: 'Anji',
      testType: 'Lipid Panel',
      status: 'completed',
      uploadDate: '2024-01-14',
      technician: 'Dulmini',
      urgency: 'stat',
      fileSize: '2.3 MB',
      fileType: 'PDF'
    },
    {
      id: 'R004',
      patientId: 'P004',
      patientName: 'Sathya',
      testType: 'X-Ray Chest',
      status: 'in-progress',
      uploadDate: '2024-01-14',
      technician: 'Changumi',
      urgency: 'normal',
      fileSize: '5.2 MB',
      fileType: 'DICOM'
    },
    {
      id: 'R005',
      patientId: 'P005',
      patientName: 'Gujumpio',
      testType: 'Blood Culture',
      status: 'completed',
      uploadDate: '2024-01-13',
      technician: 'Saranga',
      urgency: 'normal',
      fileSize: '1.9 MB',
      fileType: 'PDF'
    }
  ];

  const handleUploadSubmit = (formData) => {
    if (formData === null) {
      // User cancelled
      setIsUploadModalOpen(false);
      return;
    }

    // In a real application, this would make an API call to upload the report
    console.log('Uploading report:', formData);
    
    // For now, we'll just show a success message and close the modal
    alert('Report uploaded successfully!');
    setIsUploadModalOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-teal-100 text-teal-700';
      case 'pending-review': return 'bg-orange-100 text-orange-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'stat': return 'bg-red-100 text-red-700';
      case 'urgent': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.testType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Lab Reports</h1>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Report</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 md:mr-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name, ID, or test type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending-review">Pending Review</option>
              <option value="in-progress">In Progress</option>
            </select>
            
            <select
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technician
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-teal-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{report.id}</div>
                        <div className="text-sm text-gray-500">{report.testType}</div>
                        <div className="text-xs text-gray-400">
                          {report.fileType} • {report.fileSize}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                        <div className="text-sm text-gray-500">{report.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(report.urgency)}`}>
                        {report.urgency.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {report.uploadDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.technician}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-teal-600 hover:text-teal-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-500">Total Reports</div>
              <div className="text-lg font-semibold text-gray-900">{reports.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-500">Pending Review</div>
              <div className="text-lg font-semibold text-gray-900">
                {reports.filter(r => r.status === 'pending-review').length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-500">Completed</div>
              <div className="text-lg font-semibold text-gray-900">
                {reports.filter(r => r.status === 'completed').length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-500">Urgent</div>
              <div className="text-lg font-semibold text-gray-900">
                {reports.filter(r => r.urgency === 'urgent' || r.urgency === 'stat').length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Report Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Lab Report"
      >
        <UploadReportForm onSubmit={handleUploadSubmit} />
      </Modal>
    </div>
  );
};

export default LabReports;