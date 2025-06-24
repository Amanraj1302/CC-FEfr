import React from 'react'
import project from '../assets/project.jpg'
import { useNavigate } from 'react-router-dom'
export const Project = () => {
  const navigate= useNavigate();
  return (
    <div className='w-full h-screen flex items-center justify-center '>
        <div className="flex flex-col items-center justify-center text-center px-4 py-12 space-y-6">
      
     
      <div>
        <img src={project} alt="No projects" className="w-24 h-24 mx-auto" />
      </div>

      {/* Content Section */}
      <div>
        <p className="text-lg font-medium text-gray-800">
          You haven't created any projects yet.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Start your journey by creating your very first project and connect with top talent in the industry!
        </p>
      </div>

      {/* Button Section */}
      <div>
        <button onClick={() => {navigate('/projectForm')}} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200">
          Create your first project
        </button>
      </div>

    </div>
  
        </div>
  )
}

