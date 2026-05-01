import React, { useState, useEffect, useRef } from 'react';
import './Guests.css';

const guests = [
  { name: 'Mufti Menk', image: '../assets/images/hero1.jpg', role: 'Grand Guest' },
  { name: 'Sheikh Omar Suleiman', image: '../assets/images/hero2.jpg', role: 'Scholar' },
  { name: 'Akhi Ayman', image: '../assets/images/hero4.jpg', role: 'Speaker' },
  { name: 'Sheikh Abu Bakr Zoud', image: '../assets/images/hero3.jpg', role: 'Scholar' },
  { name: 'Ustadh Munir Amour', image: '../assets/images/hero1.jpg', role: 'Educator' },
  { name: 'Qari Hazza Al Balushi', image: '../assets/images/hero2.jpg', role: 'Qari' },
  { name: 'Sheikh Ali Hammuda', image: '../assets/images/hero3.jpg', role: 'Lecturer' },
  { name: 'Sheikh Wael Ibrahim', image: '../assets/images/hero4.jpg', role: 'Speaker' },
  // Duplicate for infinite loop illusion or just let it be finite. 
  // We will keep it finite like a normal gallery for better UX without JS loops.
];

export default function Guests() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      
      // Calculate how much we have scrolled inside the wrapper
      // rect.top is 0 when wrapper hits top of viewport
      const scrollY = -rect.top;
      // scrollable height is total height minus viewport height
      const maxScroll = rect.height - window.innerHeight;
      
      if (scrollY >= 0 && scrollY <= maxScroll) {
        // Progress from 0 to 1
        setScrollProgress(scrollY / maxScroll);
      } else if (scrollY < 0) {
        setScrollProgress(0);
      } else if (scrollY > maxScroll) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine the active index based on progress
  // progress * (length - 1) gives us a continuous number from 0 to 7
  const continuousIndex = scrollProgress * (guests.length - 1);
  const activeIndex = Math.round(continuousIndex);

  const handleNext = () => {
    if (!wrapperRef.current) return;
    const nextIndex = Math.min(activeIndex + 1, guests.length - 1);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    if (!wrapperRef.current) return;
    const prevIndex = Math.max(activeIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  const scrollToIndex = (index) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const maxScroll = wrapperRef.current.scrollHeight - window.innerHeight;
    const targetProgress = index / (guests.length - 1);
    
    // Calculate the absolute Y position on the page
    const absoluteY = window.scrollY + rect.top + (targetProgress * maxScroll);
    
    window.scrollTo({
      top: absoluteY,
      behavior: 'smooth'
    });
  };

  return (
    <section ref={wrapperRef} className="guests-scroll-wrapper bg-[#f4f2e7]">
     
        <div className="guests-header absolute top-[65em] lg:translate-y-24 translate-y-14  duration-700 ease-in-out transform left-0 max-w-4xl    w-full px-4 mx-auto  ">
           <span className="inline-block text-start  rounded-full uppercase py-1.5 text-sm font-bold tracking-[0.4em] text-[#C5B78E]">
              our Events
            </span>
            <h2 className=" text-4xl font-extrabold uppercase text-[#6d5423] leading-tight sm:text-4xl lg:text-7xl text-start">
              <span className='text-[#C5B78E]'>Past Guests</span> Distinguished Video
              
            </h2>
        </div>
        
      <div className="guests-sticky-container flex">
        

        <div className="carousel-wrapper">
         
          {guests.map((guest, index) => {
            // Distance from the current center point (- to +)
            const offset = index - continuousIndex;
            const isCenter = Math.abs(offset) < 0.5;
            
            // Cover Flow Math
            const sign = Math.sign(offset) || 1;
            const absOffset = Math.abs(offset);
            
            // If it's the center item, it's flat. If it's on the side, it's rotated.
            // We use a smooth transition by clamping and easing the offset.
            const rotateY = offset === 0 ? 0 : sign * Math.min(absOffset * 45, 60); // Max rotation 60deg
            
            // Distance pushes it back and to the side
            const translateX = offset * 60; // Spread out horizontally
            const translateZ = absOffset === 0 ? 100 : -Math.abs(offset) * 50; // Push back side items
            
            // Overlay darkness
            const overlayOpacity = Math.min(absOffset * 0.4, 0.7);
            const zIndex = guests.length - Math.round(absOffset * 10);

            return (
              <div 
                key={index} 
                className="guest-box" 
                style={{ 
                  '--translateX': `${translateX}%`,
                  '--translateZ': `${translateZ}px`,
                  '--rotateY': `${-rotateY}deg`,
                  '--overlay-opacity': overlayOpacity,
                  '--info-opacity': isCenter ? 1 : 0,
                  zIndex: zIndex
                }}
                onClick={() => scrollToIndex(index)}
              >
                
                <img src={guest.image} alt={guest.name} />
                <div className="guest-info">
                   <h3>{guest.name}</h3>
                   <p>{guest.role}</p>
                </div>
              </div>
            );
          })}
          
        </div>
        

      </div>
        
    </section>
  );
}