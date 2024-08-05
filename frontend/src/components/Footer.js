import React, { useState } from 'react';
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
    <footer className="bg-base-100 text-white p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="flex gap-4 mb-4 invert">
          <a href="https://www.instagram.com" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
            <img src={instagram} alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="https://www.facebook.com" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
            <img src={facebook} alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="mailto:uditkaushish@gmail.com" aria-label="Gmail" className="hover:opacity-70 transition-opacity">
            <img src={gmail} alt="Gmail" className="w-6 h-6" />
          </a>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md text-base-100">
          <h3 className="text-lg font-bold mb-6 text-center">Contact Us</h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control mb-4 w-full max-w-md">
              <label htmlFor="email" className="label text-base-100">
                <span className="label-text font-bold text-base-100">Email:</span>
              </label>
              <div className="input-group flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 mr-2 in"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input w-full border-0 p-2 rounded-lg base-100"
                />
              </div>
            </div>
            <div className="form-control mb-4 w-full max-w-md">
              <label htmlFor="message" className="label text-base-100">
                <span className="label-text font-bold text-base-100">Message:</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="textarea textarea-bordered w-full p-2 rounded-lg text-white"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-neutral w-40 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-6">
        <p>&copy; 2024 SangRakshak. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
