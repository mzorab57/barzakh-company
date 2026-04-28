import React from 'react'


import Hero from '../components/Hero';
import InternationalSection from '../components/InternationalSection';
import UpcomingEvents from '../components/UpcomingEvents';
import Guests from '../components/Guests';
import PastEvents from '../components/PastEvents';
import HeroVideoSection from '../components/VideoSection';

const Home = () => {
  
  return (
    <div className="">
      <Hero />
      <InternationalSection />
      <UpcomingEvents />
      <Guests />
      <HeroVideoSection />
      <PastEvents />
    </div>
  )
}

export default Home