import React, { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add user message
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      
      // Simulate AI response (you can replace this with actual AI integration)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "This is a simulated AI response. You can integrate real AI responses here.",
          sender: 'ai'
        }]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        Chat with AI Aesthetician
      </div>
      <div style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            style={{
              ...styles.message,
              ...styles[message.sender === 'user' ? 'userMessage' : 'aiMessage']
            }}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} style={styles.inputContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  chatContainer: {
    width: '300px',
    height: '600px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
    fontWeight: 'bold',
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px'
  },
  messagesContainer: {
    flex: 1,
    padding: '15px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  message: {
    padding: '10px 15px',
    borderRadius: '15px',
    maxWidth: '80%',
    wordWrap: 'break-word'
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    color: 'white'
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f0f0',
    color: 'black'
  },
  inputContainer: {
    display: 'flex',
    padding: '15px',
    borderTop: '1px solid #ccc',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  }
};

export default ChatBox;