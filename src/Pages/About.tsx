import React, { useEffect } from 'react'
import about1 from '../assets/about/about1.jpg'
import about2 from '../assets/about/about2.jpg'
import about3 from '../assets/about/about3.jpg'
import about4 from '../assets/about/about4.jpg'
import about5 from '../assets/about/about5.jpg'
import about6 from '../assets/about/about6.jpg'
import about7 from '../assets/about/about7.jpg'
import about8 from '../assets/about/about8.jpg'
import about10 from '../assets/about/about10.jpg'
export const About: React.FC = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []); 

    const whoWeServeData = [
        {
            title: "Casting Directors & Producers",
            description: "Post jobs, find top talent, and manage your team with ease.",
            image: about3,
        },
        {
            title: "Actors, Performers & Crew",
            description: "Create standout profiles, showcase your work, and get discovered.",
            image: about2,
        },
        {
            title: "Agencies & Studios",
            description: "Streamline hiring, communication, and production logistics all in one place.",
            image: about1,
        },
    ];
    return (
        <div className='w-full items-center mx-auto px-12 py-8'>

            <div className="flex w-full flex-row items-center justify-between px-6 py-12 mt-12 rounded-xl ">
                {/* Left: Text Content */}
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to
                    </h1>
                    <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                        Cast-Crew
                    </h1>
                    <h1 className="text-lg font-semibold text-gray-700">Where Talent Meets Opportunity.</h1>
                </div>

                {/* Right: Image Grid */}
                <div className="grid grid-cols-3 w-[50%] gap-4">
                    <img src={about6} alt="img1" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={about5} alt="img2" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={about4} alt="img3" className="rounded-lg shadow-md object-cover w-full h-32 " />
                    <img src={about10} alt="img4" className="rounded-lg shadow-md object-cover w-full h-48 col-span-2" />
                    <img src={about5} alt="img5" className="rounded-lg shadow-md object-cover w-full h-48 " />
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
                    <img src={about8} alt="img1" className="rounded-lg shadow-md object-cover w-[300px] h-[300px]" />

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
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                                </path></svg>
                        </div>
                        <div className=" relative z-10">
                            <h4 className=" text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>
                        </div>
                    </div>
                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300">
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                </path></svg>
                        </div>
                        <div className=" relative z-10">
                            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>                     </div>
                    </div>
                    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300">
                        </div>
                        <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-700 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                </path></svg>
                        </div>
                        <div className=" relative z-10">
                            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">Smart Matchmaking</h4>
                            <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>Our platform intelligently connects projects with the right people.</p>                     </div>
                    </div>
                </div>
            </div>
            {/* Who We Serve Section */}
            <div className="flex w-full flex-col justify-between px-6 py-12 gap-10 mt-7 mb-5 bg-white  rounded-xl ">
                <h3 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
                    Who We Serve
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {whoWeServeData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border-2 border-grey-100 overflow-hidden p-4 "
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="rounded-lg mb-4 w-full h-60 object-cover"
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

