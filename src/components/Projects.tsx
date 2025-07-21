import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  projectName: string;
  typeOfProject: string;
  castingLocation: string;
  shootingStart: string; 
  shootingEnd: string; 
  shootingLocation: string;  
  castingStart: string;
  castingEnd: string; 
  role: string;
  banner: string | null;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const CastingCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();

  const shootingRange = `${formatDate(project.shootingStart)} - ${formatDate(project.shootingEnd)}`;

  return (
    <div className="bg-white border rounded-lg shadow p-4 max-w-md">
      <h3 className="text-lg font-semibold">{project.projectName}</h3>
      <p className="text-sm text-gray-600">{project.typeOfProject}</p>

      <span
        className="inline-block mt-2 px-3 py-1 text-white text-xs rounded-full bg-green-600"
      >
        Casting now
      </span>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>📍</span> <span>Casting: {project.castingLocation}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎬</span> <span>Shooting: {shootingRange}</span>
        </div>
      </div>

      <hr className="my-4" />

      <h4 className="font-semibold">Roles Needed</h4>
      <div className="mt-2 inline-block border text-red-500 border-red-500 px-3 py-1 rounded-full text-xs">
        {project.role}
      </div>

      <button
        onClick={() => navigate("/projectPage")}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded-md"
      >
        View details
      </button>
    </div>
  );
};

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_SERVER_URL;
        const res = await fetch(`${BASE_URL}/api/project/projects`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects);
        } else {
          console.error("Failed to fetch projects", data);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>No projects found. Please create a project.</p>
      </div>
    );
  }

  return (
    <section className="px-10 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold ml-10">Projects</h1>
        <a href="/projectPage" className="text-red-500 hover:underline">
          Browse All Projects →
        </a>
      </div>
      <div className="grid grid-cols-1 ml-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.slice(0, 6).map((project) => (
          <CastingCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
