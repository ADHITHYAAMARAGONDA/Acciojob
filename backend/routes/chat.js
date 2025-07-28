// backend/routes/chat.js
const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "Message is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      res.status(error.response.status).json({
        response: `OpenAI API error: ${JSON.stringify(error.response.data)}`,
      });
    } else {
      console.error("Message:", error.message);
      res.status(500).json({ response: `Server error: ${error.message}` });
    }
  }
});

module.exports = router;
