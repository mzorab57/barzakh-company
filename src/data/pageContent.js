import eventTurkiaDesktop from '../assets/images/event/event-turkia.webp';
import eventTurkiaMobile from '../assets/images/event/event-turkia-mobile.webp';

const mergeItems = (translatedItems = [], staticItems = []) =>
  translatedItems.map((item, index) => ({
    ...staticItems[index],
    ...item,
  }));

export const getAboutPageContent = t => ({
  ...t('pages.about', { returnObjects: true }),
  heroImage: '/assets/images/hero4.jpg',
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
    { image: '/assets/images/hero1.jpg' },
    { image: '/assets/images/hero4.jpg' },
    { image: '/assets/images/hero2.jpg' },
    { image: '/assets/images/hero3.jpg' },
    { image: '/assets/images/hero1.jpg' },
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
