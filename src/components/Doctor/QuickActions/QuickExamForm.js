import { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../Common/Button';
import axios from 'axios';

const QuickExamForm = ({ selectedPatient }) => {
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');
  const [username, setUsername] = useState('');
  const [patientInfo, setPatientInfo] = useState(null); // store fetched patient info

  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [spo2, setSpo2] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [generalAppearance, setGeneralAppearance] = useState('');
  const [cardiovascular, setCardiovascular] = useState('');
  const [respiratory, setRespiratory] = useState('');
  const [abdominal, setAbdominal] = useState('');
  const [neurological, setNeurological] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, when: 'beforeChildren' } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  // Fetch patient by username
  const fetchPatientByUsername = async () => {
    if (!username) return alert('Please enter a username or contact number');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: No token found');
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/auth/medvaultpro/doctor/patient/${username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.patientId) {
        setPatientId(response.data.patientId.toString());
        setPatientInfo(response.data.user); // store name/username
      } else {
        alert('Patient not found');
        setPatientId('');
        setPatientInfo(null);
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      alert('Failed to fetch patient');
    } finally {
      setLoading(false);
    }
  };

  // Submit quick exam using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId) return alert('Please fetch a valid patient before submitting');

    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized: No token found');
      setLoading(false);
      return;
    }

    const payload = {
      patientId: patientId.toString(),
      bloodPressure,
      heartRate: heartRate ? Number(heartRate) : undefined,
      temperature: temperature ? parseFloat(temperature) : undefined,
      spo2: spo2 ? Number(spo2) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      height: height ? Number(height) : undefined,
      generalAppearance,
      cardiovascular,
      respiratory,
      abdominal,
      neurological,
      additionalNotes,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/patientRecords/quickexams/insert',
        payload,
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );

      alert('Quick exam saved successfully!');

      // Clear all fields except patientId
      setBloodPressure('');
      setHeartRate('');
      setTemperature('');
      setSpo2('');
      setWeight('');
      setHeight('');
      setGeneralAppearance('');
      setCardiovascular('');
      setRespiratory('');
      setAbdominal('');
      setNeurological('');
      setAdditionalNotes('');
    } catch (error) {
      console.error('Error saving quick exam:', error);
      alert(error.response?.data?.message || 'Failed to save quick exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Get ID */}
      {!selectedPatient && (
        <motion.div variants={itemVariants} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter username or contact"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
          <Button type="button" size="sm" onClick={fetchPatientByUsername} disabled={loading}>
            {loading ? 'Loading...' : 'Get ID'}
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
            Patient: {patientInfo.firstName} {patientInfo.lastName} ({patientInfo.username})
          </p>
        )}
      </motion.div>

      {/* Vital Signs */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure (mmHg)</label>
          <input
            type="text"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            placeholder="120/80"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate (bpm)</label>
          <input
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="72"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°C)</label>
          <input
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="36.5"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SpO2 (%)</label>
          <input
            type="number"
            value={spo2}
            onChange={(e) => setSpo2(e.target.value)}
            placeholder="98"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </motion.div>

      {/* Weight & Height */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70.0"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </motion.div>

      {/* System Review */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">General Appearance</label>
        <textarea
          rows="3"
          value={generalAppearance}
          onChange={(e) => setGeneralAppearance(e.target.value)}
          placeholder="Alert, cooperative, no acute distress..."
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cardiovascular</label>
          <input
            type="text"
            value={cardiovascular}
            onChange={(e) => setCardiovascular(e.target.value)}
            placeholder="Normal heart sounds, no murmurs"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Respiratory</label>
          <input
            type="text"
            value={respiratory}
            onChange={(e) => setRespiratory(e.target.value)}
            placeholder="Clear breath sounds bilaterally"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Abdominal</label>
          <input
            type="text"
            value={abdominal}
            onChange={(e) => setAbdominal(e.target.value)}
            placeholder="Soft, non-tender"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Neurological</label>
          <input
            type="text"
            value={neurological}
            onChange={(e) => setNeurological(e.target.value)}
            placeholder="Alert and oriented x3"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </motion.div>

      {/* Additional Notes */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          rows="4"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Any additional findings or observations..."
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div className="pt-6 border-t border-gray-100" variants={itemVariants}>
        <Button
          type="submit"
          variant="primary"
          role="doctor"
          size="lg"
          icon={Save}
          className="w-full shadow-lg hover:shadow-teal-200"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Examination'}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default QuickExamForm;
