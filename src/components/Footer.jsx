import { Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const usefulLinks = [
    'Event Calendar',
    'Event Map',
    'Volunteer',
    'Terms and Conditions',
    'Privacy Policy',
  ];

  const international = [
    'United Kingdom',
    'Philippines',
    'Liberia',
    'Saudi Arabia',
    'United States',
    'Canada',
    'Indonesia',
    'Zanzibar',
  ];

  return (
    <footer className="">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-4">CONTACT</h3>
            <a
              href="mailto:info@lightuponlight.co.uk"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4 text-primary" />
              info@lightuponlight.co.uk
            </a>
            <div className="mt-6">
              <h3 className="font-bold text-gray-900 text-xl mb-4">SOCIAL LINKS</h3>
              <div className="space-y-2">
                <a
                  href="#facebook"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <Facebook className="h-4 w-4 text-primary" />
                  Facebook
                </a>
                <a
                  href="#instagram"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <Instagram className="h-4 w-4 text-primary" />
                  Instagram
                </a>
                <a
                  href="#tiktok"
                  className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="font-extrabold text-gray-900 text-xl mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LUL International */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-4">LUL INTERNATIONAL</h3>
            <ul className="space-y-2">
              {international.map((country) => (
                <li key={country}>
                  <a
                    href={`#${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 text-xl mb-4">Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Be notified for upcoming events
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="border-t border-gray-200 pt-8 max-w-xl">
          <p className="text-xs text-gray-500 mb-4">
            Light Upon Light is a brand name and project of Eman Channel Limited.
            Eman Channel Limited (Companies House number: 09792399) is registered in
            England and Wales with its registered office at Unit 8 Murihead Quay,
            Barking, London, England, IG11 7BG
          </p>
      
        </div>
           <div className="mt-12 pt-6 border-t border-gray-700 uppercase text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Barzakh Company. all rights reserved.</p>
          <p className="mt-2">
            Powered by{" "}
            <a 
              href="https://wa.me/96407701411893"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Al-Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
