// frontend/src/services/chatService.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const chatService = {
  // Send a message to the AI and get response
  async sendMessage(message, sessionId = null) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.response || "Failed to send message");
    }

    return response.json();
  },

  // Stream chat response (for future implementation)
  async streamMessage(message, sessionId = null, onChunk) {
    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, sessionId }),
    });

    if (!response.ok) {
      throw new Error("Failed to stream message");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  },
};
