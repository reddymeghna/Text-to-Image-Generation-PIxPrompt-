import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Include styles specific to the Navbar if needed

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Clickable logo redirects to the home page */}
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        PixPrompt
      </div>
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
