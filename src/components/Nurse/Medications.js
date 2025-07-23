// src/components/Nurse/Medications.js
import React, { useState } from 'react';
import { 
  Pill, 
  User, 
  Clock, 
  Check, 
  ExternalLink, 
  Search, 
  Filter,
  Calendar,
  AlertCircle,
  ShoppingBag
} from 'lucide-react';
import Button from '../Common/Button';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('today');

  // Mock prescription data
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patientName: 'Likitha Chathubhashini',
      patientId: 'P001',
      drug: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take 3 times daily after meals for 7 days',
      prescribedDate: '2025-07-23',
      prescribedTime: '09:30',
      doctor: 'Dr. Smith',
      status: 'pending',
      isUrgent: true
    },
    {
      id: 2,
      patientName: 'Likitha Chathubhashini',
      patientId: 'P001',
      drug: 'Vitamin C',
      dosage: '500mg',
      instructions: 'Take once daily with breakfast for immune support',
      prescribedDate: '2025-07-23',
      prescribedTime: '09:35',
      doctor: 'Dr. Smith',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 3,
      patientName: 'Hansaja Damsara',
      patientId: 'P002',
      drug: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take once daily in the morning',
      prescribedDate: '2025-07-23',
      prescribedTime: '10:15',
      doctor: 'Dr. Johnson',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 4,
      patientName: 'Hansaja Damsara',
      patientId: 'P002',
      drug: 'Aspirin',
      dosage: '81mg',
      instructions: 'Take once daily with food for blood thinning',
      prescribedDate: '2025-07-23',
      prescribedTime: '10:20',
      doctor: 'Dr. Johnson',
      status: 'given',
      isUrgent: false,
      completedBy: 'Nurse Sarah',
      completedTime: '10:45'
    },
    {
      id: 5,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Prenatal Vitamins',
      dosage: '1 tablet',
      instructions: 'Take once daily with breakfast',
      prescribedDate: '2025-07-23',
      prescribedTime: '11:00',
      doctor: 'Dr. Wilson',
      status: 'given',
      isUrgent: false,
      completedBy: 'Nurse Sarah',
      completedTime: '11:30'
    },
    {
      id: 6,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Folic Acid',
      dosage: '5mg',
      instructions: 'Take once daily, continue throughout pregnancy',
      prescribedDate: '2025-07-23',
      prescribedTime: '11:05',
      doctor: 'Dr. Wilson',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 7,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Iron Supplements',
      dosage: '65mg',
      instructions: 'Take twice daily with vitamin C, avoid with tea/coffee',
      prescribedDate: '2025-07-23',
      prescribedTime: '11:10',
      doctor: 'Dr. Wilson',
      status: 'referred',
      isUrgent: false,
      completedBy: 'Nurse Mary',
      completedTime: '11:45'
    },
    {
      id: 8,
      patientName: 'Saranga Dissanayake',
      patientId: 'P004',
      drug: 'Celecoxib',
      dosage: '200mg',
      instructions: 'Take twice daily with food. Monitor for stomach upset',
      prescribedDate: '2025-07-22',
      prescribedTime: '14:30',
      doctor: 'Dr. Brown',
      status: 'referred',
      isUrgent: false,
      completedBy: 'Nurse Mary',
      completedTime: '15:00'
    },
    {
      id: 9,
      patientName: 'Saranga Dissanayake',
      patientId: 'P004',
      drug: 'Omeprazole',
      dosage: '20mg',
      instructions: 'Take once daily before breakfast to protect stomach',
      prescribedDate: '2025-07-22',
      prescribedTime: '14:35',
      doctor: 'Dr. Brown',
      status: 'given',
      isUrgent: false,
      completedBy: 'Nurse Sarah',
      completedTime: '15:30'
    },
    {
      id: 10,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Metformin',
      dosage: '850mg',
      instructions: 'Take twice daily with meals',
      prescribedDate: '2025-07-23',
      prescribedTime: '08:45',
      doctor: 'Dr. Smith',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 11,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take once daily in the evening',
      prescribedDate: '2025-07-23',
      prescribedTime: '08:50',
      doctor: 'Dr. Smith',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 12,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Vitamin D3',
      dosage: '2000 IU',
      instructions: 'Take once daily with largest meal',
      prescribedDate: '2025-07-23',
      prescribedTime: '08:55',
      doctor: 'Dr. Smith',
      status: 'given',
      isUrgent: false,
      completedBy: 'Nurse Sarah',
      completedTime: '09:15'
    },
    {
      id: 13,
      patientName: 'Nimal Fernando',
      patientId: 'P006',
      drug: 'Paracetamol',
      dosage: '500mg',
      instructions: 'Take every 6 hours as needed for pain/fever. Max 4 doses per day',
      prescribedDate: '2025-07-23',
      prescribedTime: '12:30',
      doctor: 'Dr. Johnson',
      status: 'pending',
      isUrgent: true
    },
    {
      id: 14,
      patientName: 'Nimal Fernando',
      patientId: 'P006',
      drug: 'Cetirizine',
      dosage: '10mg',
      instructions: 'Take once daily for allergy symptoms',
      prescribedDate: '2025-07-23',
      prescribedTime: '12:35',
      doctor: 'Dr. Johnson',
      status: 'pending',
      isUrgent: false
    },
    {
      id: 15,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Amlodipine',
      dosage: '5mg',
      instructions: 'Take once daily in the morning for blood pressure',
      prescribedDate: '2025-07-23',
      prescribedTime: '13:15',
      doctor: 'Dr. Wilson',
      status: 'referred',
      isUrgent: false,
      completedBy: 'Nurse Mary',
      completedTime: '13:45'
    },
    {
      id: 16,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Hydrochlorothiazide',
      dosage: '25mg',
      instructions: 'Take once daily in the morning with amlodipine',
      prescribedDate: '2025-07-23',
      prescribedTime: '13:20',
      doctor: 'Dr. Wilson',
      status: 'referred',
      isUrgent: false,
      completedBy: 'Nurse Mary',
      completedTime: '13:45'
    },
    {
      id: 17,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Magnesium Supplement',
      dosage: '400mg',
      instructions: 'Take once daily with dinner to support heart health',
      prescribedDate: '2025-07-23',
      prescribedTime: '13:25',
      doctor: 'Dr. Wilson',
      status: 'pending',
      isUrgent: false
    }
  ]);

  // Filter prescriptions based on active filter
  const getFilteredPrescriptions = () => {
    const today = new Date().toISOString().split('T')[0];
    let filtered = prescriptions;

    switch (activeFilter) {
      case 'today':
        filtered = prescriptions.filter(p => p.prescribedDate === today);
        break;
      case 'pending':
        filtered = prescriptions.filter(p => p.status === 'pending');
        break;
      case 'completed':
        filtered = prescriptions.filter(p => p.status === 'given' || p.status === 'referred');
        break;
      default:
        filtered = prescriptions;
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.drug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patientId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Group prescriptions by patient
  const getGroupedPrescriptions = () => {
    const filtered = getFilteredPrescriptions();
    const grouped = {};
    
    filtered.forEach(prescription => {
      const key = `${prescription.patientId}-${prescription.patientName}`;
      if (!grouped[key]) {
        grouped[key] = {
          patientName: prescription.patientName,
          patientId: prescription.patientId,
          prescriptions: []
        };
      }
      grouped[key].prescriptions.push(prescription);
    });

    // Sort prescriptions within each group by time
    Object.values(grouped).forEach(group => {
      group.prescriptions.sort((a, b) => a.prescribedTime.localeCompare(b.prescribedTime));
    });

    // Sort patient groups: patients with pending prescriptions first, completed ones at bottom
    const sortedGroups = Object.values(grouped).sort((a, b) => {
      const aPendingCount = a.prescriptions.filter(p => p.status === 'pending').length;
      const bPendingCount = b.prescriptions.filter(p => p.status === 'pending').length;
      
      // If patient A has pending prescriptions and B doesn't, A comes first
      if (aPendingCount > 0 && bPendingCount === 0) return -1;
      // If patient B has pending prescriptions and A doesn't, B comes first
      if (bPendingCount > 0 && aPendingCount === 0) return 1;
      
      // If both have pending or both are complete, sort by patient name
      return a.patientName.localeCompare(b.patientName);
    });

    return sortedGroups;
  };

  const handleMarkGiven = (id) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            status: 'given', 
            completedBy: 'Current Nurse',
            completedTime: new Date().toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          }
        : p
    ));
  };

  const handleReferToPharmacy = (id) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === id 
        ? { 
            ...p, 
            status: 'referred', 
            completedBy: 'Current Nurse',
            completedTime: new Date().toLocaleTimeString('en-US', { 
              hour12: false, 
              hour: '2-digit', 
              minute: '2-digit' 
            })
          }
        : p
    ));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'given':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'referred':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'given':
        return <Check className="w-3 h-3" />;
      case 'referred':
        return <ExternalLink className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const filteredPrescriptions = getFilteredPrescriptions();
  const groupedPrescriptions = getGroupedPrescriptions();
  const pendingCount = prescriptions.filter(p => p.status === 'pending').length;
  const todayCount = prescriptions.filter(p => p.prescribedDate === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prescription Management</h1>
          <p className="text-sm text-gray-600">Manage and track prescribed medications</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
            {pendingCount} Pending
          </div>
          <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
            {todayCount} Today
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex bg-orange-50 rounded-lg p-1 border border-orange-200">
            {[
              { key: 'today', label: 'Today', icon: Calendar },
              { key: 'pending', label: 'Pending', icon: Clock },
              { key: 'completed', label: 'Completed', icon: Check }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === key
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-orange-700 hover:text-orange-800 hover:bg-orange-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
            <input
              type="text"
              placeholder="Search patient, drug, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow-sm border border-orange-200">
        {groupedPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-orange-600 mb-2">No prescriptions found</h3>
            <p className="text-orange-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-orange-100">
            {groupedPrescriptions.map((patientGroup, groupIndex) => {
              const pendingCount = patientGroup.prescriptions.filter(p => p.status === 'pending').length;
              const isCompleted = pendingCount === 0;
              
              return (
              <div key={`${patientGroup.patientId}-${groupIndex}`} className={`p-4 transition-colors ${isCompleted ? 'bg-gray-50 opacity-75' : 'hover:bg-orange-50'}`}>
                {/* Patient Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-orange-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-gray-200' : 'bg-teal-100'}`}>
                      <User className={`w-5 h-5 ${isCompleted ? 'text-gray-500' : 'text-teal-600'}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className={`font-bold text-lg ${isCompleted ? 'text-gray-600' : 'text-gray-800'}`}>
                          {patientGroup.patientName}
                        </h3>
                        {isCompleted && (
                          <div className="flex items-center space-x-1 bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                            <Check className="w-3 h-3" />
                            <span>Complete</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {patientGroup.patientId}
                        </span>
                        <span className="text-sm text-gray-500">
                          {patientGroup.prescriptions.length} medication{patientGroup.prescriptions.length !== 1 ? 's' : ''}
                        </span>
                        {pendingCount > 0 && (
                          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                            {pendingCount} pending
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="space-y-3">
                  {patientGroup.prescriptions.map((prescription, index) => (
                    <div key={prescription.id} className="flex items-start justify-between bg-gray-50 rounded-lg p-3 border-l-4 border-l-orange-200">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div className="flex items-center space-x-2 flex-1">
                            <Pill className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-800">
                                  {prescription.drug} {prescription.dosage}
                                </span>
                                {prescription.isUrgent && (
                                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {prescription.instructions}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>
                                  {prescription.prescribedDate} at {prescription.prescribedTime}
                                </span>
                                <span>• {prescription.doctor}</span>
                              </div>
                              
                              {/* Completion Info */}
                              {prescription.status !== 'pending' && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {prescription.status === 'given' ? 'Dispensed' : 'Referred to pharmacy'} by {prescription.completedBy} at {prescription.completedTime}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(prescription.status)}`}>
                          {getStatusIcon(prescription.status)}
                          <span className="capitalize">{prescription.status}</span>
                        </span>

                        {/* Action Buttons */}
                        {prescription.status === 'pending' && (
                          <div className="flex space-x-1">
                            <Button
                              variant="secondary"
                              size="sm"
                              icon={Check}
                              onClick={() => handleMarkGiven(prescription.id)}
                              className="text-xs"
                            >
                              Dispense
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              icon={ShoppingBag}
                              onClick={() => handleReferToPharmacy(prescription.id)}
                              className="text-xs"
                            >
                              Refer
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medications;
