import React from 'react'


import Hero from '../components/Hero';
import PastEvents from '../components/PastEvents';
import HeroVideoSection from '../components/VideoSection';
import AboutSection from '../components/AboutSection';
import PublicEventsShowcase from '../components/PublicEventsShowcase';

const Home = () => {
  
  return (
    <div className="overflow-hidden">
      <Hero />
   
      <AboutSection />
      <PublicEventsShowcase />
      {/* <UpcomingEvents /> */}
      <HeroVideoSection />
      <PastEvents />
    </div>
  )
}

export default Home
