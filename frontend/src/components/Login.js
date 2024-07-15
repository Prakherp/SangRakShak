import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';
import Navbar from './Navbar';
import Footer from './Footer';
import GoogleButton from 'react-google-button';
import { logInLocal } from "../ActionManager";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const handleLogin = async () => {
    setEmail("");
    setPassword("");
    setError("");
    console.log("Inside Handle log in");
    try {
      const response = await logInLocal({ email: email, password: password });
      if (response.success) {
        navigate("/app");
      } else {
        setError(response.message);
        navigate('/Login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  async function handleGoogleSignIn(){
    console.log("Inside Handle google sign up");
    window.open("http://localhost:5050/auth/google/sangrakshak","_self");
  }

  return (
    <>
      <Navbar/>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={(e)=>{e.preventDefault();handleLogin();}}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && (<p>{error}</p>)}
        <div className="google-login">
          <GoogleButton
            onClick={() =>handleGoogleSignIn()}
          />
        </div>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <Footer/>
      </>
  );
};

export default Login;
