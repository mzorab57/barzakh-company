import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BedDouble,
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  Globe,
  HeartHandshake,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LiveEventBookingCta from '@/components/LiveEventBookingCta';
import PublicEventsShowcase from '@/components/PublicEventsShowcase';
import ParallaxComponent from '../components/ui/parallax-scrolling';
import { getMedinaStayPageContent } from '@/data/pageContent';

gsap.registerPlugin(ScrollTrigger);
const medinaIconMap = {
  BedDouble,
  Bus,
  CalendarDays,
  CheckCircle2,
  Globe,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Utensils,
};

export default function MedinaStayPage() {
  const rootRef = useRef(null);
  const { t } = useTranslation();
  const medinaStayPageContent = getMedinaStayPageContent(t);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray('[data-medina-hero]');
      const sections = gsap.utils.toArray('[data-medina-section]');
      const cards = gsap.utils.toArray('[data-medina-card]');

      gsap.from(heroItems, {
        y: 48,
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
          duration: 0.72,
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
      <ParallaxComponent title={medinaStayPageContent.parallax.title} subtitle={medinaStayPageContent.parallax.subtitle} />
      {/* section 1 */}
      <section className="relative isolate overflow-hidden">
      
          <div className="relative mx-auto flex  max-w-7xl items-end px-4 pt-16  sm:px-6 lg:px-8 ">
        
           <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.34em] text-[#ae9b68]">
                {medinaStayPageContent.hero.eyebrow}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                 {medinaStayPageContent.hero.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                 {medinaStayPageContent.hero.description}
                </p>
             
              </div>
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {medinaStayPageContent.overviewStats.map((item) => {
            const Icon = medinaIconMap[item.iconKey];
            return (
              <div
                key={item.label}
                data-medina-card
                className="rounded-[1.8rem] border border-[#eadfbe] bg-[linear-gradient(180deg,#fffdf8_0%,#f7eed9_100%)] p-6 shadow-[0_18px_50px_rgba(81,62,21,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-[#88743e]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#88743e]">
                  {item.label}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[#241b08]">{item.value}</h3>
              </div>
            );
          })}
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#88743e]">
              {medinaStayPageContent.programOverview.label}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#231b0c] sm:text-4xl">
              {medinaStayPageContent.programOverview.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {medinaStayPageContent.programOverview.paragraphs[0]}
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {medinaStayPageContent.programOverview.paragraphs[1]}
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.20)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              {medinaStayPageContent.experienceAndLifestyleTitle}
            </h2>
            <ul className="mt-6 space-y-4">
              {medinaStayPageContent.experiencePoints.map((item) => (
                <li
                  key={item}
                  data-medina-card
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-7 text-[#efe7cf]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8 "
      >
        <div className="grid items-center gap-8 ">
          <div className="group relative overflow-hidden rounded-[2rem] shadow-[0_20px_70px_rgba(61,43,11,0.16)]">
            <img
              src={medinaStayPageContent.personalGrowth.image}
              alt={medinaStayPageContent.personalGrowth.imageAlt}
              className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[460px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,38,17,0.08)_30%,rgba(47,38,17,0.50)_70%)]" />
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              {medinaStayPageContent.personalGrowth.title}
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {medinaStayPageContent.personalGrowth.points.map((item) => (
                <div
                  key={item.title}
                  data-medina-card
                  className="rounded-[1.5rem] border border-[#efe3c7] bg-[#fcfaf4] p-6"
                >
                  <h3 className="text-lg font-bold text-[#241b08]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5c4a24]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="rounded-[2.2rem] border border-[#eadfbe] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-10">
         
          <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">{medinaStayPageContent.services.title}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {medinaStayPageContent.services.cards.map((item) => {
              const Icon = medinaIconMap[item.iconKey];
              return (
                <div
                  key={item.title}
                  data-medina-card
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
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f8f1dd] shadow-[0_20px_70px_rgba(47,38,17,0.18)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#d4c287]">
              {medinaStayPageContent.support.pageLabel}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              {medinaStayPageContent.support.title}
            </h2>
            <div className="mt-8 space-y-5">
              {medinaStayPageContent.support.items.map((item) => (
                <div
                  key={item.title}
                  data-medina-card
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7c994]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#f3ebd4]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#eadfbe] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#88743e]">
              {medinaStayPageContent.education.pageLabel}
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              {medinaStayPageContent.education.title}
            </h2>
            <div className="mt-8 grid gap-5">
              {medinaStayPageContent.education.points.map((item) => (
                <div
                  key={item}
                  data-medina-card
                  className="rounded-[1.5rem] border border-[#efe3c7] bg-[#fcfaf4] p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5edd8] text-[#88743e]">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <p className="text-sm leading-7 text-[#5c4a24]">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.8rem] bg-[#2f2611] p-6 text-[#f8f1dd] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#d5c48a]">
                {medinaStayPageContent.education.contactLabel}
              </p>
              <div className="mt-5 flex flex-col gap-4">
                {medinaStayPageContent.education.contacts.map((contact) => (
                  <a
                    key={contact}
                    href={`tel:${contact.replace(/-/g, '')}`}
                    className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8] transition hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4 text-[#d8c98f]" />
                    <span>{contact}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <LiveEventBookingCta matchPath="/events/medina-stay" />
      <PublicEventsShowcase excludePath="/events/medina-stay" />
    </div>
  );
}
