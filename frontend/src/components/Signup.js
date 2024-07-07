import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Form.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
    navigate('/app');
  };

  const handleGoogleSignupSuccess = (response) => {
    // Handle Google signup success here
    navigate('/app');
  };

  const handleGoogleSignupFailure = (error) => {
    console.error('Google signup failed', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Navbar/>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="username" placeholder="username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
        <div className="google-signup">
          <GoogleLogin
            onSuccess={handleGoogleSignupSuccess}
            onFailure={handleGoogleSignupFailure}
          />
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <Footer/>
    </GoogleOAuthProvider>
  );
};

export default Signup;
