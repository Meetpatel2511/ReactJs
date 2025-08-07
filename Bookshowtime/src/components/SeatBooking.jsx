// components/SeatBooking.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import axios from 'axios';
import Footer from './Footer';
import '../App.css';
import './SeatBooking.css';
//  import axios from 'axios';

const API_KEY = '183d2275196b2af4ad934c17aaf69def';

const SeatBooking = () => {
  const { movieId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const seatLimit = state?.selectedSeats || 1;

  const [movie, setMovie] = useState(null);
  const [selected, setSelected] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [confirmedTickets, setConfirmedTickets] = useState(null);
  const [allTickets, setAllTickets] = useState([]);
  const [showTicketPanel, setShowTicketPanel] = useState(false);

  const seatTypes = {
    recliner: { rows: ['A', 'B'], price: 500 },
    prime: { rows: ['C', 'D', 'E', 'F'], price: 300 },
    classic: { rows: ['G', 'H', 'I', 'J'], price: 150 },
  };

  const getSeatType = (row) => {
    if (seatTypes.recliner.rows.includes(row)) return 'recliner';
    if (seatTypes.prime.rows.includes(row)) return 'prime';
    return 'classic';
  };

  const toggleSeat = (seatId) => {
    if (selected.includes(seatId)) {
      setSelected(selected.filter(s => s !== seatId));
    } else if (selected.length < seatLimit) {
      setSelected([...selected, seatId]);
    }
  };

  const calculateTotalPrice = () => {
    return selected.reduce((total, seatId) => {
      const row = seatId[0];
      const type = getSeatType(row);
      return total + seatTypes[type].price;
    }, 0);
  };

useEffect(() => {
  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`
      );
      setMovie(response.data);
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  };

  fetchMovie();
}, [movieId]);


  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  

  const confirmPayment = () => {
    const newTicket = {
      name: buyerName,
      phone: buyerPhone,
      seats: selected,
      total: calculateTotalPrice(),
      movieTitle: movie.title,
      showTime: "2:00 PM",
      date: "Tue, 05 August 2025"
    };

    const updatedTickets = [...allTickets, newTicket];
    setAllTickets(updatedTickets);
    localStorage.setItem('confirmedTickets', JSON.stringify(updatedTickets));

    setConfirmedTickets(newTicket);
    setShowPopup(false);
    setBuyerName('');
    setBuyerPhone('');
    setSelected([]);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      }
    };
    fetchMovie();

    const stored = JSON.parse(localStorage.getItem('confirmedTickets')) || [];
    setAllTickets(stored);
  }, [movieId]);

  if (!movie) return <h2 style={{ color: 'white' }}>Loading...</h2>;

  return (
    <>
      <section>
        <div className="seatbooking-container">
          {/* ✅ Responsive Booking Header */}
          <div className="booking-header">
            <div className="left-section">
                <button className="back-button" onClick={handleBack}>
                <FaArrowLeft />
              </button>
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>PVR: Palladium Mall, Ahmedabad | Tue, 05 August 2025 | 2:00 PM</p>
              </div>
            </div>
            <div className="right-section">
             <button className="ticket-button" onClick={() => setShowTicketPanel(true)}>
                <FaPen style={{ marginRight: '4px' }} />
                View My Tickets
              </button>
            </div>
          </div>

          {/* ✅ Seat Layout */}
          <div className="screen">SCREEN THIS WAY</div>
          <div className="seats-layout">
            {['classic', 'prime', 'recliner'].map((type) => {
              const config = seatTypes[type];
              return (
                <div key={type}>
                  <h4 className="seat-type-label">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Seats - ₹{config.price}
                  </h4>
                  {config.rows.map((row) => (
                    <div key={row} className="seat-row">
                      {[...Array(12).keys()].map(i => {
                        const seatId = `${row}${i + 1}`;
                        const isSelected = selected.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            className={`seat ${isSelected ? 'selected' : ''} ${type}`}
                            onClick={() => toggleSeat(seatId)}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* ✅ Booking Summary */}
          <div className="summary">
            <h4>Selected Seats ({selected.length}/{seatLimit}): {selected.join(', ')}</h4>
            <h4>Total Price: ₹{calculateTotalPrice()}</h4>
            {selected.length > 0 && (
              <button className="pay-button" onClick={() => setShowPopup(true)}>
                Pay ₹{calculateTotalPrice()}
              </button>
            )}
          </div>
        </div>

        {/* ✅ Booking Details Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h3>Enter Booking Details</h3>
              <input
                type="text"
                placeholder="Enter Name"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
              />
              <p>Would you like to confirm booking for: {selected.join(', ')}?</p>
              <div className="popup-actions">
                <button onClick={() => setShowPopup(false)}>Cancel</button>
                <button onClick={confirmPayment}>Confirm</button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ Ticket Panel with Coupons */}
        {showTicketPanel && (
          <div className="popup-overlay">
            <div className="popup-box ticket-display-box">
              <h3>🎟 My Booked Tickets</h3>
              {allTickets.length === 0 ? (
                <p>No tickets booked yet.</p>
              ) : (
                allTickets.map((ticket, index) => (
                  <div className="ticket-coupon" key={index}>
                    <div className="left-ribbon">BOOKSHOW TIME</div>
                    <div className="coupon-main">
                      <div className="coupon-header">
                        <span className="stars">★</span>
                        <h4>Tickets</h4>
                        <span className="stars">★</span>
                      </div>
                      <div className="coupon-body">
                        <div className="coupon-info">
                          <p><strong>Movie:</strong> {ticket.movieTitle}</p>
                          <p><strong>Name:</strong> {ticket.name}</p>
                          <p><strong>Phone:</strong> {ticket.phone}</p>
                          <p><strong>Seats:</strong> {ticket.seats.join(', ')}</p>
                          <p><strong>Date:</strong> {ticket.date}</p>
                          <p><strong>Time:</strong> {ticket.showTime}</p>
                        </div>
                        <div className="price-tag">₹{ticket.total}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <button className="close-btn" onClick={() => setShowTicketPanel(false)}>Close</button>
            </div>
          </div>
        )}

        <Footer />
      </section>
    </>
  );
};

export default SeatBooking;
