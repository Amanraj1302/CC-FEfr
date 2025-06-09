import React from "react";

interface Casting {
  title: string;
  type: string;
  status: string;
  statusColor: string;
  location: string;
  date: string;
  role: string;
}

const castings: Casting[]= [
  {
    title: "Amazon & Flipkart print shoot audition",
    type: "Advertisement shoot",
    status: "Casting now",
    statusColor: "bg-green-600",
    location: "Borivali, Maharashtra",
    date: "25/05/2025 - 05/08/2025",
    role: "Lead supporting, Male (23-30 Years), (Haryanvi)",
  },
  
  {
    title: "Amazon & Flipkart print shoot audition",
    type: "Advertisement shoot",
    status: "Casting now",
    statusColor: "bg-green-600",
    location: "Borivali, Maharashtra",
    date: "25/05/2025 - 05/08/2025",
    role: "Lead supporting, Male (23-30 Years), (Haryanvi)",
  },
  {
    title: "Amazon & Flipkart print shoot audition",
    type: "Advertisement shoot",
    status: "Casting now",
    statusColor: "bg-green-600",
    location: "Borivali, Maharashtra",
    date: "25/05/2025 - 05/08/2025",
    role: "Lead supporting, Male (23-30 Years), (Haryanvi)",
  },
];


const CastingCard = ({ title, type, status, statusColor, location, date, role }:
  { title: string; type: string; status: string; statusColor: string; location: string; date: string; role: string }) => (
  <div className="bg-white border rounded-lg shadow p-4 max-w-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{type}</p>
    
    <span className={`inline-block mt-2 px-3 py-1 text-white text-xs rounded-full ${statusColor}`}>
      {status}
    </span>

    <div className="mt-4 space-y-2 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <span>📍</span> <span>Casting: {location}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>📅</span> <span>Casting: {date}</span>
      </div>
    </div>

    <hr className="my-4" />

    <h4 className="font-semibold">Roles Needed</h4>
    <div className="mt-2 inline-block border text-red-500 border-red-500 px-3 py-1 rounded-full text-xs">
      {role}
    
    </div>

    <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-md">View details</button>
  </div>
);


 export const Projects: React.FC=() => {
  return (
    <section className="px-10 py-12 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold ml-10">Projects</h1>
        <a href="/profiles" className="text-red-500 hover:underline">
          Browse All Projects →
        </a>
      </div>
      <div className="grid grid-cols-1 ml-10 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {castings.map((casting, index) => (
          <CastingCard key={index} {...casting} />
        ))}
      </div>
    </section>
  );
}



