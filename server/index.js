const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const OpenAI = require("openai"); // Import OpenAI API

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (update this for production)
    methods: ["GET", "POST"],
  },
});

// Initialize OpenAI
const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY" });

// Mock skin analysis function (replace with actual logic)
const analyzeSkin = (frame) => {
  // Replace this with actual skin analysis logic (e.g., using OpenCV, MediaPipe, or CLIP)
  return {
    wrinkles: "Moderate",
    pores: "Large",
    skinTexture: "Uneven",
  };
};

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle chat messages
  socket.on("chat-message", async (message) => {
    console.log(`User said: ${message}`);

    // Generate AI response using GPT-4
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      });

      const reply = response.choices[0].message.content;
      socket.emit("bot-reply", reply); // Send reply back to user
    } catch (error) {
      console.error("Error generating AI response:", error);
      socket.emit("bot-reply", "Sorry, I couldn't process your request.");
    }
  });

  // Handle frame analysis
  socket.on("analyze-frame", async (frame) => {
    console.log("Received frame for analysis");

    // Analyze the frame (mock function)
    const skinAnalysis = analyzeSkin(frame);

    // Generate a recommendation using GPT-4
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI Aesthetician. Recommend treatments based on the user's skin analysis.",
          },
          {
            role: "user",
            content: `My skin analysis results are: ${JSON.stringify(skinAnalysis)}. What treatments do you recommend?`,
          },
        ],
      });

      const recommendation = response.choices[0].message.content;

      // Send analysis results and recommendations back to the user
      socket.emit("analysis-results", {
        analysis: skinAnalysis,
        recommendation: recommendation,
      });
    } catch (error) {
      console.error("Error generating recommendation:", error);
      socket.emit("analysis-results", {
        analysis: skinAnalysis,
        recommendation: "Sorry, I couldn't generate a recommendation.",
      });
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
server.listen(8080, () => {
  console.log("Server running on port 8080");
});