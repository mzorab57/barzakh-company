import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Events', href: '#events' },
    { label: 'Apply to Volunteer', href: '#volunteer' },
    { label: 'Stalls', href: '#stalls' },
    { label: 'About Us', href: '#about' },
    { label: 'Past Events', href: '#past-events' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
  ];

  return (
    <header className="bg-primary shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[6.5rem]">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* <img
              src="https://ext.same-assets.com/1954549727/3902784129.svg"
              alt="Light Upon Light"
              className="h-12 w-auto"
            /> */}
            Logo
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700  transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] lg:hidden ">
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 h-[100dvh] w-3/4 bg-primary shadow-xl p-6">
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-3 text-gray-100 text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
