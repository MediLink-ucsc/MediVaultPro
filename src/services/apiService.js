import { API_ENDPOINTS } from "../config/api";

class ApiService {
  // Generic method for making API requests
  static async makeRequest(url, options = {}) {
    const token = localStorage.getItem("token");

    const defaultHeaders = {
      "Content-Type": "application/json",
    };

    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle common error cases
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return response;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Authentication methods
  static async login(credentials) {
    const response = await this.makeRequest(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async logout() {
    return this.makeRequest(API_ENDPOINTS.AUTH.LOGOUT, {
      method: "POST",
    });
  }

  // Patient methods
  static async getPatients() {
    const response = await this.makeRequest(API_ENDPOINTS.PATIENTS.GET_ALL);
    return response.json();
  }

  static async getPatientById(id) {
    const response = await this.makeRequest(
      API_ENDPOINTS.PATIENTS.GET_BY_ID(id)
    );
    return response.json();
  }

  static async createPatient(patientData) {
    const response = await this.makeRequest(API_ENDPOINTS.PATIENTS.CREATE, {
      method: "POST",
      body: JSON.stringify(patientData),
    });
    return response.json();
  }

  static async updatePatient(id, patientData) {
    const response = await this.makeRequest(API_ENDPOINTS.PATIENTS.UPDATE(id), {
      method: "PUT",
      body: JSON.stringify(patientData),
    });
    return response.json();
  }

  static async deletePatient(id) {
    return this.makeRequest(API_ENDPOINTS.PATIENTS.DELETE(id), {
      method: "DELETE",
    });
  }
}

export default ApiService;
