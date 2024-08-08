import React, { useState } from 'react';
import { sendContactMail } from '../ActionManager';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [info, setInfo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendContactMail(email,message);
    setInfo("The Message is sent. Thank you");
    setEmail('');
    setMessage('');
  };

  return (
    <footer className="bg-base-100 text-white p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md text-base-100">
          <h3 className="text-lg font-bold mb-6 text-center">Contact Us</h3>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="form-control mb-4 w-full max-w-md">
              <label htmlFor="emailContact" className="label text-base-100">
                <span className="label-text font-bold text-base-100">Email:</span>
              </label>
              <div className="input-group flex items-center">
                <input
                  type="email"
                  id="emailContact"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className=" text-white input w-full border-0 p-2 rounded-lg base-100"
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
            {info && <p>{info}</p>}
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
