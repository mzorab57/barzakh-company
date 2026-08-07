import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/api';
import { getLocalizedText, resolveLocale, resolvePublicEventRoute } from '@/lib/catalog';

const FALLBACK_COPY = {
  ku: {
    eyebrow: 'چالاکییەکان',
    title: 'چالاکییە نوێکان  ',
    description: 'هەر چالاکییەک لێرە وەک card پیشان دەدرێت تا بە ئاسانی بچیتە ناو وردەکاری و حجزکردن.',
    cta: 'بچۆ بۆ چالاکی',
    empty: 'هێشتا هیچ چالاکییەکی public نەدۆزرایەوە.',
    date: 'بەروار',
    location: 'شوێن',
    tickets: 'بەردەست',
    upcomingBadge: 'داهاتوو',
    publicBadge: 'گشتی',
    startingFrom: 'لە',
    countLabel: 'چالاکییەی چالاک',
  },
  ar: {
    eyebrow: 'الفعاليات',
    title: 'فعاليات جاهزة للحجز',
    description: 'كل فعالية تظهر هنا كبطاقة أنيقة حتى ينتقل الزائر مباشرة إلى صفحة الفعالية والحجز.',
    cta: 'اذهب إلى الفعالية',
    empty: 'لا توجد فعاليات عامة متاحة حالياً.',
    date: 'التاريخ',
    location: 'الموقع',
    tickets: 'المتبقي',
    upcomingBadge: 'قادمة',
    publicBadge: 'عامة',
    startingFrom: 'من',
    countLabel: 'فعاليات متاحة',
  },
  en: {
    eyebrow: 'Events',
    title: 'Current events ready to book',
    description: 'Each live event appears here as a clean card so visitors can jump straight into the event page and booking flow.',
    cta: 'Open event',
    empty: 'No public events are available right now.',
    date: 'Date',
    location: 'Location',
    tickets: 'Remaining',
    upcomingBadge: 'Upcoming',
    publicBadge: 'Public',
    startingFrom: 'From',
    countLabel: 'live events',
  },
};

export default function PublicEventsShowcase({ excludePath = null }) {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = FALLBACK_COPY[locale] || FALLBACK_COPY.ku;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let ignore = false;

    apiRequest('/api/catalog/events?upcoming=1&limit=24')
      .then((response) => {
        if (!ignore) {
          setEvents(Array.isArray(response?.data?.items) ? response.data.items : []);
        }
      })
      .catch(() => {
        if (!ignore) {
          setEvents([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const items = useMemo(
    () => events
      .map((event) => ({
        ...event,
        route: resolvePublicEventRoute(event, locale),
        title: getLocalizedText(event.title, locale, event.titleText || 'Event'),
        description: getLocalizedText(event.description, locale, event.descriptionText || ''),
        image: event.desktopImage || event.mobileImage || '/assets/images/hero1.jpg',
      }))
      .filter((event) => event.route !== excludePath),
    [events, excludePath, locale],
  );

  return (
    <section className="relative bg-[#090806] py-20 sm:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary mb-3">{copy.eyebrow}</p>
            <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl lg:text-5xl">{copy.title}</h2>
          </div>
         
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((event) => (
              <Link
                key={event.id}
                to={event.route}
                className="group flex flex-col rounded-3xl bg-[#0b0d12] border border-white/5 transition-all duration-300 hover:bg-white/[0.03] hover:border-white/10 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12] via-[#0b0d12]/20 to-transparent" />
                  
                 
                  
                  {/* Price */}
                  {/* <div className="absolute bottom-4 left-5">
                     <p className="text-[10px] font-medium uppercase tracking-widest text-white/60 mb-0.5">{copy.startingFrom}</p>
                     <p className="text-xl font-semibold text-primary">
                       {Number(event.minimumPrice || 0).toLocaleString()} <span className="text-sm font-normal text-primary/70">IQD</span>
                     </p>
                  </div> */}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 px-5 pb-5 pt-2">
                  <h3 className="text-xl font-medium text-white mb-2 line-clamp-1">{event.title}</h3>
                  {/* <p className="text-sm text-white/50 line-clamp-2 mb-6 flex-1">
                    {event.description || event.countryNameText || ''}
                  </p> */}

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-y-3 text-[13px] text-white/40 mb-6">
                    <div className="flex items-center gap-2.5">
                      <CalendarDays className="h-4 w-4 text-zinc-700" />
                      <span>{event.date || '-'}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-zinc-600" />
                      <span className="truncate">{event.countryNameText || '-'}</span>
                    </div>
                    
                  </div>

                  {/* Footer / CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-sm font-medium text-white/80 group-hover:text-primary transition-colors">
                    <span>{copy.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/5 bg-white/[0.02] px-6 py-20 text-center text-sm text-white/40">
            {copy.empty}
          </div>
        )}
      </div>
    </section>
  );
}
