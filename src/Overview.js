import React from 'react';
import Navbar from './Navbar'; // Reuse the Navbar component
import './Overview.css'; // Include styles for the Overview page if needed

function Overview() {
  return (
    <div className="overview-page">
      <Navbar />
      <main className="content">
        <h1>Overview</h1>
        <p>
          PixPrompt provides a seamless way to generate high-quality images from textual prompts. 
          Our platform uses cutting-edge Generative Adversarial Networks (GANs) to ensure that your images are both creative and accurate.
        </p>
      </main>
    </div>
  );
}

export default Overview;
