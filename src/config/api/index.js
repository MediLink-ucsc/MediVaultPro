const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const VERSION = "v1";

export const API_ENDPOINTS = {
  BASE_URL: API_BASE_URL,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/${VERSION}/auth/medvaultpro/login`,
    LOGOUT: `${API_BASE_URL}/api/${VERSION}/auth/medvaultpro/logout`,
    REGISTER: `${API_BASE_URL}/api/${VERSION}/auth/medvaultpro/register`,
  },
  PATIENTS: {
    GET_ALL: `${API_BASE_URL}/api/${VERSION}/patients`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/${VERSION}/patients/${id}`,
    CREATE: `${API_BASE_URL}/api/${VERSION}/patients`,
    UPDATE: (id) => `${API_BASE_URL}/api/${VERSION}/patients/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/${VERSION}/patients/${id}`,
  },
  LAB_REPORT: {
    GET_TEST_TYPES: `${API_BASE_URL}/api/${VERSION}/labReport/report/testTypes`,
    GET_TEST_TYPE_BY_ID: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/report/testType/${id}`,
    CREATE_TEST_TYPE: `${API_BASE_URL}/api/${VERSION}/labReport/report/addTestType`,
    UPDATE_TEST_TYPE: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/template/test-types/${id}`,
    DELETE_TEST_TYPE: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/template/test-types/${id}`,
    GET_SAMPLES: `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples`,
    GET_SAMPLES_BY_ID: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${id}`,
    CREATE_SAMPLE: `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples`,
    UPDATE: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${id}`,
    PROCESS_REPORT: (sampleId) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${sampleId}/process-report`,
  },
};

export default API_ENDPOINTS;
