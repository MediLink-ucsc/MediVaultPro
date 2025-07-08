import React, { useState } from 'react';
import { User, Lock, Stethoscope } from 'lucide-react';

const Login = ({ onLogin, onSwitchToSignup, onSwitchToForgotPassword }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MedivaultPro</h1>
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={credentials.role}
              onChange={(e) => setCredentials({...credentials, role: e.target.value})}
            >
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="lab">Lab Operator</option>
              <option value="systemadmin">System Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-200 font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button 
            onClick={onSwitchToForgotPassword}
            className="text-teal-600 hover:text-teal-700 text-sm block mx-auto"
          >
            Forgot your password?
          </button>
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;