import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../Common/Button';

const SOAPForm = ({ onSubmit, selectedPatient }) => {
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
          <option value="">Select patient</option>
          <option value="1">Likitha Chathubhashini - ID: 001</option>
          <option value="2">Dulmini Nureka - ID: 002</option>
          <option value="3">Hansaja Damsara - ID: 003</option>
          <option value="4">Sathya Abeysinghe - ID: 004</option>
        </select>
        {selectedPatient && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedPatient.name} (Age: {selectedPatient.age})
          </p>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
        <input
          type="datetime-local"
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          defaultValue={new Date().toISOString().slice(0, 16)}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subjective (S) - Chief Complaint & History *</label>
        <textarea
          rows="5"
          required
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Patient's chief complaint, symptoms, and relevant history..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Objective (O) - Physical Examination & Tests *</label>
        <textarea
          rows="5"
          required
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Vital signs, physical examination findings, lab results..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Assessment (A) - Diagnosis *</label>
        <textarea
          rows="4"
          required
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Primary and differential diagnoses, clinical impression..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Plan (P) - Treatment Plan *</label>
        <textarea
          rows="5"
          required
          className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
          placeholder="Treatment plan, medications, follow-up instructions..."
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
          Save SOAP Note
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default SOAPForm;