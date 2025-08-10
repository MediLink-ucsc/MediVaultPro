import { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../Common/Button';

const QuickExamForm = ({ selectedPatient }) => {
  const [patientId, setPatientId] = useState(selectedPatient?.id || '');
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token'); // JWT assumed in localStorage
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
      const response = await fetch('http://localhost:3000/api/v1/patientRecords/quickexams/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to save quick exam');
      }

      alert('Quick exam saved successfully!');
      // Clear form fields except patientId
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
      alert(error.message);
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
      {/* Patient */}
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
        <select
          required
          name="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          disabled={!!selectedPatient}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition-all duration-200 shadow-sm hover:shadow-md"
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

      {/* Vital Signs */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure (mmHg)</label>
          <input
            type="text"
            name="bloodPressure"
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
            name="heartRate"
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
            name="temperature"
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
            name="spo2"
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
            name="weight"
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
            name="height"
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
          name="generalAppearance"
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
            name="cardiovascular"
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
            name="respiratory"
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
            name="abdominal"
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
            name="neurological"
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
          name="additionalNotes"
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

