import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import your CSS file
import botAvatar from './chat-bot.png'; // Import bot avatar image
import userAvatar from './user.png'; // Import user avatar image

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    try {
      // Add user message to chat history
      const userMessage = { sender: 'user', message: userInput };
      setChatHistory(prevChatHistory => [...prevChatHistory, userMessage]);
      setUserInput('');

      // Call backend to get chatbot response
      const response = await axios.post('http://localhost:5000/bot', { message: userInput });
      const botResponse = response.data.response;

      // Add bot response to chat history
      const botMessage = { sender: 'bot', message: botResponse };
      setChatHistory(prevChatHistory => [...prevChatHistory, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {/* Render chat history */}
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <img src={message.sender === 'user' ? userAvatar : botAvatar} alt={`${message.sender} Avatar`} className="avatar" />
            <div className="message-content">
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        {/* Input box and send button */}
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="input-box"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default App;
