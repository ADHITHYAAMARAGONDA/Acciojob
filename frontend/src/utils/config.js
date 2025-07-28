// frontend/src/utils/config.js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
