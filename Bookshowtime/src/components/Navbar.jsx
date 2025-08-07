import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);


  return (
    <header className="navbar-section">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {/* Hamburger Toggle */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Centered Navigation */}
        <div className={`center-nav ${menuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><NavLink to="/" className={({ isActive }) => isActive ? 'mainlinks active' : 'mainlinks'}>Home</NavLink></li>
            <li><NavLink to="/foodcourt" className={({ isActive }) => isActive ? 'mainlinks active' : 'mainlinks'}>Food Court</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? 'mainlinks active' : 'mainlinks'}>About Us</NavLink></li>
            <li><NavLink to="/ContactUs" className={({ isActive }) => isActive ? 'mainlinks active' : 'mainlinks'}>Contact Us</NavLink></li>
            <li className="profile-mobile" onClick={() => setProfileDropdown(!profileDropdown)}>
              <FaUserCircle className="profile-icon" />
              {profileDropdown && (
                <ul className="profile-dropdown">
                  <li style={{ fontSize: 20 }} onClick={() => setIsModalOpen(true)}>Login</li>

                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Profile Icon Desktop Only */}
        <div
          className="profile-container"
          onClick={() => setProfileDropdown(!profileDropdown)}
        >
          <FaUserCircle className="profile-icon" />
          {profileDropdown && (
            <ul className="profile-dropdown">
              <li style={{ fontSize: 20 }} onClick={() => setIsModalOpen(true)}>Login</li>
            </ul>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
            <h2>{isLoginForm ? 'Login' : 'Sign Up'}</h2>

            <form className="modal-form">
              {!isLoginForm && (
                <input type="text" placeholder="Full Name" required />
              )}
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">{isLoginForm ? 'Login' : 'Sign Up'}</button>
            </form>

            <p className="switch-form">
              {isLoginForm ? "Don't have an account?" : "Already have an account?"}
              <span onClick={() => setIsLoginForm(!isLoginForm)}>
                {isLoginForm ? " Sign Up" : " Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;