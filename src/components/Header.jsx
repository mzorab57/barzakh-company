import StaggeredMenu from './StaggeredMenu';
import malazadaLogo from '/assets/images/logo/malazadar.png';
import alnukhbaLogo from '/assets/images/logo/alnukhbar.png';
import barzakhLogo from '/assets/images/logo/barzakhr.png';

export default function Header() {
  // لیستی سەرەکی
  const menuItems = [
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
    { label: 'Facebook', link: 'https://facebook.com' },
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'TikTok', link: 'https://tiktok.com' },
  ];

  return (
    <header className="bg-[#88743e] shadow-sm sticky top-0 z-50">
      <div className="max-w-[1600px] lg:py-2 mx-auto px-1">
        <div className="flex items-center justify-between h-20">
         
          <img src={alnukhbaLogo} alt="Alnukhba" className="h-24 md:h-32 w-auto" />
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
