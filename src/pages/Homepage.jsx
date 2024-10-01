import React from 'react'


import NavBar from '../components/Navbar'
import HeroSection from '../components/HomePage/HeroSection'
import Features from '../components/HomePage/Features'
import HowItWorks from '../components/HomePage/HowItWorks'
import Testimonial from '../components/HomePage/Testimonial'
import CallToAction from '../components/HomePage/CallToAction'
import AboutUs from '../components/HomePage/AboutUs'
import Faq from '../components/HomePage/Faq'
import ContactUs from '../components/HomePage/ContactUs'
import Footer from '../components/HomePage/Footer'

const Homepage = () => {
  return (
      <>
      <main className='px-2 bg-[#FDFDFD]'>
      <NavBar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonial />
      <CallToAction />
      <AboutUs />
      <Faq />
      <ContactUs />
      <Footer />



      </main>

      </>
  )
}

export default Homepage