import React from 'react'
import aaa from '../assets/aaa.jpg'
export const About: React.FC = () => {
    const whoWeServeData = [
        {
            title: "Casting Directors & Producers",
            description: "Post jobs, find top talent, and manage your team with ease.",
            image: aaa,
        },
        {
            title: "Actors, Performers & Crew",
            description: "Create standout profiles, showcase your work, and get discovered.",
            image: aaa,
        },
        {
            title: "Agencies & Studios",
            description: "Streamline hiring, communication, and production logistics all in one place.",
            image: aaa,
        },
    ];
    return (
        <div className='w-full flex-row items-center  mx-auto px-12 py-8  border-2 border-red-600'>

            <div className="flex w-full flex-row items-center justify-between px-6 py-12 gap-10 mt-12 rounded-xl  ">
                {/* Left: Text Content */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                        Cast Crew
                    </h1>
                    <h1 className="text-lg font-semibold text-gray-700">Where Talent Meets Opportunity.</h1>
                </div>

                {/* Right: Image Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <img src={aaa} alt="img1" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={aaa} alt="img2" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={aaa} alt="img3" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={aaa} alt="img4" className="rounded-lg shadow-md object-cover w-full h-48 col-span-2" />
                    <img src={aaa} alt="img5" className="rounded-lg shadow-md object-cover w-full h-48 " />
                </div>
            </div>
            <p className="text-lg font-semibold mt-10 mb-10 text-gray-600 mx-7">At Cast-Crew.com, we’re reimagining how creative professionals connect,
                collaborate, and create. Whether you're casting for your next big project
                or looking to showcase your skills as a performer or crew member,
                we provide a seamless platform that brings the entire entertainment ecosystem together.</p>

            <div className="flex w-full flex-row items-center justify-between px-6 py-12 gap-10 mt-7 mb-5 bg-white rounded-xl">
                {/* Left: Text Content */}
                <div className="w-[50%] ">
                    <h1 className="text-3xl md:text-5xl text-red-600 font-bold mb-4">
                        Our Mission
                    </h1>
                    <p className="text-lg mt-10 text-gray-600 ">We aim to empower artists,
                        technicians, and storytellers by giving them the tools and visibility
                        they need to thrive. From indie filmmakers and stage
                        directors to makeup artists and cinematographers,
                        we help you find the right people—and the right projects.</p>
                </div>

                {/* Right: Image Grid */}
                <div className="flex justify-end">
                    <img src={aaa} alt="img1" className="rounded-lg shadow-md object-cover w-[300px] h-[300px]" />

                </div>
            </div>
            <div className="flex w-full flex-col  justify-between px-6  gap-10 mt-7 mb-5 bg-white rounded-xl  ">
                <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-4 ">
                    Why Cast-Crew.com?
                </h3>
                <div className="flex flex-row items-center gap-4 ">

                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300">
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">

                        </div>
                        <div className=" relative z-10">
                            <h4 className=" text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>                     </div>
                    </div>
                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300">
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">

                        </div>
                        <div className=" relative z-10">
                            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>                     </div>
                    </div>
                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300">
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-700 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">

                        </div>
                        <div className=" relative z-10">
                            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>                     </div>
                    </div>
                </div>
            </div>
            {/* Who We Serve Section */}
            <div className="flex w-full flex-col justify-between px-6 py-12 gap-10 mt-7 mb-5 bg-white rounded-xl ">
                <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
                    Who We Serve
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {whoWeServeData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden p-4 hover:scale-[1.02] transition"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="rounded-lg mb-4 w-full h-48 object-cover"
                            />
                            <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-700">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>



    )
}

