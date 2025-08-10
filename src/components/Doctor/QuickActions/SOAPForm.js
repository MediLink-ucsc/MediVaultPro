import { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../Common/Button';
import axios from 'axios';

const SOAPForm = ({ selectedPatient }) => {
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming JWT stored in localStorage

      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }

      const payload = {
        patientId:patientId,
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
      {/* Patient */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
        <select
          required
          name="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          disabled={!!selectedPatient}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {selectedPatient ? (
            <option value={selectedPatient.id}>
              {selectedPatient.firstName} {selectedPatient.lastName} - ID: {selectedPatient.id}
            </option>
          ) : (
            <>
              <option value="">Select patient</option>
              <option value="1">Likitha Chathubhashini - ID: 001</option>
              <option value="2">Dulmini Nureka - ID: 002</option>
              <option value="3">Hansaja Damsara - ID: 003</option>
              <option value="4">Sathya Abeysinghe - ID: 004</option>
            </>
          )}
        </select>
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
