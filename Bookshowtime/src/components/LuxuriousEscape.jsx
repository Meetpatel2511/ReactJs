import React from 'react';
import './LuxuriousEscape.css';
import { MdBatteryFull } from 'react-icons/md';
import loungeImage from '../assets/lounge.webp'; // ✅ import your image

const LuxuriousEscape = () => {
  return (
    <section className="section escape-section">
      <div className="container">
        <div className="text-box">
          <div className="icon"><MdBatteryFull /></div>
          <h2 className="title">Luxurious Escape</h2>
          <p className="description">
            Step into a world of opulence and relaxation, designed to cater to your every need before and after the main event. Our Premium Lounge welcomes you with plush leather seating, elegant décor, and a refined ambiance that sets the stage for an unforgettable cinematic journey.
          </p>
        </div>
        <div className="image-box">
          <img src={loungeImage} alt="Lounge" className="image" />
        </div>
      </div>
    </section>
  );
};

export default LuxuriousEscape;
