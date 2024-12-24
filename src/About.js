import React, { useState } from 'react';
import Navbar from './Navbar'; // Reuse Navbar component
import './About.css'; // Custom styles for the About page

function About() {
  const [selectedGAN, setSelectedGAN] = useState(null);

  const ganDetails = {
    StackGAN: {
      brief: "StackGAN generates images in two stages for better quality and detail.",
      detailed: `StackGAN (Stacked Generative Adversarial Networks) is a GAN architecture designed to generate high-quality images from text descriptions. 
      It operates in two stages: 
      1. **Stage-I GAN** generates a low-resolution image with basic shapes and colors based on the text description.  
      2. **Stage-II GAN** refines the image by adding details and improving the resolution while preserving consistency with the text. 
      This approach divides the complex task of generating detailed images into smaller, more manageable steps.`,
    },
    DF_GAN: {
      brief: "DF-GAN simplifies text-to-image generation with a deep fusion block.",
      detailed: `DF-GAN (Deep Fusion GAN) is another text-to-image synthesis framework that uses a simpler, end-to-end architecture compared to StackGAN. 
      It introduces a **Deep Text-Image Fusion Block** to directly fuse text embeddings and image features, enabling more effective and consistent image generation. 
      DF-GAN eliminates the need for multi-stage generation and focuses on improving the efficiency and quality of text-conditioned image synthesis.`,
    },
    AttentionGAN: {
      brief: "Attention GAN uses attention mechanisms for detailed text-image alignment.",
      detailed: `Attention GANs incorporate attention mechanisms to improve the alignment between the input conditions (e.g., text or image regions) and the generated output. 
      In text-to-image synthesis, attention GANs dynamically focus on relevant parts of the text during different stages of image generation. 
      By leveraging attention, these GANs enhance the consistency and detail of generated images, particularly in capturing complex or localized features. 
      Models like AttnGAN are examples that use attention mechanisms to align text and visual content effectively.`,
    },
  };

  const toggleModal = (ganName) => {
    setSelectedGAN(selectedGAN === ganName ? null : ganName);
  };

  return (
    <div className="about-page">
      <Navbar />
      <main className="about-content">
        <h1>About PixPrompt</h1>
        <p>
          <b>PixPrompt</b> is a platform designed to bring textual descriptions to life through advanced GAN models. Our focus is on innovation, research, and creating tools that empower users to generate stunning visuals from text.
        </p>
        <p>
          We use three advanced GAN models to achieve this goal:
        </p>
        <ul>
          {Object.entries(ganDetails).map(([ganName, details]) => (
            <li key={ganName}>
              <p><b>{ganName}</b>: {details.brief}</p>
              <button onClick={() => toggleModal(ganName)}>
                {selectedGAN === ganName ? "Hide details" : "Click to learn more"}
              </button>
              {selectedGAN === ganName && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>{ganName}</h2>
                    <p>{details.detailed}</p>
                    <button className="close-btn" onClick={() => toggleModal(null)}>Close</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p>
          Each model is tailored to enhance the quality and realism of the generated images, making PixPrompt a versatile tool for artists, developers, and researchers alike.
        </p>
      </main>
    </div>
  );
}

export default About;
