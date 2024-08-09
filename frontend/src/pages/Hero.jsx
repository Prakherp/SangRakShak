import React from 'react';
import { Link } from 'react-router-dom';
import robotImage from '../assets/robot-removebg-preview.png';
import 'animate.css';

const Hero = () => {
  return (
    <div
      className="hero min-h-screen flex flex-col lg:flex-row items-center justify-between w-full z-10"
      style={{
        background: 'linear-gradient(to right, #536976, #292E49)',
      }}
      id="home"
    >
      <div className="flex flex-col items-start space-y-4">
        <div className="hero-content text-neutral-content text-left max-w-lg ml-10 lg:ml-60 lg:mt-0 mt-20">
          <h1 className="mb-8 text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn animate__delay-1s">
            WELCOME TO SANGRAKSHAK
          </h1>
        </div>
        <div className="button-group mt-8 flex flex-col lg:flex-row max-w-lg ml-40 lg:ml-80 lg:mt-0 mt-10">
          <Link to="/login">
            <button className="btn btn-neutral w-40 mb-4 lg:mb-0 lg:mr-10 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-neutral w-40 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      <div className="hero-image lg:mr-8 mt-10 lg:mt-0">
        <img
          src={robotImage}
          alt="Robot"
          className="h-100 lg:h-128 w-auto animate__animated animate__zoomIn animate__delay-2s"
        />
      </div>
    </div>
  );
};

export default Hero;
