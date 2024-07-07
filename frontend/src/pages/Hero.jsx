import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section" id="home">
      <div className="overlay">
        <h1 className="heading-home">Welcome to SangRakshak</h1>
        <div className="button-group">
          <Link to="/login">
            <button className="home-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="home-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
