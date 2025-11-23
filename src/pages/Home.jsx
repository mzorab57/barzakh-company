import React from 'react'


import HeroSlider from '../components/HeroSlider';
import InternationalSection from '../components/InternationalSection';
import UpcomingEvents from '../components/UpcomingEvents';
import Guests from '../components/Guests';
import PastEvents from '../components/PastEvents';
import HeroVideoSection from '../components/VideoSection';

const Home = () => {
  
  return (
    <div className="">
      <HeroSlider />
      <InternationalSection />
      <UpcomingEvents />
      <Guests />
      <HeroVideoSection />
      <PastEvents />
    </div>
  )
}

export default Home