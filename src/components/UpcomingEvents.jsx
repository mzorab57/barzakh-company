import { Calendar, MapPin } from 'lucide-react';

const events = [
  {
    title: 'An Evening With',
    image: '../assets/images/hero4.jpg',
    date: '24 to 28 December 2025',
    location: 'United Kingdom',
  },
   {
    title: 'Antalya Retreat',
    image: '../assets/images/hero2.jpg',
    date: '2 - 6 April 2026',
    location: 'Turkiye',
  },
  
  {
    title: 'Winter Conference 25',
    image: '../assets/images/hero3.jpg',  
    date: '30th Dec - 4th Jan',
    location: 'United Kingdom',
  },
 
  {
    title: 'Hajj With Mufti Menk',
    image: '../assets/images/hero1.jpg',
    date: '24 May 2026',
    location: 'Saudi Arabia',
  },
  {
    title: 'Umrah 2026',
    image: '../assets/images/hero4.jpg',
    date: '21 - 31 October 2026',
    location: 'Saudi Arabia',
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl uppercase md:text-3xl font-extrabold text-gray-800">
          Upcoming Events
          <div className="h-1.5 w-32 my-5 bg-primary rounded-full"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.title} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
              <div className="relative h-[28rem]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </div>

              {/* Event Details Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="inline-block text-white bg-primary font-semibold rounded-full px-4 py-2 text-sm md:text-base lg:text-lg shadow-sm">
                  {event.title}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm text-gray-800">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur rounded-full px-3 py-1.5 shadow-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm text-gray-800">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
