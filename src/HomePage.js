import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleRedirect = () => {
    navigate('/dynamic-page');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="home-page">
      <Navbar />
      <main className="main-content">
        <section className="intro">
          <h1>Introducing PixPrompt</h1>
          <p>Our text-to-image generation tool powered by advanced GAN Models.</p>
          <div className="buttons">
            <button className="btn-try" onClick={handleRedirect}>
              Try PixPrompt
            </button>
            <button className="btn-learn" onClick={toggleModal}>
              Learn about PixPrompt
            </button>
          </div>
        </section>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>About PixPrompt</h2>
            <p>
              PixPrompt is an advanced text-to-image synthesis tool that leverages state-of-the-art 
              GAN (Generative Adversarial Network) models. It transforms user-provided text descriptions 
              into high-quality, visually coherent images.
            </p>
            <h3>Key Features</h3>
            <ul>
              <li>Seamlessly generates images based on user input.</li>
              <li>Uses three different GAN models for comparative analysis:</li>
              <ul>
                <li><strong>StackGAN:</strong> A two-stage network that progressively refines image quality.</li>
                <li><strong>DF-GAN:</strong> Simplifies the process by combining text encoding and image generation.</li>
                <li><strong>AttentionGAN:</strong> Employs attention mechanisms for generating fine-grained details.</li>
              </ul>
              <li>Provides performance evaluation using metrics like Inception Score (IS) and Fréchet Inception Distance (FID).</li>
            </ul>
            <h3>Workflow Overview</h3>
            <p>The workflow consists of the following components:</p>
            <img
              src="/path/to/your/workflow-image.png" // Replace with the actual path of the workflow diagram
              alt="Workflow Overview"
              className="workflow-image"
            />
            <p>
              The system takes user input, processes it through an API Gateway, and generates images 
              using the selected GAN model. Feedback is collected for iterative improvements.
            </p>
            <button className="btn-close" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
