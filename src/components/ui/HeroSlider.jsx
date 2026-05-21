'use client';
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// یەکخستنی داتاکان بۆ ئەوەی زۆر ڕێکخراو بێت
const sliderData = [
  {
    id: 1,
    // title: 'An Evening With',
    // category: 'Motivational Evening',
    desktopImg: '../assets/images/event-turkia.jpg',
    mobileImg: '../assets/images/event-turkia-mobile.jpg',
  },
  {
    id: 2,
    // title: 'Antalya Retreat',
    // category: 'Spiritual Journey',
    desktopImg: '../assets/images/hero2.jpg',
    mobileImg: 'https://lightuponlight.co.uk/wp-content/uploads/2026/04/Poster-summer-conference.jpg',
  },
  // {
  //   id: 3,
  //   // title: 'Winter Conference 25',
  //   // category: 'Global Gathering',
  //   desktopImg: 'https://lightuponlight.co.uk/wp-content/uploads/2025/07/Khalilah.jpg',
  //   mobileImg: 'https://ext.same-assets.com/1954549727/3637383729.jpeg',
  // },
  // {
  //   id: 4,
  //   // title: 'Hajj With Mufti Menk',
  //   // category: 'Sacred Pilgrimage',
  //   desktopImg: '../assets/images/hero4.jpg',
  //   mobileImg: 'https://ext.same-assets.com/1954549727/927536669.jpeg',
  // },
  // {
  //   id: 5,
  //   // title: 'Umrah 2026',
  //   // category: 'Spiritual Journey',
  //   desktopImg: '../assets/images/hero1.jpg',
  //   mobileImg: 'https://ext.same-assets.com/1954549727/2157669074.jpeg',
  // }
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // خێرایی گۆڕینی سڵایدەکە (5 چرکە زۆر گونجاوە بۆ دیزاینی فەخم)
  const AUTO_PLAY_SPEED = 5000;

  const next = () => setCurrent((prev) => (prev + 1) % sliderData.length);
  const prev = () => setCurrent((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  // Auto Play Logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, AUTO_PLAY_SPEED);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Swipe Logic for Mobile
  const onTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  return (
    <div className="relative w-full bg-[#0a0805] px-0 sm:px-4 lg:py-8  flex justify-center">
      
      {/* 
        بەرزی سڵایدەرەکە لێرەدا کۆنترۆڵ کراوە: 
        لە مۆبایل: h-[60vh]
        لە تابلێت: h-[70vh]
        لە لابتۆپ: h-[80vh]
        وە نابێت لە 850px بەرزتر بێت
      */}
      <div 
        className="relative w-full max-w-[95rem] h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[850px] overflow-hidden sm:rounded-[2.5rem] shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Slider Track */}
        <div 
          className="flex h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {sliderData.map((slide, index) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0 overflow-hidden bg-black">
              
              {/* 
                وێنەکان: مۆبایل و دێسکتۆپ جیاکراونەتەوە 
                ئیفێکتی Cinematic Zoom دانراوە بۆ ئەو سڵایدەی کە ئەکتیڤە
              */}
              
              {/* Mobile Image */}
              <img
                src={slide.mobileImg}
                alt={slide.title}
                className={`md:hidden absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] ease-out ${
                  current === index ? "scale-110" : "scale-100"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              {/* Desktop Image */}
              <img
                src={slide.desktopImg}
                alt={slide.title}
                className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] ease-out ${
                  current === index ? "scale-105" : "scale-100"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Multi-layer Gradient Overlay بۆ ئەوەی تێکستەکان بە جوانی بخوێندرێنەوە */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" /> */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-24 lg:pb-32 text-center md:text-left z-10">
                <div 
                  className={`transition-all duration-1000 delay-300 ${
                    current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  <span className="inline-block text-[#C5B78E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-4">
                    {slide.category}
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase leading-tight tracking-tight text-white mb-6">
                    {slide.title}
                  </h2>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Navigation Buttons (Arrows) - Glassmorphism */}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5B78E] hover:border-[#C5B78E] hover:text-black hover:scale-110 -translate-x-4 group-hover:translate-x-0 hidden sm:flex"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5B78E] hover:border-[#C5B78E] hover:text-black hover:scale-110 translate-x-4 group-hover:translate-x-0 hidden sm:flex"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Progress Bar / Pagination Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {sliderData.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                current === i 
                  ? 'w-10 bg-[#C5B78E]' // Active dot is a longer gold line
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />      
          ))}
        </div>

      </div>
    </div>
  );
};

export default Slider;