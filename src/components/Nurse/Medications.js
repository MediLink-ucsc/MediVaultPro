// src/components/Nurse/Medications.js
import React, { useState } from 'react';
import { 
  Pill, 
  User, 
  Search, 
  Calendar
} from 'lucide-react';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('today');

  // Mock prescription data
  const [prescriptions] = useState([
    {
      id: 1,
      patientName: 'Likitha Chathubhashini',
      patientId: 'P001',
      drug: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take 3 times daily after meals for 7 days',
      prescribedDate: '2025-10-19',
      prescribedTime: '09:30',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 2,
      patientName: 'Likitha Chathubhashini',
      patientId: 'P001',
      drug: 'Vitamin C',
      dosage: '500mg',
      instructions: 'Take once daily with breakfast for immune support',
      prescribedDate: '2025-10-19',
      prescribedTime: '09:35',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 3,
      patientName: 'Hansaja Damsara',
      patientId: 'P002',
      drug: 'Lisinopril',
      dosage: '10mg',
      instructions: 'Take once daily in the morning',
      prescribedDate: '2025-10-19',
      prescribedTime: '10:15',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 4,
      patientName: 'Hansaja Damsara',
      patientId: 'P002',
      drug: 'Aspirin',
      dosage: '81mg',
      instructions: 'Take once daily with food for blood thinning',
      prescribedDate: '2025-10-19',
      prescribedTime: '10:20',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 5,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Prenatal Vitamins',
      dosage: '1 tablet',
      instructions: 'Take once daily with breakfast',
      prescribedDate: '2025-10-19',
      prescribedTime: '11:00',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 6,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Folic Acid',
      dosage: '5mg',
      instructions: 'Take once daily, continue throughout pregnancy',
      prescribedDate: '2025-10-19',
      prescribedTime: '11:05',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 7,
      patientName: 'Sathya Abeysinghe',
      patientId: 'P003',
      drug: 'Iron Supplements',
      dosage: '65mg',
      instructions: 'Take twice daily with vitamin C, avoid with tea/coffee',
      prescribedDate: '2025-10-19',
      prescribedTime: '11:10',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 8,
      patientName: 'Saranga Dissanayake',
      patientId: 'P004',
      drug: 'Celecoxib',
      dosage: '200mg',
      instructions: 'Take twice daily with food. Monitor for stomach upset',
      prescribedDate: '2025-10-18',
      prescribedTime: '14:30',
      doctor: 'Dr. Brown',
      hospitalName: 'Durdans Hospital'
    },
    {
      id: 9,
      patientName: 'Saranga Dissanayake',
      patientId: 'P004',
      drug: 'Omeprazole',
      dosage: '20mg',
      instructions: 'Take once daily before breakfast to protect stomach',
      prescribedDate: '2025-10-18',
      prescribedTime: '14:35',
      doctor: 'Dr. Brown',
      hospitalName: 'Durdans Hospital'
    },
    {
      id: 10,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Metformin',
      dosage: '850mg',
      instructions: 'Take twice daily with meals',
      prescribedDate: '2025-10-19',
      prescribedTime: '08:45',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 11,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Atorvastatin',
      dosage: '20mg',
      instructions: 'Take once daily in the evening',
      prescribedDate: '2025-10-19',
      prescribedTime: '08:50',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 12,
      patientName: 'Kamal Perera',
      patientId: 'P005',
      drug: 'Vitamin D3',
      dosage: '2000 IU',
      instructions: 'Take once daily with largest meal',
      prescribedDate: '2025-10-19',
      prescribedTime: '08:55',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 13,
      patientName: 'Nimal Fernando',
      patientId: 'P006',
      drug: 'Paracetamol',
      dosage: '500mg',
      instructions: 'Take every 6 hours as needed for pain/fever. Max 4 doses per day',
      prescribedDate: '2025-10-19',
      prescribedTime: '12:30',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 14,
      patientName: 'Nimal Fernando',
      patientId: 'P006',
      drug: 'Cetirizine',
      dosage: '10mg',
      instructions: 'Take once daily for allergy symptoms',
      prescribedDate: '2025-10-19',
      prescribedTime: '12:35',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 15,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Amlodipine',
      dosage: '5mg',
      instructions: 'Take once daily in the morning for blood pressure',
      prescribedDate: '2025-10-19',
      prescribedTime: '13:15',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 16,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Hydrochlorothiazide',
      dosage: '25mg',
      instructions: 'Take once daily in the morning with amlodipine',
      prescribedDate: '2025-10-19',
      prescribedTime: '13:20',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 17,
      patientName: 'Priya Kumari',
      patientId: 'P007',
      drug: 'Magnesium Supplement',
      dosage: '400mg',
      instructions: 'Take once daily with dinner to support heart health',
      prescribedDate: '2025-10-19',
      prescribedTime: '13:25',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 18,
      patientName: 'Arjuna Silva',
      patientId: 'P008',
      drug: 'Ibuprofen',
      dosage: '400mg',
      instructions: 'Take every 8 hours with food for pain relief. Max 3 doses per day',
      prescribedDate: '2025-10-19',
      prescribedTime: '09:15',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 19,
      patientName: 'Malini Jayawardena',
      patientId: 'P009',
      drug: 'Losartan',
      dosage: '50mg',
      instructions: 'Take once daily in the morning for blood pressure control',
      prescribedDate: '2025-10-19',
      prescribedTime: '10:30',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 20,
      patientName: 'Chandrika Silva',
      patientId: 'P010',
      drug: 'Azithromycin',
      dosage: '250mg',
      instructions: 'Take once daily for 5 days with or without food',
      prescribedDate: '2025-10-19',
      prescribedTime: '14:15',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 21,
      patientName: 'Chandrika Silva',
      patientId: 'P010',
      drug: 'Multivitamin',
      dosage: '1 tablet',
      instructions: 'Take once daily with breakfast',
      prescribedDate: '2025-10-19',
      prescribedTime: '14:20',
      doctor: 'Dr. Smith',
      hospitalName: 'Lanka Hospital'
    },
    {
      id: 22,
      patientName: 'Thilaka Bandara',
      patientId: 'P011',
      drug: 'Calcium Carbonate',
      dosage: '500mg',
      instructions: 'Take twice daily with meals for bone health',
      prescribedDate: '2025-10-19',
      prescribedTime: '15:00',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 23,
      patientName: 'Thilaka Bandara',
      patientId: 'P011',
      drug: 'Warfarin',
      dosage: '2mg',
      instructions: 'Take once daily at the same time. Monitor INR levels regularly',
      prescribedDate: '2025-10-19',
      prescribedTime: '15:05',
      doctor: 'Dr. Wilson',
      hospitalName: 'Nawaloka Hospital'
    },
    {
      id: 24,
      patientName: 'Roshan Mendis',
      patientId: 'P012',
      drug: 'Simvastatin',
      dosage: '40mg',
      instructions: 'Take once daily in the evening with or without food',
      prescribedDate: '2025-10-19',
      prescribedTime: '16:30',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    },
    {
      id: 25,
      patientName: 'Roshan Mendis',
      patientId: 'P012',
      drug: 'Clopidogrel',
      dosage: '75mg',
      instructions: 'Take once daily with or without food',
      prescribedDate: '2025-10-19',
      prescribedTime: '16:35',
      doctor: 'Dr. Johnson',
      hospitalName: 'Asiri Hospital'
    }
  ]);

  // Filter prescriptions based on active filter
  const getFilteredPrescriptions = () => {
    const today = new Date().toISOString().split('T')[0];
    let filtered = prescriptions;

    if (activeFilter === 'today') {
      filtered = prescriptions.filter(p => p.prescribedDate === today);
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

    // Sort patient groups by patient name
    const sortedGroups = Object.values(grouped).sort((a, b) => 
      a.patientName.localeCompare(b.patientName)
    );

    return sortedGroups;
  };



  const filteredPrescriptions = getFilteredPrescriptions();
  const groupedPrescriptions = getGroupedPrescriptions();
  const todayCount = prescriptions.filter(p => p.prescribedDate === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prescription Management</h1>
          <p className="text-sm text-gray-600">View and manage prescribed medications</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full font-medium">
            {todayCount} Today
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-teal-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Filter Tabs */}
          <div className="flex bg-teal-50 rounded-lg p-1 border border-teal-200">
            {[
              { key: 'today', label: 'Today\'s Prescriptions', icon: Calendar },
              { key: 'all', label: 'All Prescriptions', icon: Pill }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeFilter === key
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-teal-700 hover:text-teal-800 hover:bg-teal-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-400" />
            <input
              type="text"
              placeholder="Search patient, drug, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
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
            {groupedPrescriptions.map((patientGroup, groupIndex) => (
              <div key={`${patientGroup.patientId}-${groupIndex}`} className="p-4 transition-colors hover:bg-orange-50">
                {/* Patient Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-orange-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-teal-100">
                      <User className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {patientGroup.patientName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {patientGroup.patientId}
                        </span>
                        <span className="text-sm text-gray-500">
                          {patientGroup.prescriptions.length} medication{patientGroup.prescriptions.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="space-y-3">
                  {patientGroup.prescriptions.map((prescription) => (
                    <div key={prescription.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-l-orange-200">
                      <div className="flex items-start space-x-3">
                        <Pill className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <div className="mb-2">
                            <span className="font-semibold text-gray-800 text-lg">
                              {prescription.drug} {prescription.dosage}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {prescription.instructions}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Patient:</span> {prescription.patientName} ({prescription.patientId})
                            </div>
                            <div>
                              <span className="font-medium">Hospital:</span> {prescription.hospitalName}
                            </div>
                            <div>
                              <span className="font-medium">Doctor:</span> {prescription.doctor}
                            </div>
                            <div>
                              <span className="font-medium">Prescribed:</span> {prescription.prescribedDate} at {prescription.prescribedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medications;
