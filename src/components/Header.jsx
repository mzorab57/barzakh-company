import StaggeredMenu from './StaggeredMenu';
import LanguageSwitcher from './LanguageSwitcher';
// import malazadaLogo from '/assets/images/logo/malazadar.png';
import alnukhbaLogo from '/assets/images/logo/logon.png';
// import barzakhLogo from '/assets/images/logo/barzakhr.png';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getHeaderContent } from '@/data/componentContent';
import { apiRequest } from '@/lib/api';
import { getLocalizedText, resolveLocale, resolvePublicEventRoute } from '@/lib/catalog';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [eventItems, setEventItems] = useState([]);
  const headerContent = getHeaderContent(t);
  const locale = resolveLocale(i18n?.language);

  useEffect(() => {
    let ignore = false;

    apiRequest('/api/catalog/events?upcoming=1&limit=6')
      .then((response) => {
        if (!ignore) {
          setEventItems(Array.isArray(response?.data?.items) ? response.data.items : []);
        }
      })
      .catch(() => {
        if (!ignore) {
          setEventItems([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const menuItems = useMemo(() => {
    const dynamicChildren = eventItems
      .map((event) => {
        return {
          label: getLocalizedText(event.title, locale, event.titleText || 'Event'),
          link: resolvePublicEventRoute(event, locale),
        };
      })
      .filter(Boolean)
      .filter((item, index, collection) => (
        collection.findIndex((candidate) => candidate.link === item.link) === index
      ));

    return headerContent.menuItems.map((item) => {
      if (!item.isParent) {
        return item;
      }

      return {
        ...item,
        children: dynamicChildren.length > 0 ? dynamicChildren : item.children,
      };
    });
  }, [eventItems, headerContent.menuItems, locale]);

  return (
    <header className="bg-[#88743e] shadow-sm sticky top-0 z-50 ">
      <div className="max-w-[1600px] lg:py-2 mx-auto px-4  ">
        <div className="flex items-center justify-between h-24">
         
         <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/">
          <img src={alnukhbaLogo} alt="Alnukhba" className="h-24 translate-x-6 md:h-32 " />
          </Link>

            {/* <img src={malazadaLogo} alt="Malazada" className="h-24 md:h-32 w-auto" />
            {/* <img src={barzakhLogo} alt="Barzakh" className="h-24 md:h-32 w-auto" /> */}
       
           
          <div className='flex items-center gap-x-3 '>
            <LanguageSwitcher />
            <StaggeredMenu
              position="right"
              items={menuItems}
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
