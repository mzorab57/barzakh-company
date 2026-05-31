import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background';
import { aboutPageContent } from '@/data/pageContent';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray('[data-about-hero]');
      const sections = gsap.utils.toArray('[data-about-section]');
      const cards = gsap.utils.toArray('[data-about-card]');
      const quoteBlock = gsap.utils.toArray('[data-about-quote]');

      gsap.from(heroItems, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.14,
      });

      sections.forEach((section) => {
        gsap.from(section, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });
      });

      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 36,
          opacity: 0,
          scale: 0.96,
          duration: 0.8,
          delay: index * 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });

      quoteBlock.forEach((item) => {
        gsap.from(item, {
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden bg-[linear-gradient(180deg,#f7f1df_0%,#fbf8ef_35%,#ffffff_100%)] text-[#2f2611]"
    >
      <CosmicParallaxBg
        {...aboutPageContent.cosmic}
      />
      <section className="relative isolate min-h-screen overflow-hidden">
       

        {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,12,0.16)_0%,rgba(6,6,12,0.44)_42%,rgba(247,241,223,0.96)_100%)]" /> */}

      
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 pt-20 sm:px-6  lg:px-8 lg:pb-20 ">
            <div className="grid items-center gap-8 ">
              <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-primary/90">
                  {aboutPageContent.hero.eyebrow}
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {aboutPageContent.hero.title}
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  {aboutPageContent.hero.description}
                </p>
              </div>

              <div
                data-about-hero
                className="group relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-black/25 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl"
              >
                <img
                  src={aboutPageContent.heroImage}
                  alt={aboutPageContent.hero.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1609]/85 via-[#1d1609]/20 to-transparent" />
              </div>
            </div>

          <div className="">
            <div className="grid lg:grid-cols-2 gap-6">
              <div
                data-about-hero
                className="rounded-[2rem] border border-white/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(72,52,12,0.10)] backdrop-blur"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[#d6c69b]" />
                  <span className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8d7841]">
                    {aboutPageContent.mission.label}
                  </span>
                </div>
                <p className="text-base leading-8 text-[#44361a] sm:text-lg">
                  {aboutPageContent.mission.description}
                </p>
              </div>

              <div
                data-about-hero
                className="grid gap-4 rounded-[2rem] bg-[#2f2611] p-6 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.24)]"
              >
                {aboutPageContent.impactPoints.map((item) => (
                  <div
                    key={item.value}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-2xl font-bold text-[#d8c78f]">{item.value}</p>
                    <p className="mt-2 text-sm leading-7 text-[#efe7cf]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-about-section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_70px_rgba(47,38,17,0.20)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d5c48a]">
              {aboutPageContent.story.label}
            </p>
            <p className="mt-6 text-base leading-8 text-[#f4ecd7] sm:text-lg">
              {aboutPageContent.story.intro}
            </p>
            <div className="mt-8 h-px bg-white/10" />
            <p className="mt-8 text-base leading-8 text-[#efe4c5]">
              {aboutPageContent.story.body}
            </p>
          </div>

          <div className="grid gap-5">
            {aboutPageContent.storyHighlights.map((item) => (
              <div
                key={item}
                data-about-card
                className="rounded-[1.8rem] border border-[#e9ddbb] bg-white p-6 shadow-[0_18px_50px_rgba(81,62,21,0.08)]"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2e6bf] text-lg font-bold text-[#7d6830]">
                    +
                  </span>
                  <div className="h-px flex-1 bg-[#eadfb9]" />
                </div>
                <p className="text-base leading-8 text-[#4f3e1f] sm:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-about-quote
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="rounded-[2.5rem] border border-[#e7dab4] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#8c7741]">
            {aboutPageContent.communityVision.label}
          </p>
          <blockquote className="mt-6 max-w-4xl text-2xl font-semibold leading-relaxed text-[#332812] sm:text-3xl">
            "{aboutPageContent.communityVision.quote}"
          </blockquote>
        </div>
      </section>

      <section
        data-about-section
        className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.2rem] border border-[#eadfbe] bg-white p-8 shadow-[0_22px_70px_rgba(90,68,20,0.10)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#8d7841]">
              {aboutPageContent.motivational.label}
            </p>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#241b08] sm:text-4xl">
              {aboutPageContent.motivational.title}
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {aboutPageContent.motivational.paragraphs[0]}
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              {aboutPageContent.motivational.paragraphs[1]}
            </p>
          </div>

          <div className="grid gap-5">
            {aboutPageContent.motivationalPoints.map((item, index) => (
              <div
                key={item}
                data-about-card
                className="rounded-[1.8rem] bg-[#2f2611] p-6 text-[#f8f1dd] shadow-[0_20px_60px_rgba(47,38,17,0.18)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#d4c287]">
                  Point {index + 1}
                </p>
                <p className="mt-3 text-base leading-8 text-[#f5ebd2]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-about-section
          className="mt-10 rounded-[2.2rem] border border-[#e7dab4] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0e0e0c]">
            {aboutPageContent.lastingGift.label}
          </p>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[#746538] sm:text-lg">
            {aboutPageContent.lastingGift.description}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
