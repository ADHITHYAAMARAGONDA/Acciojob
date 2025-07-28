// frontend/src/services/sessionService.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const sessionService = {
  // Get all sessions for the current user
  async getSessions() {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sessions");
    }

    return response.json();
  },

  // Get a specific session by ID
  async getSession(sessionId) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch session");
    }

    return response.json();
  },

  // Create a new session
  async createSession(title = "Untitled Session") {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    return response.json();
  },

  // Update an existing session
  async updateSession(sessionId, data) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update session");
    }

    return response.json();
  },

  // Delete a session
  async deleteSession(sessionId) {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete session");
    }

    return response.json();
  },

  // Auto-save session data
  async autoSave(sessionId, chatHistory, generatedCode) {
    if (!sessionId) return;

    try {
      await this.updateSession(sessionId, {
        chatHistory,
        generatedCode,
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
      throw error;
    }
  },
};
