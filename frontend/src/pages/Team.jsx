import React from 'react';

const Team = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12">
      <section id="team" className="w-full md:w-3/4 lg:w-2/3 bg-white shadow-xl rounded-lg border border-gray-300 p-8 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 text-base-100 transition-colors duration-300 ease-in-out hover:text-blue-600">Team</h2>
        <div className="team-members grid gap-8 lg:grid-cols-2">
          <div className="team-member p-6 bg-base-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600">Prakher Pandey</h3>
            <p className="text-lg text-wihte-700 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{textAlign: "justify"}}>
           I am currently pursuing Master of Computer Applications (Software Engineering) from USICT, GGSIPU.
              The concept of Sangrakshak was something I envisioned as a tool to empower Indian women facing legal challenges. 
              My primary contribution to Sangrakshak lies in developing the backend functionalities, the response generation model, and overseeing the entire deployment of the website. 
              I have focused on creating a robust and efficient server-side infrastructure, ensuring the integration and smooth operation of the response generation model. 
              This involved managing data persistence, optimizing backend processes, and handling the deployment to provide accurate and relevant legal guidance.
            </p>
          </div>
          <div className="team-member p-6 bg-base-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
            <h3 className="text-2xl font-semibold mb-4 text-white-800 transition-colors duration-300 ease-in-out hover:text-blue-600">Udit Kaushish</h3>
            <p className="text-lg text-white-700 transition-colors duration-300 ease-in-out hover:text-blue-600" style={{textAlign: "justify"}}>
            I am currently pursuing Master of Computer Applications (Software Engineering) from USICT, GGSIPU. 
            I have led the frontend development of Sangrakshak and in the development of the response generation model, crafting a user-friendly and intuitive interface to enhance the overall user experience. 
            By ensuring seamless interaction with the backend response model, I have enabled our chatbot to deliver prompt and precise legal support. 
            My expertise in frontend technologies has resulted in a responsive design, making it easy for users to navigate and access legal assistance. 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
