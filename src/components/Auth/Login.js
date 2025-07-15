import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { User, Lock, Stethoscope } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import ApiService from "../../services/apiService";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "DOCTOR",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

      // Navigate based on role (use normalized roles to match your App)
      if (normalizedRole === "doctor") {
        navigate("/doctor");
      } else if (normalizedRole === "lab") {
        navigate("/lab");
      } else if (normalizedRole === "nurse") {
        navigate("/nurse");
      } else if (normalizedRole === "systemadmin") {
        navigate("/admin"); // add admin route in App if needed
      } else {
        setError("Unknown role");
      }
    } catch (err) {
      setError(err.message);
    }
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
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
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
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={credentials.role}
              onChange={(e) => setCredentials({...credentials, role: e.target.value})}
            >
              <option value="DOCTOR">Doctor</option>
              <option value="LAB_ASSISTANT">Lab Operator</option>
              <option value="MEDICAL_STAFF">Nurse</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div> */}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-200 font-medium"
          >
            Sign In
          </button>

          {error && (
            <p className="text-red-600 text-center text-sm mt-2">{error}</p>
          )}
        </form>

        <div className="mt-6 text-center">
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
