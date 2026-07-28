import eventTurkiaDesktop from '../assets/images/event/event-turkia.webp';
import eventTurkiaMobile from '../assets/images/event/event-turkia-mobile.jpeg';
import migrationPosterImg from '../assets/images/event/regay-koch.webp';
import migrationPosterMobileImg from '../assets/images/event/regay-koch-mobile.webp';

const mergeItems = (translatedItems = [], staticItems = []) =>
  translatedItems.map((item, index) => ({
    ...staticItems[index],
    ...item,
  }));

export const getAboutSectionContent = t => t('components.aboutSection', { returnObjects: true });

export const getVideoSectionContent = t => ({
  ...t('components.videoSection', { returnObjects: true }),
  videoSrc: 'https://pub-8090965640ca4bd1b63bf23a3ab20377.r2.dev/regay_hijray.mp4',
});

export const getGuestsSectionContent = t => ({
  ...t('components.guests', { returnObjects: true }),
  guests: mergeItems(t('components.guests.guests', { returnObjects: true }), [
    {
      image: '/assets/images/hero1.jpg',
      span: 'col-span-2 md:col-span-7 lg:col-span-8 md:row-span-2',
      height: 'h-[450px] md:h-[700px]',
    },
    {
      image: '/assets/images/hero4.jpg',
      span: 'col-span-1 md:col-span-5 lg:col-span-4',
      height: 'h-[280px] md:h-[338px]',
    },
    {
      image: '/assets/images/hero3.jpg',
      span: 'col-span-1 md:col-span-5 lg:col-span-4',
      height: 'h-[280px] md:h-[338px]',
    },
    {
      image: '/assets/images/hero1.jpg',
      span: 'col-span-2 md:col-span-6',
      height: 'h-[350px] md:h-[420px]',
    },
    {
      image: '/assets/images/hero2.jpg',
      span: 'col-span-2 md:col-span-6',
      height: 'h-[350px] md:h-[420px]',
    },
  ]),
});

export const getPastEventsSectionContent = t => ({
  ...t('components.pastEvents', { returnObjects: true }),
  pastEvents: mergeItems(t('components.pastEvents.pastEvents', { returnObjects: true }), [
    { image: eventTurkiaDesktop, mobileImage: eventTurkiaMobile, href: '/past-events/route-of-hajj' },
    { image: migrationPosterImg, mobileImage: migrationPosterMobileImg, href: '/past-events/migration-route' },
  ]),
});

export const getUpcomingEventsSectionContent = t => ({
  ...t('components.upcomingEvents', { returnObjects: true }),
  events: mergeItems(t('components.upcomingEvents.events', { returnObjects: true }), [
    { image: '/assets/images/hero4.jpg' },
    { image: '/assets/images/hero2.jpg' },
    { image: '/assets/images/hero3.jpg' },
    { image: '/assets/images/hero1.jpg' },
    { image: '/assets/images/hero4.jpg' },
  ]),
});

export const getFooterContent = t => {
  const footer = t('components.footer', { returnObjects: true }) || {};

  return {
    ...footer,
    stats: mergeItems(t('components.footer.stats', { returnObjects: true }) || [], [{ iconKey: 'Award' }]),
    donation: {
      badge: 'Support & Giving',
      paragraphs: [],
      formLabel: 'Donation Amount',
      placeholder: 'Enter donation amount',
      buttonLabel: 'Donate',
      note: '',
      ...(footer.donation || {}),
    },
    usefulLinks: mergeItems(t('components.footer.usefulLinks', { returnObjects: true }) || [], [
      { href: '/' },
      { href: '/events/migration-route' },
      { href: '/apply-to-volunteer' },
      { href: '/stalls' },
      { href: '/about' },
      { href: '/contact' },
    ]),
    international: mergeItems(t('components.footer.international', { returnObjects: true }) || [], [
      { code: 'UK', flag: 'GB' },
      { code: 'PH', flag: 'PH' },
      { code: 'SA', flag: 'SA' },
      { code: 'ID', flag: 'ID' },
    ]),
    email: 'info@nukhbaglobal.com',
    phones: footer.phones || ['0771-385-7171', '0751-385-7171'],
    location: {
      label: footer.location?.label || 'Location',
      text: footer.location?.text || 'سلێمانی - کوردسات',
      href: 'https://maps.app.goo.gl/H4bbxHj6Kbn5eUCq7',
    },
    socialLinks: mergeItems(t('components.footer.socialLinks', { returnObjects: true }) || [], [
      {
        iconKey: 'Instagram',
        href: 'https://www.instagram.com/nukhba.global?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
        color: 'hover:bg-gradient-to-br hover:from-[#405DE6] hover:to-[#E1306C]',
      },
      {
        iconKey: 'Facebook',
        href: 'https://www.facebook.com/share/18jEsA4j89/?mibextid=wwXIfr',
        color: 'hover:bg-[#1877F2]',
      },
      {
        iconKey: 'TikTok',
        href: 'https://www.tiktok.com/@nukhba.global?_r=1&_t=ZS-96xzQZ4lwiT',
        color: 'hover:bg-[#111111]',
      },
      {
        iconKey: 'WhatsApp',
        href: 'https://wa.me/9647713857171',
        color: 'hover:bg-[#25D366]',
      },
    ]),
    credits: {
      ...((footer && footer.credits) || {}),
      href: 'https://wa.me/9647701411893',
    },
  };
};

export const getHeaderContent = t => ({
  menuItems: [
    { label: t('components.header.menu.home'), link: '/' },
    {
      label: t('components.header.menu.events'),
      isParent: true,
      children: [
        { label: t('components.header.menu.migrationRoute'), link: '/events/migration-route' },
      ],
    },
    { label: t('components.header.menu.volunteer'), link: '/apply-to-volunteer' },
    { label: t('components.header.menu.stalls'), link: '/stalls' },
    { label: t('components.header.menu.about'), link: '/about' },
    { label: t('components.header.menu.pastEvents'), link: '/past-events' },
    { label: t('components.header.menu.faq'), link: '/faq' },
    { label: t('components.header.menu.contact'), link: '/contact' },
  ],
  socialItems: [
    { label: t('components.header.social.facebook'), link: 'https://www.facebook.com/share/1EBGUTWSKp/' },
    {
      label: t('components.header.social.instagram'),
      link: 'https://www.instagram.com/barzakh.company?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    },
    {
      label: t('components.header.social.whatsapp'),
      link: 'https://chat.whatsapp.com/FCvEFdvkQV5E65LngTwywf?mode=ems_copy_t&utm_source=ig&utm_medium=social&utm_content=link_in_bio',
    },
    { label: t('components.header.social.telegram'), link: 'https://t.me/qonaghiyakam' },
  ],
});

export const getStaggeredMenuContent = t => {
  const translated = t('components.staggeredMenu', { returnObjects: true });

  return {
    toggleLabels: Array.isArray(translated?.toggleLabels) ? translated.toggleLabels : ['Menu', 'Close'],
    backToMenuLabel: translated?.backToMenuLabel || 'Back to Menu',
    socialsTitle: translated?.socialsTitle || 'Socials',
  };
};

export const getHeroSliderContent = t => ({
  ...t('components.heroSlider', { returnObjects: true }),
  autoPlaySpeed: 5000,
  slides: [
    {
      id: 1,
      desktopImg: eventTurkiaDesktop,
      mobileImg: eventTurkiaMobile,
      title: '',
      category: '',
    },
    {
      id: 2,
      desktopImg: migrationPosterImg,
      mobileImg: migrationPosterMobileImg,
      title: '',
      category: '',
    },
  ],
});

export const getInternationalSectionContent = t => ({
  ...t('components.internationalSection', { returnObjects: true }),
  countries: mergeItems(t('components.internationalSection.countries', { returnObjects: true }), [
    {
      flag: 'http://lightuponlight.co.uk/wp-content/uploads/2024/11/Philippines-600x338.png',
      link: '#uk',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/3488853506.png',
      link: '#south-africa',
    },
    {
      flag: 'https://lightuponlight.co.uk/wp-content/uploads/2024/05/UK-600x338.png',
      link: '#philippines',
    },
    {
      flag: 'https://lightuponlight.co.uk/wp-content/uploads/2025/08/south-africa-600x338.png',
      link: '#turkiye',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/535722978.png',
      link: '#zanzibar',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/2518531797.png',
      link: '#saudi-arabia',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/2576629059.png',
      link: '#liberia',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/90597353.png',
      link: '#canada',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/2363930762.png',
      link: '#usa',
    },
    {
      flag: 'https://ext.same-assets.com/1954549727/839244261.png',
      link: '#indonesia',
    },
  ]),
});
