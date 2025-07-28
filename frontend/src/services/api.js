// src/services/api.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://acciojob-i0xu.onrender.com/api";

export async function registerUser(userData) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  return data;
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const data = await res.json();
  return data;
}

export async function getUserProfile(token) {
  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
