

import React from 'react';
<<<<<<< HEAD
import Navbar from './Navbar'; // Reuse the Navbar component
import './Overview.css'; // Include styles for the Overview page

function Overview() {
  return (
    <div className="overview-page">
      <Navbar />
      <main className="content">
        <h1>Overview</h1>
        <p>
          <b>PixPrompt</b> is a cutting-edge tool designed to explore the capabilities of text-to-image generation using advanced GAN models. 
          Our platform not only generates images but also provides insights through a detailed comparative analysis of the implemented models.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>
            <b>StackGAN:</b> A two-stage process where a low-resolution image is generated in Stage-I, followed by refinement in Stage-II to produce high-resolution images.
          </li>
          <li>
            <b>AttentionGAN:</b> Uses attention mechanisms to align textual semantics with image features, resulting in highly detailed and realistic images.
          </li>
          <li>
            <b>DF-GAN:</b> A more efficient architecture that simplifies the process while delivering competitive results.
          </li>
        </ul>
        <h2>Comparative Analysis:</h2>
        <p>
          To evaluate the performance of these models, we use industry-standard metrics:
        </p>
        <ul>
          <li><b>FID Score:</b> Measures the similarity between the distribution of generated images and real images. Lower scores indicate better quality.</li>
          <li><b>Inception Score:</b> Evaluates the diversity and realism of generated images using a pre-trained Inception model.</li>
        </ul>
        <p>
          By analyzing these metrics, we aim to provide a comprehensive understanding of each model's strengths and limitations, helping users make informed choices based on their specific needs.
        </p>
      </main>
    </div>
=======
import { motion } from 'framer-motion';
import './Overview.css'; // Import Overview specific styles

function Overview() {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overview"
    >
      <h1>Overview</h1>
      <p>
        PixPrompt is powered by advanced GAN models that enable seamless
        conversion of textual prompts into stunning visual representations.
      </p>
      <img src="/path-to-overview-image.jpg" alt="Overview" />
      </motion.div>
>>>>>>> fc04ec2337edf646b12c1772d3fd54be36a6f280
  );
}

export default Overview;