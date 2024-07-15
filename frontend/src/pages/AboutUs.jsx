import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about">
      <div className="box">
        <h1 className="aboutheading"><u>About Us</u></h1>
        <p className="boxcontent">
        We are the passionate team behind Sangrakshak, a one-of-a-kind chatbot designed to empower Indian women navigating legal challenges. Our mission is to ensure that every woman in India has access to anonymous and approachable legal support. Sangrakshak focuses on empowering women facing issues like domestic violence, sexual harassment, and privacy violations. Think of Sangrakshak as your confidential ally. We provide information on legal rights, procedures, and support resources, all while keeping your privacy and security at the forefront.
        </p>
      </div>
      <div className="aboutimage">
        <img src={'https://img.freepik.com/free-photo/view-hands-with-fists-up-womens-day-celebration_23-2151257715.jpg?ga=GA1.1.61862480.1720010278&semt=ais_user'} alt="chess" className="chessimage"/>
      </div>
    </div>
  );
};

export default AboutUs;
