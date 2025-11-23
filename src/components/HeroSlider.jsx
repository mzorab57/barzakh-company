import { useState, useEffect } from "react";




const Slider = () => {
 const slides = [
  {
    id: 1,
    image: "https://ext.same-assets.com/1954549727/2921478964.jpeg",
    alt: "Stalls Opportunity",
  },
  {
    id: 2,
    image: "https://ext.same-assets.com/1954549727/4238803452.jpeg",
    alt: "Hajj Event",
  },
  {
    id: 3,
    image: "https://ext.same-assets.com/1954549727/2921478964.jpeg",
    alt: "Stalls Opportunity",
  },
  {
    id: 4,
    image: "https://ext.same-assets.com/1954549727/4238803452.jpeg",
    alt: "Hajj Event",
  },
];
const events = [
  {
    title: 'An Evening With',
    image: 'https://ext.same-assets.com/1954549727/209598957.jpeg',
    date: '24 to 28 December 2025',
    location: 'United Kingdom',
  },
   {
    title: 'Antalya Retreat',
    image: 'https://ext.same-assets.com/1954549727/1158522046.jpeg',
    date: '2 - 6 April 2026',
    location: 'Turkiye',
  },
  
  {
    title: 'Winter Conference 25',
    image: 'https://ext.same-assets.com/1954549727/3637383729.jpeg',
    date: '30th Dec - 4th Jan',
    location: 'United Kingdom',
  },
 
  {
    title: 'Hajj With Mufti Menk',
    image: 'https://ext.same-assets.com/1954549727/927536669.jpeg',
    date: '24 May 2026',
    location: 'Saudi Arabia',
  },
  {
    title: 'Umrah 2026',
    image: 'https://ext.same-assets.com/1954549727/2157669074.jpeg',
    date: '21 - 31 October 2026',
    location: 'Saudi Arabia',
  },
];

  const isAutoPlay = true;
  const speed = 1000;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (!isAutoPlay || isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, speed);
    return () => clearInterval(timer);
  }, [isAutoPlay, speed, isPaused, slides.length]);

  const onTouchStart = (e) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
  };
  const onTouchEnd = (e) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 30) {
      if (dx < 0) next();
      else prev();
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  return (
    <div
      id="carousel-progress"
      data-carousel='{ "loadingClasses": "opacity-50", "isAutoPlay": true, "speed": 100 }'
      className="relative w-full "
    >

        
      <div className="carousel  rounded-none overflow-hidden">
        <div
          className="carousel-body hidden md:flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {slides.map((slide) => (
            <div className="carousel-slide flex-shrink-0 w-full h-full" key={slide.id}>
              <div className="bg-base-200/40 relative flex h-full justify-center">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover "
                />
                {/* <span className="absolute self-center text-2xl sm:text-4xl text-white">
                  {slide.text}
                </span> */}
              </div>
            </div>
          ))}
        </div>
        <div
          className="carousel-body md:hidden flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {events.map((slide) => (
            <div className="carousel-slide flex-shrink-0 w-full h-full" key={slide.id}>
              <div className="bg-base-200/40 relative flex h-full justify-center">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover "
                />
                {/* <span className="absolute self-center text-2xl sm:text-4xl text-white">
                  {slide.text}
                </span> */}
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={current === i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                current === i ? 'bg-primary opacity-100 scale-110' : 'bg-secondary opacity-60'
              }`}
            />      
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="carousel-prev start-5 max-sm:start-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm"
      >
        <span className="icon-[tabler--chevron-left] size-5"></span>
        <span className="sr-only">Previous</span>
      </button>

      <button
        type="button"
        onClick={next}
        className="carousel-next end-5 max-sm:end-3 carousel-disabled:opacity-50 size-9.5 bg-base-100 flex items-center justify-center rounded-full shadow-base-300/20 shadow-sm"
      >
        <span className="icon-[tabler--chevron-right] size-5"></span>
        <span className="sr-only">Next</span>
      </button>
      
    </div>
  );
};

export default Slider;

