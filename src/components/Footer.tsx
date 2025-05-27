import React from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export const Footer:React.FC =() => {
  return (
    <footer className="bg-black text-white py-10 px-8 ">
      <div className="grid grid-cols-2 ml-10 pl-4 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl">CastConnect</h3>
          <p className="mt-2">Where Talent Meets Opportunity</p>
          <div className="flex gap-4 mt-4 ">
            <a href="#"><FaInstagram className="text-xl hover:text-gray-400" /></a>
            <a href="#"><FaFacebookF className="text-xl hover:text-gray-400" /></a>
            <a href="#"><FaLinkedinIn className="text-xl hover:text-gray-400" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">For Casting Directors</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>Post projects</li>
            <li>Search Talent</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">For Actors</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>Create profile</li>
            <li>Browse projects</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li>Home</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}


