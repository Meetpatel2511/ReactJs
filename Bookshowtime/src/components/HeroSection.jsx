import React from 'react';
import './HeroSection.css';
import hero from '../assets/hero-img.webp';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Left Content */}
        <div className="hero-text">
          <h1>
            Unlock the Gateway to <br />
            Enchanting Movie Magic
          </h1>
          <p>
            Immerse yourself in the captivating allure of cinema as you step into our
            exquisite destination, designed to elevate your movie-watching experience to new heights.
          </p>
          <div className="hero-buttons">
            <button className="buy-btn">Buy a ticket</button>
            <button className="learn-btn">Learn more ↓</button>
          </div>

          <div className="avatar-section">
            <div className="avatars">
              <img src="https://i.pravatar.cc/100?img=1" alt="user" />
              <img src="https://i.pravatar.cc/100?img=2" alt="user" />
              <img src="https://i.pravatar.cc/100?img=3" alt="user" />
              <img src="https://i.pravatar.cc/100?img=4" alt="user" />
              <img src="https://i.pravatar.cc/100?img=5" alt="user" />
            </div>
            <p><span>100,000+</span> tickets sold last year</p>
          </div>
        </div>

        {/* Right Image */}
        <div className="hero-image">
          <img src={hero} alt="Cinema" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
