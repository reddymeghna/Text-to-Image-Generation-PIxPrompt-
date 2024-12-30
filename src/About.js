import React, { useState } from 'react';
import Navbar from './Navbar'; // Reuse Navbar component
import './About.css'; // Custom styles for the About page

function About() {
  const [selectedGAN, setSelectedGAN] = useState(null);

  const ganDetails = {
    GAN: {
      brief: "GANs generate realistic data by training two networks in a competitive setup.",
      detailed: `GAN (Generative Adversarial Network) is a framework for generating synthetic data that resembles real-world data.  
      It consists of two neural networks:  
      1. **Generator**: Creates fake data (e.g., images) based on random input.  
      2. **Discriminator**: Distinguishes between real and fake data, providing feedback to the generator.  
    
      These networks are trained in an adversarial manner, where the generator improves to create more realistic data, and the discriminator enhances its ability to detect fakes.  
      GANs have revolutionized areas like image synthesis, style transfer, and text-to-image generation by producing highly realistic outputs.`,
    },
    
    DF_GAN: {
      brief: "DF-GAN simplifies text-to-image generation with a deep fusion block.",
      detailed: `DF-GAN (Deep Fusion GAN) is another text-to-image synthesis framework that uses a simpler, end-to-end architecture compared to StackGAN. 
      It introduces a **Deep Text-Image Fusion Block** to directly fuse text embeddings and image features, enabling more effective and consistent image generation. 
      DF-GAN eliminates the need for multi-stage generation and focuses on improving the efficiency and quality of text-conditioned image synthesis.`,
    },
    StableDiffusion: {
      brief: "Stable Diffusion generates highly detailed images from text prompts efficiently.",
      detailed: `Stable Diffusion is an advanced text-to-image model developed by Stability AI.  
      It uses a diffusion-based generative process, where noise is iteratively reduced to form high-quality images based on the input text.  
      Key features include:  
      1. **Text-to-Image Transformation**: Generates images aligned with natural language descriptions.  
      2. **Versatility**: Capable of creating diverse visual styles, ranging from photorealistic to abstract art.  
      3. **Efficiency**: Designed for high performance on consumer-grade GPUs, enabling widespread accessibility.  
    
      Stable Diffusion 2 builds on the success of earlier versions with improved architecture, yielding even more detailed and coherent outputs.`,
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
          We use three powerful GAN models to achieve this goal:
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
