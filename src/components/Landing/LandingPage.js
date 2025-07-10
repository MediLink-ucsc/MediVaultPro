import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Users, 
  FileText, 
  ArrowRight,
  Building,
  Stethoscope,
  FlaskConical,
  UserPlus
} from 'lucide-react';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';
import AuthModal from '../Common/AuthModal';
import Auth from '../Auth/Auth';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
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
      color: "bg-teal-600"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Nurses",
      description: "Patient care coordination, vital signs monitoring, and medication management.",
      color: "bg-orange-500"
    },
    {
      icon: <FlaskConical className="w-12 h-12" />,
      title: "Lab Technicians",
      description: "Sample processing, test result management, and quality control systems.",
      color: "bg-teal-500"
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Administrators",
      description: "Staff management, system oversight, and institutional administration.",
      color: "bg-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img 
                  src={MediLinkLogo} 
                  alt="MediLink Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                  MediVaultPro
                </span>
                <span className="text-xs text-gray-500">Powered by MediLink</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-orange-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Complete Healthcare
              <span className="block bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent">
                Management Ecosystem
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto"
            >
              Powered by MediLink - Connect clinics, labs, and patients with our integrated platform
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto"
            >
              MediVaultPro for healthcare professionals • HealthTracker for patients
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => setIsSignupModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span>Start Free Trial</span>
              </motion.button>
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 text-lg font-semibold backdrop-blur-sm"
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediLink Ecosystem?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Seamlessly connecting healthcare providers and patients with cutting-edge technology for better care coordination.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-teal-600 mb-4 group-hover:scale-105 transition-transform duration-200">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-teal-200 rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full opacity-20 animate-pulse-slow" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-300 rounded-full opacity-15 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              MediLink Connected Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Two powerful platforms working together to serve the entire healthcare ecosystem
            </p>
          </motion.div>
          
          {/* MediVaultPro Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-teal-600 mb-2"
              >
                MediVaultPro
              </motion.h3>
              <p className="text-gray-600">For Clinics & Labs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roleCards.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <motion.div 
                    className={`w-16 h-16 ${role.color} rounded-lg flex items-center justify-center text-white mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {role.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* HealthTracker Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white to-orange-50 rounded-2xl p-8 shadow-xl border border-orange-100"
          >
            <div className="text-center mb-8">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold text-orange-600 mb-2"
              >
                HealthTracker
              </motion.h3>
              <p className="text-gray-600">For Patients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <motion.div 
                  className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 1.2 }}
                >
                  <Activity className="w-8 h-8" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Health Monitoring</h4>
                <p className="text-gray-600 text-sm">Track vitals, symptoms, and health metrics with real-time sync to your healthcare providers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <motion.div 
                  className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 1.2 }}
                >
                  <FileText className="w-8 h-8" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h4>
                <p className="text-gray-600 text-sm">Access your complete medical history, test results, and treatment plans anytime</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-orange-600 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Ready to Join the MediLink Ecosystem?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of healthcare professionals and patients who trust MediLink for comprehensive healthcare management.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => setIsSignupModalOpen(true)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span>Create Account</span>
              </motion.button>
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-200 flex items-center space-x-2 text-lg font-semibold backdrop-blur-sm"
              >
                <span>Sign In Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-lg overflow-hidden"
                >
                  <img 
                    src={MediLinkLogo} 
                    alt="MediLink Logo" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">MediLink</span>
                  <span className="text-sm text-gray-400">Healthcare Ecosystem</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting healthcare providers and patients through innovative technology. 
                MediVaultPro for clinics & labs, HealthTracker for patients - one seamless ecosystem.
              </p>
              <div className="flex space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-sm font-bold">f</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-sm font-bold">t</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-sm font-bold">in</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-sm font-bold">@</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Our Products</h3>
              <ul className="space-y-3">
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">MediVaultPro</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">HealthTracker</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Integration APIs</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Enterprise Solutions</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">White Label</motion.a></li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
              <ul className="space-y-3">
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Help Center</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Documentation</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">API Reference</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Contact Us</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block">Training</motion.a></li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 MediLink. All rights reserved. | Comprehensive Healthcare Ecosystem
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy Policy</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Terms of Service</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors">HIPAA Compliance</motion.a>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span className="text-gray-400">SOC 2 Certified</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Auth Modal - handles both login and signup */}
      <AuthModal 
        isOpen={isLoginModalOpen || isSignupModalOpen} 
        onClose={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(false);
        }}
        maxWidth="max-w-lg"
      >
        <Auth 
          context="modal"
          onLogin={onLogin}
          onSignup={onSignup}
          onSwitchToForgotPassword={() => {
            setIsLoginModalOpen(false);
            setIsSignupModalOpen(false);
            // You can add forgot password modal here
          }}
        />
      </AuthModal>
    </div>
  );
};

export default LandingPage;
