// frontend/src/utils/config.js
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://acciojob-i0xu.onrender.com/api";

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
