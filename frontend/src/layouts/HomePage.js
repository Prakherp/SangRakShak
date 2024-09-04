import React,{useEffect} from 'react';
import { Element } from 'react-scroll';
import Navbar from '../components/Navbar';
import Hero from '../pages/Hero';
import About from '../pages/AboutUs';
import Team from '../pages/Team';
import Footer from '../components/Footer';

const HomePage = () => {
  useEffect(()=>{
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({question: "Hi"}),
  }
  fetch(process.env.REACT_APP_PYTHON_BACKEND_URL, options);
    fetch(process.env.REACT_APP_BACKEND_URL);
  });
  return (
    <div>
      <Navbar/>
      <Element name="home">
        <Hero />
      </Element>
      <Element name="about">
        <About />
      </Element>
      <Element name="team">
        <Team />
      </Element>
      <Footer />
    </div>
  );
};

export default HomePage;
