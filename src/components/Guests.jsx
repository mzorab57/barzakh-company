'use client';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { guestsSectionContent } from '@/data/componentContent';

gsap.registerPlugin(ScrollTrigger);

export default function Guests() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // ئەنیمەیشنی Header - fade in from left
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // ئەنیمەیشنی کاردەکان - Curtain reveal effect
      cardsRef.current.forEach((card, index) => {
        // Create a mask/reveal animation
        gsap.fromTo(
          card,
          { 
            opacity: 0,
            clipPath: 'inset(100% 0% 0% 0%)', // پەردە لە خوارەوە داخراوە
            y: 40 
          },
          {
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)', // پەردەکە بە تەواوی دەکرێتەوە
            y: 0,
            duration: 1.2,
            delay: index * 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-[#FAFAF8] py-20 sm:py-28 lg:py-36 overflow-hidden selection:bg-[#1a1814] selection:text-[#E6D6A3]"
    >
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(230,214,163,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02] mix-blend-multiply pointer-events-none" />
      
      {/* Decorative floating orbs */}
      <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#E6D6A3]/5 blur-[100px] animate-pulse-slow pointer-events-none" />

      <div className="mx-auto max-w-[95rem] px-4 sm:px-6 lg:px-10 xl:px-12 relative z-10">
        
        {/* === Luxurious Header === */}
        <div ref={headerRef} className="max-w-4xl mb-16 md:mb-24 lg:mb-32">
          
          

          <h2 className="mb-10">
            <span className="block text-[20vw] sm:text-[15vw] md:text-[12rem] font-black leading-none tracking-tighter text-[#1a1814]/[0.03] pointer-events-none">
              {guestsSectionContent.header.watermark}
            </span>
            <span className="block -mt-20 sm:-mt-28 md:-mt-32 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium uppercase leading-[0.9] tracking-tight text-[#594d33]">
              {guestsSectionContent.header.titleLineOne}
            </span>
            <span className="block mt-3   font-normal lowercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b59e5f] via-[#d4b976] to-[#8a7340]">
                {guestsSectionContent.header.titleLineTwo}
              </span>
            </span>
          </h2>

          {/* Description with elegant border */}
          <div className="flex items-start gap-6 max-w-2xl">
            <div className="hidden sm:block w-[2px] h-24 bg-gradient-to-b from-[#b59e5f] to-transparent mt-1" />
            <p className="text-base sm:text-lg lg:text-xl text-[#1a1814]/60 font-light leading-relaxed">
              {guestsSectionContent.header.description}
            </p>
          </div>

        </div>

        {/* === Premium Bento Grid === */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 auto-rows-auto">
          {guestsSectionContent.guests.map((guest, index) => (
            <article
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                group relative overflow-hidden bg-[#0a0805] cursor-pointer
                rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem]
                ${guest.span} ${guest.height}
                transition-all duration-700 ease-out
                hover:scale-[1.02] hover:z-10
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                hover:shadow-[0_20px_60px_rgba(181,158,95,0.15)]
              `}
            >
              {/* Premium Image with Advanced Effects */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Base Image */}
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className={`
                      w-full h-full object-cover
                      transition-all duration-[2s] ease-out
                      ${hoveredIndex === index 
                        ? 'scale-110 grayscale-0 opacity-100 brightness-100' 
                        : 'scale-105  brightness-90 opacity-85'
                      }
                    `}
                    loading="lazy"
                  />
                  
                  {/* Color Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#b59e5f]/10 via-transparent to-[#1a1814]/20 opacity-40 transition-opacity duration-700 group-hover:opacity-0" />
                </div>
              </div>

              {/* Multi-layer Elegant Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

              {/* Delicate Inner Border */}
              <div className="absolute inset-3 sm:inset-4 border  rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] pointer-events-none transition-all duration-700 border-[#b59e5f]/40 shadow-[inset_0_0_40px_rgba(181,158,95,0.1)] z-20" />

              {/* Year Badge - Top Right */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/10 backdrop-blur-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-white/70 transition-all duration-500 group-hover:bg-[#b59e5f]/20 group-hover:border-[#b59e5f]/50 group-hover:text-white">
                  {guest.year}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-end z-30">
                
                {/* Role Tag - appears on hover */}
                <div className={`
                  mb-3 sm:mb-4 transition-all duration-500 ease-out
                  ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                `}>
                  <span className="inline-block text-[#E6D6A3] font-light text-xs sm:text-sm tracking-[0.25em] uppercase">
                    {guest.role}
                  </span>
                </div>

                {/* Name & Title */}
                <div className={`
                  transition-all duration-500 ease-out
                  ${hoveredIndex === index ? 'translate-y-0' : 'translate-y-3'}
                `}>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight mb-2">
                    {guest.name}
                  </h3>
                  <p className={`
                    text-white/60 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-md
                    transition-all duration-500 delay-100
                    ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                  `}>
                    {guest.title}
                  </p>
                </div>

                {/* Arrow Button - Hidden by default, slides in on hover */}
                <div className={`
                  absolute bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 right-5 sm:right-6 md:right-8 lg:right-10
                  flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                  bg-white text-black
                  transition-all duration-500 ease-out
                  ${hoveredIndex === index 
                    ? 'translate-x-0 opacity-100 rotate-0' 
                    : 'translate-x-6 opacity-0 rotate-45'
                  }
                `}>
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>

              </div>
            </article>
          ))}
        </div>

       

      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
