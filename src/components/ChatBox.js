import React, { useState } from 'react';
import './ChatBox.css';

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setResponses([...responses, { user: message, ai: 'This is a response from ChatGPT.' }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {responses.map((chat, index) => (
          <div key={index} className="chat-message">
            <p><strong>You:</strong> {chat.user}</p>
            <p><strong>ChatGPT:</strong> {chat.ai}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
