import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Ticket, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/api';
import {
  buildEventCheckoutRoute,
  getLocalizedText,
  resolveLocale,
  resolveStaticEventRoute,
} from '@/lib/catalog';

const COPY = {
  ku: {
    eyebrow: 'Booking',
    title: 'حجزی ئەم event ـە ئامادەیە',
    button: 'چوون بۆ booking',
    from: 'لە',
    remaining: 'بەردەست',
  },
  ar: {
    eyebrow: 'Booking',
    title: 'الحجز لهذا الحدث متاح الآن',
    button: 'الذهاب إلى الحجز',
    from: 'من',
    remaining: 'المتبقي',
  },
  en: {
    eyebrow: 'Booking',
    title: 'Booking is available for this event',
    button: 'Go to booking',
    from: 'From',
    remaining: 'Remaining',
  },
};

export default function LiveEventBookingCta({ matchPath }) {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
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

  const event = useMemo(
    () => events.find((item) => resolveStaticEventRoute(item, locale) === matchPath),
    [events, locale, matchPath],
  );

  if (!event) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-[#d8c78f]/25 bg-[linear-gradient(135deg,rgba(216,199,143,0.12)_0%,rgba(255,255,255,0.04)_100%)] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.14)] sm:p-8">
        <p className="text-xs uppercase  text-[#88743e]">{copy.eyebrow}</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#241b08] sm:text-3xl">{copy.title}</h2>
            <p className="mt-2 text-sm text-[#5a4824]">
              {getLocalizedText(event.title, locale, event.titleText || 'Event')}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase  text-[#5a4824]/70">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c78f]/30 bg-white/50 px-3 py-2">
                <CalendarDays className="h-3.5 w-3.5 text-[#88743e]" />
                {event.date || '-'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#d8c78f]/30 bg-white/50 px-3 py-2">
                <Ticket className="h-3.5 w-3.5 text-[#88743e]" />
                {copy.remaining}: {event.remainingTickets ?? 0}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <p className="text-sm text-[#5a4824]">
              {copy.from} <span className="font-semibold text-[#241b08]">{Number(event.minimumPrice || 0).toLocaleString()} IQD</span>
            </p>
            <Link
              to={buildEventCheckoutRoute(event)}
              className="inline-flex items-center gap-2 rounded-full bg-[#2f2611] px-6 py-3 text-sm font-semibold text-[#f5ecd3] transition hover:bg-[#1f180b]"
            >
              <Wallet className="h-4 w-4" />
              {copy.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
