import React from "react";
import "./About.css"; // Optional, for styling
import Navbar from "./Navbar";

const About = () => {
  return (

    <>
    <Navbar/>

 <section className="about-section">
    <div className="about-container">
      <h1 className="about-heading">
        🎬 Meet the Team Behind <span className="highlight">BookShowTime</span>
      </h1>

      <p className="about-welcome">
        Welcome to <strong>BookShowTime</strong> — your one-stop destination for cinema and comfort!
      </p>

      <p className="about-text">
        <strong>BookShowTime</strong> is a project built with love by <strong>Meet Patel</strong>, <strong>Akash Bhoi</strong>, and <strong>Manasvi Jetavat</strong>. We worked as a team to build a fun, easy, and feature-rich movie booking website.
      </p>

      <h2 className="about-subheading">Who Did What</h2>

      <p className="about-text">
        <strong>Meet Patel</strong> managed page routing, added API connections, and built the full logic behind the Ticket Booking page. He helped choose the UI design and supported the team whenever needed. Meet also fixed issues, gave useful suggestions, and made sure everything worked well together.
      </p>

      <p className="about-text">
        <strong>Akash Bhoi</strong> created the eye-catching curtain animation that gives the site a theater-like feel. He built the Food Court section where users can pre-order snacks, and also added a special discount coupon <strong>"akash50%"</strong>. Akash made this About page and worked on improving the design. He also helped teammates with any problems they faced.
      </p>

      <p className="about-text">
        <strong>Manasvi Jetavat</strong> designed the Home page and added the Dark/Light mode feature for better user experience. She also created the Logo, Contact Us page, Login, and Sign-Up pages. Manasvi focused on design, testing, and supported the team by making sure everything looked clean and worked smoothly.
      </p>

      <p className="about-text">
        From smooth UI design to helpful features, we built everything with the user in mind — to give you a modern and enjoyable movie experience.
      </p>

      <p className="about-text">
        Whether you're booking tickets, exploring showtimes, or pre-ordering your favorite snacks, we want you to feel the magic of cinema — all in one place.
      </p>

      <div className="about-signature">
        <p>With ❤ from Meet, Akash & Manasvi</p>
        <p className="about-tagline">— Where movies meet meals, and tech meets passion</p>
      </div>
    </div>
    </section>
    </>
  );
};

export default About;