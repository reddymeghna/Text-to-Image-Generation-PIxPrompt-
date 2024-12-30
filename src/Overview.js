
import React from 'react';
import Navbar from './Navbar'; // Reuse the Navbar component
import './Overview.css'; // Include styles for the Overview page

function Overview() {
  return (
    <div className="overview-page">
      <Navbar />
      <main className="content">
        <h1>Overview</h1>
        <p>
          <b>PixPrompt</b> is a cutting-edge tool designed to explore the capabilities of text-to-image generation using advanced generative models. 
          Our platform not only generates images but also provides insights through a detailed comparative analysis of the implemented models.
        </p>
        <h2>Key Features:</h2>
        <ul>
          <li>
            <b>GAN (Generative Adversarial Network):</b> A foundational framework that trains two neural networks, the Generator and Discriminator, in an adversarial setup to create realistic images from text descriptions.
          </li>
          <li>
            <b>DF-GAN (Deep Fusion GAN):</b> An efficient architecture tailored for text-to-image generation, ensuring better alignment between textual input and visual output while maintaining high-quality results.
          </li>
          <li>
            <b>Stable Diffusion API:</b> A state-of-the-art diffusion-based model accessible via API, capable of generating highly detailed and coherent images by iteratively refining noise into meaningful visuals guided by text prompts.
          </li>
        </ul>
        <h2>Comparative Analysis:</h2>
        <p>
          To evaluate the performance of these models, we use the following industry-standard metric:
        </p>
        <ul>
          <li><b>FID Score:</b> Measures the similarity between the distribution of generated images and real images. Lower scores indicate better quality.</li>
        </ul>
        <p>
          By analyzing this metric, we aim to provide a comprehensive understanding of each model's strengths and limitations, helping users make informed choices based on their specific needs.
        </p>
      </main>
    </div>
  );
}

export default Overview;
