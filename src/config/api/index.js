const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/medvaultpro/login`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/medvaultpro/logout`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/medvaultpro/register`,
  },
  PATIENTS: {
    GET_ALL: `${API_BASE_URL}/api/v1/patients`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/v1/patients/${id}`,
    CREATE: `${API_BASE_URL}/api/v1/patients`,
    UPDATE: (id) => `${API_BASE_URL}/api/v1/patients/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/v1/patients/${id}`,
  },
};

export default API_ENDPOINTS;
