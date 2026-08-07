import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CosmicParallaxBg } from '@/components/ui/parallax-cosmic-background';
import { useTranslation } from 'react-i18next';
import { getAboutPageContent } from '@/data/pageContent';
import { apiRequest } from '@/lib/api';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const rootRef = useRef(null);
  const { t } = useTranslation();
  const aboutPageContent = getAboutPageContent(t);
  const [bannerImage, setBannerImage] = useState('');

  useEffect(() => {
    let ignore = false;

    apiRequest('/api/catalog/media?category=about_banner')
      .then((response) => {
        if (!ignore) {
          setBannerImage(response?.data?.categories?.about_banner?.primaryItem?.desktopImage || '');
        }
      })
      .catch(() => {
        if (!ignore) {
          setBannerImage('');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

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
        text={aboutPageContent.hero.title}
      />
      <section className="relative isolate overflow-hidden">
       

        {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,12,0.16)_0%,rgba(6,6,12,0.44)_42%,rgba(247,241,223,0.96)_100%)]" /> */}

      
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6  lg:px-8  ">
            <div className="grid items-center gap-8 ">
              <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase  text-[#88743e]"
              >
              
                  <h1 className="mt-16 max-w-5xl text-lg font-bold leading-tight sm:text-3xl">
                  {/* {aboutPageContent.hero.title} */}
                  {aboutPageContent.hero.description}
                </h1>
                {/* <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                  {aboutPageContent.hero.description}
                </p> */}
              </div>

              <div
                data-about-hero
                className="group relative overflow-hidden rounded-[2.2rem] border border-white/15 bg-black/25  backdrop-blur-xl"
              >
                <img
                  src={bannerImage || aboutPageContent.heroImage}
                  alt={aboutPageContent.hero.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1609]/85 via-[#1d1609]/20 to-transparent" />
              </div>
            </div>

      
        </div>
      </section>

      <section
        data-about-section
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="rounded-[2rem] border border-[#eadfbe] bg-white p-8 shadow-[0_18px_50px_rgba(81,62,21,0.08)] sm:p-10">
          {/* <p className="text-sm font-semibold uppercase  text-[#8d7841]">
            {aboutPageContent.story.label}
          </p> */}
          <div className="mt-6 space-y-6">
            {aboutPageContent.story.paragraphs.map((item) => (
              <p
                key={item}
                className="text-sm  leading-5 text-[#4f3e1f] sm:text-base md:text-lg"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>


{/* motivation event8 */}

      <section
        data-about-section
        className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pb-28"
      >
        <div className="grid gap-8  lg:items-center">
          <div className="overflow-hidden rounded-[2.2rem] border border-[#eadfbe] bg-white shadow-[0_22px_70px_rgba(90,68,20,0.10)]">
            <img
              src={aboutPageContent.motivational.image}
              alt={aboutPageContent.motivational.imageAlt}
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>

          <div className="rounded-[2.2rem] border border-[#eadfbe] bg-white p-8 shadow-[0_22px_70px_rgba(90,68,20,0.10)] sm:p-10">
            <p className="text-3xl sm:text-4xl font-semibold uppercase  text-[#8d7841]">
              {aboutPageContent.motivational.label}
            </p>
            <h2 className="mt-5 text-lg sm:text-2xl font-bold leading-tight text-[#241b08] ">
              {aboutPageContent.motivational.title}
            </h2>
            <div className="mt-6 space-y-6">
              {aboutPageContent.motivational.paragraphs.map((item) => (
                <p
                  key={item}
                  className="text-sm leading-5 text-[#554522] sm:text-lg"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {aboutPageContent.lastingGift?.description ? (
          <div
            data-about-section
            className="mt-10 rounded-[2.2rem]  border border-[#e7dab4] bg-[linear-gradient(135deg,#fffdf7_0%,#f3ead0_100%)] p-8 shadow-[0_20px_70px_rgba(112,88,32,0.12)] sm:p-10"
          >
            <p className="text-sm font-semibold  uppercase  text-[#0e0e0c]">
              {aboutPageContent.lastingGift.label}
            </p>
            <p className="mt-5 max-w-5xl text-base leading-8 text-[#746538] sm:text-lg">
              {aboutPageContent.lastingGift.description}
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default About;
