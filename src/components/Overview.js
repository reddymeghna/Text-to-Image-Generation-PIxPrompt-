import React from 'react';
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
  );
}

export default Overview;
