import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GoogleButton from 'react-google-button';
import bcrypt from 'bcryptjs';
import { CreateUser, EmailPresent } from '../ActionManager';

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState({});

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
      errors.password = 'Password must contain at least one special character like "@", "#", "!" etc.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      console.log("in submit");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const UserObject = {
          username: username,
          email: email,
          password: hashedPassword,
          verified: false
        };
        const presence = await EmailPresent(email);
        if (presence === 1) {
          console.log("Email is already Present");
          setMessage("Email has been already registered.");
        } else if (presence === 0) {
          console.log("Email was not already present");
          await CreateUser(UserObject);
          setMessage("User Registered. Please, verify through mail.");
        } else {
          console.log("Error in checking whether email is present or not. Redirect to error Page.");
          setMessage("Error in registering, try Again.");
        }
      } catch (err) {
        console.log("Error in password checking process: ", err);
        setMessage("Error in registering, try Again.");
      }
    }
  };

  async function handleGoogleSignUp() {
    console.log("Inside Handle google sign up");
    window.open("http://localhost:5050/auth/google/sangrakshak", "_self");
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 animate-fade-in">
        <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-10 animate-slide-in">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
          <form onSubmit={(e) => handleSignup(e)} className="space-y-4 w-full">
            <div className="form-control">
              <label htmlFor="username" className="label">
                <span className="label-text font-bold text-gray-800">Username:</span>
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text font-bold text-gray-800">Email:</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="form-control">
              <label htmlFor="password" className="label">
                <span className="label-text font-bold text-gray-800">Password:</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
              {errors.password && <p className="text-red-500 mt-2">{errors.password}</p>}
            </div>
            <div className="form-control">
              <label htmlFor="confirmPassword" className="label">
                <span className="label-text font-bold text-gray-800">Confirm Password:</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input input-bordered w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              />
              {errors.confirmPassword && <p className="text-red-500 mt-2">{errors.confirmPassword}</p>}
            </div>
            <div className='flex justify-center'>
              <button type="submit" className="btn btn-neutral w-40 hover:bg-blue-500 transition-transform transform hover:scale-105 duration-300 ease-in-out">Sign Up</button>
            </div>
          </form>
          {message && <p className="text-gray-800 mt-4 animate-fade-in">{message}</p>}
          <div className="mt-6 w-full flex justify-center animate-fade-in">
            <GoogleButton onClick={handleGoogleSignUp} className="transition-transform transform hover:scale-105 duration-300" />
          </div>
          <p className="mt-4 text-center text-gray-800">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
