import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface Project {
  _id: string;
  projectName: string;
  typeOfProject: string;
  castingLocation: string;
  castingStart: string;
  castingEnd: string;
  shootingStart: string;
  shootingEnd: string;
  banner: string | null;
  description: string;
  role: string;
}

// helper to format date as MM/DD/YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

export const ProjectPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateProjects: Project[] | undefined = location.state?.projects;

  const [projects, setProjects] = useState<Project[]>(stateProjects || []);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeProject = projects[activeIndex];

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!stateProjects) {
      fetch("http://localhost:5000/api/project/projects", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setProjects(data.projects))
        .catch(console.error);
    }
  }, [stateProjects]);

  if (!activeProject) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading projects...</p>
      </div>
    );
  }

  const shootingRange = `${formatDate(activeProject.shootingStart)} - ${formatDate(activeProject.shootingEnd)}`;
  const castingRange = `${formatDate(activeProject.castingStart)} - ${formatDate(activeProject.castingEnd)}`;

  return (
    <div className="w-full h-full top-10 py-10 flex">
      {/* Sidebar */}
      <div className="w-[40%] h-screen bg-white border-r px-6 ml-14 py-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        <input
          type="text"
          placeholder="Search"
          className="w-full px-3 py-2 mb-6 border rounded-md"
        />

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={project._id}
              onClick={() => setActiveIndex(index)}
              className={`p-3 rounded-md cursor-pointer flex gap-4 items-center ${
                activeIndex === index
                  ? "bg-red-400 text-white"
                  : "bg-transparent text-black hover:bg-gray-100"
              }`}
            >
              <img
                src={project.banner || "https://via.placeholder.com/60"}
                alt="Banner"
                className="w-14 h-14 rounded-md object-cover flex-shrink-0"
              />
              <div>
                <p className="font-medium">{project.projectName}</p>
                <p
                  className={`text-sm ${
                    activeIndex === index ? "text-white" : "text-gray-500"
                  }`}
                >
                  {project.typeOfProject}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/projectForm')} className="mt-10 border border-red-600 text-red-600 px-4 py-2 rounded-md w-full">
          + Create new project
        </button>
      </div>

      {/* Content */}
      <div className="p-6 w-full overflow-y-auto">
        <div className="bg-[#2b2b2b] text-white rounded-xl p-6 flex gap-6 items-start shadow-md">
          <img
            src={activeProject.banner || "https://via.placeholder.com/150"}
            alt="Project Banner"
            className="w-full md:w-60 md:h-60 rounded-lg object-cover bg-neutral-800"
          />

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{activeProject.projectName}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-300">
                    {activeProject.typeOfProject}
                  </span>
                  <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Casting now
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-1.5 rounded-md font-medium">
                  Copy project link
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-sm text-white px-4 py-1.5 rounded-md font-medium">
                  Apply
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-sm mt-4 text-gray-300">
              <div>
                <p>Casting Location: {activeProject.castingLocation}</p>
                <p>Casting Dates: {castingRange}</p>
              </div>
              <div>
                <p>Shooting Location: {activeProject.castingLocation}</p>
                <p>Shooting Dates: {shootingRange}</p>
              </div>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">About the project</h3>
          <p className="mt-2 text-gray-700 text-sm leading-relaxed">
            {activeProject.description}
          </p>
        </div>

        {/* Role */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Role needed</h3>
          <p className="mt-2 text-gray-700 text-sm">{activeProject.role}</p>
        </div>

        {/* PDF Link */}
        <div className="my-6">
          <span>For more detailed information about this project, </span>
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-2 text-sm rounded-md text-red-600 hover:underline"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-xs"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
            </svg>
            <span>Click here to download the PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
