import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  projectName: string;
  typeOfProject: string;
  castingLocation: string;
  shootingLocation: string;
  role: string;
  banner: string | null;
}

const CastingCard = ({
  project,
}: {
  project: Project;
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg shadow p-4 max-w-md">
      <h3 className="text-lg font-semibold">{project.projectName}</h3>
      <p className="text-sm text-gray-600">{project.typeOfProject}</p>

      <span
        className={`inline-block mt-2 px-3 py-1 text-white text-xs rounded-full bg-green-600`}
      >
        Casting now
      </span>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>📍</span> <span>Casting: {project.castingLocation}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🎬</span> <span>Shooting: {project.shootingLocation}</span>
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
        const res = await fetch("http://localhost:5000/api/project/projects", {
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
        <a href="/profiles" className="text-red-500 hover:underline">
          Browse All Projects →
        </a>
      </div>
      <div className="grid grid-cols-1 ml-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CastingCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
};
