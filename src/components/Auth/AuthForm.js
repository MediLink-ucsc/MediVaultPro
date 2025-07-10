import React, { useState } from 'react';
import { User, Lock, Mail, Phone, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';

const AuthForm = ({ 
  mode = 'login', // 'login' or 'signup'
  context = 'page', // 'page' or 'modal'
  onLogin, 
  onSignup,
  onSwitchMode,
  onSwitchToForgotPassword,
  onBackToLanding
}) => {
  const isLogin = mode === 'login';
  const isModal = context === 'modal';

  // Login state
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'doctor'
  });

  // Signup state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'doctor'
  });

  const [errors, setErrors] = useState({});

  const validateSignupForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Mock login with all required fields
    onLogin({
      id: 1,
      name: credentials.role === 'doctor' ? 'Dr.Dulmini Chathubhashini' : 
            credentials.role === 'nurse' ? 'Nurse Likitha' : 
            credentials.role === 'systemadmin' ? 'System Admin' : 'Lab Operator',
      email: credentials.email || 'demo@medivaultpro.com',
      role: credentials.role
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (validateSignupForm()) {
      // Mock signup - in real app, this would make an API call
      const userData = {
        id: Date.now(), // Mock ID
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        role: formData.role
      };
      
      onSignup(userData);
    }
  };

  const handleInputChange = (field, value) => {
    if (isLogin) {
      setCredentials({ ...credentials, [field]: value });
    } else {
      setFormData({ ...formData, [field]: value });
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors({ ...errors, [field]: '' });
      }
    }
  };

  const ButtonComponent = isModal ? motion.button : 'button';
  const buttonProps = isModal ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  const currentData = isLogin ? credentials : formData;

  return (
    <div className="w-full">
      {/* Back to Landing Button - only show on full page, not modal */}
      {!isModal && onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="fixed top-6 left-6 flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className={`mx-auto w-16 h-16 ${isModal 
          ? 'bg-gradient-to-br from-teal-500 to-orange-500' 
          : 'bg-white'
        } rounded-full flex items-center justify-center mb-4 shadow-lg`}>
          <img 
            src={MediLinkLogo} 
            alt="MediLink Logo" 
            className={`w-12 h-12 object-contain ${isModal ? 'rounded-full' : ''}`}
          />
        </div>
        <h1 className={`text-2xl font-bold ${isModal 
          ? 'bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent' 
          : 'text-gray-800'
        }`}>
          {isModal ? 'MediVaultPro' : 'MedivaultPro'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit} className="space-y-6">
        {/* Signup specific fields */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isModal ? 'transition-all' : ''
                  }`}
                  placeholder="First name"
                  value={currentData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                required
                className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isModal ? 'transition-all' : ''
                }`}
                placeholder="Last name"
                value={currentData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            {isLogin ? (
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            ) : (
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            )}
            <input
              type="email"
              required
              className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                isModal ? 'transition-all' : ''
              }`}
              placeholder="Enter your email"
              value={currentData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone field - signup only */}
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                required
                className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isModal ? 'transition-all' : ''
                }`}
                placeholder="Phone number"
                value={currentData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        )}

        {/* Role field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
              isModal ? 'transition-all' : ''
            }`}
            value={currentData.role || 'doctor'}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="lab">Lab Operator</option>
            <option value="systemadmin">System Admin</option>
          </select>
        </div>

        {/* Password fields */}
        <div className={isLogin ? '' : 'grid grid-cols-1 gap-4'}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  isModal ? 'transition-all' : ''
                }`}
                placeholder={isLogin ? "Enter your password" : "Password"}
                value={currentData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm password - signup only */}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    isModal ? 'transition-all' : ''
                  }`}
                  placeholder="Confirm password"
                  value={currentData.confirmPassword || ''}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}
        </div>

        {/* Submit button */}
        <ButtonComponent
          type="submit"
          {...buttonProps}
          className={`w-full text-white py-3 rounded-lg font-medium ${
            isModal 
              ? isLogin
                ? 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl'
                : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl'
              : isLogin
                ? 'bg-teal-600 hover:bg-teal-700 transition duration-200'
                : 'bg-orange-600 hover:bg-orange-700 transition duration-200'
          }`}
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </ButtonComponent>
      </form>

      {/* Footer links */}
      <div className="mt-6 text-center space-y-3">
        {isLogin && onSwitchToForgotPassword && (
          <button 
            onClick={onSwitchToForgotPassword}
            className={`text-teal-600 hover:text-teal-700 text-sm block mx-auto ${
              isModal ? 'hover:underline transition-colors' : ''
            }`}
          >
            Forgot your password?
          </button>
        )}
        
        <p className="text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={onSwitchMode}
            className={`font-medium ${
              isModal 
                ? isLogin
                  ? 'text-orange-600 hover:text-orange-700 hover:underline transition-colors'
                  : 'text-teal-600 hover:text-teal-700 hover:underline transition-colors'
                : 'text-teal-600 hover:text-teal-700'
            }`}
          >
            {isLogin ? 'Sign up here' : 'Sign in here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
