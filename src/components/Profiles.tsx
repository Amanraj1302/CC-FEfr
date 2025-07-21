import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Profile {
  email: string;
  name: string;
  _id: string;
  location: string;
  tags: string[];
  img: string;
}

export const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const BASE_URL = process.env.REACT_APP_SERVER_URL;
        const response = await fetch(`${BASE_URL}/api/artist/artists`);
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
        <a href="/all-profiles" className="text-red-500 hover:underline">
          Browse All Profiles →
        </a>
      </div>
      <div className="grid grid-cols-1 ml-10 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.slice(0, 8).map((profile, index) => (
          <div key={profile._id} className="bg-white rounded-xl shadow p-4">
            <img
              src={profile.img || "/default.jpg"}
              className="rounded-lg h-48 w-full fit-cover"
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
              onClick={() => {
                navigate(`/app/artistProfile/${profile._id}`);
              }}
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
