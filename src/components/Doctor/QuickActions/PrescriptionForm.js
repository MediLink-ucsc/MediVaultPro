import { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../Common/Button';

const PrescriptionForm = ({ onSubmit, selectedPatient }) => {
  const [medications, setMedications] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const medicationVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.form 
      onSubmit={onSubmit} 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
        <select
          required
          name="patientId"
          value={selectedPatient?.id || ''}
          disabled={!!selectedPatient}
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjd2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[center_right_1rem]"
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
        {selectedPatient && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedPatient.firstName} {selectedPatient.lastName} (Age: {selectedPatient.age})
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">Medications *</label>
          <Button
            type="button"
            variant="secondary"
            role="doctor"
            size="sm"
            icon={Plus}
            onClick={addMedication}
          >
            Add Medication
          </Button>
        </div>
        
        <AnimatePresence>
          {medications.map((med, index) => (
            <motion.div 
              key={index} 
              className="border border-gray-200 rounded-xl p-5 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow"
              variants={medicationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700">Medication {index + 1}</h4>
                {medications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    role="danger"
                    size="xs"
                    icon={Trash2}
                    onClick={() => removeMedication(index)}
                    className="p-1"
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medicine Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Paracetamol"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                  <select
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select frequency</option>
                    <option value="once">Once daily</option>
                    <option value="twice">Twice daily</option>
                    <option value="thrice">Three times daily</option>
                    <option value="four">Four times daily</option>
                    <option value="as-needed">As needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 7 days"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Instructions</label>
        <textarea
          rows="4"
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Special instructions for the patient..."
        />
      </motion.div>

      <motion.div 
        className="pt-6 border-t border-gray-100"
        variants={itemVariants}
      >
        <Button
          type="submit"
          variant="primary"
          role="doctor"
          size="lg"
          icon={Save}
          className="w-full shadow-lg hover:shadow-teal-200"
          fullWidth
        >
          Generate Prescription
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default PrescriptionForm;