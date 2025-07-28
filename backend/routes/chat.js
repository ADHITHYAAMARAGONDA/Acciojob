// backend/routes/chat.js
const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { protect } = require("../middlewares/authMiddleware");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Rate limiting: 5 requests per minute per user
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each user to 5 requests per windowMs
  message: "Too many chat requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", protect, chatLimiter, async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    return res.status(400).json({ response: "Message is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Enhanced prompt for component generation
    const enhancedPrompt = `You are a React component generator. Generate a React component based on this request: "${message}"

IMPORTANT: Respond with ONLY raw JSON, no markdown formatting, no code blocks.

Use this exact JSON format:
{
  "jsx": "the JSX code here",
  "css": "the CSS code here", 
  "explanation": "brief explanation of what was generated"
}

Make sure the JSX is valid React code and the CSS is properly formatted. Do not wrap the response in markdown code blocks.`;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("Raw AI response:", text);

    // Try to parse JSON response
    let parsedResponse;
    try {
      // First, try to extract JSON from markdown code blocks
      let jsonText = text;
      const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1];
        console.log("Extracted JSON from code block:", jsonText);
      }

      parsedResponse = JSON.parse(jsonText);
      console.log("Successfully parsed JSON:", parsedResponse);
    } catch (parseError) {
      console.log("Failed to parse JSON, using raw text:", text);
      // If JSON parsing fails, return the raw text
      parsedResponse = {
        jsx: "",
        css: "",
        explanation: text,
      };
    }

    res.json({
      response: parsedResponse.explanation || text,
      generatedCode: {
        jsx: parsedResponse.jsx || "",
        css: parsedResponse.css || "",
      },
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    // Handle rate limit errors specifically
    if (error.status === 429) {
      return res.status(429).json({
        response:
          "Rate limit exceeded. Please wait a moment before trying again.",
      });
    }

    res.status(500).json({ response: `Server error: ${error.message}` });
  }
});

module.exports = router;
