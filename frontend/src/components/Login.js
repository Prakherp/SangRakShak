import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Form.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/app');
  };

  const handleGoogleLoginSuccess = (response) => {
    navigate('/app');
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Navbar/>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <div className="google-login">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
          />
        </div>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <Footer/>
    </GoogleOAuthProvider>
  );
};

export default Login;
