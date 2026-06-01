'use client';
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { getHeroSliderContent } from '@/data/componentContent';

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const { t } = useTranslation();
  const heroSliderContent = getHeroSliderContent(t);

  const next = () => setCurrent((prev) => (prev + 1) % heroSliderContent.slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + heroSliderContent.slides.length) % heroSliderContent.slides.length);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      next();
    }, heroSliderContent.autoPlaySpeed);
    return () => clearInterval(timer);
  }, [isPaused]);

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
    <div dir='ltr' className="relative w-full bg-[#0a0805] px-0 sm:px-4 lg:py-8  flex justify-center">
      <div 
        className="relative w-full max-w-[95rem] h-[60vh] md:h-[70vh] lg:h-[80vh] max-h-[850px] overflow-hidden sm:rounded-[2.5rem] shadow-2xl group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        
        <div 
          className="flex h-full w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroSliderContent.slides.map((slide, index) => (
            <div key={slide.id} className="relative w-full h-full flex-shrink-0 overflow-hidden bg-black">
              <img
                src={slide.mobileImg}
                alt={slide.title || `Slide ${index + 1}`}
                className={`md:hidden absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] ease-out ${
                  current === index ? "scale-110" : "scale-100"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />
              
              <img
                src={slide.desktopImg}
                alt={slide.title || `Slide ${index + 1}`}
                className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-[6s] ease-out ${
                  current === index ? "scale-105" : "scale-100"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 pb-24 lg:pb-32 text-center md:text-left z-10">
                <div 
                  className={`transition-all duration-1000 delay-300 ${
                    current === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                >
                  {slide.category ? (
                    <span className="inline-block text-[#C5B78E] text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-4">
                      {slide.category}
                    </span>
                  ) : null}
                  {slide.title ? (
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase leading-tight tracking-tight text-white mb-6">
                      {slide.title}
                    </h2>
                  ) : null}
                </div>
              </div>

            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 max-sm:hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5B78E] hover:border-[#C5B78E] hover:text-black hover:scale-110 -translate-x-4 group-hover:translate-x-0"
          aria-label={heroSliderContent.previousLabel}
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 max-sm:hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#C5B78E] hover:border-[#C5B78E] hover:text-black hover:scale-110 translate-x-4 group-hover:translate-x-0"
          aria-label={heroSliderContent.nextLabel}
        >
          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSliderContent.slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`${heroSliderContent.goToSlideLabel} ${i + 1}`}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                current === i
                  ? 'w-10 bg-[#C5B78E]'
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
