import React, { useState } from "react";
import { User, Lock, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import MediLinkLogo from "../resources/MediLinkLogo.jpeg";
import { jwtDecode } from "jwt-decode";
import ApiService from "../../services/apiService";

const AuthForm = ({
  mode = "login", // Only login mode supported now
  context = "page", // 'page' or 'modal'
  onLogin,
  onSwitchToForgotPassword,
  onBackToLanding,
  onSwitchToRegistration,
}) => {
  const isModal = context === "modal";

  // Login state
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "doctor",
  });
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log(credentials);

      const data = await ApiService.login(credentials);
      console.log("Login successful:", data);

      const decodedToken = jwtDecode(data.token);
      console.log("Decoded token:", decodedToken);

      // Save token
      localStorage.setItem("token", data.token);

      // Normalize role to match App.js expectations
      let normalizedRole;
      switch (decodedToken.role) {
        case "DOCTOR":
          normalizedRole = "doctor";
          break;
        case "LAB_ASSISTANT":
          normalizedRole = "lab";
          break;
        case "MEDICAL_STAFF":
        case "NURSE":
          normalizedRole = "nurse";
          break;
        case "ADMIN":
          normalizedRole = "systemadmin";
          break;
        default:
          normalizedRole = "doctor"; // fallback
      }

      const userInfo = {
        token: data.token,
        role: normalizedRole,
        email: decodedToken.email,
        id: decodedToken.id,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
      };

      // Also save user info to localStorage
      localStorage.setItem("medivaultpro_user", JSON.stringify(userInfo));

      // Notify App about logged-in user
      onLogin(userInfo);

      // Navigation will be handled by the parent component
    } catch (err) {
      setError(err.message);
    }
  };

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   // Mock login with all required fields
  //   onLogin({
  //     id: 1,
  //     name: credentials.role === 'doctor' ? 'Dr.Dulmini Chathubhashini' :
  //           credentials.role === 'nurse' ? 'Nurse Likitha' :
  //           credentials.role === 'systemadmin' ? 'System Admin' : 'Lab Operator',
  //     email: credentials.email || 'demo@medivaultpro.com',
  //     role: credentials.role
  //   });
  // };

  const handleInputChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
  };

  const ButtonComponent = isModal ? motion.button : "button";
  const buttonProps = isModal
    ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      }
    : {};

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
        <div
          className={`mx-auto w-16 h-16 ${
            isModal
              ? "bg-gradient-to-br from-teal-500 to-orange-500"
              : "bg-white"
          } rounded-full flex items-center justify-center mb-4 shadow-lg`}
        >
          <img
            src={MediLinkLogo}
            alt="MediLink Logo"
            className={`w-12 h-12 object-contain ${
              isModal ? "rounded-full" : ""
            }`}
          />
        </div>
        <h1
          className={`text-2xl font-bold ${
            isModal
              ? "bg-gradient-to-r from-teal-600 to-orange-600 bg-clip-text text-transparent"
              : "text-gray-800"
          }`}
        >
          {isModal ? "MediVaultPro" : "MedivaultPro"}
        </h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              required
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                isModal ? "transition-all" : ""
              }`}
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              required
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                isModal ? "transition-all" : ""
              }`}
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
        </div>

        {/* Role Selection */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none ${
                isModal ? 'transition-all' : ''
              }`}
              value={credentials.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            >
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="lab">Lab Technician</option>
              <option value="systemadmin">System Administrator</option>
            </select>
          </div>
        </div> */}

        {/* Submit Button */}
        <ButtonComponent
          type="submit"
          className={`w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg ${
            isModal
              ? "hover:shadow-xl transform transition-all duration-200"
              : "hover:from-teal-700 hover:to-teal-800 transition-colors"
          }`}
          {...buttonProps}
        >
          Sign In
        </ButtonComponent>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center text-sm mt-2">{error}</p>
        )}
      </form>

      {/* Footer Links */}
      <div className="mt-6 text-center space-y-3">
        {onSwitchToForgotPassword && (
          <button
            onClick={onSwitchToForgotPassword}
            className={`text-teal-600 hover:text-teal-700 text-sm block mx-auto ${
              isModal ? "hover:underline transition-colors" : ""
            }`}
          >
            Forgot your password?
          </button>
        )}

        {onSwitchToRegistration && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-3">New to MediVaultPro?</p>
            <button
              onClick={onSwitchToRegistration}
              className={`font-medium ${
                isModal
                  ? "text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                  : "text-orange-600 hover:text-orange-700"
              }`}
            >
              Register Your Institution
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Join the MediLink ecosystem and get access for your healthcare
              facility
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
