const guests = [
  {
    name: 'Mufti Menk',
    image: 'https://ext.same-assets.com/1954549727/1654697526.jpeg',
  },
  {
    name: 'Sheikh Omar Suleiman',
    image: 'https://ext.same-assets.com/1954549727/1367427224.jpeg',
  },
  {
    name: 'Akhi Ayman',
    image: 'https://ext.same-assets.com/1954549727/2374289309.jpeg',
  },
  {
    name: 'Sheikh Abu Bakr Zoud',
    image: 'https://ext.same-assets.com/1954549727/1691365782.jpeg',
  },
  {
    name: 'Ustadh Munir Amour',
    image: 'https://ext.same-assets.com/1954549727/2551564372.jpeg',
  },
  {
    name: 'Qari Hazza Al Balushi',
    image: 'https://ext.same-assets.com/1954549727/3687726817.jpeg',
  },
  {
    name: 'Sheikh Ali Hammuda',
    image: 'https://ext.same-assets.com/1954549727/533245950.jpeg',
  },
  {
    name: 'Sheikh Wael Ibrahim',
    image: 'https://ext.same-assets.com/1954549727/3604447796.jpeg',
  },
  {
    name: 'Dr. Muhammad Salah',
    image: 'https://ext.same-assets.com/1954549727/2483541163.jpeg',
  },
  {
    name: 'Sheikh Zahir Mahmood',
    image: 'https://ext.same-assets.com/1954549727/3331470062.jpeg',
  },
  {
    name: 'Sheikh Asim Khan',
    image: 'https://ext.same-assets.com/1954549727/3180968103.jpeg',
  },
  {
    name: 'Sheikh Murtaza Khan',
    image: 'https://ext.same-assets.com/1954549727/3477956713.jpeg',
  },
  {
    name: 'Sheikh Adnaan Menk',
    image: 'https://ext.same-assets.com/1954549727/2013914389.jpeg',
  },
  {
    name: 'Sheikh Yunus Dudhwala',
    image: 'https://ext.same-assets.com/1954549727/644425640.jpeg',
  },
  {
    name: 'Sheikh Wahaj Tarin',
    image: 'https://ext.same-assets.com/1954549727/3618403170.jpeg',
  },
  {
    name: 'Sheikh Belal Assaad',
    image: 'https://ext.same-assets.com/1954549727/2901715729.jpeg',
  },
];

export default function Guests() {
  return (
    <section className="py-16 ">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl uppercase md:text-3xl  font-extrabold text-gray-800  ">
          Guests From Past Events
          <div className='h-1.5 w-32 my-5 bg-primary'></div>
        </h2>
        

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {guests.map((guest) => (
            <div
              key={guest.name}
              className="group cursor-pointer bg-slate-50 p-4 rounded-2xl hover:shadow-2xl ease-in-out transition-all duration-700"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 shadow-md">
                <img
                  src={guest.image}
                  alt={guest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-primary transition-colors text-start">
                {guest.name}
              </h3>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
