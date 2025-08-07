import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import NowPlaying from './NowPlaying';
import '../App.css';
import FeaturesSection from './FeaturesSection';
import AtmosSection from './AtmosSection';
import TantalizingTreats from './Treats';
import LuxuriousEscape from './LuxuriousEscape';
import Footer from './Footer';
import CurtainLoader from './CurtainLoader'; // ✅ Import this

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleMode = () => setDarkMode(prev => !prev);

  return (
    <CurtainLoader>
      <>
        <Navbar />
        <HeroSection />
        <NowPlaying />
        <FeaturesSection />
        <AtmosSection />
        <TantalizingTreats />
        <LuxuriousEscape />
        <Footer />

        {/* Toggle button */}
        <button className="floating-toggle" onClick={toggleMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </>
    </CurtainLoader>
  );
};

export default Home;
