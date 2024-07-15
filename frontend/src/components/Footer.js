import React, { useState } from 'react';
import './Footer.css';
import instagram from '../assets/insta.svg';
import facebook from '../assets/facebook.svg';
import gmail from '../assets/email.svg';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.instagram.com" aria-label="Instagram">
            <img src={instagram} alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" aria-label="Facebook">
            <img src={facebook} alt="Facebook" />
          </a>
          <a href="mailto:uditkaushish@gmail.com" aria-label="Gmail">
            <img src={gmail} alt="Gmail" />
          </a>
        </div>
        <div className="contact-form">
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SangRakshak. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
