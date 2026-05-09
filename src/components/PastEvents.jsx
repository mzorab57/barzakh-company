'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pastEvents = [
  {
    title: 'Winter Conference',
    image: '/assets/images/hero3.jpg',
    year: '2024',
    category: 'Annual Gathering',
  },
  {
    title: 'An Evening With',
    image: '/assets/images/hero4.jpg',
    date: '15 Nov 2024',
    category: 'Motivational',
  },
  {
    title: 'Light Upon Light Monrovia',
    image: '/assets/images/hero2.jpg',
    year: '2023',
    category: 'Featured Event',
  },
  {
    title: 'Summer Retreat',
    image: '/assets/images/hero1.jpg',
    year: '2023',
    category: 'Spiritual Retreat',
  },
  {
    title: 'Youth Conference',
    image: '/assets/images/hero4.jpg',
    year: '2022',
    category: 'Community',
  }
];

export default function PastEvents() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // ئەنیمەیشنی هاتنە ناوەوەی سەردێڕەکە
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // فەنکشنی جوڵاندنی سلایدەرەکە بە دوگمەکان
  const scroll = (direction) => {
    if (sliderRef.current) {
      // هەژمارکردنی پانی یەک کارد بۆ ئەوەی بەو ئەندازەیە بڕوات
      const cardWidth = window.innerWidth >= 1024 ? window.innerWidth * 0.3 : window.innerWidth * 0.85;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#050505] pt-24 sm:pt-32 overflow-hidden selection:bg-[#E6D6A3] selection:text-black">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E6D6A3]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-[95rem]">
        
        {/* === Header & Navigation === */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between px-5 sm:px-8 lg:px-12 mb-12 sm:mb-16 gap-8">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#E6D6A3]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#E6D6A3]">
                The Archives
              </span>
            </div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light uppercase leading-[1.05] tracking-tight text-white">
              <span className="block text-white/40 text-2xl sm:text-3xl tracking-[0.2em] mb-2">Relive Our</span>
              <span className="block font-medium text-[#f6eac4]">Past Events</span>
              <span className="block mt-1   font-normal lowercase text-[#faf7ee] text-5xl sm:text-6xl lg:text-7xl">
                around the world.
              </span>
            </h2>
          </div>

          {/* Custom Navigation Buttons (Visible on Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-[#E6D6A3] hover:border-[#E6D6A3]"
            >
              <ArrowLeft className="w-5 h-5 text-white transition-colors group-hover:text-black" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/15 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-[#E6D6A3] hover:border-[#E6D6A3]"
            >
              <ArrowRight className="w-5 h-5 text-white transition-colors group-hover:text-black" />
            </button>
          </div>
        </div>

        {/* === Cinematic Slider Track === */}
        <div 
          ref={sliderRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-5 sm:pl-8 lg:pl-12 pr-[10vw] pb-0"
        >
          {pastEvents.map((event, index) => (
            <article 
              key={index}
              className="group relative flex-shrink-0 w-[85vw] sm:w-[50vw] lg:w-[30vw] h-[55vh] sm:h-[60vh] lg:h-[65vh] max-h-[700px] overflow-hidden rounded-[2rem] bg-[#111] snap-center sm:snap-start cursor-pointer border border-white/5 transition-colors duration-500 hover:border-[#E6D6A3]/30"
            >
              {/* Reverse Zoom Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover scale-110 grayscale-[30%] opacity-80 transition-all duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-100 group-hover:grayscale-0 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
              
              {/* Floating Year Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-xl text-xs font-bold tracking-widest text-[#E6D6A3] shadow-lg">
                  {event.year}
                </span>
              </div>

              {/* Content Panel */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col z-10">
                
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E6D6A3]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black uppercase leading-[1.05] tracking-tight text-white mb-6">
                    {event.title}
                  </h3>

                  {/* Hover Revealed Button Line */}
                  <div className="flex items-center justify-between border-t border-white/15 pt-5 opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:border-[#E6D6A3]/30">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E6D6A3]">
                      View Gallery
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2 group-hover:bg-[#E6D6A3]">
                      <ArrowRight className="w-4 h-4 text-white group-hover:text-black" />
                    </div>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Mobile Navigation Indicators (Visible only on mobile) */}
        <div className="flex sm:hidden items-center justify-center gap-4 mt-4 px-5 text-white/50">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Swipe to explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>

      </div>

      {/* Global CSS to hide the scrollbar but keep the scrolling functionality */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}