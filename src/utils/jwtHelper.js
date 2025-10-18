// Utility functions for JWT token handling

/**
 * Decode JWT token and extract payload
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const decodeToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    // Decode JWT token (split and parse the payload)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Get hospital/clinic ID from JWT token
 * @returns {number|null} Hospital ID or null if not found
 */
export const getHospitalIdFromToken = () => {
  try {
    const decoded = decodeToken();
    if (!decoded) return null;

    // Check for different possible field names
    return (
      decoded.hospitalId ||
      decoded.hospital_id ||
      decoded.clinicId ||
      decoded.clinic_id ||
      null
    );
  } catch (error) {
    console.error("Error extracting hospital ID from token:", error);
    return null;
  }
};

/**
 * Get user ID from JWT token
 * @returns {number|null} User ID or null if not found
 */
export const getUserIdFromToken = () => {
  try {
    const decoded = decodeToken();
    if (!decoded) return null;

    return decoded.userId || decoded.user_id || decoded.id || null;
  } catch (error) {
    console.error("Error extracting user ID from token:", error);
    return null;
  }
};

/**
 * Get user role from JWT token
 * @returns {string|null} User role or null if not found
 */
export const getUserRoleFromToken = () => {
  try {
    const decoded = decodeToken();
    if (!decoded) return null;

    return decoded.role || decoded.userRole || null;
  } catch (error) {
    console.error("Error extracting user role from token:", error);
    return null;
  }
};

/**
 * Check if token is expired
 * @returns {boolean} True if token is expired or invalid
 */
export const isTokenExpired = () => {
  try {
    const decoded = decodeToken();
    if (!decoded || !decoded.exp) return true;

    // Check if token expiration time (in seconds) is less than current time
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};
