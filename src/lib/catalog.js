export function resolveLocale(language) {
  const normalized = String(language || 'ku').toLowerCase();

  if (normalized.startsWith('ar')) {
    return 'ar';
  }

  if (normalized.startsWith('en')) {
    return 'en';
  }

  return 'ku';
}

export function getLocalizedText(value, language, fallback = '') {
  if (typeof value === 'string') {
    return value || fallback;
  }

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const locale = resolveLocale(language);
  const priorities = [locale, 'ku', 'ar', 'en'];

  for (const key of priorities) {
    const candidate = value[key];
    if (typeof candidate === 'string' && candidate.trim() !== '') {
      return candidate.trim();
    }
  }

  return fallback;
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildPastEventSlug(item) {
  const base = slugify(item?.title?.en || item?.titleText || item?.date || 'past-event');
  const id = item?.id ? `${item.id}` : 'archive';

  return `${id}-${base || 'past-event'}`;
}

export function parsePastEventSlug(slug) {
  const normalized = String(slug || '').trim();
  const match = normalized.match(/^(\d+)(?:-(.*))?$/);

  if (!match) {
    return {
      id: null,
      tail: normalized,
    };
  }

  return {
    id: Number(match[1]),
    tail: match[2] || '',
  };
}

export function matchesPastEventSlug(item, slug) {
  const normalizedSlug = String(slug || '').trim();
  if (normalizedSlug === '') {
    return false;
  }

  const builtSlug = buildPastEventSlug(item);
  if (builtSlug === normalizedSlug) {
    return true;
  }

  const parsed = parsePastEventSlug(normalizedSlug);
  if (parsed.id !== null && Number(item?.id || 0) === parsed.id) {
    return true;
  }

  return false;
}

export function buildEventSlug(item) {
  const base = slugify(item?.title?.en || item?.titleText || item?.date || 'event');
  const id = item?.id ? `${item.id}` : 'event';

  return `${id}-${base || 'event'}`;
}

export function parseEventSlug(slug) {
  const normalized = String(slug || '').trim();
  const match = normalized.match(/^(\d+)(?:-(.*))?$/);

  if (!match) {
    return {
      id: null,
      tail: normalized,
    };
  }

  return {
    id: Number(match[1]),
    tail: match[2] || '',
  };
}

export function matchesEventSlug(item, slug) {
  const normalizedSlug = String(slug || '').trim();
  if (normalizedSlug === '') {
    return false;
  }

  const builtSlug = buildEventSlug(item);
  if (builtSlug === normalizedSlug) {
    return true;
  }

  const parsed = parseEventSlug(normalizedSlug);
  if (parsed.id !== null && Number(item?.id || 0) === parsed.id) {
    return true;
  }

  return false;
}

export function resolveStaticEventRoute(event, locale) {
  const haystack = [
    getLocalizedText(event?.title, locale, ''),
    event?.titleText || '',
    getLocalizedText(event?.description, locale, ''),
    event?.descriptionText || '',
  ]
    .join(' ')
    .toLowerCase();

  if (haystack.includes('migration') || haystack.includes('koc') || haystack.includes('کۆچ')) {
    return '/events/migration-route';
  }

  if (haystack.includes('medina') || haystack.includes('مەدینە')) {
    return '/events/medina-stay';
  }

  if (haystack.includes('turkey') || haystack.includes('turkiye') || haystack.includes('turkia') || haystack.includes('تورکیا')) {
    return '/events/turkey-2027';
  }

  return null;
}

export function resolvePublicEventRoute(event, locale) {
  return resolveStaticEventRoute(event, locale) || `/events/${buildEventSlug(event)}`;
}

export function buildEventCheckoutRoute(event) {
  return `/events/${buildEventSlug(event)}/checkout`;
}

export function extractYouTubeId(url) {
  if (typeof url !== 'string' || url.trim() === '') {
    return null;
  }

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return parsed.pathname.replace(/^\/+/, '') || null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/')[2] || null;
      }

      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/')[2] || null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function buildYouTubeThumbnailUrl(id, quality = 'hqdefault') {
  const normalizedId = String(id || '').trim();

  if (normalizedId === '') {
    return '';
  }

  return `https://i.ytimg.com/vi/${normalizedId}/${quality}.jpg`;
}

export async function fetchYouTubeOEmbed(url, signal) {
  const normalizedUrl = String(url || '').trim();

  if (normalizedUrl === '') {
    return null;
  }

  const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(normalizedUrl)}&format=json`;
  const response = await fetch(endpoint, {
    method: 'GET',
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load YouTube metadata.');
  }

  return response.json();
}

export function buildQueryString(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return;
    }

    params.set(key, String(value));
  });

  const query = params.toString();

  return query ? `?${query}` : '';
}
