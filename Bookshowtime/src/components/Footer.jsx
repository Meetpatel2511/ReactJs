import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo.png'; // Import your logo image

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-icons">
        {[FaFacebookF, FaInstagram, FaTwitter, FaTiktok, FaYoutube].map((Icon, i) => (
          <div className="icon-wrapper" key={i}>
            <Icon />
          </div>
        ))}
      </div>
      <div className="footer-divider"></div>

      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-icon"><img src={logo} alt="Logo" className='logo-image' /></span>

          <p className="copyright">
            Copyright © 2023 by NELOY SAHA, Inc. This work is licensed under the terms of the
            <a href="" target="_blank" rel="noopener noreferrer"> GNU General Public License</a>.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Create account</h4>
            <h4>Sign in</h4>
            <h4>About us</h4>
          </div>
        </div>

        <div className="footer-addresses">
          <div>
            <h4>Our Theatres</h4>
            <p>Show Motion Limited Level 8, Bashundhara City 13/3 Ka, Panthapath, Tejgaon, Dhaka-1205</p>
          </div>
          <div>
            <p>Shimanto Shamvar Road no 2,<br />Dhanmondi, Dhaka-1205</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
