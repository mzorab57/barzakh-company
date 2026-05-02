import React, { useEffect, useRef, useState } from 'react';
import './Guests.css';

const guests = [
  { 
    name: 'Mufti Menk',
     image: '../assets/images/hero1.jpg', 
    //  role: 'Grand Guest' 
    },
  { 
    // name: 'Sheikh Omar Suleiman',
     image: '../assets/images/hero2.jpg', 
    //  role: 'Scholar' 
    },
  { 
    // name: 'Akhi Ayman',
     image: '../assets/images/hero4.jpg', 
    //  role: 'Speaker' 
    },
  { 
    // name: 'Sheikh Abu Bakr Zoud',
     image: '../assets/images/hero3.jpg', 
    //  role: 'Scholar' 
    },
  { 
    // name: 'Ustadh Munir Amour',
     image: '../assets/images/hero1.jpg', 
    //  role: 'Educator'
     },
  { 
    // name: 'Qari Hazza Al Balushi',
     image: '../assets/images/hero2.jpg', 
    //  role: 'Qari' 
     },

     { 
    // name: 'Sheikh Ali Hammuda',
     image: '../assets/images/hero3.jpg', 
    //  role: 'Lecturer'
     },
  { 
    // name: 'Sheikh Wael Ibrahim',
     image: '../assets/images/hero4.jpg', 
    //  role: 'Speaker' 
    },
  // Duplicate for infinite loop illusion or just let it be finite. 
  // We will keep it finite like a normal gallery for better UX without JS loops.
];

export default function Guests() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? true : window.innerWidth >= 1024
  );
  const [scrollProgress, setScrollProgress] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      setScrollProgress(0);
      return undefined;
    }

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
  }, [isDesktop]);

  // Determine the active index based on progress
  // progress * (length - 1) gives us a continuous number from 0 to 7
  const continuousIndex = scrollProgress * (guests.length - 1);

  const scrollToIndex = (index) => {
    if (!wrapperRef.current || !isDesktop) return;
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
      <div className="guests-header sticky top-28 z-10 w-full bg-[#f4f2e7] px-4 duration-700 ease-in-out lg:top-32">
        <h2 className="text-4xl font-extrabold uppercase leading-tight text-[#6d5423] sm:text-4xl lg:text-center lg:text-6xl xl:text-7xl">
          <span className="text-[#C5B78E]">Past Guests</span> Distinguished
        </h2>
      </div>

      <div className="guests-mobile-strip">
        <div className="guests-mobile-track">
          {guests.map((guest, index) => (
            <article key={index} className="guests-mobile-card">
              <img
                src={guest.image}
                alt={guest.name || `Guest ${index + 1}`}
                className="guests-mobile-image"
              />
            </article>
          ))}
        </div>
      </div>

      <div className="guests-sticky-container flex">
        <div className="carousel-wrapper">
          {guests.map((guest, index) => {
            const offset = index - continuousIndex;
            const isCenter = Math.abs(offset) < 0.5;
            const absOffset = Math.abs(offset);
            const translateX = offset * 105;
            const translateZ = absOffset === 0 ? 100 : -Math.abs(offset) * 300;
            const overlayOpacity = Math.min(absOffset * 0.4, 0.7);
            const zIndex = guests.length - Math.round(absOffset * 10);

            return (
              <div
                key={index}
                className="guest-box"
                style={{
                  '--translateX': `${translateX}%`,
                  '--translateZ': `${translateZ}px`,
                  '--rotateY': '0deg',
                  '--overlay-opacity': overlayOpacity,
                  '--info-opacity': isCenter ? 1 : 0,
                  zIndex: zIndex,
                }}
                onClick={() => scrollToIndex(index)}
              >
                <img src={guest.image} alt={guest.name || `Guest ${index + 1}`} />
                <div className="guest-info">
                  <h3>{guest.name || `Guest ${index + 1}`}</h3>
                  <p>{guest.role || ''}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
