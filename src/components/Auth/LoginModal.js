import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';

const LoginModal = ({ onLogin, onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'doctor'
  });

  const handleSubmit = (e) => {
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

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
          <img 
            src={MediLinkLogo} 
            alt="MediLink Logo" 
            className="w-12 h-12 object-contain rounded-full"
          />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
          MediVaultPro
        </h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            value={credentials.role}
            onChange={(e) => setCredentials({...credentials, role: e.target.value})}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="lab">Lab Operator</option>
            <option value="systemadmin">System Admin</option>
          </select>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 rounded-lg hover:from-teal-700 hover:to-teal-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
        >
          Sign In
        </motion.button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <button 
          onClick={onSwitchToForgotPassword}
          className="text-teal-600 hover:text-teal-700 text-sm block mx-auto hover:underline transition-colors"
        >
          Forgot your password?
        </button>
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignup}
            className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
