import { Calendar, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Guests.css';

const pastEvents = [
  {
    title: 'Winter Conference',
    image: '../assets/images/hero3.jpg',
    year: '2024',
    category: 'Winter Conference',
  },
  {
    title: 'An Evening With',
       image: '../assets/images/hero4.jpg',
    year: '2024',
    category: 'Motivational Evening',
  },
  {
    title: 'Light Upon Light Monrovia',
    image: '../assets/images/hero2.jpg',  
    year: '2024',
    category: 'Featured Event',
  },
  {
    title: 'Winter Conference',
     image: '../assets/images/hero1.jpg',
    year: '2024',
    category: 'Winter Conference',
  },
  {
    title: 'An Evening With',
      image: '../assets/images/hero4.jpg',
    year: '2024',
    category: 'Motivational Evening',
  }
];

export default function PastEvents() {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 768 ? 2 : 1);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const pages = Math.ceil(pastEvents.length / perView);
  const currentPage = Math.floor(current / perView);
  const next = () => setCurrent((prev) => (prev + 1) % pastEvents.length);
  const prev = () => setCurrent((prev) => (prev - 1 + pastEvents.length) % pastEvents.length);

  return (
    <section className="py-16 bg-white">
      <div className=" max-w-6xl mx-auto px-4">
        
         <h2 className="text-3xl uppercase md:text-3xl  font-extrabold text-gray-800  ">
         <div className=" max-w-md lg:max-w-4xl py-10 w-full px-4   ">
           <span className="inline-block text-start  rounded-full uppercase py-1.5 text-sm font-bold tracking-[0.4em] text-[#C5B78E]">
              our event
            </span>
            <h2 className="mt-4 text-4xl font-extrabold uppercase text-[#6d5423] leading-tight sm:text-4xl lg:text-6xl text-start">
              <span className='text-[#C5B78E]'>Past events</span> in the world
            </h2>
        </div>
        </h2>

        <div className="relative">
          <div className="overflow-hidden  py-3">
            <div
              className="flex transition-transform duration-700 ease-in-out "
              style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
            >
              {pastEvents.map((event) => (
                <div key={event.title} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold transition-colors">
                        {event.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{event.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Tag className="h-4 w-4" />
                          <span className="text-sm">{event.category}</span>
                        </div>
                      </div>
                      <button className="mt-4 px-6 py-2 border-2 border-primary rounded-2xl text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors">
                        LEARN MORE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            className="absolute left-2 bg-white/50 top-1/2 -translate-y-1/2 size-9  flex items-center justify-center rounded-full shadow-sm"
          >
            <span className="icon-[tabler--chevron-left] text-gray-700"><ArrowLeft className='size-10' /></span>
            <span className="sr-only">Previous</span>
          </button>

          <button
            type="button"
            onClick={next}
            className="absolute right-2 bg-white/50 top-1/2 -translate-y-1/2 size-9  flex items-center justify-center rounded-full shadow-sm"
          > 
            <span className="icon-[tabler--chevron-right]  text-gray-700 "><ArrowRight  className='size-10'/></span>
            <span className="sr-only ">Next</span>
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={`page-${i}`}
                onClick={() => setCurrent(i * perView)}
                aria-current={currentPage === i}
                className={`w-2 h-2 rounded-full ${currentPage === i ? 'bg-gray-900' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
