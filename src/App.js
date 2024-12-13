import React from 'react';
import './App.css'; // Include your styles here

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="logo">PixPrompt</div>
        <nav className="nav">
          <a href="#about">About Us</a>
          <a href="#overview">Overview</a>
        </nav>
      </header>
      <main className="main-content">
        <section className="intro">
          <h1>Introducing PixPrompt</h1>
          <p>Our text-to-image generation tool powered by advanced GAN Models.</p>
          <div className="buttons">
            <button className="btn-try">Try PixPrompt</button>
            <button className="btn-learn">Learn about PixPrompt</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
