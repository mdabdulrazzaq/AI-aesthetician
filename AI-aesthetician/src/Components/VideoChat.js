import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import AestheticianDetection from "./AestheticianDetection";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const VideoChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const myVideo = useRef();
  const streamRef = useRef();
  const recognition = useRef(new (window.SpeechRecognition || window.webkitSpeechRecognition)());

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        streamRef.current = stream;
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    socket.emit("chat-message", input);
    setInput("");
  };

  useEffect(() => {
    socket.on("bot-reply", (reply) => {
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    });

    return () => {
      socket.off("bot-reply");
    };
  }, []);

  const handleSpeechRecognition = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
      return;
    }
    recognition.current.start();
    setIsListening(true);

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessages([...messages, { text: transcript, sender: "user" }]);
      socket.emit("chat-message", transcript);
      setIsListening(false);
    };
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        
          <video rclassName="video-container" ef={myVideo} autoPlay playsInline muted />
          <AestheticianDetection videoRef={myVideo} user="Your" />
        
  
        <div className="chatbot">
          <div className="chatbox">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <button onClick={handleSpeechRecognition}>
              {isListening ? "🎤 Listening..." : "🎤 "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default VideoChat;
