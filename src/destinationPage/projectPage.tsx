

import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Project } from "../Pages/Project";
interface Project {
  _id: string;
  projectName: string;
  typeOfProject: string;
  castingLocation: string;
  castingStart: string;
  castingEnd: string;
  shootingStart: string;
  shootingEnd: string;
  shootingLocation: string;
  bannerImageUrl: string | null;
  bannerPdfUrl: string | null;
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
  const { role } = useAuth();
  const stateProjects: Project[] | undefined = location.state?.projects;

  const [projects, setProjects] = useState<Project[]>(stateProjects || []);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");


  const handleEdit = (projectId: string) => {
    console.log("Edit", projectId);
    navigate("/projectForm?mode=edit&_id=" + projectId);

    setMenuOpen(null);
  };

  const handleDelete = async (projectId: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/project/${projectId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
        setActiveIndex(0);
        alert("Project deleted successfully");
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting project");
    }

    setMenuOpen(null);
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    };
    if (menuOpen !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  if (!activeProject) {
    return (
      <Project/>
    );
  }

  const shootingRange = `${formatDate(activeProject.shootingStart)} - ${formatDate(activeProject.shootingEnd)}`;
  const castingRange = `${formatDate(activeProject.castingStart)} - ${formatDate(activeProject.castingEnd)}`;

  if (projects.length) {
    return <div className="w-full h-full top-10 py-10 flex">
      {/* Sidebar */}
      <div className="w-[40%] h-screen bg-white border-r px-6 ml-14 py-8 overflow-y-auto ">
        <h1 className="text-2xl font-bold mb-6">Projects</h1>

        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"

        />


        <div className="divide-y divide-gray-200">
          {projects
            .filter(project =>
              project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((project, index) => (
              <div
                key={project._id}
                className={`p-3 cursor-pointer flex gap-4 items-center justify-between relative ${activeIndex === index
                  ? "bg-red-400 text-white"
                  : "bg-transparent text-black hover:bg-gray-100"
                  }`}
              >
                {/* Left side: image & text */}
                <div
                  onClick={() => setActiveIndex(index)}
                  className="flex gap-4 items-center flex-1"
                >
                  <img
                    src={project.bannerImageUrl || "https://via.placeholder.com/60"}
                    alt="Banner"
                    className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium">{project.projectName}</p>
                    <p
                      className={`text-sm ${activeIndex === index ? "text-white" : "text-gray-500"
                        }`}
                    >
                      {project.typeOfProject}
                    </p>
                  </div>
                </div>

                {/* Right side: 3-dot menu */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === index ? null : index)}
                    className="px-2 py-1 text-xl "
                  >
                    ⋮
                  </button>

                  {menuOpen === index && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md border z-10"
                    >
                      <button
                        onClick={() => handleEdit(project._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div>

        </div>
        {role === "director" && (

          <button
            onClick={() => navigate("/projectForm")}
            className="mt-10 border bg-red-600 text-white px-4 py-2 rounded-md w-full "
          >
            + Create new project
          </button>
        )}
      </div>


      {/* Content */}
      <div className="p-6 w-full overflow-y-auto">
        <div className="bg-[#2b2b2b] text-white  rounded-xl p-6 flex gap-6 items-start
         shadow-md">
          <img
            src={activeProject.bannerImageUrl || "https://via.placeholder.com/150"}
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
                <p>Shooting Location: {activeProject.shootingLocation}</p>
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
        {activeProject.bannerPdfUrl && (
          <div className="my-6">
            <span>For more detailed information about this project, </span>
            <a
              href={activeProject.bannerPdfUrl}
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
        )}
      </div>
    </div>
  }
  else {
    return <Project />
  }
};
