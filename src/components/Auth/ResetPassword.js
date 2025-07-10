import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';

const ResetPassword = ({ 
  token, 
  onPasswordReset, 
  onBackToLogin,
  context = 'page' // 'page' or 'modal'
}) => {
  const isModal = context === 'modal';
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('At least 8 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('One number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('One special character');
    }
    return errors;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate password
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors;
    }
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the callback with the new password and token
      if (onPasswordReset) {
        onPasswordReset({
          token,
          newPassword: formData.password
        });
      }
      
      setIsSuccess(true);
      
      // Auto redirect after success
      setTimeout(() => {
        if (onBackToLogin) {
          onBackToLogin();
        }
      }, 3000);
      
    } catch (error) {
      setErrors({ submit: 'Failed to reset password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const ButtonComponent = isModal ? motion.button : 'button';
  const buttonProps = isModal ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full text-center">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`mx-auto w-16 h-16 ${isModal 
            ? 'bg-gradient-to-br from-green-500 to-teal-500' 
            : 'bg-white'
          } rounded-full flex items-center justify-center mb-4 shadow-lg`}>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className={`text-2xl font-bold ${isModal 
            ? 'bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent' 
            : 'text-gray-800'
          }`}>
            Password Reset Successfully!
          </h1>
          <p className="text-gray-600 mt-2">
            Your password has been updated. You can now sign in with your new password.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              Redirecting to login page in a few seconds...
            </p>
          </div>
          
          {onBackToLogin && (
            <ButtonComponent
              onClick={onBackToLogin}
              className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg ${
                isModal 
                  ? 'hover:shadow-xl transform transition-all duration-200' 
                  : 'hover:from-teal-700 hover:to-teal-800 transition-colors'
              }`}
              {...buttonProps}
            >
              Continue to Login
            </ButtonComponent>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Back to Login Button - only show on full page, not modal */}
      {!isModal && onBackToLogin && (
        <button
          onClick={onBackToLogin}
          className="fixed top-6 left-6 flex items-center space-x-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Back to Login</span>
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
          Reset Your Password
        </h1>
        <p className="text-gray-600 mt-2">
          Enter your new password below
        </p>
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              required
              className={`w-full pl-10 pr-12 py-3 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                isModal ? 'transition-all' : ''
              }`}
              placeholder="Enter your new password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <div className="mt-2">
              <p className="text-red-600 text-sm">Password must contain:</p>
              <ul className="text-red-600 text-xs mt-1 space-y-1">
                {errors.password.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className={`w-full pl-10 pr-12 py-3 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                isModal ? 'transition-all' : ''
              }`}
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-red-600 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <ButtonComponent
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg ${
            isLoading 
              ? 'opacity-50 cursor-not-allowed' 
              : isModal 
                ? 'hover:shadow-xl transform transition-all duration-200' 
                : 'hover:from-teal-700 hover:to-teal-800 transition-colors'
          }`}
          {...buttonProps}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Resetting Password...</span>
            </div>
          ) : (
            'Reset Password'
          )}
        </ButtonComponent>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        {onBackToLogin && (
          <button 
            onClick={onBackToLogin}
            className={`text-teal-600 hover:text-teal-700 text-sm ${
              isModal ? 'hover:underline transition-colors' : ''
            }`}
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
