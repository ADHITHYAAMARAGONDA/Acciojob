const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat"); // Import chat routes
const sessionRoutes = require("./routes/sessions"); // Import session routes

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration: allow requests from your frontend (adjust origin as needed)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://acciojob-nine.vercel.app", "https://*.vercel.app"]
        : "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
