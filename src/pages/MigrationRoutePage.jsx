import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxScrollFeatureSection from '../components/ui/parallax-scroll-feature-section';
import {
  Backpack,
  BookOpen,
  Bus,
  Camera,
  CalendarDays,
  MapPin,
  Mountain,
  Phone,
  ShieldCheck,
  Tent,
  Users,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const overviewPoints = [
  'This step will change your life through a once-in-a-lifetime spiritual journey.',
  'Unmatched guides and amazing people accompany you along the footsteps of the Messenger of Allah (PBUH).',
  'A licensed travel manager ensures a verified, safe, and well-organized route.',
  'Capacity is limited to only 45 participants for a focused and meaningful experience.',
];

const journeyStages = [
  {
    
    title: 'Departure from Mecca',
    location: 'Mecca',
    year: '2027',
    image: '/assets/images/hero1.jpg',
    points: [
      'The Prophet of Allah (PBUH) and Abu Bakr began their journey under the cover of night.',
      'He disappeared from the Quraish, who had planned to kill the Prophet (PBUH).',
      'Walk the same streets of Mecca where the Prophet lived and began his journey.',
      'Gain insight into the challenges and courage that marked the first steps of Hijrah.',
    ],
  },
  {
   
    title: 'Cave of Thawr',
    location: 'South of Mecca, Cave of Thawr',
    year: '2027',
    image: '/assets/images/hero4.jpg',
    points: [
      'The Prophet (PBUH) and Abu Bakr hid in this mountainous cave for three days.',
      'The Quraish came close to the cave, but Allah protected them with divine care.',
      'Climb the historical Cave of Thawr and experience the same seclusion that sheltered them.',
      'Feel the depth of tawakkul, patience, and trust that carried the journey forward.',
    ],
  },
  {
  
    title: 'The Coastal Route',
    location: 'Coastal Desert',
    year: '2027',
    image: '/assets/images/hero2.jpg',
    points: [
      'By taking the coastal path, the Prophet (PBUH) and his companion avoided pursuit and confused the Quraish.',
      'They crossed difficult desert terrain with the help of a skilled and trusted guide.',
      'Walk authentic coastal paths and experience the trek that helped spread this beautiful religion.',
      'See how planning, resilience, and faith shaped every stage of the migration.',
    ],
  },
  {
   
    title: 'Akha Mountain',
    location: 'Passing over Akha Mountain',
    year: '2027',
    image: '/assets/images/hero3.jpg',
    points: [
      'The Prophet (PBUH) and Abu Bakr (RA) briefly stopped at Akha Mountain along the secret Hijrah route.',
      'It is a hidden point known by few, yet it carries the footsteps of sacred history.',
      'Challenge yourself with the same mountain climb and feel both physical hardship and spiritual reward.',
      'Reach a place where silence, effort, and remembrance come together in a powerful way.',
    ],
  },
  {
   
    title: 'Arrival in Medina',
    location: 'Medina',
    year: '2027',
    image: '/assets/images/hero1.jpg',
    points: [
      'The triumphant arrival in Medina marked the beginning of a new era for Islam and the Islamic calendar.',
      'The people of Holy Medina welcomed the Prophet (PBUH) with joy and celebration.',
      'Enter Medina following the Prophet’s path and reflect on this historic milestone.',
      'Be welcomed as part of the first Kurdish group to retrace the Hijrah route from Mecca to Medina on foot.',
    ],
  },
];

const journeySections = journeyStages.map((stage, index) => ({
  id: index + 1,
  title: stage.title,
  description: stage.points.join(' '),
  imageUrl: stage.image,
  reverse: index % 2 === 1,
  badge: stage.location,
  eyebrow: `Page ${index + 3}`,
  meta: `${stage.location} | ${stage.year}`,
  tags: stage.points.slice(0, 2),
}));

const tripDetails = [
  {
    icon: CalendarDays,
    title: 'Date',
    description: 'November 5, 2025 Capacity is limited to only 45 participants for a focused and meaningful experience.',
  },
  {
    icon: ShieldCheck,
    title: 'Trip Format',
    description: 'An all-inclusive, life-changing experience led with guidance, structure, and support.',
  },
  {
    icon: MapPin,
    title: 'Itinerary',
    description:
      'One night in a Mecca hotel, perform Umrah, then head to Mount Thawr in the evening before beginning the trek to Medina on foot.',
  },
];

const seerahPoints = [
  {
    icon: BookOpen,
    title: 'Live with the Seerah',
    description:
      "Walk the Prophet's path from Mecca to Medina, feel the sacrifice, and enjoy the adventure with deeper reflection.",
  },
  {
    icon: Mountain,
    title: 'Step-by-Step History',
    description:
      'Experience the journey that changed history one stage at a time, with meaning attached to every stop.',
  },
  {
    icon: Backpack,
    title: 'Walk Light',
    description:
      'A dedicated vehicle transports all luggage throughout the journey so you can focus on the spiritual experience.',
  },
];

const supportPoints = [
  {
    icon: Users,
    title: 'Full Support Team',
    description: 'Guides, first aid, and drivers accompany you across the route from start to finish.',
  },
  {
    icon: Bus,
    title: 'Assistance on the Route',
    description: 'A support vehicle is available whenever needed so you can rest and continue safely.',
  },
  {
    icon: Tent,
    title: 'VIP Tents',
    description: 'Camping is arranged along the journey with premium tents ready at designated rest points.',
  },
  {
    icon: Camera,
    title: 'Professional Recording',
    description:
      'Drone footage and professional photos document the Hijrah experience so you can relive it later without relying on your phone.',
  },
];

export default function MigrationRoutePage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray('[data-migration-hero]');
      const sections = gsap.utils.toArray('[data-migration-section]');
      const cards = gsap.utils.toArray('[data-migration-card]');

      gsap.from(heroItems, {
        y: 40,
        opacity: 0,
        duration: 0.95,
        stagger: 0.12,
        ease: 'power3.out',
      });

      sections.forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
          },
        });
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 28,
          opacity: 0,
          scale: 0.98,
          duration: 0.7,
          delay: index * 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden bg-[linear-gradient(180deg,#fbf6e9_0%,#f7f0dc_34%,#ffffff_100%)] text-[#2f2611]"
    >
      <section className="relative isolate overflow-hidden">
        <div className=" ">
          <video
            className="h-full w-full object-cover"
            src="https://pub-8090965640ca4bd1b63bf23a3ab20377.r2.dev/regay_hijray.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,14,6,0.88)_0%,rgba(20,14,6,0.62)_40%,rgba(20,14,6,0.54)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,183,142,0.22),transparent_28%)]" />
        </div>

      </section>
        <div className="relative mx-auto flex  max-w-7xl items-end px-4 py-16  sm:px-6 lg:px-8 ">
        
           <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/90">
                 The Migration Route
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  Join us on the path of Hijrah from Mecca to Medina.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  Walk in the path of the Prophet (PBUH), retrace the migration from Mecca to
              Medina, and experience a journey shaped by sacrifice, tawakkul, and history.
                </p>
                <div data-migration-hero className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
                <CalendarDays className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">November 5, 2027</span>
              </div>
              <a
                href="tel:07719709647"
                className="flex items-center gap-3 rounded-2xl bg-[#d8c98f]/50 px-5 py-3 text-[#fff6de] backdrop-blur transition hover:bg-[#d8c98f]/25"
              >
                <Phone className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">Contact us for more information</span>
              </a>
            </div>
              </div>
        </div>

      {/* <section
        data-migration-section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#88743e]">
              Page 2
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#231b0c] sm:text-4xl">
              Experience Overview
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              This step will change your life. It is an unbelievable experience that allows
              you to follow the footsteps of Prophet Muhammad (PBUH) during the migration
              between Mecca and Medina.
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              The Hijrah journey changed the history of the entire world. This retreat lets
              you relive its path with trusted guides, a safe route, and a carefully managed
              group built for reflection and connection.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.20)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6c68d]">
              Journey Snapshot
            </p>
            <ul className="mt-6 space-y-4">
              {overviewPoints.map((item) => (
                <li
                  key={item}
                  data-migration-card
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}

      <section
        data-migration-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {tripDetails.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-migration-card
                className="rounded-[1.8rem] border border-[#eadfbe] bg-[linear-gradient(180deg,#fffdf8_0%,#f7eed9_100%)] p-6 shadow-[0_18px_50px_rgba(81,62,21,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-[#88743e]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#241b08]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5a4824]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

{/* image kan */}
      <section className="mx-auto max-w-[1300px]  py-12  lg:px-8 lg:py-16">
        <ParallaxScrollFeatureSection
          intro={{
            eyebrow: 'Pages 3-7',
            title: 'Relive each station of the Hijrah journey.',
            description:
              'Scroll through the sacred route from Mecca to Medina and explore each defining stop with reflection, history, and visual storytelling.',
          }}
          sections={journeySections}
        />
      </section>

      <section
        data-migration-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] col-span-2 bg-[#2f2611] p-8 text-[#f8f1dd] shadow-[0_20px_70px_rgba(47,38,17,0.18)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Trip Details</h2>
            <p className="mt-6 text-base leading-8 text-[#f3ebd4]">
              Malazada Hajj & Umrah presents an all-inclusive, life-changing trip that helps
              you retrace the footsteps of the Prophet (PBUH) and Abu Bakr al-Siddiq (RA)
              with purpose, preparation, and spiritual depth.
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6c68d]">
                Main Itinerary
              </p>
              <p className="mt-3 text-sm leading-7 text-[#efe7cf]">
                One night stay in a Mecca hotel, perform Umrah, then head to Mount Thawr in
                the evening to spend the night before starting the trek to Medina on foot.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border col-span-2  p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              Living the Seerah
            </h2>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {seerahPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    data-migration-card
                    className="rounded-[1.5rem]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edd8] text-[#88743e]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#241b08]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#5c4a24]">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        data-migration-section
        className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="rounded-[2.2rem] border border-[#eadfbe] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-10">
         
          <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
            Support and Amenities
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {supportPoints.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  data-migration-card
                  className="rounded-[1.6rem] bg-white/85 p-6 shadow-[0_10px_30px_rgba(80,60,15,0.06)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5edd8] text-[#88743e]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#241b08]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#554522]">{item.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.8rem] bg-[#2f2611] p-6 text-[#f8f1dd] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d5c48a]">
                  Registration Contact
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Contact us to ask questions, confirm details, and reserve one of the
                  limited places on the journey.
                </p>
              </div>
              <a
                href="tel:07719709647"
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8] transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4 text-[#d8c98f]" />
                <span>0771 970 9647</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
