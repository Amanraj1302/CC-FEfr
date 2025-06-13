import React from 'react';
import imgUrl from '../assets/img.jpg';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
 const navigate = useNavigate();
    return (
    <div
      className="w-full h-screen bg-cover bg-center relative flex items-center justify-start "
      style={{ backgroundImage: `url(${imgUrl})` }}
    > 
      <div className="absolute inset-0 bg-black bg-opacity-20 " />

      <div className="relative z-10 max-w-3xl pl-10 pr-6 md:pl-20 text-white">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Where Talent Meets Opportunity
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Connect actors with casting directors seamlessly. <br />
          Build your profile, find your next role, or discover <br />
          the perfect talent for your production
        </p>
        <button  onClick={() => {
              navigate("/app/dashboard/0");
            }}className="bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-2 px-6 rounded hover:opacity-90 transition">
          Create Your Profile
        </button>
      </div>
    </div>
  );

};
