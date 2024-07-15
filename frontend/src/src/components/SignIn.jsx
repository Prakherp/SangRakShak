import "react-toastify/dist/ReactToastify.css";
import React from 'react';
import { logInLocal } from "../ActionManager";
import { useNavigate } from "react-router-dom";


export const SignIn= ({setIsAuthenticated})=>{
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  async function handleSubmit(){
    // const data={
    //   email: email,
    //   password: password
    // }
    // await checkUserLogin(data).then(result=>{
    //   console.log("Result Log in :",result);
    //   if(result.success){
    //     props.changeIsAuthenticated(true);
    //   }
    //   else{
    //     toast(result.message);
    //   }
    // }).catch(err=>{
    //   console.log("Error in checking user log in.");
    // });
    setEmail("");
    setPassword("");
    setError("");
    console.log("Inside Handle log in");
    try {
      const response = await logInLocal({ email, password });
      if (response.success) {
        //setIsAuthenticated(true);
        navigate("/inside");
      } else {
        setError(response.message);
        navigate('/signin');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }

  }

  async function handleGoogleSignIn(){
    console.log("Inside Handle google log in");
    window.open("http://localhost:5050/auth/google/sangrakshak","_self");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form className="p-6 bg-white rounded shadow-md flex flex-col md:flex-row items-center" style={{ width: '800px' }} onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-green-700 font-bold mb-4">Sign In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-accent w-full m-1">
          Sign In
        </button>
        {
          error && (<div role="alert" className="alert alert-warning">
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
          <span>{error}</span>
        </div>)
      }
      </div>
      <div className="border-l border-gray-300 h-auto mx-4 md:h-96"></div>
      <div className="w-full md:w-1/2 p-4">
        <button type="button" className="btn btn-accent w-full m-1 font-sans" onClick={()=>handleGoogleSignIn()}>
          Sign In with Google
        </button>

        <p className="text-black-500 p-3 font-bold"> Haven't registered?   <span><a href="/signup"><u>Sign up</u></a></span></p>
      </div>
    </form>
  </div>
  );
}