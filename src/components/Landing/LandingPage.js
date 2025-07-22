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
  UserPlus,
  Menu,
  X
} from 'lucide-react';
import MediLinkLogo from '../resources/MediLinkLogo.jpeg';
import AuthModal from '../Common/AuthModal';
import Auth from '../Auth/Auth';
import ForgotPassword from '../Auth/ForgotPassword';
import ResetPassword from '../Auth/ResetPassword';
import InstituteRegistration from './InstituteRegistration';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Modal navigation helpers
  const switchToForgotPassword = () => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(true);
  };
  
  const switchToResetPassword = (token) => {
    setIsForgotPasswordModalOpen(false);
    setResetToken(token);
    setIsResetPasswordModalOpen(true);
  };
  
  const switchBackToLogin = () => {
    setIsForgotPasswordModalOpen(false);
    setIsResetPasswordModalOpen(false);
    setResetToken(null);
    setIsLoginModalOpen(true);
  };
  
  const handlePasswordReset = (resetData) => {
    // In a real app, this would make an API call to reset the password
    console.log('Password reset with token:', resetData.token, 'New password:', resetData.newPassword);
    // Close reset modal and show login
    setIsResetPasswordModalOpen(false);
    setResetToken(null);
    setIsLoginModalOpen(true);
  };
  
  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsForgotPasswordModalOpen(false);
    setIsResetPasswordModalOpen(false);
    setResetToken(null);
  };
  
  // If showing registration, render the InstituteRegistration component
  if (showRegistration) {
    return (
      <InstituteRegistration 
        onBack={() => setShowRegistration(false)}
        onComplete={() => {
          setShowRegistration(false);
          // You can add additional logic here, like redirecting to a dashboard
        }}
      />
    );
  }
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Compliant",
      description: "HIPAA compliant with advanced encryption and security measures to protect patient data."
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
      color: "bg-teal-500"
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
      description: "Staff Registering, system oversight, and institutional administration.",
      color: "bg-teal-600" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-18">
            {/* Logo Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={() => {
                document.getElementById('hero-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg ring-2 ring-teal-100"
              >
                <img 
                  src={MediLinkLogo} 
                  alt="MediLink Logo" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex flex-col min-w-0">
                <motion.span 
                  whileHover={{ scale: 1.02 }}
                  className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-700 to-orange-600 bg-clip-text text-transparent truncate"
                >
                  MediVaultPro
                </motion.span>
                <span className="text-xs lg:text-sm text-gray-500 hidden sm:block font-medium">Powered by MediLink</span>
              </div>
            </motion.div>

            {/* Navigation Items - Hidden on mobile, shown on larger screens */}
            <motion.nav 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center space-x-8"
            >
              {[
                { name: 'Features', href: '#features' },
                { name: 'Solutions', href: '#solutions' },
                { name: 'Products', href: '#products' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  className="relative text-gray-700 hover:text-teal-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-600 to-orange-600 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.nav>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center space-x-2 sm:space-x-4"
            >
              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-all duration-200"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                whileHover={{ 
                  scale: 1.05,
                  y: -1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block relative text-gray-700 hover:text-teal-600 px-3 sm:px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl transition-all duration-200 text-sm sm:text-base lg:text-base font-medium group overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-teal-50 to-orange-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative">Sign In</span>
              </motion.button>
              
              <motion.button
                onClick={() => setShowRegistration(true)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 30px rgba(20, 184, 166, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-teal-600 to-teal-700 text-white px-4 sm:px-6 lg:px-8 py-2 lg:py-2.5 rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm sm:text-base lg:text-base font-semibold whitespace-nowrap overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center space-x-2">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Start</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <nav className="flex flex-col space-y-3">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Solutions', href: '#solutions' },
                { name: 'Products', href: '#products' }
              ].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0, 
                    x: isMobileMenuOpen ? 0 : -20 
                  }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-teal-600 py-2 px-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-50"
                >
                  {item.name}
                </motion.a>
              ))}
              
              {/* Mobile Sign In Button */}
              <motion.button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="sm:hidden text-left text-gray-700 hover:text-teal-600 py-2 px-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-gray-50"
              >
                Sign In
              </motion.button>
            </nav>
          </div>
        </motion.div>
        
        {/* Modern underline animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </header>

      {/* Hero Section */}
      <section id="hero-section" className="relative py-12 sm:py-16 lg:py-20 xl:py-32 pt-20 lg:pt-24 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-orange-50 z-0"></div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] xl:w-[40rem] xl:h-[40rem] bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="absolute top-0 right-0 w-72 h-72 sm:w-[28rem] sm:h-[28rem] lg:w-[36rem] lg:h-[36rem] xl:w-[44rem] xl:h-[44rem] bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-35 animate-pulse-slow transform translate-x-1/3 -translate-y-1/3" style={{animationDelay: '2s'}}></div>
          
          <div className="absolute bottom-0 left-0 w-80 h-80 sm:w-[30rem] sm:h-[30rem] lg:w-[38rem] lg:h-[38rem] xl:w-[46rem] xl:h-[46rem] bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse-slow transform -translate-x-1/4 translate-y-1/4" style={{animationDelay: '4s'}}></div>
          
          <div className="absolute top-1/2 left-1/2 w-56 h-56 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] bg-gradient-to-r from-teal-100 to-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '6s'}}></div>
          
          <div className="absolute bottom-0 right-0 w-68 h-68 sm:w-[26rem] sm:h-[26rem] lg:w-[34rem] lg:h-[34rem] xl:w-[42rem] xl:h-[42rem] bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-28 animate-pulse-slow transform translate-x-1/3 translate-y-1/3" style={{animationDelay: '1s'}}></div>
          
          <div className="absolute top-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-gentle" style={{animationDelay: '3s'}}></div>
          
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float-gentle" style={{animationDelay: '5s'}}></div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
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
              className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6 max-w-3xl mx-auto px-4"
            >
              Powered by MediLink - Register your clinic or lab to join our integrated healthcare platform
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto px-4"
            >
              MediVaultPro for healthcare facilities • HealthTracker for patients • Seamless integration
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.button
                onClick={() => setShowRegistration(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base sm:text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span className="whitespace-nowrap">Register Your Institution</span>
              </motion.button>
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 text-base sm:text-lg font-semibold backdrop-blur-sm"
              >
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-white relative overflow-hidden">
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
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediLink Ecosystem?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Seamlessly connecting healthcare providers and patients with cutting-edge technology for better care coordination.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-teal-600 mb-4 group-hover:scale-105 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Solutions */}
      <section id="solutions" className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-teal-50 relative overflow-hidden">
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
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              MediLink Connected Solutions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Two powerful platforms working together to serve the entire healthcare ecosystem
            </p>
          </motion.div>
          
          {/* MediVaultPro Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16"
          >
            <div className="text-center mb-6 sm:mb-8">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-xl sm:text-2xl font-bold text-teal-600 mb-2"
              >
                MediVaultPro
              </motion.h3>
              <p className="text-gray-600">For Clinics & Labs</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
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
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <motion.div 
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${role.color} rounded-lg flex items-center justify-center text-white mb-4`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {role.icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
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
            className="bg-gradient-to-r from-white to-orange-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-100"
          >
            <div className="text-center mb-6 sm:mb-8">
              <motion.h3 
                whileHover={{ scale: 1.05 }}
                className="text-xl sm:text-2xl font-bold text-orange-600 mb-2"
              >
                HealthTracker
              </motion.h3>
              <p className="text-gray-600">For Patients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 1.2 }}
                >
                  <Activity className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Health Monitoring</h4>
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
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <motion.div 
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 1.2 }}
                >
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                </motion.div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Medical Records</h4>
                <p className="text-gray-600 text-sm">Access your complete medical history, test results, and treatment plans anytime</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 sm:py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Product Suite
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Comprehensive healthcare solutions designed for modern medical facilities and patient care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* MediVaultPro Product Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-white p-6 sm:p-8 rounded-2xl shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white mr-4"
                >
                  <Building className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-teal-700">MediVaultPro</h3>
                  <p className="text-teal-600">For Healthcare Facilities</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Complete healthcare management system for clinics, hospitals, and laboratories with advanced features for patient care, staff management, and operational efficiency.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Electronic Health Records (EHR)',
                  'Patient Management System',
                  'Lab Integration & Results',
                  'Staff Registering',
                  'Comprehensive Reporting',
                  'HIPAA Compliant Security'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRegistration(true)}
                className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Start Free Trial
              </motion.button>
            </motion.div>

            {/* HealthTracker Product Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-white p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white mr-4"
                >
                  <Activity className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-700">HealthTracker</h3>
                  <p className="text-orange-600">For Patients</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Personal health management app that connects patients with their healthcare providers, enabling better health monitoring and care coordination.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Personal Health Dashboard',
                  'Vital Signs Tracking',
                  'Medication Reminders',
                  'Test Results Access',
                  'Health Goal Setting',
                  'Provider Communication',
                  'Emergency Health Info'
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Download App
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-teal-600 to-orange-600 relative overflow-hidden">
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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
            >
              Ready to Transform Your Healthcare Facility?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg sm:text-xl text-teal-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
            >
              Register your clinic or laboratory today and join thousands of healthcare professionals who trust MediLink for comprehensive healthcare management.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <motion.button
                onClick={() => setShowRegistration(true)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white text-teal-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-base sm:text-lg font-semibold"
              >
                <UserPlus className="w-5 h-5" />
                <span className="whitespace-nowrap">Register Institution</span>
              </motion.button>
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-teal-600 transition-all duration-200 flex items-center justify-center space-x-2 text-base sm:text-lg font-semibold backdrop-blur-sm"
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
      <footer className="bg-gray-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
            {/* Company Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden flex-shrink-0"
                >
                  <img 
                    src={MediLinkLogo} 
                    alt="MediLink Logo" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xl sm:text-2xl font-bold">MediLink</span>
                  <span className="text-xs sm:text-sm text-gray-400">Healthcare Ecosystem</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
                Connecting healthcare providers and patients through innovative technology. 
                MediVaultPro for clinics & labs, HealthTracker for patients - one seamless ecosystem.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold">f</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold">t</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold">in</span>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold">@</span>
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
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Our Products</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">MediVaultPro</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">HealthTracker</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Integration APIs</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Enterprise Solutions</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">White Label</motion.a></li>
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Help Center</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Documentation</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">API Reference</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Contact Us</motion.a></li>
                <li><motion.a whileHover={{ x: 4 }} href="#" className="text-gray-300 hover:text-teal-400 transition-colors inline-block text-sm sm:text-base">Training</motion.a></li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-gray-800 pt-6 sm:pt-8"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-xs sm:text-sm text-center lg:text-left">
                © 2025 MediLink. All rights reserved. | Comprehensive Healthcare Ecosystem
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">Privacy Policy</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">Terms of Service</motion.a>
                <motion.a whileHover={{ y: -2 }} href="#" className="text-gray-400 hover:text-teal-400 transition-colors whitespace-nowrap">HIPAA Compliance</motion.a>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap"
                >
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
                  <span className="text-gray-400">SOC 2 Certified</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Auth Modal - Login */}
      <AuthModal 
        isOpen={isLoginModalOpen} 
        onClose={closeAllModals}
        maxWidth="max-w-lg"
      >
        <Auth 
          context="modal"
          onLogin={onLogin}
          onSwitchToForgotPassword={switchToForgotPassword}
          onSwitchToRegistration={() => {
            closeAllModals();
            setShowRegistration(true);
          }}
        />
      </AuthModal>

      {/* Forgot Password Modal */}
      <AuthModal 
        isOpen={isForgotPasswordModalOpen} 
        onClose={closeAllModals}
        maxWidth="max-w-lg"
      >
        <ForgotPassword 
          context="modal"
          onBackToLogin={switchBackToLogin}
          onResetPassword={switchToResetPassword}
        />
      </AuthModal>

      {/* Reset Password Modal */}
      <AuthModal 
        isOpen={isResetPasswordModalOpen} 
        onClose={closeAllModals}
        maxWidth="max-w-lg"
      >
        <ResetPassword 
          context="modal"
          token={resetToken}
          onPasswordReset={handlePasswordReset}
          onBackToLogin={switchBackToLogin}
        />
      </AuthModal>
    </div>
  );
};

export default LandingPage;
