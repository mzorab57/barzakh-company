import React from 'react'


import Hero from '../components/Hero';
import InternationalSection from '../components/InternationalSection';
import UpcomingEvents from '../components/UpcomingEvents';
import Guests from '../components/Guests';
import PastEvents from '../components/PastEvents';
import HeroVideoSection from '../components/VideoSection';
import AboutSection from '../components/AboutSection';

const Home = () => {
  
  return (
    <div className="">
      <Hero />
      {/* <InternationalSection /> */}
   
      <AboutSection />
      <UpcomingEvents />
      <Guests />
      <HeroVideoSection />
      <PastEvents />
    </div>
  )
}

export default Home
