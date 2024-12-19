import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Include styles specific to the Navbar if needed

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">PixPrompt</div>
      <div className="nav-links">
        <Link to="/about" className="nav-link">
          About Us
        </Link>
        <Link to="/overview" className="nav-link">
          Overview
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
