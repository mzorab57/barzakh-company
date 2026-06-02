'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight, MoveRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getUpcomingEventsSectionContent } from '@/data/componentContent';

gsap.registerPlugin(ScrollTrigger);

export default function UpcomingEvents() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const { t } = useTranslation();
  const upcomingEventsSectionContent = getUpcomingEventsSectionContent(t);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const scrollDistance = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.5);

        gsap.to(track, {
          x: -scrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.2,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir='ltr'
      className="relative   bg-[#fafaf8] overflow-hidden text-[#1a1814]  selection:bg-[#88743e] selection:text-white"
    >
      <div  className="hidden lg:block relative h-screen w-full">
        <div  className="absolute top-0 left-0 h-full w-[42%] bg-[#fafaf8] z-30 flex items-center border-r border-[#1a1814]/10 shadow-[30px_0_60px_rgba(250,250,248,1)]">
          <div className="px-16 xl:px-24 max-w-xl">
            <div  className="mb-12">
              <div  className="flex items-center gap-4 mb-4">
                <div  className="h-[1px] w-12 bg-[#88743e]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#88743e]">
                  {upcomingEventsSectionContent.featuredLabel}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#1a1814]/40 font-light">
                {upcomingEventsSectionContent.experiencesLabel}
              </p>
            </div>

            <h1 className="space-y-2 mb-12">
              <span className="block text-7xl xl:text-8xl font-medium tracking-tight text-[#a79774]">
                {upcomingEventsSectionContent.titleLines[0]}
              </span>
              <span className="block text-7xl xl:text-8xl font-medium tracking-tight text-[#3c2b09]">
                {upcomingEventsSectionContent.titleLines[1]}
              </span>
              <span className="block text-7xl xl:text-8xl font-normal lowercase tracking-tight text-[#88743e]">
                {upcomingEventsSectionContent.titleLines[2]}
              </span>
            </h1>

            <p className="text-base leading-relaxed text-[#1a1814]/60 font-light mb-16 max-w-md border-l-2 border-[#88743e]/20 pl-6">
              {upcomingEventsSectionContent.desktopDescription}
            </p>

            <div className="flex items-center gap-3 text-[#88743e]">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#88743e] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#88743e]"></span>
              </div>
              <span className="text-xs font-medium uppercase tracking-[0.25em]">
                {upcomingEventsSectionContent.scrollLabel}
              </span>
              <MoveRight className="w-4 h-4" />
            </div>
          </div>

          <div className="absolute top-0 -right-32 w-32 h-full bg-gradient-to-r from-[#fafaf8] to-transparent pointer-events-none" />
        </div>

        <div className="absolute top-0 left-0 h-full w-full z-10 overflow-hidden">
          <div ref={trackRef} className="flex h-full will-change-transform pl-[42%]">
            {upcomingEventsSectionContent.events.map((event, index) => (
              <EditorialCard key={index} event={event} index={index} content={upcomingEventsSectionContent} />
            ))}
            <div className="w-32 flex-shrink-0" />
          </div>
        </div>
      </div>

      <div dir='rtl' className="lg:hidden px-5 sm:px-8 py-20">
        <div className="mb-16 space-y-8 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-[#88743e]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#88743e]">
              {upcomingEventsSectionContent.featuredLabel}
            </span>
          </div>

          <h1  className="space-y-1 uppercase">
            <span className="block text-5xl sm:text-6xl font-semibold tracking-tight text-[#1a1814]">
              {upcomingEventsSectionContent.titleLines[0]}
            </span>
            <span className="block text-5xl sm:text-6xl font-semibold tracking-tight text-[#1a1814]">
              {upcomingEventsSectionContent.titleLines[1]}
            </span>
            <span className="block text-5xl sm:text-6xl font-serif font-normal lowercase tracking-tight text-[#88743e]">
              {upcomingEventsSectionContent.titleLines[2]}
            </span>
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[#1a1814]/60 font-light border-l-2 border-[#88743e]/20 pl-5">
            {upcomingEventsSectionContent.mobileDescription}
          </p>
        </div>

        <div className="space-y-12 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8">
          {upcomingEventsSectionContent.events.map((event, index) => (
            <EditorialCard key={index} event={event} index={index} isMobile content={upcomingEventsSectionContent} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialCard({ event, index, isMobile = false, content }) {
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (isMobile && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [index, isMobile]);

  return (
    <article
    
      ref={cardRef}
      className={`
        group relative flex-shrink-0 bg-[#fafaf8]
        ${isMobile ? 'w-full' : 'w-[550px] xl:w-[650px] h-full border-r border-[#1a1814]/10'}
      `}
    >
      <div className={`${isMobile ? 'space-y-8' : 'h-full flex flex-col'}`}>
        <div
          className={`
          relative overflow-hidden bg-[#f0ede5]
          ${isMobile ? 'h-[350px] sm:h-[400px] rounded-2xl' : 'h-[55%] mt-auto'}
        `}
        >
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-full border border-white/40 bg-white/90 backdrop-blur-md text-sm font-bold text-[#1a1814] shadow-lg transition-transform duration-500 group-hover:scale-110">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center rounded-full border border-white/40 bg-white/90 backdrop-blur-md px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#88743e] transition-all duration-300 group-hover:bg-[#88743e] group-hover:text-white group-hover:border-[#88743e]">
              {event.category}
            </span>
          </div>
        </div>

        <div dir='rtl' className={`${isMobile ? 'space-y-6' : 'px-12 xl:px-16 py-10 space-y-8'}`}>
          <div className="space-y-3">
            <h2 className="text-4xl xl:text-5xl font-light tracking-tight text-[#1a1814] leading-[1.1] transition-colors duration-300 group-hover:text-[#88743e]">
              {event.title}
            </h2>

            <p className="text-sm text-[#1a1814]/50 font-light tracking-wide">
              {event.attendees}+ {content.attendeesLabel}
            </p>
          </div>

          <div className="space-y-4 border-t border-[#1a1814]/10 pt-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-4 h-4 text-[#88743e] flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1814]/40 mb-1 font-medium">
                  {content.fieldLabels.date}
                </p>
                <p className="text-sm text-[#1a1814] font-light">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-4 h-4 text-[#88743e] flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1814]/40 mb-1 font-medium">
                  {content.fieldLabels.location}
                </p>
                <p className="text-sm text-[#1a1814] font-light">{event.location}</p>
              </div>
            </div>
          </div>

          <button className="group/btn inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-[#88743e] transition-all duration-300 hover:gap-4 border-b border-[#88743e]/30 pb-1 hover:border-[#88743e]">
            <span>{content.ctaLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
