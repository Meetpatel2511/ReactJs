import React, { useState, useRef } from 'react';
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import search_icon from '../../assets/search.png';
import notification_icon from '../../assets/notification.png';
import user_profile from '../../assets/jack.png';
import { FaMicrophone } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = 'en-IN';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setSearchQuery(voiceText);
        navigate(`/search/${voiceText}`);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <nav className='navbar'>
      <div className='nav-left navbar'>
        <img className='menu_icon' onClick={() => setSidebarOpen(prev => !prev)} src={menu_icon} alt="" />
        <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png" alt="" />
      </div>

      <form className="middle navbar" onSubmit={handleSearch}>
        <div className="search-box navbar">
          <input
            type="text"
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <img src={search_icon} alt="search" />
          </button>
        </div>
        <h2
          onClick={toggleListening}
          title={isListening ? "Listening... (Click to stop)" : "Click to speak"}
          style={{ cursor: 'pointer', color: isListening ? 'red' : 'black' }}
        >
          <FaMicrophone />
        </h2>
      </form>

      <div className="nav-right navbar">
        <button>+ Create</button>
        <img src={notification_icon} alt="" className='notify' />
        <img src={user_profile} alt="" className='user_profile' />
      </div>
    </nav>
  );
};

export default Navbar;
