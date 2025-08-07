import React from 'react';
import './TantalizingTreats.css';
import { FaHamburger } from 'react-icons/fa';
import popcornImage from '../assets/cinema3.webp'; // ✅ imported image

const TreatsSection = () => {
  return (
    <section className="section treats-section">
      <div className="container reverse">
        <div className="image-box">
          <img
            src={popcornImage}
            alt="Popcorn Treats"
            className="image"
          />
        </div>
        <div className="text-box">
          <div className="icon"><FaHamburger /></div>
          <h2 className="title">Tantalizing Treats</h2>
          <p className="description">
            At our movie theatre, we take your movie-watching experience beyond the screen by offering a delectable array of food items at our concession stand. From freshly buttered popcorn, crispy nachos with zesty cheese dips, to gourmet hotdogs and a variety of refreshing beverages, our concession stand is a culinary paradise for movie enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TreatsSection;
