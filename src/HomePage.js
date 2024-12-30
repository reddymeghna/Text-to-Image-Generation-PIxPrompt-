import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css'; // Include your existing styles
import './Popup.css'; // Include animation styles
import sampleImage from './images/back3.png';


function HomePage() {
  const navigate = useNavigate();
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleRedirect = () => {
    navigate('/dynamic-page');
  };

  const toggleMessage = () => {
    setIsMessageVisible(!isMessageVisible);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <section className="intro">
          <h1 className="animated-heading">Introducing PixPrompt</h1>
          <p className="intro-text">
            Transform your imagination into visuals with PixPrompt, powered by cutting-edge GAN Models.
          </p>
          <div className="buttons">
            <button className="btn-try" onClick={handleRedirect}>
              Try PixPrompt
            </button>
            <button className="btn-learn" onClick={toggleMessage}>
              Learn about PixPrompt
            </button>
          </div>
          {isMessageVisible && (
            <div className="message-content-white-background">
              <h2 className="animated-message">Hello! I am PixPrompt</h2>
              <p className="animated-message-text">
                I am your creative companion! Powered by advanced GAN models, I can transform your
                text into stunning images. Let's unlock your creativity together!
              </p>
              <img
                className="info-image"
                src={sampleImage}
                alt="Generated example"
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;