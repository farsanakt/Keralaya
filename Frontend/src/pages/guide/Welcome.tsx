import React from 'react'
import { Link } from 'react-router-dom';




const Welcome: React.FC = () => {


    
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://via.placeholder.com/1920x1080')`, // Replace with your background image URL
      }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-8 max-w-3xl text-center">
      
        <h1 className="text-3xl font-bold text-green-600 mb-4">Guide Verification</h1>
        
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to our platform! We are excited to have you join our community of trusted local guides. 
          To ensure the best experience for travelers, we require all guides to complete a simple verification process. 
          This helps us confirm your credentials and build a secure and reliable platform for our users.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Please click the button below to start the verification process. Follow the instructions to 
          provide the necessary information. Thank you for your cooperation and commitment to providing 
          an exceptional travel experience.
        </p>

        <Link to={'/guide/registration'}>
        
        <button
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow hover:bg-blue-700 transition duration-300"
         
        >
          Verify
        </button>
        
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
