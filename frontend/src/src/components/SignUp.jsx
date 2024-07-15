import React from 'react';
import bcrypt from "bcryptjs";
import { CreateUser, EmailPresent } from '../ActionManager';

export const SignUp= ()=>{
  const [username,setUsername] = React.useState("");
  const [email,setEmail]=React.useState("");
  const [password, setPassword]=React.useState("");
  const [message, setMessage] = React.useState('');

  const handleSubmit= async()=>{
    console.log("in submit");
    setUsername("");
    setEmail("");
    setPassword("");
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

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form className="p-6 bg-white rounded shadow-md flex flex-col md:flex-row items-center" style={{ width: '800px' }} onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-green-700 font-bold mb-4">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              value={username}
              type="Text"
              className="input input-bordered w-full"
              placeholder="Enter your username"
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              value={email}
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              value={password}
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-accent w-full m-1">
            Sign Up
          </button>
          {
            message && (
            <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <br/>
              <br/>
              <span>{message}</span>
            </div>)
          }
      </div>
      <div className="border-l border-gray-300 h-auto mx-4 md:h-96"></div>
      <div className="w-full md:w-1/2 p-4">
        <button type="button" className="btn btn-accent w-full m-1" onClick={()=>handleGoogleSignUp()}>
          Sign up with Google
        </button>
        <p className="text-black-500 p-3 font-bold"> Already registered ?   <span><a href="/signin"><u>Login</u></a></span></p>
      </div>
    </form>
  </div>
  );
}
