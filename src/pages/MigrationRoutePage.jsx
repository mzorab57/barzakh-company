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
import { useTranslation } from 'react-i18next';

import { getMigrationRoutePageContent } from '@/data/pageContent';
gsap.registerPlugin(ScrollTrigger);

const migrationIconMap = {
  Backpack,
  BookOpen,
  Bus,
  Camera,
  CalendarDays,
  MapPin,
  Mountain,
  ShieldCheck,
  Tent,
  Users,
};

export default function MigrationRoutePage() {
  const rootRef = useRef(null);
  const { t } = useTranslation();
  const migrationRoutePageContent = getMigrationRoutePageContent(t);
  const journeySections = migrationRoutePageContent.journeyStages.map((stage, index) => ({
    title: stage.title,
    description: stage.points.join(' '),
    imageUrl: stage.image,
    reverse: index % 2 === 1,
    badge: stage.location,
    eyebrow: `${migrationRoutePageContent.journeyPagePrefix} ${index + 3}`,
    meta: `${stage.location} | ${stage.year}`,
    tags: stage.points.slice(0, 2),
  }));

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
                 {migrationRoutePageContent.hero.eyebrow}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {migrationRoutePageContent.hero.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  {migrationRoutePageContent.hero.description}
                </p>
                <div data-migration-hero className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur">
                <CalendarDays className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">{migrationRoutePageContent.hero.date}</span>
              </div>
              <a
                href={`tel:${migrationRoutePageContent.hero.phone}`}
                className="flex items-center gap-3 rounded-2xl bg-[#d8c98f]/50 px-5 py-3 text-[#fff6de] backdrop-blur transition hover:bg-[#d8c98f]/25"
              >
                <Phone className="h-5 w-5 text-[#867b50]" />
                <span className="text-[#ac9f68]">{migrationRoutePageContent.hero.contactText}</span>
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
          {migrationRoutePageContent.tripDetails.map((item) => {
            const Icon = migrationIconMap[item.iconKey];
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
            eyebrow: migrationRoutePageContent.parallaxIntro.eyebrow,
            title: migrationRoutePageContent.parallaxIntro.title,
            description: migrationRoutePageContent.parallaxIntro.description,
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
           
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{migrationRoutePageContent.tripOverview.title}</h2>
            <p className="mt-6 text-base leading-8 text-[#f3ebd4]">
              {migrationRoutePageContent.tripOverview.description}
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d6c68d]">
                {migrationRoutePageContent.tripOverview.itineraryLabel}
              </p>
              <p className="mt-3 text-sm leading-7 text-[#efe7cf]">
                {migrationRoutePageContent.tripOverview.itinerary}
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border col-span-2  p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              {migrationRoutePageContent.seerah.title}
            </h2>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {migrationRoutePageContent.seerah.points.map((item) => {
                const Icon = migrationIconMap[item.iconKey];
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
            {migrationRoutePageContent.supportAndAmenities.title}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {migrationRoutePageContent.supportAndAmenities.cards.map((item) => {
              const Icon = migrationIconMap[item.iconKey];
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
                  {migrationRoutePageContent.supportAndAmenities.registration.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {migrationRoutePageContent.supportAndAmenities.registration.title}
                </p>
              </div>
              <a
                href={`tel:${migrationRoutePageContent.supportAndAmenities.registration.tel}`}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8] transition hover:bg-white/15"
              >
                <Phone className="h-4 w-4 text-[#d8c98f]" />
                <span>{migrationRoutePageContent.supportAndAmenities.registration.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
