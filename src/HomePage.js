import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import './App.css'; // Include your styles if needed

function HomePage() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/dynamic-page');
  };

  return (
    <div className="home-page">
      <Navbar /> {/* Use the Navbar component here */}
      <main className="main-content">
        <section className="intro">
          <h1>Introducing PixPrompt</h1>
          <p>Our text-to-image generation tool powered by advanced GAN Models.</p>
          <div className="buttons">
            <button className="btn-try" onClick={handleRedirect}>
              Try PixPrompt
            </button>
            <button className="btn-learn">Learn about PixPrompt</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
