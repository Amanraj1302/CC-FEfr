import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Footer } from '../components/Footer'
import { Profiles } from '../components/Profiles'
import { Info } from '../components/Info'

 export const Home:React.FC = () => {
   
  return (
    <div>
             <Hero/>
              <Profiles/>
              <Projects/>
              <Info/>
              <Footer/>
    </div>
  )
}

