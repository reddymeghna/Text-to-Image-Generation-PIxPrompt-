import React from 'react';
import Navbar from './Navbar'; // Reuse the Navbar component
import './About.css'; // Include styles for the About page if needed

function About() {
  return (
    <div className="about-page">
      <Navbar />
      <main className="content">
        <h1>About Us</h1>
        <p>
          Welcome to PixPrompt! We are a team dedicated to creating innovative tools that bridge the gap between imagination and reality. 
          Our text-to-image generation tool uses advanced GAN models to bring your ideas to life.
        </p>
      </main>
    </div>
  );
}

export default About;
