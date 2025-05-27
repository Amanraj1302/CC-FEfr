import React from "react";
import aaa from "../assets/aaa.jpg";
import bbb from '../assets/bbb.jpg';
import ccc from '../assets/ccc.jpg';

interface Profile {
  name: string;
  location: string;
  tags: string[];
  img: string;    
}


const profiles: Profile[] = [
  {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: aaa,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: bbb,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: ccc,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: aaa,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: bbb,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: ccc,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: aaa,
  },
   {
    name: "NAME",
    location: "Delhi,India",
    tags: ["Dance", "Web series"],
    img: bbb,
  },

];

 export const Profiles : React.FC =() => {
  return (
    <section className="px-10 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold ml-10">Featured Profiles</h1>
        <a href="/profiles" className="text-red-500 hover:underline">
          Browse All Profiles →
        </a>
      </div>
      <div className="grid grid-cols-1 ml-10 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-4">
            <img
              src={profile.img}
              className="rounded-lg h-48 w-full object-cover"
            />
            <h3 className="mt-2 font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.location}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {profile.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full"
            >
              {profile.tags}
            </span>
          ))}
        </div>

            <button className="mt-4 border border-red-500 text-red-500 px-3 py-1 rounded">
              View profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}


