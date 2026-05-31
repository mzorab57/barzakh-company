import StaggeredMenu from './StaggeredMenu';
import LanguageSwitcher from './LanguageSwitcher';
// import malazadaLogo from '/assets/images/logo/malazadar.png';
import alnukhbaLogo from '/assets/images/logo/alnukhbar.png';
// import barzakhLogo from '/assets/images/logo/barzakhr.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getHeaderContent } from '@/data/componentContent';

export default function Header() {
  const { t } = useTranslation();
  const headerContent = getHeaderContent(t);

  return (
    <header className="bg-[#88743e] shadow-sm sticky top-0 z-50 ">
      <div className="max-w-[1600px] lg:py-2 mx-auto px-1 ">
        <div className="flex items-center justify-between h-20">
         
         <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/">
          <img src={alnukhbaLogo} alt="Alnukhba" className="h-24 md:h-32 w-auto" />
          </Link>

            {/* <img src={malazadaLogo} alt="Malazada" className="h-24 md:h-32 w-auto" />
            {/* <img src={barzakhLogo} alt="Barzakh" className="h-24 md:h-32 w-auto" /> */}
       
           
          <div className='flex items-center gap-x-3 mr-3 lg:mr-0'>
            <LanguageSwitcher />
            <StaggeredMenu
              position="right"
              items={headerContent.menuItems}
              socialItems={headerContent.socialItems}
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
