import React, { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

interface Profile {
  email: string;
  name: string;
  location: string;
  tags: string[];
  img: string;
}

export const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();
  const {  userEmail  } = useAuth();
  

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artist/artists");
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

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
              src={profile.img || "/default.jpg"}
              className="rounded-lg h-48 w-full object-cover"
              alt={profile.name}
            />
            <h3 className="mt-2 font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.location}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {profile.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="mt-4 border border-red-500 text-red-500 px-3 py-1 rounded"
              onClick={() => { navigate(`/app/artistProfile/${userEmail}`); }}
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
