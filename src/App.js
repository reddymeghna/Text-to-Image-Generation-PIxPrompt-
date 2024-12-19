import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DynamicPage from './DynamicPage';
import About from './About';
import Overview from './Overview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dynamic-page" element={<DynamicPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Router>
  );
}

export default App;
