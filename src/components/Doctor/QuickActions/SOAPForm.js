import { useState } from 'react';
import { Save, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../Common/Button';
import axios from 'axios';

const SOAPForm = ({ selectedPatient, onSubmit }) => {
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');
  const [username, setUsername] = useState('');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));

  // ✅ Fetch patient by username (same logic as PrescriptionForm)
  const fetchPatientByUsername = async () => {
    if (!username) {
      alert('Please enter a username.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/auth/medvaultpro/doctor/patient/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Fetched patient:', response.data);

      if (response.data && response.data.patientId) {
        setPatientId(response.data.patientId.toString());
        setPatientInfo(response.data);
      } else {
        alert('Patient not found.');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      alert('Failed to fetch patient.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId) {
      alert('Please fetch a valid patient before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }

      const payload = {
        patientId: String(patientId),
        subjective,
        objective,
        assessment,
        plan,
        dateTime,
      };

      console.log('Submitting SOAP note:', payload);

      const response = await axios.post(
        'http://localhost:3000/api/v1/patientRecords/soapnotes/insert',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('SOAP Note saved:', response.data);
      alert('SOAP Note saved successfully!');

      if (onSubmit) onSubmit(e); // ✅ Keep Dashboard logic intact
    } catch (error) {
      console.error('Error saving SOAP note:', error);
      alert('Failed to save SOAP note.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Username Search */}
      {!selectedPatient && (
        <motion.div variants={itemVariants} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter patient username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
          <Button
            type="button"
            variant="primary"  // Change to primary for consistency
            size="lg"          // Match the size of the Save button
            icon={Search}
            className="shadow-lg hover:shadow-teal-200 w-full sm:w-auto"
            onClick={fetchPatientByUsername}
          >
            Get ID
          </Button>
        </motion.div>
      )}

      {/* Patient ID */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
        <input
          type="text"
          value={patientId}
          readOnly
          className="w-full p-3.5 border border-gray-200 rounded-xl bg-gray-100"
        />
        {patientInfo && (
          <p className="mt-2 text-green-600">
            Patient: {patientInfo.user.firstName} {patientInfo.user.lastName} ({patientInfo.user.username})          </p>
        )}
      </motion.div>

      {/* Date & Time */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Subjective */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjective (S) - Chief Complaint & History *
        </label>
        <textarea
          rows="5"
          required
          value={subjective}
          onChange={(e) => setSubjective(e.target.value)}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Objective */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objective (O) - Physical Examination & Tests *
        </label>
        <textarea
          rows="5"
          required
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Assessment */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Assessment (A) - Diagnosis *
        </label>
        <textarea
          rows="4"
          required
          value={assessment}
          onChange={(e) => setAssessment(e.target.value)}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Plan */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Plan (P) - Treatment Plan *
        </label>
        <textarea
          rows="5"
          required
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Submit */}
      <motion.div className="pt-6 border-t border-gray-100" variants={itemVariants}>
        <Button
          type="submit"
          variant="primary"
          role="doctor"
          size="lg"
          icon={Save}
          className="w-full shadow-lg hover:shadow-teal-200"
          fullWidth
        >
          Save SOAP Note
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default SOAPForm;

