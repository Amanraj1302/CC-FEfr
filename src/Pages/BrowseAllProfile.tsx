import React, { useEffect, useState } from "react";

interface Profile {
  email: string;
  name: string;
  _id: string;
  location: string;
  tags: string[];
  img: string;
}

export const BrowseAllProfile: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

 
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

  
 const filteredProfiles = profiles.filter(profile =>
  (profile.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="w-full min-h-screen bg-gray-50 px-10 py-12">
      <div className="flex flex-col mb-6 mx-7 px-3 mt-3 ">
        <h1 className="text-2xl font-bold mb-2">All Profiles</h1>
        <p className="text-gray-600 mb-6">Discover talented artists and performers</p>

        {/*  Search Box */}
        <div className="w-full max-w-md mb-4">
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/*  Count */}
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{filteredProfiles.length}</span> profiles
        </p>
      </div>

      {/* Profiles grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-7 px-3">
        {filteredProfiles.map((profile, index) => (
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
              onClick={() => {
                window.location.href = `/app/artistProfile/${profile._id}`;
              }}
            >
              View profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
