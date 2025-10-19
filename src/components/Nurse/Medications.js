// src/components/Nurse/Medications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pill, User, Search, Calendar } from 'lucide-react';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('today');
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = 'http://localhost:3000'; // change if needed

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming JWT is stored here
        const response = await axios.get(
          `${baseURL}/api/v1/patientRecords/nurse/prescriptions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = response.data || [];
        // Transform API data into same structure used in UI
        const formatted = data.map((item) => ({
          id: item.id,
          patientName: `${item.patient.firstName} ${item.patient.lastName}`,
          patientId: item.patientId,
          prescribedDate: new Date(item.createdAt).toISOString().split('T')[0],
          prescribedTime: new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          doctor: `Dr. ${item.doctor.firstName} ${item.doctor.lastName}`,
          hospitalName: item.doctor.hospitalName || 'N/A',
          instructions: item.additionalInstructions,
          medications: item.medications.map((m) => ({
            name: m.medicineName,
            dosage: m.dosage,
            frequency: m.frequency,
            duration: m.duration,
          })),
        }));

        setPrescriptions(formatted);
      } catch (err) {
        console.error('Error fetching prescriptions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  // Filter + search
  const getFilteredPrescriptions = () => {
    let filtered = prescriptions;
    if (activeFilter === 'today') {
      filtered = prescriptions.filter((p) => p.prescribedDate === today);
    }
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  };

  // Group by patient
  const getGroupedPrescriptions = () => {
    const filtered = getFilteredPrescriptions();
    const grouped = {};
    filtered.forEach((p) => {
      if (!grouped[p.patientId]) {
        grouped[p.patientId] = {
          patientName: p.patientName,
          patientId: p.patientId,
          prescriptions: [],
        };
      }
      grouped[p.patientId].prescriptions.push(p);
    });
    return Object.values(grouped);
  };

  const groupedPrescriptions = getGroupedPrescriptions();
  const todayCount = prescriptions.filter(
    (p) => p.prescribedDate === today
  ).length;

  if (loading) {
    return <div className="text-center py-8">Loading prescriptions...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Prescription Management
          </h1>
          <p className="text-sm text-gray-600">
            View and manage prescribed medications
          </p>
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
              { key: 'today', label: "Today's Prescriptions", icon: Calendar },
              // { key: 'all', label: 'All Prescriptions', icon: Pill },
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
              placeholder="Search patient..."
              className="w-full pl-10 pr-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Prescription List */}
      <div className="bg-white rounded-lg shadow-sm border border-orange-200">
        {groupedPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <Pill className="w-16 h-16 text-orange-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-orange-600 mb-2">
              No prescriptions found
            </h3>
            <p className="text-orange-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="divide-y divide-orange-100">
            {groupedPrescriptions.map((patientGroup, groupIndex) => (
              <div
                key={`${patientGroup.patientId}-${groupIndex}`}
                className="p-4 transition-colors hover:bg-orange-50"
              >
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
                      {/* <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {patientGroup.patientId}
                        </span>
                        <span className="text-sm text-gray-500">
                          {patientGroup.prescriptions.length} medication
                          {patientGroup.prescriptions.length !== 1 ? 's' : ''}
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* Medications */}
                <div className="space-y-3">
                  {patientGroup.prescriptions.map((prescription) =>
                    prescription.medications.map((med, i) => (
                      <div
                        key={`${prescription.id}-${i}`}
                        className="bg-gray-50 rounded-lg p-4 border-l-4 border-l-orange-200"
                      >
                        <div className="flex items-start space-x-3">
                          <Pill className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="mb-2">
                              <span className="font-semibold text-gray-800 text-lg">
                                {med.name} {med.dosage}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              {prescription.instructions}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                              <div>
                                <span className="font-medium">Frequency:</span>{' '}
                                {med.frequency}
                              </div>
                              <div>
                                <span className="font-medium">Duration:</span>{' '}
                                {med.duration}
                              </div>
                              <div>
                                <span className="font-medium">Doctor:</span>{' '}
                                {prescription.doctor}
                              </div>
                              <div>
                                <span className="font-medium">Hospital:</span>{' '}
                                {prescription.hospitalName}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span>{' '}
                                {prescription.prescribedDate}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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

