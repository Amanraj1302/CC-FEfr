import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false, 
    pauseOnHover: false,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <div
              className=" h-screen bg-cover bg-center "
              style={{ backgroundImage: `url(${img})` }}
            >
            </div>
          </div>
        ))}
      </Slider>    
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start  px-10 md:px-20 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Where Talent Meets Opportunity
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Connect actors with casting directors seamlessly. <br />
            Build your profile, find your next role, or discover <br />
            the perfect talent for your production
          </p>
          <button
            onClick={() => navigate("/app/dashboard/0")}
            className="bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-2 px-6 rounded hover:opacity-90 transition"
          >
            Create Your Profile
          </button>
        </div>
      </div>
    </div>
  );
};
