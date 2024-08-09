import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import robotImage from '../assets/robot-removebg-preview.png';
import 'animate.css';

const Hero = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Define a media query for small screens
    const mediaQuery = window.matchMedia('(max-width: 450px)'); // 640px corresponds to "sm" in Tailwind CSS

    // Handler to call on screen size change
    const handleMediaQueryChange = (e) => {
      setIsSmallScreen(e.matches);
    };

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Listen for screen size changes
    mediaQuery.addListener(handleMediaQueryChange);
  }, []);

  return (
    <div
      className="hero min-h-screen flex flex-col overflow-y-auto lg:flex-row items-center justify-between w-full z-10"
      style={{
        background: 'linear-gradient(to right, #536976, #292E49)',
      }}
      id="home"
    >
      <div className="flex justify-center h-screen">
        <div className="flex justify-center flex-col items-start space-y-4">
          <div className="hero-content text-neutral-content text-left max-w-lg ml-10 lg:ml-60 lg:mt-0 mt-20 ">

            {isSmallScreen ?(
              <h1 className="mb-8 text-3xl font-bold animate__animated animate__fadeIn animate__delay-1s">
              WELCOME TO SANGRAKSHAK
            </h1> 
            )
            :(<h1 className="mb-8 text-5xl lg:text-6xl font-bold animate__animated animate__fadeIn animate__delay-1s container mx-auto">
              WELCOME TO SANGRAKSHAK
            </h1>)}
          </div>
          <div className='flex justify-center container mx-auto'>
            <div className="button-group mt-8 flex flex-col lg:flex-row max-w-lg  lg:ml-60 lg:mt-0 mt-10">
              <Link to="/login">
                <button className="btn btn-neutral w-40 mb-4 lg:mb-0 mr-10 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
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
        </div>
      </div>
      {true && (<div className="hero-image lg:mr-8 mt-10 lg:mt-0">
        <img
          src={robotImage}
          alt="Robot"
          className="h-100 lg:h-128 w-auto animate__animated animate__zoomIn animate__delay-2s"
        />
      </div>)}
    </div>
  );
};

export default Hero;
