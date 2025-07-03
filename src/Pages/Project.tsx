import React, { useEffect, useState } from 'react';
import projectPlaceholder from '../assets/project.jpg';
import { useNavigate } from 'react-router-dom';

interface Project {
  _id: string;
  projectName: string;
  typeOfProject: string;
  description: string;
  banner: string;
}

export const Project: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/project/', {
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
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
        <div className="flex flex-col items-center justify-center text-center px-4 py-12 space-y-6">
          <div>
            <img src={projectPlaceholder} alt="No projects" className="w-24 h-24 mx-auto" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">
              You haven't created any projects yet.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Start your journey by creating your very first project and connect with top talent in the industry!
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate('/projectForm')}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200"
            >
              Create your first project
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/projects/${proj._id}`)}
          >
            <img
              src={proj.banner || projectPlaceholder}
              alt={proj.projectName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{proj.projectName}</h2>
              <p className="text-sm text-gray-600">{proj.typeOfProject}</p>
              <p className="text-sm mt-2 text-gray-700">{proj.description.slice(0, 60)}...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
