import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { User, Lock, Stethoscope } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    email: "",
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
      const res = await fetch(
        "http://localhost:3000/api/v1/auth/medvaultpro/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      console.log("Login successful:", data);

      const decodedToken = jwtDecode(data.token);
      console.log("Decoded token:", decodedToken);

      // Save token
      localStorage.setItem("token", data.token);

      const userInfo = {
        token: data.token,
        role: decodedToken.role,
        email: decodedToken.email,
        id: decodedToken.id,
      };

      // Also save user info to localStorage
      localStorage.setItem("medivaultpro_user", JSON.stringify(userInfo));

      // Notify App about logged-in user
      onLogin(userInfo);

      // Navigate based on role (use lowercase roles to match your App)
      if (userInfo.role === "DOCTOR") {
        navigate("/doctor");
      } else if (userInfo.role === "LAB_ASSISTANT") {
        navigate("/lab");
      } else if (
        userInfo.role === "MEDICAL_STAFF" ||
        userInfo.role === "NURSE"
      ) {
        navigate("/nurse");
      } else if (userInfo.role === "ADMIN") {
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
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
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
