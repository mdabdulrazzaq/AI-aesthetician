const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
//const OpenAI = require("openai"); // Import OpenAI API

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//const openai = new OpenAI({ apiKey: "YOUR_OPENAI_API_KEY" });

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat-message", async (message) => {
    console.log(`User said: ${message}`);

    // Generate AI response
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: message }],
    // });

    const reply = response.choices[0].message.content;
    socket.emit("bot-reply", reply); // Send reply back to user
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
