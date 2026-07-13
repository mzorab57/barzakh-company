import React from 'react'


import Hero from '../components/Hero';
import UpcomingEvents from '../components/UpcomingEvents';
import PastEvents from '../components/PastEvents';
import HeroVideoSection from '../components/VideoSection';
import AboutSection from '../components/AboutSection';

const Home = () => {
  
  return (
    <div className="overflow-hidden">
      <Hero />
   
      <AboutSection />
      <UpcomingEvents />
      <HeroVideoSection />
      <PastEvents />
    </div>
  )
}

export default Home
