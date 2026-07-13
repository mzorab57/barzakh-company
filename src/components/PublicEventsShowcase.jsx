import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, MapPin, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/api';
import { getLocalizedText, resolveLocale, resolvePublicEventRoute } from '@/lib/catalog';

const FALLBACK_COPY = {
  ku: {
    eyebrow: 'چالاکییە گشتییەکان',
    title: 'چالاکییە public و upcoming ـەکان',
    description: 'هەموو event ـە چالاکەکان لە بنکەی زانیارییەوە خۆکارانە دێن بۆ ئەوەی خێراتر بگەیتە booking.',
    cta: 'بینینی وردەکاری',
    empty: 'هێشتا هیچ چالاکییەکی public نەدۆزرایەوە.',
    date: 'بەروار',
    location: 'شوێن',
    tickets: 'بەردەست',
  },
  ar: {
    eyebrow: 'الفعاليات العامة',
    title: 'جميع الفعاليات العامة والقادمة',
    description: 'هذه القائمة تُجلب مباشرة من قاعدة البيانات حتى يصل الزائر بسرعة إلى صفحة الحجز.',
    cta: 'عرض التفاصيل',
    empty: 'لا توجد فعاليات عامة متاحة حالياً.',
    date: 'التاريخ',
    location: 'الموقع',
    tickets: 'المتبقي',
  },
  en: {
    eyebrow: 'Public Events',
    title: 'All public and upcoming events',
    description: 'This section is connected to the database so visitors can move straight into the booking flow.',
    cta: 'View details',
    empty: 'No public events are available right now.',
    date: 'Date',
    location: 'Location',
    tickets: 'Remaining',
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
      }))
      .filter((event) => event.route !== excludePath),
    [events, excludePath, locale],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="rounded-[2rem] border border-[#e2d4a9]/25 bg-[linear-gradient(180deg,rgba(10,10,16,0.92)_0%,rgba(6,6,12,0.98)_100%)] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#cdb77d]">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-sm leading-7 text-[#e7dcc0]/70 sm:text-base">{copy.description}</p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((event) => (
              <Link
                key={event.id}
                to={event.route}
                className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-[#d8c78f]/35"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.desktopImage}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_20%,rgba(0,0,0,0.82)_100%)]" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80 backdrop-blur">
                      {event.countryNameText || 'Global'}
                    </span>
                    <span className="rounded-full border border-[#d8c78f]/30 bg-[#d8c78f]/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[#f1e5b8]">
                      {event.upcoming ? 'Upcoming' : 'Public'}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-2xl font-bold text-white">{event.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/72">{event.description || event.countryNameText || ''}</p>
                  </div>
                </div>
                <div className="grid gap-4 p-5 text-sm text-[#e7dcc0]/78 sm:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 text-[#d8c78f]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.date}</p>
                      <p className="mt-1">{event.date || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#d8c78f]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.location}</p>
                      <p className="mt-1">{event.countryNameText || '-'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Ticket className="mt-0.5 h-4 w-4 text-[#d8c78f]" />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{copy.tickets}</p>
                      <p className="mt-1">{event.remainingTickets ?? 0}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/8 px-5 py-4 text-sm text-white">
                  <span>{copy.cta}</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-center text-sm text-white/62">
            {copy.empty}
          </div>
        )}
      </div>
    </section>
  );
}
