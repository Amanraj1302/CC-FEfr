import React, { useEffect, useState } from 'react';

export const ProjectPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects = [
    {
      title: 'Amazon & Flipkart print shoot audition',
      subtitle: 'Advertisement shoot',
      status: 'Casting now',
      statusColor: 'green',
      image: 'https://via.placeholder.com/150',
      castingLocation: 'Borivali, Maharashtra',
      shootingLocation: 'NY City, USA',
      castingDate: '25/05/2025 – 25/08/2025',
      shootingDate: '20/08/2025 – 20/01/2026',
      about: 'This is an advertisement shoot for Amazon and Flipkart products. It involves e-commerce props and indoor studio setup.',
      role: 'Lead supporting, Male (23–30 Years), (Haryanvi)',
    },
    {
      title: 'Castings for zee tv show',
      subtitle: 'Acting & Advertisement shoot',
      status: 'Casting soon',
      statusColor: 'yellow',
      image: 'https://via.placeholder.com/150',
      castingLocation: 'Bihar',
      shootingLocation: 'Hisar, Haryana',
      castingDate: '07/07/2025 – 14/07/2025',
      shootingDate: '15/07/2025 – 30/07/2025',
      about: 'TV drama casting for daily soap series on Zee TV. Seeking multiple age groups.',
      role: 'Main male role, age 30–40, must be fluent in Hindi.',
    },
    {
      title: 'Kids ad audition for tv',
      subtitle: 'Acting & Advertisement shoot',
      status: 'Casting open',
      statusColor: 'green',
      image: 'https://via.placeholder.com/150',
      castingLocation: 'Mumbai',
      shootingLocation: 'Goa',
      castingDate: '01/08/2025 – 10/08/2025',
      shootingDate: '12/08/2025 – 25/08/2025',
      about: 'Audition for a popular kids’ toy ad campaign. Outdoor fun theme.',
      role: 'Boy or Girl, age 5–10, expressive and playful.',
    },
  ];

  const activeProject = projects[activeIndex];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-full top-10 py-10 flex">
      {/* Fixed Sidebar */}
      <div className="w-[40%] h-screen left-0 top-10 bg-white border-r px-6 py-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        {/* Search Box */}
        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 mb-6 border rounded-md"
        />

        {/* Projects List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`p-3 rounded-md cursor-pointer ${activeIndex === index
                  ? 'bg-red-600 text-white'
                  : 'bg-transparent text-black hover:bg-gray-100'
                }`}
            >
              <p className="font-medium">{project.title}</p>
              <p
                className={`text-sm ${activeIndex === index ? 'text-white' : 'text-gray-500'
                  }`}
              >
                {project.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Create Button */}
        <button className="mt-10 border border-red-600 text-red-600 px-4 py-2 rounded-md w-full">
          + Create new project
        </button>
      </div>

      {/* Right Content */}
      <div className="p-6 w-full overflow-y-auto">
        {/* Card Container */}
        <div className="bg-[#2b2b2b] text-white rounded-xl p-6 flex gap-6 items-start shadow-md relative">
          {/* Left Image */}
          <img
            src={activeProject.image}
            alt="Audition"
            className="hidden md:flex w-44 h-44 rounded-lg overflow-hidden 
            flex-shrink-0 items-center justify-center bg-neutral-800"
          />

          {/* Right Content */}
          <div className="flex-1 space-y-2">
            {/* Title + Badge + Buttons */}
            <div className="flex justify-between items-start w-full">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{activeProject.title}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-300">
                    {activeProject.subtitle}
                  </span>
                  <span
                    className={`${activeProject.statusColor === 'yellow'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-600 text-white'
                      } text-xs font-medium px-3 py-1 rounded-full`}
                  >
                    {activeProject.status}
                  </span>
                </div>
              </div>

              {/* Top Right Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-1.5 rounded-md font-medium">
                  Copy project link
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2"
                    />
                  </svg>
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-1.5 rounded-md font-medium">
                  Apply
                </button>
              </div>
            </div>

            {/* Location & Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm mt-4 text-gray-300">
              <div className=" mt-4 items-center">
                <span>🎬</span>
                <span>Casting: {activeProject.castingLocation}</span>
              <br />
                <span>📅</span>
                <span>Casting: {activeProject.castingDate}</span>
             
              </div>
              <div className="mt-4 items-center">
                <span>📍</span>
                <span>Shooting: {activeProject.shootingLocation}</span>
              <br />
                <span>📅</span>
                <span>Shooting: {activeProject.shootingDate}</span>
              
              </div>
            </div>
          </div>
        </div>

        {/* About the project */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">About the project</h3>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            {activeProject.about}
          </p>
        </div>

        {/* Role needed */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Role needed</h3>
          <p className="mt-2 text-gray-700 text-sm">{activeProject.role}</p>
        </div>
      </div>
    </div>
  );
};
