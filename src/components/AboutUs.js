import { motion } from 'framer-motion';
import './AboutUs.css';
function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="about-us"
    >
      <h1>About Us</h1>
      <p>Welcome to PixPrompt, where innovation meets creativity!</p>
      <img src="/path-to-image.jpg" alt="Team" className="about-image" />
    </motion.div>
  );
}
export default AboutUs;