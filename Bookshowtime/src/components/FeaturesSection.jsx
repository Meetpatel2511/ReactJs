import React from 'react';
import './FeaturesSection.css';
import { IoVideocamOutline } from "react-icons/io5";
import cinema from '../assets/cinema.jpg'; // Make sure this path is correct

const FeatureSection = () => {
  return (
    <section className="feature-section">
      <div className="feature-wrapper">
        <p className="feature-tag">WHAT YOU’LL GET?</p>
        <h2 className="feature-heading">
          Unleash the Movie Magic and Discover Our Spectacular Features
        </h2>
        <div className="feature-card">
          <img src={cinema} alt="Cinema" className="feature-img" />
          <div className="feature-content">
            <IoVideocamOutline className="feature-icon" />
            <h3 className="feature-title">Unparalleled Cinematic Experience</h3>
            <p className="feature-text">
              Immerse yourself in stunning visuals and crystal-clear sound, as our state-of-the-art IMAX technology
              transports you directly into the heart of the action. With a screen that stretches beyond your peripheral
              vision, every frame comes alive with unparalleled brilliance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
