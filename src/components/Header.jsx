import StaggeredMenu from './StaggeredMenu';
import malazadaLogo from '/assets/images/logo/malazadar.png';
import alnukhbaLogo from '/assets/images/logo/alnukhbar.png';
import barzakhLogo from '/assets/images/logo/barzakhr.png';
import { Link } from 'react-router-dom';

export default function Header() {
  // لیستی سەرەکی
  const menuItems = [
     { label: 'Home', link: '/' },
    { 
      label: 'Events', 
      isParent: true, // ئاماژەیە بۆ ئەوەی ئەمە مینیوی تێدایە
      children: [
        { label: 'Turkey 2027', link: '/events/turkey-2027' },
        { label: 'The Migration Route', link: '/events/migration-route' },
        { label: '3-Month Stay in Medina', link: '/events/medina-stay' },
      ]
    },
    { label: 'Apply to Volunteer', link: '/apply-to-volunteer' },
    { label: 'Stalls', link: '/stalls' },
    { label: 'About Us', link: '/about' },
    { label: 'Past Events', link: '/past-events' },
    { label: 'FAQ', link: '/faq' },
    { label: 'Contact Us', link: '/contact' },
  ];

  const socialItems = [
    { label: 'Facebook', link: 'https://www.facebook.com/share/1EBGUTWSKp/' },
    { label: 'Instagram', link: 'https://www.instagram.com/barzakh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
    { label: 'WhatsApp', link: 'https://chat.whatsapp.com/FCvEFdvkQV5E65LngTwywf?mode=ems_copy_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio' },
  ];

  return (
    <header className="bg-[#88743e] shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] lg:py-2 mx-auto px-1">
        <div className="flex items-center justify-between h-20">
         
         <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/">
          <img src={alnukhbaLogo} alt="Alnukhba" className="h-24 md:h-32 w-auto" />
          </Link>

            {/* <img src={malazadaLogo} alt="Malazada" className="h-24 md:h-32 w-auto" />
            {/* <img src={barzakhLogo} alt="Barzakh" className="h-24 md:h-32 w-auto" /> */}
       
           
          <div className='flex items-center gap-x-5 mr-3 lg:mr-0'>
            <StaggeredMenu
              position="right"
              items={menuItems}
              socialItems={socialItems}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="#ffffff"
              openMenuButtonColor="#ffffff"
              accentColor="#C6B78E"
              colors={['#706543', '#C5B78E']}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
