import React from 'react';

const IntroPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800  py-4 px-4">
      <div className="flex flex-col max-w-[800px] items-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-1 animate-slide-in">
        <div className="card-body p-6 md:p-8 flex flex-col">
          <h1 className="card-title text-3xl md:text-4xl lg:text-5xl font-bold text-center text-base-100 mb-2">
            Welcome to Sangrakshak
          </h1>
          <div className="text-base-100 mt-1">
            <p className="mb-2">
              <span className="text-blue-600 font-bold">Sangrakshak</span> is a groundbreaking chatbot designed to empower Indian women facing legal challenges. We understand the complexities and sensitivities involved in legal matters, and we are here to provide you with the support you need.
            </p>
            <p className="mb-2">
              As a confidential ally, <span className="text-blue-600 font-bold">Sangrakshak</span> offers guidance on legal rights, procedures, and support resources. Our aim is to help you navigate through the legal landscape with confidence and ease.
            </p>
            <p className="mb-2">
              For now, our chatbot is equipped to answer only direct queries related to legal matters. We do not support chit-chat conversations such as "Hi", "Hello", etc. This ensures that we stay focused on providing you with accurate and relevant information.
            </p>
            <p>
              Thank you for choosing <span className="text-blue-600 font-bold">Sangrakshak</span> as your trusted legal companion. We are here to assist you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
