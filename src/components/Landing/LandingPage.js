import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Users, 
  FileText, 
  Clock, 
  ArrowRight,
  Building,
  Stethoscope,
  FlaskConical,
  UserPlus
} from 'lucide-react';

const LandingPage = ({ onSwitchToLogin, onSwitchToSignup }) => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Compliant",
      description: "HIPAA compliant with advanced encryption and security measures to protect patient data."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Monitor patient vitals and health metrics in real-time with instant alerts."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Role Access",
      description: "Designed for doctors, nurses, lab technicians, and administrators with role-based permissions."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Digital Records",
      description: "Complete electronic health records with easy access and comprehensive documentation."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Appointment Management",
      description: "Efficient scheduling and appointment management system for better patient care."
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: "Lab Integration",
      description: "Seamless integration with laboratory systems for test results and diagnostics."
    }
  ];

  const roleCards = [
    {
      icon: <Stethoscope className="w-12 h-12" />,
      title: "Doctors",
      description: "Comprehensive patient management, diagnostics, and treatment planning tools.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Nurses",
      description: "Patient care coordination, vital signs monitoring, and medication management.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Lab Technicians",
      description: "Sample processing, test result management, and quality control systems.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Administrators",
      description: "Staff management, system oversight, and institutional administration.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MediVaultPro
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onSwitchToLogin}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onSwitchToSignup}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Next-Generation
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Healthcare Management
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
            >
              Streamline your healthcare operations with our comprehensive platform designed for 
              medical professionals, lab technicians, and healthcare administrators.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={onSwitchToSignup}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span>Start Free Trial</span>
              </button>
              <button
                onClick={onSwitchToLogin}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 text-lg font-semibold"
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediVaultPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform offers cutting-edge features designed to enhance healthcare delivery and operational efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Solutions */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Every Healthcare Professional
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored features and workflows designed specifically for different healthcare roles.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleCards.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {role.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {role.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Practice?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who trust MediVaultPro for their daily operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onSwitchToSignup}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </button>
              <button
                onClick={onSwitchToLogin}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center space-x-2 text-lg font-semibold"
              >
                <span>Sign In Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">MediVaultPro</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 MediVaultPro. All rights reserved. | Secure Healthcare Management Solutions
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
