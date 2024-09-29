import React from 'react'
import NavBar from '../components/Navbar'
import HeroSection from '../components/HomePage/HeroSection'
import Features from '../components/HomePage/Features'

const Homepage = () => {
  return (
      <>
      <main className='px-2 bg-[#FDFDFD]'>
      <NavBar />
      <HeroSection />
      {/* <Features /> */}
      </main>

      </>
  )
}

export default Homepage