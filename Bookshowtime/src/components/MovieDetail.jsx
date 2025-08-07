import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../App.css';
import './MovieDetail.css';
import axios from 'axios';
import Cycle from  '../assets/cycle.jpg';
import Bike from '../assets/Bike.png';
import Auto from '../assets/Auto.jpg'; 
import Nano from '../assets/Nano.jpeg';
import Sedan from '../assets/Sedan.jpeg';
import Bigcar from '../assets/car.jpeg';
import { useNavigate } from 'react-router-dom';



const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_KEY = '183d2275196b2af4ad934c17aaf69def';

const MovieDetails = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const getImageForSeats = (num) => {
    switch (num) {
      case 1:
        return Cycle;
      case 2:
        return Bike;
      case 3:
        return Auto;
      case 4:
        return Nano;
      case 5:
        return Sedan;
      case 6:
        return Bigcar;
      default:
        return '';
    }
  };

  if (!movie) {
    return <h2 style={{ color: 'white' }}>Loading movie...</h2>;
  }
  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="movie-details-container">
        <div className="movie-main-content">
          <div className="movie-image">
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          </div>
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <div className="info-line">
              <span>⭐ {movie.vote_average}</span>
              <span>📅 {movie.release_date}</span>
              <span>⏱ {movie.runtime} min</span>
            </div>
            <div className="info-line">
              <span>🗣 Language: {movie.original_language}</span>
            </div>

            <div className="synopsis-section">
              <h2>Synopsis</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>

        <h2 className="showtime-title">Showtimes</h2>
        <div className="box">
          <h1 style={{ textAlign: 'center', background: '#1b1b26ff' }} className="showtime-format">3D</h1>
          <div className="showtime-wrapper" style={{ display: 'flex', justifyContent: 'space-around', background: '#18181fff' }}>
            {['Oct 3, 2024', 'Oct 4, 2024', 'Oct 5, 2024', 'Oct 6, 2024'].map((date) => (
              <div className="date-block" key={date}>
                <h4>{date}</h4>
                {['2:00 pm', '6:00 pm', '9:30 pm', '12:00 am'].map((time) => (
                  <button className="tbtn" onClick={() => setShowModal(true)} key={time}>{time}</button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* <span className="close-btn" onClick={() => setShowModal(false)}>&times;</span> */}
            <h2>Select Your Seats</h2>
            <img src={getImageForSeats(selectedSeats)} alt="vehicle" style={{ width: '100px' }} />
            <div className="seats">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`seat-number ${selectedSeats === i + 1 ? 'selected' : ''}`}
                  onClick={() => setSelectedSeats(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <hr />
            <div className="seat-types">
              <div><strong>RECLINER</strong><br />₹299<br /><span className="sold-out">SOLD OUT</span></div>
              <div><strong>PRIME PLUS</strong><br />₹149<br /><span className="almost-full">ALMOST FULL</span></div>
              <div><strong>PRIME</strong><br />₹149<br /><span className="almost-full">ALMOST FULL</span></div>
              <div><strong>CLASSIC</strong><br />₹99<br /><span className="almost-full">ALMOST FULL</span></div>
            </div>
            <div className="bestseller-note">
              Book the <input type="checkbox" /><strong>Bestseller Seats</strong> in this cinema at no extra cost!
            </div>
            <button className="select-seats-btn" onClick={() => navigate(`/seatbooking/${movie.id}`, {state: { selectedSeats }})}>
              Select Seats
            </button>

            <button className="close-btn" onClick={closePopup}>✖</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MovieDetails;
