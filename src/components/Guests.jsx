const guests = [
  {
    name: 'Mufti Menk',
    image: '../assets/images/hero1.jpg',
  },
  {
    name: 'Sheikh Omar Suleiman',
    image: '../assets/images/hero2.jpg',
  },
  {
    name: 'Akhi Ayman',
    image: '../assets/images/hero4.jpg',
  },
  {
    name: 'Sheikh Abu Bakr Zoud',
    image: '../assets/images/hero3.jpg',
  },
  {
    name: 'Ustadh Munir Amour',
    image: '../assets/images/hero1.jpg',
  },
  {
    name: 'Qari Hazza Al Balushi',
    image: '../assets/images/hero2.jpg',
  },
  {
    name: 'Sheikh Ali Hammuda',
    image: '../assets/images/hero3.jpg',
  },
  {
    name: 'Sheikh Wael Ibrahim',
    image: '../assets/images/hero4.jpg',
  },
  {
    name: 'Dr. Muhammad Salah',
    image: '../assets/images/hero1.jpg',
  },
  {
    name: 'Sheikh Zahir Mahmood',
    image: '../assets/images/hero2.jpg',
  },
  {
    name: 'Sheikh Asim Khan',
    image: '../assets/images/hero3.jpg',
  },
  {
    name: 'Sheikh Murtaza Khan',
    image: '../assets/images/hero4.jpg',
  },
  {
    name: 'Sheikh Adnaan Menk',
    image: '../assets/images/hero1.jpg',
  },
  {
    name: 'Sheikh Yunus Dudhwala',
    image: '../assets/images/hero2.jpg',
  },
  {
    name: 'Sheikh Wahaj Tarin',
    image: '../assets/images/hero3.jpg',
  },
  {
    name: 'Sheikh Belal Assaad',
    image: '../assets/images/hero4.jpg',
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
