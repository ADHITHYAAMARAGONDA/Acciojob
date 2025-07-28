// backend/routes/sessions.js
const express = require("express");
const router = express.Router();
const {
  getUserSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
} = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

// All routes are protected
router.use(protect);

// Get all sessions for the user
router.get("/", getUserSessions);

// Get a specific session
router.get("/:id", getSession);

// Create a new session
router.post("/", createSession);

// Update a session
router.put("/:id", updateSession);

// Delete a session
router.delete("/:id", deleteSession);

module.exports = router;
