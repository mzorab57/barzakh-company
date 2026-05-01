import { Mail, Facebook, Instagram, Send, Globe, ExternalLink } from 'lucide-react';
import { CosmicParallaxBg } from './ui/parallax-cosmic-background';

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
    <footer className="relative w-full overflow-hidden text-white">
      {/* بەشی باکگراوەند - Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <CosmicParallaxBg
          head=""
          text=""
          loop={true}
          className="h-full w-full"
          primaryColor="#88743e"
          secondaryColor="#C5B78E"
        />
        {/* ئەفێکتێکی کاڵ بۆ سەر باکگراوەندەکە بۆ ئەوەی دەقەکان باشتر بخوێندرێنەوە */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* بەشی ناوەڕۆک - Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-3 pt-20 lg:py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          
          {/* ١. پەیوەندی و سۆشیاڵ - CONTACT & SOCIAL */}
          <div className="space-y-8 ">
            <div>
              <h3 className="text-[#C5B78E] font-black lg:text-4xl text-2xl mb-6 tracking-widest uppercase">Contact</h3>
              <a
                href="mailto:info@nukhbaglobal.com"
                className="group flex items-center gap-1  text-[#b2a47e] transition-all duration-300"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#88743e]/20">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="lg:text-lg text-base font-medium">info@nukhbagloabal.com</span>
              </a>
            </div>

            <div>
              <h3 className="text-[#C5B78E] font-black text-2xl lg:text-4xl mb-6 tracking-widest uppercase">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  { icon: <Facebook size={20} />, link: '#facebook' },
                  { icon: <Instagram size={20} />, link: '#instagram' },
                  { icon: <Globe size={20} />, link: '#web' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    className="w-10 h-10  flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-[#88743e] hover:border-[#88743e] transition-all duration-500"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ٢. لینکە بەسوودەکان - USEFUL LINKS */}
          <div>
            <h3 className="text-[#C5B78E] font-black lg:text-4xl text-2xl mb-6 tracking-widest uppercase">Useful Links</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className=" hover:translate-x-2 hover:text-gray-400 text-[#b2a47e] flex items-center gap-2 transition-all duration-300 text-base group"
                  >
                    {/* <div className="w-1 h-1 text-base font-medium  bg-[#88743e] rounded-full group-hover:w-3 transition-all" /> */}
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ٣. جیهانی - INTERNATIONAL */}
          <div>
            <h3 className="text-[#C5B78E] font-black text-2xl lg:text-4xl mb-6 tracking-widest uppercase">International</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {international.map((country) => (
                <li key={country}>
                  <a
                    href={`#${country.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-gray-400 text-[#b2a47e]  transition-colors text-base  font-medium uppercase tracking-tighter"
                  >
                    {country}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         
        </div>

        {/* بەشی خوارەوە - Footer Bottom */}
        <div className="  border-t pb-4 border-white/10 flex flex-col items-center gap-4 text-center">
          <div className="bg-red-100">

          </div>

          <div className="flex justify-between w-full  items-center gap-2">
            <p className="text-sm font-bold  uppercase text-gray-400">
              © {new Date().getFullYear()} <span className="text-[#C5B78E]">Barzakh Company</span>. 
            </p>
            <div className="flex items-center uppercase gap-2 text-xs text-gray-500 mt-2 ">
              <span className='flex gap-x-1'>Powered by <a 
                href="https://wa.me/96407701411893"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5B78E]  hover:scale-110 transition-transform flex items-center gap-1"
              >
                AL-CODE
              </a></span>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}