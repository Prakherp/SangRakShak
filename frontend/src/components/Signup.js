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
  const [errors, setErrors]= React.useState({});

  const validatePassword = () => {
    const errors = {};
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!passwordRegex.test(password)) {
      errors.password = 'Password contains invalid characters.';
    } else if (!uppercaseRegex.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter.';
    } else if (!specialCharRegex.test(password)) {
      errors.password = 'Password must contain at least one special character like "@", "#", "!" etc ';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    if(validatePassword()){
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
    }
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
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
          {errors.confirmPassword && (
          <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
        )}
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
