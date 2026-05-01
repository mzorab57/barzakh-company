import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BedDouble,
  CalendarDays,
  Coffee,
  Dumbbell,
  Hotel,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';
import { SmoothScrollHero } from '@/components/ui/modern-hero';

gsap.registerPlugin(ScrollTrigger);

const retreatHighlights = [
  {
    icon: Sparkles,
    title: 'Inspiring Speakers',
    description:
      'Inspirational discussions with Mufti Menk, Shaykh Abu Bakr Zoud, and Aussie Mammoth.',
  },
  {
    icon: Users,
    title: 'Family Activities',
    description:
      'Faith-based sessions and engaging activities for children in a welcoming family environment.',
  },
  {
    icon: Hotel,
    title: 'Premium Halal Resort',
    description:
      'A luxury halal resort with private beaches and three VIP open-buffet meals every day.',
  },
];

const eventFeatures = [
  {
    icon: Sparkles,
    title: 'World-Class Speakers',
    description:
      'Daily workshops and sessions led by world-renowned scholars designed to inspire and revive the heart and soul.',
  },
  {
    icon: Coffee,
    title: 'Interactive Sessions',
    description:
      'Small group discussions and unique meet-and-greet coffee break sessions with global scholars, including Mufti Menk.',
  },
  {
    icon: Users,
    title: 'Family and Children’s Fun',
    description:
      'A wide range of activities for all ages, including an Aqua Park, archery, bowling, crafts, and games.',
  },
  {
    icon: Coffee,
    title: 'Full Board VIP Dining',
    description:
      'Open buffet service for all three daily meals with diverse options, children’s menus, and all-day coffee and food stands.',
  },
  {
    icon: Waves,
    title: 'Private Beaches',
    description:
      'Access to dedicated beach areas for families, men, and women while maintaining privacy and Islamic values.',
  },
  {
    icon: ShieldCheck,
    title: 'Professional Childcare',
    description:
      'Daily expert supervision for children from 10:00 AM to 6:00 PM so parents can benefit from sessions and relax.',
  },
  {
    icon: Dumbbell,
    title: 'Health and Wellness',
    description:
      'A healthy atmosphere with a fitness hall, sports areas, sauna, and steam room for complete relaxation.',
  },
  {
    icon: BedDouble,
    title: 'Premium Accommodation',
    description:
      'Stay at the 5-star Wome Deluxe hotel, offering comfort, tranquility, and an elevated halal hospitality experience.',
  },
];

const scheduleDetails = [
  { label: 'Dates', value: 'April 2nd to April 6th, 2026' },
  { label: 'Duration', value: '4 nights' },
  { label: 'Registration', value: 'Enrollment is limited and rooms are specifically designated.' },
  {
    label: 'Contact Info',
    value: 'Mamosta Arkan: 0771 970 9647, 0771 385 7171, 0751 385 7171',
  },
];

const accommodationOptions = [
  {
    title: 'Family Suite (Large Wing)',
    details: [
      'Capacity: Suitable for 4 to 5 people.',
      'Layout: One room with a king-size bed and another room with two single beds.',
      'Size: 70 to 107 square meters.',
      'View: Forest view.',
    ],
  },
  {
    title: 'Double Room',
    details: [
      'Capacity: 2 people.',
      'Layout: One king-size bed or two double beds.',
      'Size: 43 square meters.',
      'View: Dense forests and the deep blue sea.',
      'Extra bed available upon request.',
    ],
  },
];

const organizerPoints = [
  'Mission: An annual Islamic event in Turkiye with a high-level tourism experience.',
  'Service: Hosted at a 5-star hotel committed to Islamic values and privacy.',
  'Experience: Seminars and workshops by international scholars for a beneficial and memorable stay.',
  'Check-in: 3:00 PM | Check-out: 12:00 PM',
];
  const parallaxImages = [
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
      className: 'ml-1 lg:w-80 w-1/2  rounded-xl',
    },
  ];

export default function TurkeyEventPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray('[data-event-hero]');
      const sections = gsap.utils.toArray('[data-event-section]');
      const cards = gsap.utils.toArray('[data-event-card]');

      gsap.from(heroItems, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
      });

      sections.forEach((section) => {
        gsap.from(section, {
          y: 64,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
          },
        });
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 34,
          opacity: 0,
          scale: 0.97,
          duration: 0.75,
          delay: index * 0.04,
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
     <div className="bg-[linear-gradient(180deg,#fbf6e9_0%,#f7f0dc_35%,#ffffff_100%)] text-[#2f2611]">
     
        <SmoothScrollHero
        eyebrow="Islamic Retreat Experience"
        title="Antalya, Turkey - 2026"
        description="Step away from the noise of daily life and enter the tranquility of Antalya, Turkiye. A spiritually uplifting atmosphere."
        date="April 2nd - April 6th, 2026"
        location="Antalya, Turkiye"
        centerImage="/assets/images/hero4.jpg"
        mobileCenterImage="https://lightuponlight.co.uk/wp-content/uploads/2026/04/summer-conference-2-819x1024.jpg"
        parallaxImages={parallaxImages}
      />
      
      <section className="relative isolate overflow-hidden">
         <div className="relative mx-auto flex  max-w-7xl items-end px-4   sm:px-6 lg:px-8 ">
        
           <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/90">
                Islamic Retreat Experience
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Islamic Event in Antalya, Turkey - 2027
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  Step away from the noise of daily life and enter the tranquility of Antalya,
              Turkiye. This retreat is an opportunity to return to Allah through reflection,
              companionship, and a spiritually uplifting setting.
                </p>
                <div data-migration-hero className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
                <CalendarDays className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">April 2 - April 6, 2027</span>
              </div>
              <a
                href="tel:07719709647"
                className="flex items-center gap-3 rounded-2xl bg-[#d8c98f]/50 px-5 py-3 text-[#fff6de] backdrop-blur transition hover:bg-[#d8c98f]/25"
              >
                <Phone className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">Antalya, Turkiye</span>
              </a>
            </div>
              </div>
        </div>
      </section>
      

      <section
        id="retreat-overview"
        data-event-section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-[#231b0c] sm:text-4xl">
              Rethink. Reflect. Recharge.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              Step away from the noise of daily life and enter the tranquility of Antalya,
              Turkiye. The Antalya 2026 event is your opportunity to return to Allah through
              deep reflection and connection with like-minded Muslims from all over the world.
              Create lasting memories in a serene and rejuvenating environment.
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              This event is located at one of the best halal resorts in Antalya, perfectly
              suited for believers and designed to offer comfort, privacy, and benefit in one
              beautiful setting.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.20)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6c68d]">
              Event Snapshot
            </p>
            <ul className="mt-6 space-y-4">
              <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]">
                Special guest participation by Shaykh Raad Al-Kurdi.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]">
                Hosted at the 5-star Wome Deluxe hotel with a blend of comfort and tranquility.
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]">
                For more information or to register, contact the organizers at `07719709647`.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        data-event-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {retreatHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-event-card
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

      <section
        data-event-section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#88743e]">
            Page 3
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
            Event Features and Activities
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {eventFeatures.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                data-event-card
                className="rounded-[1.8rem] bg-white p-7 shadow-[0_20px_60px_rgba(101,79,26,0.09)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5edd8] text-[#88743e]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#241b08]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#5c4a24]">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        data-event-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f8f1dd] shadow-[0_20px_70px_rgba(47,38,17,0.18)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d4c287]">
              Event Schedule & Registration
            </p>
            <div className="mt-6 space-y-5">
              {scheduleDetails.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d7c994]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#f3ebd4]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfbe] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#88743e]">
              Accommodation Details
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {accommodationOptions.map((option) => (
                <div
                  key={option.title}
                  data-event-card
                  className="rounded-[1.6rem] border border-[#efe3c7] bg-[#fcfaf4] p-6"
                >
                  <h3 className="text-lg font-bold text-[#241b08]">{option.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[#5c4a24]">
                    {option.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-event-section
        className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="rounded-[2.2rem] border border-[#eadfbe] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#88743e]">
            About the Organizers
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {organizerPoints.map((item) => (
              <div
                key={item}
                data-event-card
                className="rounded-[1.6rem] bg-white/80 p-6 shadow-[0_10px_30px_rgba(80,60,15,0.06)]"
              >
                <p className="text-sm leading-7 text-[#554522]">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.8rem] bg-[#2f2611] p-6 text-[#f8f1dd] sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d5c48a]">
                  Registration Contact
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Mamosta Arkan and team are available for questions and room registration.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8]">
                <Phone className="h-4 w-4 text-primary" />
                <span>0771 970 9647</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


