// backend/models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Untitled Session",
    },
    chatHistory: [
      {
        sender: {
          type: String,
          enum: ["user", "ai"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    generatedCode: {
      jsx: {
        type: String,
        default: "",
      },
      css: {
        type: String,
        default: "",
      },
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
