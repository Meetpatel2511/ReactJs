import React from 'react';
import './ContactUs.css';
import Footer from '../components/Footer';
import Navbar from './Navbar';
// import Footer from './Footer';

const ContactUs = () => {
  return (
    <>
    <Navbar/>
      <section className="contact-section">
        <div className="contact-container">
          <h1>Get in Touch with Us</h1>
          <p>
            We're here to assist you with any questions, concerns, or feedback about your movie experience.
            Fill out the form below or use one of the contact methods provided.
          </p>

          <div className="contact-content">
            {/* Contact Form */}
            <form className="contact-form">
              <label>Name</label>
              <input type="text" placeholder="Your Full Name" required />

              <label>Email</label>
              <input type="email" placeholder="you@example.com" required />

              <label>Subject</label>
              <input type="text" placeholder="Subject of your message" required />

              <label>Message</label>
              <textarea placeholder="Write your message here..." rows="6" required></textarea>

              <button type="submit" className="submit-btn">Send Message</button>
            </form>

            {/* Contact Info */}
            <div className="contact-info">
              <h3>Contact Details</h3>
              <p><strong>📍 Address:</strong> Cineplex Towers, Main Street, FilmCity, 456123</p>
              <p><strong>📞 Phone:</strong> <br />Meet Patel: 7041549115 <br /> Manasvi Jetavat: 8849373461 <br /> Akash Bhoi: 9625397162</p>
              <p><strong>📧 Email:</strong> support@moviemagic.com</p>
              <p><strong>🕒 Working Hours:</strong> (9am-5pm)</p>

              <div className="map-placeholder">
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.318365011973!2d72.60697087534722!3d23.188995210097065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c290051909e39%3A0x849f062f8f43180f!2sNY%20Cinemas%20Gandhinagar!5e1!3m2!1sen!2sin!4v1754471102392!5m2!1sen!2sin" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                {/* You can embed a real map here if desired */}
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.318365011973!2d72.60697087534722!3d23.188995210097065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c290051909e39%3A0x849f062f8f43180f!2sNY%20Cinemas%20Gandhinagar!5e1!3m2!1sen!2sin!4v1754471102392!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUs;
