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
import ParallaxComponent from '../components/ui/parallax-scrolling';

gsap.registerPlugin(ScrollTrigger);

const overviewStats = [
  { label: 'Duration', value: 'Three Months', icon: CalendarDays },
  { label: 'Location', value: 'Holy City Of Medina', icon: MapPin },
  { label: 'Price', value: '$2,000', icon: Sparkles },
];

const experiencePoints = [
  'Live with us for three months in the holy city of Medina.',
  'A unique spiritual and educational immersion in the city of the Prophet of Allah (PBUH).',
  'Reorganize your life, improve sleep and diet, and engage in sports and travel activities.',
  'Create an unparalleled spiritual experience in the heart through daily life in Medina.',
];

const growthPoints = [
  {
    title: 'Inspiration',
    description: 'Live in an inspiring place suitable for learning, reflection, and lasting change.',
  },
  {
    title: 'Transformation',
    description: 'A rare opportunity to give new meaning to your life through three months of focus.',
  },
  {
    title: 'Focus',
    description: 'A unique package for religious progress, better routines, and clear goal setting.',
  },
  {
    title: 'Uniqueness',
    description:
      'By the grace of Allah, this program combines spirituality, learning, career opportunities, and modern comfort in one complete stay.',
  },
];

const serviceCards = [
  {
    icon: ShieldCheck,
    title: 'Visa',
    description: 'Provision of a three-month Saudi Arabian visa for the Medina program.',
  },
  {
    icon: Bus,
    title: 'Transportation',
    description:
      'Round-trip travel between Iraq and Saudi Arabia, including local trips to holy sites.',
  },
  {
    icon: BedDouble,
    title: 'Accommodation',
    description: 'Stay in modern apartments in Medina for 3 months with comfort and tranquility.',
  },
  {
    icon: HeartHandshake,
    title: 'Agency',
    description: 'Organized through Malazada Hajj & Umrah with trusted supervision and care.',
  },
  {
    icon: CheckCircle2,
    title: 'Cleaning',
    description: 'Weekly cleaning services for the accommodation to maintain comfort throughout the stay.',
  },
  {
    icon: Utensils,
    title: 'Dining',
    description: 'Full breakfast during the stay and the required support for dinner arrangements.',
  },
  {
    icon: Globe,
    title: 'Internet',
    description: 'Free internet for the full 3 months to stay connected with loved ones.',
  },
];

const supportItems = [
  {
    title: 'Three Guided Umrahs',
    description: 'Perform 3 Umrahs with a special guide, one every month.',
  },
  {
    title: 'Inter-City Travel',
    description: 'Bus transportation is provided between Medina and Mecca during the program.',
  },
  {
    title: 'Stay In Mecca',
    description: 'Two nights in a hotel or villa in Mecca, subject to availability.',
  },
  {
    title: 'Time Management',
    description: 'Support in organizing sleep, daily planning, and beneficial time habits.',
  },
  {
    title: 'Healthy Living',
    description: 'Assistance in regulating schedules, improving routines, and building a healthier life.',
  },
];

const educationPoints = [
  'Assistance in studying and learning the Holy Quran throughout the stay.',
  'A goal of memorizing 5 Juz, while recognizing that progress depends on personal effort.',
  'An environment designed for focus, learning, discipline, and spiritual consistency.',
];

export default function MedinaStayPage() {
  const rootRef = useRef(null);

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
      <ParallaxComponent title="Medina" subtitle="3-Month Stay" />
      {/* section 1 */}
      <section className="relative isolate overflow-hidden">
      
          <div className="relative mx-auto flex  max-w-7xl items-end px-4 pt-16  sm:px-6 lg:px-8 ">
        
           <div
                data-about-hero
                className="mb-5 text-sm font-semibold uppercase tracking-[0.38em] text-[#88743e]"
              >
                <p className="text-lg font-semibold uppercase tracking-[0.34em] text-[#ae9b68]">
                3-Month Stay In Medina Spiritual Living Program
                </p>
                <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                 Live three months in the holy city of Medina.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/86 sm:text-lg">
                 A unique spiritual and educational immersion designed to help you live with
              intention, build healthier routines, and grow closer to Allah in the city of the
              Prophet (PBUH).
                </p>
             
              </div>
        </div>
      </section>

      <section
        data-medina-section
        className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {overviewStats.map((item) => {
            const Icon = item.icon;
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
              Program Overview
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#231b0c] sm:text-4xl">
              Three months of living, learning, and spiritual reorganization.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              Duration: three months. Location: live in the holy city of Medina. Price:
              $2,000, equivalent to 20 waraqa or $100 bills.
            </p>
            <p className="mt-6 text-base leading-8 text-[#554522] sm:text-lg">
              All operations are conducted under the guidelines of the General Directorate of
              Hajj and Umrah for the 3-month Medina Holy Group.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#2f2611] p-8 text-[#f7f1df] shadow-[0_24px_80px_rgba(47,38,17,0.20)] sm:p-10">
           
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Experience and Lifestyle
            </h2>
            <ul className="mt-6 space-y-4">
              {experiencePoints.map((item) => (
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
              src="/assets/images/medina.jpg"
              alt="Personal growth in Medina"
              className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[460px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,38,17,0.08)_30%,rgba(47,38,17,0.50)_70%)]" />
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_70px_rgba(91,69,18,0.10)] sm:p-10">
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              Personal Growth
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {growthPoints.map((item) => (
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
         
          <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">Services</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((item) => {
              const Icon = item.icon;
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
              Page 6
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Religious and Lifestyle Support
            </h2>
            <div className="mt-8 space-y-5">
              {supportItems.map((item) => (
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
              Page 7
            </p>
            <h2 className="mt-4 text-3xl font-bold text-[#241b08] sm:text-4xl">
              Education and Contact
            </h2>
            <div className="mt-8 grid gap-5">
              {educationPoints.map((item) => (
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
                Contact Information
              </p>
              <div className="mt-5 flex flex-col gap-4">
                <a
                  href="tel:07705387171"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8] transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 text-[#d8c98f]" />
                  <span>0770-538-7171</span>
                </a>
                <a
                  href="tel:07515387171"
                  className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 text-sm text-[#f6eed8] transition hover:bg-white/15"
                >
                  <Phone className="h-4 w-4 text-[#d8c98f]" />
                  <span>0751-538-7171</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
