import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../Common/Button';
// Backend integration removed

const NewPatientForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    age: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("Form Data:", formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Backend integration removed, just call onSubmit with formData
    setMessage('Patient registered successfully!');
    if (onSubmit) onSubmit(formData);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, when: "beforeChildren" } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['firstName','lastName','username','password','age','gender'].map((field) => (
          <motion.div key={field} variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} *
            </label>

            {field === 'gender' ? (
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${
                  errors.gender ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md ${
                  errors[field] ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder={`Enter ${field}`}
              />
            )}

            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </motion.div>
        ))}
      </div>

      {message && <p className="text-center text-sm text-green-600">{message}</p>}

      <motion.div className="pt-6 border-t border-gray-100" variants={itemVariants}>
        <Button
          type="submit"
          variant="primary"
          role="nurse"
          size="lg"
          icon={Save}
          className="w-full shadow-lg hover:shadow-orange-200"
          fullWidth
        >
          Register Patient
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default NewPatientForm;

