// src/components/Nurse/Medications.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pill, User, Search } from 'lucide-react';

const Medications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseURL = 'http://localhost:3000';

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${baseURL}/api/v1/patientRecords/nurse/prescriptions`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data || [];

        const formatted = data.map((item) => ({
          id: item.id,
          patientName: item.patient
            ? `${item.patient.firstName} ${item.patient.lastName}`
            : 'Unknown Patient',
          prescribedDate: new Date(item.createdAt),
          doctor: item.doctor
            ? `Dr. ${item.doctor.firstName} ${item.doctor.lastName}`
            : 'Unknown Doctor',
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

  // Filter prescriptions by search only (no date filter)
  const filteredPrescriptions = prescriptions.filter((p) =>
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-teal-200 p-4">
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

      {/* Prescription List */}
      {filteredPrescriptions.length === 0 ? (
        <div className="text-center py-12">
          <Pill className="w-16 h-16 text-orange-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-orange-600 mb-2">
            No prescriptions found
          </h3>
        </div>
      ) : (
        <div className="divide-y divide-orange-100">
          {filteredPrescriptions.map((prescription) => (
            <div
              key={prescription.id}
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
                      {prescription.patientName}
                    </h3>
                    <p className="text-sm text-gray-500">{prescription.doctor}</p>
                  </div>
                </div>
              </div>

              {/* Medications */}
              <div className="space-y-3">
                {prescription.medications.map((med, idx) => (
                  <div
                    key={idx}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-500">
                          <div>
                            <span className="font-medium">Frequency:</span>{' '}
                            {med.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {med.duration}
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
  );
};

export default Medications;


