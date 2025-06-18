import React from "react";
import { FaInstagram, FaXTwitter, FaYoutube, FaLinkedin,} from "react-icons/fa6";
import { ClipboardCopyIcon, ExternalLinkIcon, DownloadIcon, ZoomInIcon } from "@radix-ui/react-icons";
import { IoVideocam } from "react-icons/io5";
import aa from "../../src/assets/aaa.jpg";
import { FaMicrophone, FaPhotoVideo, FaUserCircle } from "react-icons/fa";

const samplePhotos = [aa, aa, aa, aa, aa, aa];
const skillsList = ["Dance", "Horse riding", "Music", "Singing", "Driving"];
const about = `A multi-talented artist with expertise in photography and fashion styling. A visionary creative director with a keen sense of modern trends and aesthetics.`;
const monologues = [
  { language: "Hindi", url: "https://www.youtube.com/embed/3AtDnEC4zak" },
  { language: "Punjabi", url: "https://www.youtube.com/embed/3AtDnEC4zak" },
  { language: "Tamil", url: "https://www.youtube.com/embed/3AtDnEC4zak" },
  { language: "English", url: "https://www.youtube.com/embed/3AtDnEC4zak" },
];

const ProfilePage = () => {
  const photos = samplePhotos;
  const handleCopy = () => {
    navigator.clipboard.writeText("https://yourdomain.com/sophia-sahili");
  };

  return (
    <div className="flex flex-col items-center pt-20 px-4 ml-14 mr-14">
      {/* Profile Card */}
      <div className="w-full bg-black/30 rounded-3xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 mb-6 ">
       
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img src={aa} alt="Profile" className="w-32 h-32 rounded-xl object-cover" />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Sophia Sahili</h2>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2">
              {["Actress", "Dancer", "Model"].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-300">📍 Chandigarh, Punjab</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleCopy}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2"
          >
            <ClipboardCopyIcon className="w-4 h-4" />
            Copy profile link
          </button>
          <div className="flex gap-3 text-2xl">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaXTwitter /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left Section */}
        <div className="flex-1 space-y-8">
          <div>
            <div className="flex items-center mb-2">
              <FaUserCircle className="text-red-600 text-xl mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
            </div>
            <p className="text-gray-700 text-sm md:text-base">{about}</p>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <span className="text-red-600 text-xl mr-2">★</span>
              <h2 className="text-lg font-semibold text-gray-900">Skills & Specialties</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillsList.map((skill, idx) => (
                <span
                  key={idx}
                  className="border border-red-500 text-red-600 px-4 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaPhotoVideo className="text-red-600 text-xl" /> Photos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden group">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-auto object-cover rounded-xl shadow-md"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 rounded-full p-1 group-hover:scale-110 transition">
                    <ZoomInIcon className="w-4 h-4 text-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <IoVideocam className="text-red-600 text-xl" /> Video reel
            </h2>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/3AtDnEC4zak?autoplay=1&mute=1&loop=1&playlist=3AtDnEC4zak"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-80 rounded-lg"
            ></iframe>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col items-center gap-6 max-w-md w-full ">
          <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm space-y-2  transform hover:scale-[1.01] transition-transform duration-200">
            {[
              ["Age:", "26"],
              ["Height:", "5'7\" (170 cm)"],
              ["Gender:", "Female"],
              ["Languages:", "English, Hindi"],
              ["Screen Age:", "10 years"],
              ["Current city:", "Chandigarh"],
              ["Phone (WhatsApp):", "+91 2098745372"],
              ["Phone (Calling):", "+91 094758294"],
              ["Email:", "abc@email.com"],
            ].map(([label, value], i) => (
              <div className="flex justify-between pb-3 border-b border-gray-200" key={i}>
                <span className="font-semibold ">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm  transform hover:scale-[1.01] transition-transform duration-200">
            <h3 className="font-semibold mb-2">Past experience:</h3>
            <div className="text-red-600 space-y-2">
              <div>
                <a href="#" className="underline">Lost in time of journey</a>
                <p className="text-gray-700 text-xs">Role – Lead</p>
              </div>
              <div className="border-t pt-2">
                <a href="#" className="underline">Urban Stories</a>
                <p className="text-gray-700 text-xs">Role – Lead</p>
              </div>
            </div>
          </div>

          <div className="w-full bg-white rounded-xl shadow-md p-4 text-sm  transform hover:scale-[1.01] transition-transform duration-200">
            <h3 className="font-semibold mb-2">Monologue</h3>
            <div className="text-red-600 space-y-2">
              <div>
                <a href="#" className="flex items-center gap-1 underline">
                  Language – Haryanvi <ExternalLinkIcon />
                </a>
                <p className="text-gray-700 text-xs">Youtube link</p>
              </div>
              <div className="border-t pt-2">
                <a href="#" className="flex items-center gap-1 underline">
                  Language – Rajasthani <ExternalLinkIcon />
                </a>
                <p className="text-gray-700 text-xs">Youtube link</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 border border-red-600 text-red-600 px-4 py-2 rounded-full text-sm hover:bg-red-50">
            <DownloadIcon />
            Download profile
          </button>
        </div>
      </div>

      {/* Bottom Monologues */}
      <div className="w-full mt-12">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FaMicrophone className="text-red-600 text-xl" /> Monologue
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monologues.map((item, index) => (
            <div key={index} className="shadow-md border p-4 rounded-lg">
              <h2 className="text-lg text-red-600 font-semibold mb-2">{item.language} Monologue</h2>
              <iframe
                src={`${item.url}?&mute=1&loop=1&playlist=${item.url.split("/embed/")[1]}`}
                title={`${item.language} YouTube video`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-64 md:h-80 rounded-lg"
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
