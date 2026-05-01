import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'An Evening With',
    image: '/assets/images/hero4.jpg',
    date: '24 to 28 December 2025',
    location: 'United Kingdom',
  },
  {
    title: 'Antalya Retreat',
    image: '/assets/images/hero2.jpg',
    date: '2 - 6 April 2026',
    location: 'Turkiye',
  },
  {
    title: 'Winter Conference 25',
    image: '/assets/images/hero3.jpg',
    date: '30th Dec - 4th Jan',
    location: 'United Kingdom',
  },
  {
    title: 'Hajj With Mufti Menk',
    image: '/assets/images/hero1.jpg',
    date: '24 May 2026',
    location: 'Saudi Arabia',
  },
  {
    title: 'Umrah 2026',
    image: '/assets/images/hero4.jpg',
    date: '21 - 31 October 2026',
    location: 'Saudi Arabia',
  },
];

export default function UpcomingEvents() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const headerRef = useRef(null); // ڕێف بۆ تێکستەکە

  useLayoutEffect(() => {
    // دروستکردنی Timeline بۆ ئەوەی زنجیرە ئەنیمەیشنمان هەبێت
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        // درێژی سکڕۆڵەکە زیاد دەکەین بۆ ئەوەی کات بۆ جوڵەی تێکستەکەش هەبێت
        end: () => "+=" + (sectionRef.current.scrollWidth + window.innerWidth),
        snap: {
          snapTo: 1 / (events.length), // گۆڕانکاری بۆ ئەوەی لەگەڵ Timeline بگونجێت
          duration: 0.5,
          delay: 0.1,
          ease: "power1.inOut"
        },
        invalidateOnRefresh: true,
      },
    });

    // قۆناغی ١: وێنەکان لە ڕاستەوە بۆ چەپ دەڕۆن
    tl.to(sectionRef.current, {
      x: () => -(sectionRef.current.scrollWidth + 200),
      ease: "none",
    });

    // قۆناغی ٢: تێکستەکە (Header) لە چەپەوە بۆ ڕاست دەڕوات و ون دەبێت (تەنها لە lg)
    tl.to(headerRef.current, {
      x: window.innerWidth/3, // بەرەو لای ڕاست دەڕوات
      opacity: 100,
      duration: 0.4,
      ease: "power.in",
    }, ">-0.2"); // کەمێک پێش تەواوبوونی وێنەکان دەستپێدەکات

    return () => tl.kill();
  }, []);

  return (
    <section ref={triggerRef} className="bg-[#f4f2e7]   overflow-hidden">
      <div className="flex   items-end  h-screen overflow-hidden">
        
        <div className="flex items-center px-[5vw] gap-10 ">
          {/* Header Card - کارتێکی جێگیر بۆ سەردێڕ */}
          <div ref={headerRef} className="  will-change-transform w-full ">
            <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#aa8e41]">
              Upcoming Events
            </p>
            <h2 className="mt-4 text-4xl font-extrabold  uppercase text-[#6d5423] md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
              Our <br/>Upcoming <br/> <span className="text-primary">Experiences</span>
            </h2>
            <div className="mt-8 flex items-center gap-2 text-[#88743e] font-bold">
              <span>Scroll to explore</span>
              <ChevronRight className="animate-bounce-x" />
            </div>
          </div>
        </div>
          

          {/* Events Track */}
          <div ref={sectionRef} className="flex gap-8 pr-[10vw] py-[7vw] bg-[#f4f2e7] will-change-transform">
            {events.map((event, index) => (
              <article
                key={index}
                className="relative h-[60vh] w-[85vw] min-w-[85vw] md:w-[60vw] md:min-w-[60vw] lg:w-[45vw] lg:min-w-[45vw] overflow-hidden rounded-[0.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.12)] group transition-transform duration-500 "
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,183,142,0.15),transparent_35%)]" />

                <div className="relative flex h-full flex-col justify-between p-8 lg:p-12 text-white">
                  <div className="flex justify-between items-start">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold backdrop-blur-md">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-3xl font-black uppercase leading-none md:text-5xl lg:text-6xl tracking-tighter">
                      {event.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm backdrop-blur-xl">
                        <Calendar className="h-4 w-4 text-[#C5B78E]" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-sm backdrop-blur-xl">
                        <MapPin className="h-4 w-4 text-[#C5B78E]" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
      `}} />
    </section>
  );
}