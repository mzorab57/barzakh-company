import { useEffect, useMemo, useState } from 'react';
import { MapPin, Wallet } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/api';
import {
  buildEventCheckoutRoute,
  getLocalizedText,
  parseEventSlug,
  resolveLocale,
} from '@/lib/catalog';

const COPY = {
  ku: {
    back: 'گەڕانەوە',
    loading: 'چاوەڕێی زانیارییەکانی event...',
    notFound: 'ئەم event ـە نەدۆزرایەوە.',
    about: 'دەربارەی چالاکی :',
    schedule: 'Sub-events',
    noSubEvents: 'هێشتا sub-event دانەنراوە.',
    booking: 'دەستپێکردنی booking',
    date: 'بەروار',
    location: 'وڵات / هەرێم',
    sessions: 'شوێن',
    subEventLocation: 'شوێن',
    soldOut: 'تەواوبووە',
    bookingNow: 'ئێستا حجزبکە',
    chooseCity: 'کلیک لە شارەکەت بکە',
  },
  ar: {
    back: 'رجوع',
    loading: 'جاري تحميل تفاصيل الفعالية...',
    notFound: 'لم يتم العثور على هذه الفعالية.',
    about: 'عن الفعالية',
    schedule: 'الجلسات',
    noSubEvents: 'لا توجد جلسات مضافة بعد.',
    booking: 'ابدأ الحجز',
    date: 'التاريخ',
    location: 'الدولة / الإقليم',
    sessions: 'المکان',
    subEventLocation: 'المکان',
    soldOut: 'نفدت التذاكر',
    bookingNow: 'احجز الآن',
    chooseCity: 'اضغط على مدينتك',
  },
  en: {
    back: 'Back',
    loading: 'Loading event details...',
    notFound: 'This event could not be found.',
    about: 'About the event',
    schedule: 'Sub-events',
    noSubEvents: 'No sub-events have been added yet.',
    booking: 'Start booking',
    date: 'Date',
    location: 'Country / City',
    sessions: 'Location',
    subEventLocation: 'Location',
    soldOut: 'Sold Out',
    bookingNow: 'Book Now',
    chooseCity: 'Tap your city',
  },
};

function renderRichText(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return '';
  }

  if (/<[a-z][\s\S]*>/i.test(value)) {
    return value;
  }

  return value
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br />')}</p>`)
    .join('');
}

function normalizeCityLabel(value, locale) {
  const raw = String(value || '').trim();
  if (!raw) {
    return '';
  }

  const normalized = raw.toLowerCase();

  if (normalized === 'sulaymaniyah' || normalized === 'slemani' || normalized === 'sulaimaniyah') {
    return locale === 'ar' ? 'السليمانية' : locale === 'en' ? 'Sulaymaniyah' : 'سلێمانی';
  }

  if (normalized === 'hawler' || normalized === 'erbil' || normalized === 'hewler' || normalized === 'اربيل') {
    return locale === 'ar' ? 'أربيل' : locale === 'en' ? 'Hawler' : 'هەولێر';
  }

  return raw;
}

function buildSubEventSchedule(date, startTime, endTime) {
  const dateText = String(date || '').trim();
  const startText = formatTime12Hour(startTime);
  const endText = formatTime12Hour(endTime);

  if (dateText && startText && endText) {
    return `${dateText} / ${startText} - ${endText}`;
  }

  if (dateText && startText) {
    return `${dateText} / ${startText}`;
  }

  return dateText || '-';
}

function formatTime12Hour(value) {
  const raw = String(value || '').trim();

  if (!raw) {
    return '';
  }

  const match = raw.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match) {
    return raw;
  }

  const hours = Number(match[1]);
  const minutes = match[2];

  if (Number.isNaN(hours) || hours < 0 || hours > 23) {
    return raw;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const normalizedHours = hours % 12 || 12;

  return `${normalizedHours}:${minutes} ${period}`;
}

export default function EventDetailPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n?.language);
  const copy = COPY[locale] || COPY.ku;
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);

  const eventId = useMemo(() => parseEventSlug(slug).id, [slug]);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      setPayload(null);
      return;
    }

    let ignore = false;

    apiRequest(`/api/catalog/events/${eventId}`)
      .then((response) => {
        if (!ignore) {
          setPayload(response?.data || null);
        }
      })
      .catch(() => {
        if (!ignore) {
          setPayload(null);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [eventId]);

  const event = payload?.event || null;
  const title = getLocalizedText(event?.title, locale, event?.titleText || 'Event');
  const description = getLocalizedText(event?.description, locale, event?.descriptionText || '');
  const subEvents = Array.isArray(payload?.subEvents) ? payload.subEvents : [];
  const tickets = Array.isArray(payload?.tickets) ? payload.tickets : [];
  const heroImage = event?.desktopImage || event?.mobileImage;
  const checkoutRoute = event ? buildEventCheckoutRoute(event) : '/';
  const availableSubEventIds = useMemo(
    () =>
      new Set(
        tickets
          .filter((ticket) => ticket?.subEventId && ticket?.canCheckout)
          .map((ticket) => Number(ticket.subEventId)),
      ),
    [tickets],
  );
  const heroSubEvents = useMemo(
    () =>
      subEvents.map((item) => ({
        id: item.id,
        schedule: buildSubEventSchedule(item.date, item.startTime, item.endTime),
        city: normalizeCityLabel(
          getLocalizedText(item.cityName, locale, item.cityNameText || '')
            || item.locationText
            || getLocalizedText(item.title, locale, item.titleText || 'Sub-event'),
          locale,
        ),
        canBook: availableSubEventIds.has(Number(item.id)),
      })),
    [availableSubEventIds, locale, subEvents],
  );

  if (!eventId) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">
        {copy.loading}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-[55vh] bg-[#06070b] px-4 py-28 text-center text-white/70">
        {copy.notFound}
      </div>
    );
  }

  return (
    <div className="bg-[#06070b] text-white">
      <section className="relative isolate min-h-[72vh] overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,9,0.34)_0%,rgba(4,5,9,0.62)_38%,rgba(4,5,9,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,199,143,0.18),transparent_24%)]" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-4   sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/25 px-4 py-2 text-sm text-white/86 backdrop-blur transition hover:bg-black/40"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.back}
            </Link> */}

            {heroSubEvents.length > 0 ? (
              <span className="mt-6 inline-flex w-fit rounded-full border border-[#d8c78f]/35 bg-[#d8c78f]/12 px-4 py-2 text-sm font-semibold text-[#f1e4b6] backdrop-blur-md">
                {copy.bookingNow}
              </span>
            ) : null}

            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">{title}</h1>

            {heroSubEvents.length > 0 ? (
              <div className="mt-6 inline-flex max-w-xl flex-col rounded-[2rem]   p-4   sm:p-5">
                <p className="text-lg border-b border-[#d8c78f]/35 font-medium text-[#d8c78f]  sm:text-base">{copy.chooseCity}</p>
                <div className="mt-4 flex flex-col gap-3">
                  {heroSubEvents.map((item) =>
                    item.canBook ? (
                      <Link
                        key={item.id}
                        to={`${checkoutRoute}?subEventId=${item.id}`}
                        className="group rounded-[1.15rem] border border-[#d8c78f]/35 bg-[linear-gradient(180deg,rgba(216,199,143,0.16)_0%,rgba(216,199,143,0.08)_100%)] px-4 py-3 text-base font-semibold text-[#f5e8bb] transition hover:border-[#eadcae]/45 hover:bg-[linear-gradient(180deg,rgba(216,199,143,0.26)_0%,rgba(216,199,143,0.14)_100%)] sm:text-lg"
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span>{item.city}</span>
                          <span className="text-sm font-medium text-white/62 transition group-hover:text-white/78 sm:text-base">{item.schedule}</span>
                        </span>
                      </Link>
                    ) : (
                      <span
                        key={item.id}
                        className="rounded-[1.15rem] border border-white/12 bg-white/6 px-4 py-3 text-base font-semibold text-white/55 sm:text-lg"
                      >
                        <span className="flex items-center justify-between gap-4">
                          <span>{item.city}</span>
                          <span className="text-sm font-medium text-white/45 sm:text-base">{item.schedule}h</span>
                        </span>
                      </span>
                    ),
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>


      {/* Event Description */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6  lg:px-8 lg:py-20">
        <div className="rounded-[2rem]  bg-white/[0.02] p-7 sm:p-9">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.about}</p>
          <div
            className={`mt-6 max-w-none text-base leading-8 text-white/78 [&_p]:mb-6 [&_p]:font-normal [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-bold [&_strong]:text-white [&_b]:font-bold [&_b]:text-white [&_em]:italic [&_i]:italic [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pr-6 [&_li]:font-normal [&_li]:leading-8 ${locale === 'ku' ? 'event-description-ku' : ''}`}
            dangerouslySetInnerHTML={{ __html: renderRichText(description) }}
          />
        </div>

        {/* <aside className="rounded-[2rem] border border-[#d8c78f]/20 bg-[linear-gradient(180deg,rgba(216,199,143,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-0 sm:p-9">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d8c78f]">{copy.schedule}</p>

          {subEvents.length > 0 ? (
            <div className="mt-5 space-y-3">
              {subEvents.map((item) => {
                const venueText = item.locationText || item.cityNameText || '';
                const canBookSubEvent = availableSubEventIds.has(Number(item.id));

                return (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 transition hover:border-white/20 hover:bg-black/30"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {getLocalizedText(item.title, locale, item.titleText || 'Sub-event')}
                        </h3>
                        {item.subTitleText ? <p className="mt-1 text-sm text-[#d8c78f]">{item.subTitleText}</p> : null}
                      </div>
                      <div className="text-sm text-white/60">
                        {item.date || '-'} {item.startTime ? `· ${item.startTime}` : ''}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {getLocalizedText(item.description, locale, item.descriptionText || '') || item.locationText || ''}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                      
                        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.22em] text-white/45">
                          {venueText ? (
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3 py-2">
                              <MapPin className="h-3.5 w-3.5 text-[#d8c78f]" />
                              {venueText}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {canBookSubEvent ? (
                        <Link
                          to={`${checkoutRoute}?subEventId=${item.id}`}
                          className="inline-flex items-center gap-2 rounded-full bg-[#d8c78f] px-5 py-2.5 text-sm font-semibold text-[#1b1607] transition hover:bg-[#e6d7a1]"
                        >
                          <Wallet className="h-4 w-4" />
                          {copy.booking}
                        </Link>
                      ) : (
                        <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/55">
                          <Wallet className="h-4 w-4" />
                          {copy.soldOut}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-8 text-sm text-white/60">
              {copy.noSubEvents}
            </div>
          )}
        </aside> */}
      </section>
    </div>
  );
}
