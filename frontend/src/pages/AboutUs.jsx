import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12">
      <div className="card w-full md:w-3/4 lg:w-2/3 xl:w-1/2 bg-base-100 shadow-xl rounded-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <div className="card-body p-8">
          <h2 className="card-title text-4xl lg:text-5xl font-bold text-center mb-6 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{textAlign: "center"}}>
            About Us
          </h2>
          <p className="text-lg leading-relaxed text-white-700 mb-4 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{textAlign: "justify"}}>
            Sangrakshak, a one-of-a-kind chatbot, is designed to empower Indian women navigating legal challenges. Our mission is to ensure that every woman in India has access to anonymous and approachable legal support. Sangrakshak focuses on empowering women facing issues like domestic violence, sexual harassment, and privacy violations. Think of Sangrakshak as your confidential ally. We provide information on legal rights, procedures, and support resources, all while keeping your privacy and security at the forefront.
          </p>
          <div className="flex justify-center mt-6">
            <a href="/login" className="btn btn-primary hover:bg-blue-700 transition-colors duration-300 ease-in-out ">TRY NOW!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
