// backend/controllers/sessionController.js
const Session = require("../models/Session");

// Get all sessions for a user
const getUserSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user.id })
      .select("title lastModified createdAt")
      .sort({ lastModified: -1 });

    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific session with full data
const getSession = async (req, res) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new session
const createSession = async (req, res) => {
  try {
    const { title } = req.body;

    const session = await Session.create({
      userId: req.user.id,
      title: title || "Untitled Session",
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update session (chat history and code)
const updateSession = async (req, res) => {
  try {
    const { chatHistory, generatedCode, title } = req.body;

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        chatHistory,
        generatedCode,
        title,
        lastModified: Date.now(),
      },
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getUserSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
};
