import eventTurkiaDesktop from '../assets/images/event/event-turkia.webp';
import eventTurkiaMobile from '../assets/images/event/event-turkia-mobile.webp';
import migrationPosterMobileImg from '../assets/images/event/regay-koch-mobile.webp';
import migrationRouteImg1 from '../assets/images/migrationRoute/img1.webp';
import migrationRouteImg2 from '../assets/images/migrationRoute/img2.webp';
import migrationRouteImg3 from '../assets/images/migrationRoute/img3.webp';
import migrationRouteImg4 from '../assets/images/migrationRoute/img4.webp';
import migrationRouteImg5 from '../assets/images/migrationRoute/img5.webp';
import aboutBgImg from '../assets/images/about/about-bg.jpeg';
import aboutEventImg from '../assets/images/about/about.jpeg';
import migrationPosterImg from '../assets/images/event/regay-koch.webp';

const mergeItems = (translatedItems = [], staticItems = []) =>
  translatedItems.map((item, index) => ({
    ...staticItems[index],
    ...item,
  }));

const mergePastEventItems = (translatedItems = [], staticItems = []) =>
  staticItems.map((item, index) => {
    const translatedItem = translatedItems[index] || {};

    return {
      ...item,
      ...translatedItem,
      videos: item.videos.map((video, videoIndex) => ({
        ...video,
        ...((translatedItem.videos || [])[videoIndex] || {}),
      })),
    };
  });

const getPastEventsStaticItems = () => ([
  
  {
    slug: 'migration-route',
    image: migrationPosterImg,
    mobileImage: migrationPosterMobileImg,
    year: '2025',
    category: 'medina',
    videos: [
      {
        id: 'TLKOrC-1ejE',
        url: 'https://youtu.be/TLKOrC-1ejE?si=BI_rnHFbHZeOH7JC',
      },
    ],
  },
  {
    slug: 'route-of-hajj',
    image: eventTurkiaDesktop,
    mobileImage: eventTurkiaMobile,
    year: '2025',
    category: 'makkah',
    videos: [
      {
        id: 'We5OqKbf4Gk',
        url: 'https://youtu.be/We5OqKbf4Gk?si=L0u0BkQBL8-5YhlJ',
      },
    ],
  },
]);

export const getAboutPageContent = t => ({
  ...t('pages.about', { returnObjects: true }),
  heroImage: aboutBgImg,
  story: {
    ...t('pages.about.story', { returnObjects: true }),
    paragraphs: t('pages.about.story.paragraphs', { returnObjects: true }) || [
      t('pages.about.story.intro'),
      t('pages.about.story.body'),
    ].filter(Boolean),
  },
  motivational: {
    ...t('pages.about.motivational', { returnObjects: true }),
    image: aboutEventImg,
    imageAlt: t('pages.about.motivational.imageAlt') || 'About event',
    paragraphs: t('pages.about.motivational.paragraphs', { returnObjects: true }) || [],
  },
  cosmic: {
    ...t('pages.about.cosmic', { returnObjects: true }),
    loop: true,
    className: 'h-screen',
    primaryColor: '#88743e',
    secondaryColor: '#C5B78E',
  },
});

export const getContactPageContent = t => t('pages.contact', { returnObjects: true });

export const getMenuLandingPageDefaults = t => t('pages.menuLandingDefaults', { returnObjects: true });

export const getStallsPageContent = t => ({
  ...t('pages.stallsForm', { returnObjects: true }),
  whatsappNumber: '9647713857171',
});

export const getMedinaStayPageContent = t => ({
  ...t('pages.medinaStay', { returnObjects: true }),
  overviewStats: mergeItems(t('pages.medinaStay.overviewStats', { returnObjects: true }), [
    { iconKey: 'CalendarDays' },
    { iconKey: 'MapPin' },
    { iconKey: 'Sparkles' },
  ]),
  personalGrowth: {
    ...t('pages.medinaStay.personalGrowth', { returnObjects: true }),
    image: '/assets/images/medina.jpg',
  },
  services: {
    ...t('pages.medinaStay.services', { returnObjects: true }),
    cards: mergeItems(t('pages.medinaStay.services.cards', { returnObjects: true }), [
      { iconKey: 'ShieldCheck' },
      { iconKey: 'Bus' },
      { iconKey: 'BedDouble' },
      { iconKey: 'HeartHandshake' },
      { iconKey: 'CheckCircle2' },
      { iconKey: 'Utensils' },
      { iconKey: 'Globe' },
    ]),
  },
  education: {
    ...t('pages.medinaStay.education', { returnObjects: true }),
    contacts: ['0770-538-7171', '0751-538-7171'],
  },
});

export const getMigrationRoutePageContent = t => ({
  ...t('pages.migrationRoute', { returnObjects: true }),
  hero: {
    ...t('pages.migrationRoute.hero', { returnObjects: true }),
    phone: '07719709647',
  },
  tripDetails: mergeItems(t('pages.migrationRoute.tripDetails', { returnObjects: true }), [
    { iconKey: 'CalendarDays' },
    { iconKey: 'ShieldCheck' },
    { iconKey: 'MapPin' },
  ]),
  journeyStages: mergeItems(t('pages.migrationRoute.journeyStages', { returnObjects: true }), [
    { image: migrationRouteImg1 },
    { image: migrationRouteImg2 },
    { image: migrationRouteImg3 },
    { image: migrationRouteImg4 },
    { image: migrationRouteImg5 },
  ]),
  seerah: {
    ...t('pages.migrationRoute.seerah', { returnObjects: true }),
    points: mergeItems(t('pages.migrationRoute.seerah.points', { returnObjects: true }), [
      { iconKey: 'BookOpen' },
      { iconKey: 'Mountain' },
      { iconKey: 'Backpack' },
    ]),
  },
  supportAndAmenities: {
    ...t('pages.migrationRoute.supportAndAmenities', { returnObjects: true }),
    cards: mergeItems(t('pages.migrationRoute.supportAndAmenities.cards', { returnObjects: true }), [
      { iconKey: 'Users' },
      { iconKey: 'Bus' },
      { iconKey: 'Tent' },
      { iconKey: 'Camera' },
    ]),
    registration: {
      ...t('pages.migrationRoute.supportAndAmenities.registration', { returnObjects: true }),
      phone: '0771 970 9647',
      tel: '07719709647',
    },
  },
});

export const getTurkeyEventPageContent = t => ({
  ...t('pages.turkeyEvent', { returnObjects: true }),
  hero: {
    ...t('pages.turkeyEvent.hero', { returnObjects: true }),
    centerImage: eventTurkiaDesktop,
    mobileCenterImage: eventTurkiaMobile,
    parallaxImages: [
      {
        src: '/assets/images/hero1.jpg',
        alt: 'Coast',
        start: -200,
        end: 100,
        className: 'w-1/2 lg:w-1/3 rounded-xl ml-auto',
      },
      {
        src: '/assets/images/hero2.jpg',
        alt: 'Earth',
        start: 200,
        end: -250,
        className: 'mx-auto w-3/4 lg:w-2/3 rounded-xl',
      },
      {
        src: '/assets/images/hero3.jpg',
        alt: 'Stage',
        start: -200,
        end: 200,
        className: 'ml-1 lg:w-80 w-1/2 rounded-xl',
      },
    ],
  },
  intro: {
    ...t('pages.turkeyEvent.intro', { returnObjects: true }),
    contactTel: '07719709647',
  },
  retreatHighlights: mergeItems(t('pages.turkeyEvent.retreatHighlights', { returnObjects: true }), [
    { iconKey: 'Sparkles' },
    { iconKey: 'Users' },
    { iconKey: 'Hotel' },
  ]),
  features: {
    ...t('pages.turkeyEvent.features', { returnObjects: true }),
    items: mergeItems(t('pages.turkeyEvent.features.items', { returnObjects: true }), [
      { iconKey: 'Sparkles' },
      { iconKey: 'Coffee' },
      { iconKey: 'Users' },
      { iconKey: 'Coffee' },
      { iconKey: 'Waves' },
      { iconKey: 'ShieldCheck' },
      { iconKey: 'Dumbbell' },
      { iconKey: 'BedDouble' },
    ]),
  },
  organizers: {
    ...t('pages.turkeyEvent.organizers', { returnObjects: true }),
    registration: {
      ...t('pages.turkeyEvent.organizers.registration', { returnObjects: true }),
      phone: '0771 970 9647',
    },
  },
});

export const getVolunteerRegistrationPageContent = t => ({
  ...t('pages.volunteerRegistration', { returnObjects: true }),
  whatsappNumber: '9647713857171',
});

export const getPastEventsArchivePageContent = t => ({
  ...t('pages.pastEventsArchive', { returnObjects: true }),
  events: mergePastEventItems(t('pages.pastEventsArchive.events', { returnObjects: true }) || [], getPastEventsStaticItems()),
});

export const getPastEventDetailPageContent = t => {
  const detail = t('pages.pastEventDetails', { returnObjects: true }) || {};
  const items = getPastEventsStaticItems();

  return {
    ...detail,
    events: mergePastEventItems(t('pages.pastEventDetails.events', { returnObjects: true }) || [], items),
  };
};
