// frontend/src/hooks/useSession.js
import { useState, useEffect, useCallback } from "react";
import { sessionService } from "../services/sessionService";
import useStore from "../store/useStore";

export const useSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    currentSessionId,
    setCurrentSessionId,
    setChatHistory,
    setGeneratedCode,
  } = useStore();

  // Fetch all sessions
  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await sessionService.getSessions();
      setSessions(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load a specific session
  const loadSession = useCallback(
    async (sessionId) => {
      setLoading(true);
      setError(null);

      try {
        const session = await sessionService.getSession(sessionId);
        setCurrentSessionId(sessionId);
        setChatHistory(session.chatHistory);
        setGeneratedCode(session.generatedCode);
        return session;
      } catch (err) {
        setError(err.message);
        console.error("Error loading session:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setCurrentSessionId, setChatHistory, setGeneratedCode]
  );

  // Create a new session
  const createSession = useCallback(
    async (title = "Untitled Session") => {
      setLoading(true);
      setError(null);

      try {
        const newSession = await sessionService.createSession(title);
        setSessions((prev) => [newSession, ...prev]);
        setCurrentSessionId(newSession._id);
        setChatHistory([]);
        setGeneratedCode({ jsx: "", css: "" });
        return newSession;
      } catch (err) {
        setError(err.message);
        console.error("Error creating session:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setCurrentSessionId, setChatHistory, setGeneratedCode]
  );

  // Delete a session
  const deleteSession = useCallback(
    async (sessionId) => {
      setError(null);

      try {
        await sessionService.deleteSession(sessionId);
        setSessions((prev) => prev.filter((s) => s._id !== sessionId));

        // If deleted session was current, clear current session
        if (currentSessionId === sessionId) {
          setCurrentSessionId(null);
          setChatHistory([]);
          setGeneratedCode({ jsx: "", css: "" });
        }
      } catch (err) {
        setError(err.message);
        console.error("Error deleting session:", err);
        throw err;
      }
    },
    [currentSessionId, setCurrentSessionId, setChatHistory, setGeneratedCode]
  );

  // Update session title
  const updateSessionTitle = useCallback(async (sessionId, title) => {
    setError(null);

    try {
      const updatedSession = await sessionService.updateSession(sessionId, {
        title,
      });
      setSessions((prev) =>
        prev.map((s) => (s._id === sessionId ? updatedSession : s))
      );
      return updatedSession;
    } catch (err) {
      setError(err.message);
      console.error("Error updating session title:", err);
      throw err;
    }
  }, []);

  // Initialize sessions on mount
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return {
    sessions,
    loading,
    error,
    currentSessionId,
    fetchSessions,
    loadSession,
    createSession,
    deleteSession,
    updateSessionTitle,
  };
};
