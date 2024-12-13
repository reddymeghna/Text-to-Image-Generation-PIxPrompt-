import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>ChatGPT Dashboard</h2>
      <ul>
        <li>New Chat</li>
        <li>Recent Chats</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
