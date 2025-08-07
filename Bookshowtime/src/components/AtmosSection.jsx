import React from 'react';
import './AtmosSection.css';
import { FaMusic } from 'react-icons/fa';
import atmosImg from '../assets/cinema2.webp'; // Replace with your image path

const AtmosSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="text-box">
          <FaMusic className="icon" />
          <h2 className="title">Delight in Dolby Atmos</h2>
          <p className="description">
            Experience sound like never before with Dolby Atmos, the epitome audio technology that takes you on an immersive sonic journey. With sound objects moving seamlessly around the theatre, you'll be transported into the heart of every scene, making you an integral part of the story.
          </p>
        </div>
        <div className="image-box">
          <img src={atmosImg} alt="Dolby Atmos Theater" className="image" />
        </div>
      </div>
    </section>
  );
};

export default AtmosSection;
