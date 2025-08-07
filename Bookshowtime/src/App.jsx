import React, { useEffect } from 'react';
import Home from './components/Home';
import MovieDetails from './components/MovieDetail';
import SeatBooking from './components/SeatBooking';
import { Routes, Route } from 'react-router-dom';
import FoodCourt from './components/foodcourt';
import Second from './components/second'; // Importing the second component
import About from './components/about';
import ContactUs from './components/ContactUs';

const App = () => {
  // Set default theme when app loads
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark'; // default to 'dark' theme
    document.body.classList.add(theme);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:movieId" element={<MovieDetails />} />
      <Route path="/seatbooking/:movieId" element={<SeatBooking />} />
      <Route path="/foodcourt" element={<Second />} />
      <Route path="/about" element={<About/>} />
      <Route path="/ContactUs" element={<ContactUs />} />
    </Routes>
  );
};

export default App;
