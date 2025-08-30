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
    CREATE_TEST_TYPE: `${API_BASE_URL}/api/${VERSION}/labReport/report/addTestType`,
    GET_TEST_TYPES: `${API_BASE_URL}/api/${VERSION}/labReport/report/testTypes`,
    GET_TEST_TYPE_BY_ID: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/report/testType/${id}`,
    UPDATE_TEST_TYPE: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/template/test-types/${id}`,
    GET_SAMPLES: `${API_BASE_URL}/api/${VERSION}/labReport/workflow/lab/samples`,
    GET_SAMPLES_BY_ID: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${id}`,
    CREATE_SAMPLE: `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples`,
    UPDATE: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${id}`,
    PROCESS_REPORT: (sampleId) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${sampleId}/process-report`,
    GET_LAB_RESULTS: `${API_BASE_URL}/api/${VERSION}/labReport/workflow/lab/results`,
    GET_LAB_RESULT: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/results/${id}`,
    GET_LAB_RESULTS_FOR_SAMPLE: (sampleId) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/samples/${sampleId}/results`,
    EDIT_LAB_RESULT: (id) =>
      `${API_BASE_URL}/api/${VERSION}/labReport/workflow/results/${id}/edit`,
  },
};

export default API_ENDPOINTS;
