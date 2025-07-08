// src/components/Lab/Samples.js
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FlaskConical, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Eye,
  Plus,
  Download,
  RefreshCw,
  Calendar,
  User,
  FileText,
  Microscope,
  TestTube2,
  Beaker,
  Upload
} from 'lucide-react';
import Modal from '../Common/Modal';
import UploadReportForm from './UploadReportForm';
import AddSample from './AddSample';

const Samples = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterDate, setFilterDate] = useState('today');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewSample, setViewSample] = useState(null);
  const [addSampleModalOpen, setAddSampleModalOpen] = useState(false);
  const [samples, setSamples] = useState([
    {
      id: 'S001',
      patientId: 'P001',
      patientName: 'Hansaja',
      testType: 'Complete Blood Count',
      sampleType: 'Blood',
      status: 'pending',
      priority: 'urgent',
      receivedDate: '2024-01-15',
      receivedTime: '09:30 AM',
      expectedTime: '02:30 PM',
      collectedBy: 'Nurse Likitha',
      notes: 'Patient fasting for 12 hours',
      barcode: 'BC001234567',
      volume: '5ml',
      container: 'EDTA Tube'
    },
    {
      id: 'S002',
      patientId: 'P002',
      patientName: 'Dulmini',
      testType: 'Urinalysis',
      sampleType: 'Urine',
      status: 'in-progress',
      priority: 'normal',
      receivedDate: '2024-01-15',
      receivedTime: '10:15 AM',
      expectedTime: '01:15 PM',
      collectedBy: 'Nurse Likitha',
      notes: 'Mid-stream collection',
      barcode: 'BC001234568',
      volume: '50ml',
      container: 'Sterile Cup'
    },
    {
      id: 'S003',
      patientId: 'P003',
      patientName: 'Anji',
      testType: 'Lipid Panel',
      sampleType: 'Blood',
      status: 'completed',
      priority: 'stat',
      receivedDate: '2024-01-15',
      receivedTime: '08:45 AM',
      expectedTime: '11:45 AM',
      collectedBy: 'Nurse Dulmini',
      notes: 'STAT order - cardiac concern',
      barcode: 'BC001234569',
      volume: '3ml',
      container: 'SST Tube'
    },
    {
      id: 'S004',
      patientId: 'P004',
      patientName: 'Sathya',
      testType: 'Blood Culture',
      sampleType: 'Blood',
      status: 'pending',
      priority: 'normal',
      receivedDate: '2024-01-15',
      receivedTime: '11:20 AM',
      expectedTime: '48 hours',
      collectedBy: 'Nurse Dulmini',
      notes: 'Fever investigation',
      barcode: 'BC001234570',
      volume: '10ml',
      container: 'Culture Bottle'
    },
    {
      id: 'S005',
      patientId: 'P005',
      patientName: 'Gujumpio',
      testType: 'Glucose Test',
      sampleType: 'Blood',
      status: 'rejected',
      priority: 'normal',
      receivedDate: '2024-01-15',
      receivedTime: '12:00 PM',
      expectedTime: '03:00 PM',
      collectedBy: 'Nurse Likitha',
      notes: 'Hemolyzed sample - recollection needed',
      barcode: 'BC001234571',
      volume: '2ml',
      container: 'Fluoride Tube'
    },
    {
      id: 'S006',
      patientId: 'P006',
      patientName: 'Imeth',
      testType: 'Throat Culture',
      sampleType: 'Swab',
      status: 'in-progress',
      priority: 'normal',
      receivedDate: '2024-01-15',
      receivedTime: '01:30 PM',
      expectedTime: '24-48 hours',
      collectedBy: 'Nurse Likitha',
      notes: 'Strep throat suspected',
      barcode: 'BC001234572',
      volume: 'N/A',
      container: 'Transport Media'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'stat':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'urgent':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in-progress':
        return <RefreshCw className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FlaskConical className="w-4 h-4" />;
    }
  };

  const getSampleTypeIcon = (sampleType) => {
    switch (sampleType.toLowerCase()) {
      case 'blood':
        return <TestTube2 className="w-5 h-5 text-red-500" />;
      case 'urine':
        return <Beaker className="w-5 h-5 text-yellow-500" />;
      case 'swab':
        return <Microscope className="w-5 h-5 text-purple-500" />;
      default:
        return <FlaskConical className="w-5 h-5 text-teal-500" />;
    }
  };

  const handleUploadReport = (sample) => {
    setSelectedSample(sample);
    setUploadModalOpen(true);
  };

  const handleViewDetails = (sample) => {
    setViewSample(sample);
    setViewModalOpen(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log('Report uploaded for sample:', selectedSample?.id);
    setUploadModalOpen(false);
    setSelectedSample(null);
  };

  const handleAddSample = () => {
    setAddSampleModalOpen(true);
  };

  const handleAddSampleSubmit = (newSampleData) => {
    setSamples(prev => [newSampleData, ...prev]);
    setAddSampleModalOpen(false);
    console.log('New sample added:', newSampleData);
  };

  const handleAddSampleCancel = () => {
    setAddSampleModalOpen(false);
  };

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || sample.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || sample.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    { 
      title: 'Total Samples', 
      value: samples.length.toString(), 
      icon: FlaskConical, 
      color: 'teal',
      change: '+12%' 
    },
    { 
      title: 'Pending', 
      value: samples.filter(s => s.status === 'pending').length.toString(), 
      icon: Clock, 
      color: 'orange',
      change: '+5%' 
    },
    { 
      title: 'In Progress', 
      value: samples.filter(s => s.status === 'in-progress').length.toString(), 
      icon: RefreshCw, 
      color: 'blue',
      change: '+8%' 
    },
    { 
      title: 'Completed Today', 
      value: samples.filter(s => s.status === 'completed').length.toString(), 
      icon: CheckCircle, 
      color: 'teal',
      change: '+15%' 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sample Management</h1>
          <p className="text-gray-600 mt-2">Track and manage laboratory samples</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            onClick={handleAddSample}
          >
            <Plus className="w-4 h-4" />
            <span>Add Sample</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.color === 'teal' ? 'text-teal-600' : 
                  stat.color === 'orange' ? 'text-orange-600' : 
                  stat.color === 'blue' ? 'text-blue-600' : 'text-gray-600'}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'teal' ? 'bg-teal-100' : 
                stat.color === 'orange' ? 'bg-orange-100' : 
                stat.color === 'blue' ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'teal' ? 'text-teal-600' : 
                  stat.color === 'orange' ? 'text-orange-600' : 
                  stat.color === 'blue' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search samples..."
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="stat">STAT</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              {filteredSamples.length} samples found
            </div>
          </div>
        </div>
      </div>

      {/* Samples Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Sample Details</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Patient</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Test & Sample</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Timing</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Collection</th>
                <th className="text-left py-4 px-6 font-medium text-gray-600 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSamples.map((sample) => (
                <tr key={sample.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getSampleTypeIcon(sample.sampleType)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{sample.id}</div>
                        <div className="text-sm text-gray-500">{sample.barcode}</div>
                        <div className="text-xs text-gray-400">Container: {sample.container}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{sample.patientName}</div>
                        <div className="text-sm text-gray-500">{sample.patientId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-gray-800">{sample.testType}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-600">{sample.sampleType}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{sample.volume}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sample.status)}`}>
                        {getStatusIcon(sample.status)}
                        <span className="capitalize">{sample.status.replace('-', ' ')}</span>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(sample.priority)}`}>
                        <span className="uppercase">{sample.priority}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-800">Received</div>
                      <div className="text-xs text-gray-600">{sample.receivedTime}</div>
                      <div className="text-xs text-gray-500">{sample.receivedDate}</div>
                      <div className="text-sm font-medium text-gray-800 mt-2">Expected</div>
                      <div className="text-xs text-gray-600">{sample.expectedTime}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm text-gray-800">{sample.collectedBy}</div>
                      {sample.notes && (
                        <div className="text-xs text-blue-600 mt-1" title={sample.notes}>
                          Note available
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                        title="View Details"
                        onClick={() => handleViewDetails(sample)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Upload Report"
                        onClick={() => handleUploadReport(sample)}
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        title="Generate Report"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample Details Cards for Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredSamples.map((sample) => (
          <div key={sample.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getSampleTypeIcon(sample.sampleType)}
                </div>
                <div>
                  <div className="font-medium text-gray-800">{sample.id}</div>
                  <div className="text-sm text-gray-500">{sample.patientName}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(sample.priority)}`}>
                  <span className="uppercase">{sample.priority}</span>
                </div>
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sample.status)}`}>
                  {getStatusIcon(sample.status)}
                  <span className="capitalize">{sample.status.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Type:</span>
                <span className="font-medium">{sample.testType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sample Type:</span>
                <span className="font-medium">{sample.sampleType} ({sample.volume})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Received:</span>
                <span className="font-medium">{sample.receivedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected:</span>
                <span className="font-medium">{sample.expectedTime}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <User className="w-4 h-4 inline mr-1" />
                {sample.collectedBy}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  onClick={() => handleViewDetails(sample)}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => handleUploadReport(sample)}
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Report Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setSelectedSample(null);
        }}
        title={`Upload Report - ${selectedSample?.id || ''}`}
      >
        {selectedSample && (
          <UploadReportForm 
            onSubmit={handleUploadSubmit}
            sampleData={selectedSample}
          />
        )}
      </Modal>

      {/* View Sample Details Modal */}
      <Modal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewSample(null);
        }}
        title={`Sample Details - ${viewSample?.id || ''}`}
      >
        {viewSample && (
          <div className="space-y-6">
            {/* Sample Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sample Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Sample ID</label>
                  <p className="text-gray-800 font-medium">{viewSample.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Barcode</label>
                  <p className="text-gray-800 font-medium">{viewSample.barcode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Test Type</label>
                  <p className="text-gray-800 font-medium">{viewSample.testType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Sample Type</label>
                  <p className="text-gray-800 font-medium">{viewSample.sampleType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Volume</label>
                  <p className="text-gray-800 font-medium">{viewSample.volume}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Container</label>
                  <p className="text-gray-800 font-medium">{viewSample.container}</p>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="text-gray-800 font-medium">{viewSample.patientName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient ID</label>
                  <p className="text-gray-800 font-medium">{viewSample.patientId}</p>
                </div>
              </div>
            </div>

            {/* Status and Priority */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Status & Priority</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border mt-1 ${getStatusColor(viewSample.status)}`}>
                    {getStatusIcon(viewSample.status)}
                    <span className="capitalize">{viewSample.status.replace('-', ' ')}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Priority</label>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-1 ${getPriorityColor(viewSample.priority)}`}>
                    <span className="uppercase">{viewSample.priority}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Timing Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Received Date</label>
                  <p className="text-gray-800 font-medium">{viewSample.receivedDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Received Time</label>
                  <p className="text-gray-800 font-medium">{viewSample.receivedTime}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Expected Time</label>
                  <p className="text-gray-800 font-medium">{viewSample.expectedTime}</p>
                </div>
              </div>
            </div>

            {/* Collection Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Collection Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Collected By</label>
                  <p className="text-gray-800 font-medium">{viewSample.collectedBy}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {viewSample.notes && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Notes</h3>
                <p className="text-gray-700 bg-white p-3 rounded border">{viewSample.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setViewModalOpen(false);
                  setViewSample(null);
                }}
              >
                Close
              </button>
              <button 
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setViewModalOpen(false);
                  handleUploadReport(viewSample);
                }}
              >
                Upload Report
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Sample Modal */}
      <Modal
        isOpen={addSampleModalOpen}
        onClose={() => setAddSampleModalOpen(false)}
        title="Add New Sample"
      >
        <AddSample 
          onSubmit={handleAddSampleSubmit}
          onCancel={handleAddSampleCancel}
        />
      </Modal>
    </div>
  );
};

export default Samples;
