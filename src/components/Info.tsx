import React from 'react'
import dd from '../assets/dd.jpg';
import ee from '../assets/ee.jpg';
import ff from '../assets/ff.jpg';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Create Your Profile",
    description:
      "Actors can showcase their talents, experience, photos, and reels. Stand out with a comprehensive profile that highlights your unique abilities.",
    icon: dd, 
  },
   {
    title: "Create Your Profile",
    description:
      "Actors can showcase their talents, experience, photos, and reels. Stand out with a comprehensive profile that highlights your unique abilities.",
    icon: ee, 
  },
   {
    title: "Create Your Profile",
    description:
      "Actors can showcase their talents, experience, photos, and reels. Stand out with a comprehensive profile that highlights your unique abilities.",
    icon:ff, 
  },
  
];

const FeatureCard = ({ icon, title, description }: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="text-center max-w-xs mx-auto">
    <img src={icon} alt={title} className="mx-auto mb-4 w-14 h-14" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
  </div>
);

 export const Info:React.FC=() => {
  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center mb-10">See how Castconnect Works for you</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}


