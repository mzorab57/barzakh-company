import { ArrowRight } from 'lucide-react';

const countries = [
  {
    name: 'United Kingdom',
    flag: 'https://ext.same-assets.com/1954549727/1487444151.png',
    link: '#uk',
  },
  {
    name: 'South Africa',
    flag: 'https://ext.same-assets.com/1954549727/3488853506.png',
    link: '#south-africa',
  },
  {
    name: 'Philippines',
    flag: 'https://ext.same-assets.com/1954549727/3881489899.png',
    link: '#philippines',
  },
  {
    name: 'Turkiye',
    flag: 'https://ext.same-assets.com/1954549727/427552738.png',
    link: '#turkiye',
  },
  {
    name: 'Zanzibar',
    flag: 'https://ext.same-assets.com/1954549727/535722978.png',
    link: '#zanzibar',
  },
  {
    name: 'Saudi Arabia',
    flag: 'https://ext.same-assets.com/1954549727/2518531797.png',
    link: '#saudi-arabia',
  },
  {
    name: 'Liberia',
    flag: 'https://ext.same-assets.com/1954549727/2576629059.png',
    link: '#liberia',
  },
  {
    name: 'Canada',
    flag: 'https://ext.same-assets.com/1954549727/90597353.png',
    link: '#canada',
  },
  {
    name: 'United States',
    flag: 'https://ext.same-assets.com/1954549727/2363930762.png',
    link: '#usa',
  },
  {
    name: 'Indonesia',
    flag: 'https://ext.same-assets.com/1954549727/839244261.png',
    link: '#indonesia',
  },
];

export default function InternationalSection() {
  return (
    <section className="py-9 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-800  ">
          LUL INTERNATIONAL
          <div className='h-1.5 w-28 mt-3 bg-primary'></div>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-3 lg:px-6 pt-8 gap-4 lg:gap-7">
          {countries.map((country) => (
            <a
              key={country.name}
              href={country.link}
              className="group flex items-center gap-5 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0">
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-[3.7rem] h-8 object-cover rounded shadow-md"
                />
              </div>
              <div className="flex-1 justify-between  flex items-center  ">
                <h3 className="text-xl whitespace-nowrap font-bold text-primary transition-colors flex items-center gap-2">
                  {country.name}
                </h3>
                  <ArrowRight className="size-6 font-bold text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
