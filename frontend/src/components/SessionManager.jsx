// frontend/src/components/SessionManager.jsx
import { useState, useEffect } from "react";
import useStore from "../store/useStore";

function SessionManager() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState("");

  const {
    setCurrentSessionId,
    setChatHistory,
    setGeneratedCode,
    currentSessionId,
  } = useStore();

  const token = localStorage.getItem("token");

  // Fetch user sessions
  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://acciojob-i0xu.onrender.com/api/sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load a specific session
  const loadSession = async (sessionId) => {
    try {
      const response = await fetch(
        `https://acciojob-i0xu.onrender.com/api/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const session = await response.json();

      setCurrentSessionId(sessionId);
      setChatHistory(session.chatHistory);
      setGeneratedCode(session.generatedCode);
    } catch (error) {
      console.error("Error loading session:", error);
    }
  };

  // Create a new session
  const createSession = async () => {
    try {
      const response = await fetch(
        "https://acciojob-i0xu.onrender.com/api/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: newSessionTitle || "Untitled Session",
          }),
        }
      );
      const newSession = await response.json();

      setSessions([newSession, ...sessions]);
      setCurrentSessionId(newSession._id);
      setChatHistory([]);
      setGeneratedCode({ jsx: "", css: "" });
      setShowCreateModal(false);
      setNewSessionTitle("");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // Delete a session
  const deleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;

    try {
      await fetch(
        `https://acciojob-i0xu.onrender.com/api/sessions/${sessionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions(sessions.filter((s) => s._id !== sessionId));
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setChatHistory([]);
        setGeneratedCode({ jsx: "", css: "" });
      }
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>Sessions</h3>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          New Session
        </button>
      </div>

      {loading ? (
        <p>Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p>No sessions found. Create your first session!</p>
      ) : (
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {sessions.map((session) => (
            <div
              key={session._id}
              style={{
                padding: "10px",
                border: "1px solid #ddd",
                marginBottom: "10px",
                borderRadius: "4px",
                backgroundColor:
                  currentSessionId === session._id ? "#f0f8ff" : "white",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div onClick={() => loadSession(session._id)}>
                  <h4 style={{ margin: "0 0 5px 0" }}>{session.title}</h4>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
                    Last modified:{" "}
                    {new Date(session.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteSession(session._id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Session Modal */}
      {showCreateModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Create New Session</h3>
            <input
              type="text"
              placeholder="Session title"
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={createSession}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionManager;
