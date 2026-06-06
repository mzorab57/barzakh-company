import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, PlayCircle, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getPastEventsArchivePageContent } from '@/data/pageContent';

export default function PastEventsPage() {
  const { t } = useTranslation();
  const content = getPastEventsArchivePageContent(t);

  return (
    <section className="min-h-screen overflow-hidden bg-[#060504] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem]  bg-[radial-gradient(circle_at_top,rgba(197,183,142,0.18),transparent_35%),linear-gradient(180deg,#12100c_0%,#080705_100%)] px-6 py-8 lg:py-14 shadow-[0_24px_90px_rgba(0,0,0,0.35)] sm:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          <div className="relative">
            {/* <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#d9c999]">
              {content.eyebrow}
            </p> */}
            <h1 className=" max-w-4xl text-4xl  leading-tight text-[#f6edd8] sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            {/* <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              {content.description}
            </p> */}
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {content.events.map((event, index) => (
            <Link
              key={event.slug}
              to={`/past-events/${event.slug}`}
              className="group relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-500  hover:border-[#d8c78f]/35"
            >
              <div className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="lg:size-full lg:object-cover transition duration-700 "
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.72)_62%,rgba(0,0,0,0.92)_100%)]" />
              </div>

              <div className="relative flex min-h-[20rem] flex-col justify-between p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#e4d4a0] backdrop-blur-md">
                    {content.eventBadge} {String(index + 1).padStart(2, '0')}
                  </span>
              
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 backdrop-blur">
                      <CalendarDays className="h-4 w-4 text-[#d8c78f]" />
                      {event.year}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 backdrop-blur">
                      <Tag className="h-4 w-4 text-[#d8c78f]" />
                      {event.category}
                    </span>
                  </div>
                  <h2 className="max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                    {event.title}
                  </h2>
                  
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                    {event.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#e7d9a7]">
                    <span>{content.ctaLabel}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
