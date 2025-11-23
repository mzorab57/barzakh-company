import { Calendar, MapPin } from 'lucide-react';

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

export default function UpcomingEvents() {
  return (
    <section className="py-16 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
         <h2 className="text-3xl uppercase md:text-3xl  font-extrabold text-gray-800  ">
          Upcoming Events
          <div className='h-1.5 w-32 my-5 bg-primary'></div>
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-7 gap-4  ">
          {events.map((event) => (
            <div
              key={event.title}
              className=" relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="  ">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Event Details */}
              <div className="md:p-3 p-1.5 w-fit  absolute bottom-0 ">
                <h3 className="lg:text-2xl md:text-lg   whitespace-nowrap text-sm font-bold bg-primary rounded-2xl w-fit text-white px-1 md:px-4 md:py-2 py-1 lg:p-2 mb-2 transition-colors">
                  {event.title}
                </h3>
                <div className=" bg-white  w-full flex flex-wrap items-center gap-x-4 gap-y-1  rounded-xl p-1 md:p-1.5 ">
                  <div className="flex items-center scale-90  rounded-xl gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-primary"  />
                    <span className="text-xs sm:text-sm  w-fit   lg:text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center scale-90 pl-0.5 gap-x-2 text-gray-600 ">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs sm:text-sm  lg:text-sm">{event.location}</span>
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
