import React from 'react';
import './Form.css';
import Navbar from './Navbar';
import Footer from './Footer';
import GoogleButton from 'react-google-button';
import bcrypt from 'bcryptjs';
import { CreateUser, EmailPresent } from '../ActionManager';

const Signup = () => {
  const[ email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const [username, setUsername]= React.useState("");
  const [confirmPassword, setConfirmPassword]=React.useState("");
  const [message,setMessage] = React.useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log("in submit");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setMessage("");
    await bcrypt.hash(password,10).then((hashedPassword)=>{
      const UserObject = {
        username: username,
        email: email,
        password: hashedPassword,
        verified: false
      };
      EmailPresent(email).then(presence=>{
        if(presence===1){
          console.log("Email is already Present");
          setMessage("Email has been already registered.");
        }
        else if(presence === 0){
          console.log("Email was not already present");
          CreateUser(UserObject);
          setMessage("User Registered. Please, verify through mail.");
        }
        else{
          console.log("Error in checking whether email is present or not. Redirect to error Page.");
          setMessage("Error in registering, try Again.");
        }
      }).catch(err=>{
        console.log("Error in Checking Email Records.");
        setMessage("Error in registering, try Again.");
      });
     
    }).catch(err=>{
      console.log("Error in password checking process: ",err);
      setMessage("Error in registering, try Again.");
    });
  };

  async function handleGoogleSignUp(){
    console.log("Inside Handle google sign up");
    window.open("http://localhost:5050/auth/google/sangrakshak","_self");
  }

  return (
    <>
      <Navbar/>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={(e)=>handleSignup(e)}>
          <input type="username" placeholder="username" value = {username} onChange={(e)=>setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        {message && <><p>{message}</p></>}
        <div className="google-signup">
          <GoogleButton
            onClick={() => handleGoogleSignUp() }
          />
        </div>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;
