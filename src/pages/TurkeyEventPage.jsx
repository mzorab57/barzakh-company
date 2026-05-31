import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BedDouble,
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
import { useTranslation } from 'react-i18next';
import { SmoothScrollHero } from '@/components/ui/modern-hero';
import { getTurkeyEventPageContent } from '@/data/pageContent';

gsap.registerPlugin(ScrollTrigger);
const turkeyIconMap = {
  BedDouble,
  Coffee,
  Dumbbell,
  Hotel,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
};

export default function TurkeyEventPage() {
  const rootRef = useRef(null);
  const { t } = useTranslation();
  const turkeyEventPageContent = getTurkeyEventPageContent(t);

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
        eyebrow={turkeyEventPageContent.hero.eyebrow}
        title={turkeyEventPageContent.hero.title}
        description={turkeyEventPageContent.hero.description}
        date={turkeyEventPageContent.hero.date}
        location={turkeyEventPageContent.hero.location}
        centerImage={turkeyEventPageContent.hero.centerImage}
        mobileCenterImage={turkeyEventPageContent.hero.mobileCenterImage}
        parallaxImages={turkeyEventPageContent.hero.parallaxImages}
      />
      
      <section className="relative isolate overflow-hidden">
         <div className="relative mx-auto flex  max-w-7xl items-end px-4   sm:px-6 lg:px-8 ">
        
           <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/90">
                {turkeyEventPageContent.intro.eyebrow}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {turkeyEventPageContent.intro.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  {turkeyEventPageContent.intro.description}
                </p>
                <div data-migration-hero className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
                <CalendarDays className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">{turkeyEventPageContent.intro.date}</span>
              </div>
              <a
                href={`tel:${turkeyEventPageContent.intro.contactTel}`}
                className="flex items-center gap-3 rounded-2xl bg-[#d8c98f]/50 px-5 py-3 text-[#fff6de] backdrop-blur transition hover:bg-[#d8c98f]/25"
              >
                <Phone className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">{turkeyEventPageContent.intro.location}</span>
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
              {turkeyEventPageContent.retreatOverview.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {turkeyEventPageContent.retreatOverview.paragraphs[0]}
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {turkeyEventPageContent.retreatOverview.paragraphs[1]}
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.20)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d6c68d]">
              {turkeyEventPageContent.snapshot.label}
            </p>
            <ul className="mt-6 space-y-4">
              {turkeyEventPageContent.snapshot.items.map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-event-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {turkeyEventPageContent.retreatHighlights.map((item) => {
            const Icon = turkeyIconMap[item.iconKey];
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
            {turkeyEventPageContent.features.pageLabel}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
            {turkeyEventPageContent.features.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {turkeyEventPageContent.features.items.map((item) => {
            const Icon = turkeyIconMap[item.iconKey];
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
              {turkeyEventPageContent.schedule.label}
            </p>
            <div className="mt-6 space-y-5">
              {turkeyEventPageContent.schedule.details.map((item) => (
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
              {turkeyEventPageContent.accommodation.label}
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {turkeyEventPageContent.accommodation.options.map((option) => (
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
            {turkeyEventPageContent.organizers.label}
          </p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {turkeyEventPageContent.organizers.points.map((item) => (
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
                  {turkeyEventPageContent.organizers.registration.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {turkeyEventPageContent.organizers.registration.description}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8]">
                <Phone className="h-4 w-4 text-primary" />
                <span>{turkeyEventPageContent.organizers.registration.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
