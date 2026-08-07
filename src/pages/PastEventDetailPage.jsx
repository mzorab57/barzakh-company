import { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { CalendarDays, Play, Tag, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getPastEventDetailPageContent } from '@/data/pageContent';
import { apiRequest } from '@/lib/api';
import {
  buildPastEventSlug,
  buildYouTubeThumbnailUrl,
  extractYouTubeId,
  fetchYouTubeOEmbed,
  getLocalizedText,
  matchesPastEventSlug,
  resolveLocale,
} from '@/lib/catalog';

function buildEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
}

function VideoModal({ video, onClose }) {
  useEffect(() => {
    if (!video) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [video]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#090705] shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-white hover:text-black"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="aspect-video w-full bg-black">
          <iframe
            className="h-full w-full"
            src={buildEmbedUrl(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function PastEventDetailPage() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoMetadata, setVideoMetadata] = useState({});
  const content = getPastEventDetailPageContent(t);
  const locale = resolveLocale(i18n?.language);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    let ignore = false;

    apiRequest('/api/catalog/past-events')
      .then((response) => {
        if (!ignore) {
          setDynamicEvents(Array.isArray(response?.data?.items) ? response.data.items : []);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          setDynamicEvents([]);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const events = useMemo(() => {
    if (dynamicEvents.length === 0) {
      return content.events;
    }

    return dynamicEvents.map((event, index) => {
      const title = getLocalizedText(event.title, locale, event.titleText || 'Past Event');
      const videos = (event.youtubeVideoLinks || [])
        .map((url, videoIndex) => {
          const id = extractYouTubeId(url);
          if (!id) {
            return null;
          }

          return {
            id,
            url,
            title: `${title} ${content.videoLabel} ${videoIndex + 1}`,
            thumbnail: buildYouTubeThumbnailUrl(id),
          };
        })
        .filter(Boolean);

      return {
        slug: buildPastEventSlug(event),
        id: event.id || null,
        title,
        image: event.desktopImage || event.posterImage || content.events?.[index]?.image,
        mobileImage: event.desktopImage || event.posterImage || content.events?.[index]?.mobileImage,
        year: event.year || String(event.date || '').slice(0, 4),
        category: Array.isArray(event.categories) ? (event.categories[0] || '') : '',
        description: '',
        videos,
      };
    });
  }, [content.events, content.videoLabel, dynamicEvents, locale]);

  const event = useMemo(() => events.find((item) => matchesPastEventSlug(item, slug)), [events, slug]);

  useEffect(() => {
    if (!event?.videos?.length) {
      setVideoMetadata({});
      return undefined;
    }

    const controller = new AbortController();
    let ignore = false;

    Promise.all(
      event.videos.map(async (video) => {
        try {
          const metadata = await fetchYouTubeOEmbed(video.url, controller.signal);

          return [
            video.id,
            {
              title: typeof metadata?.title === 'string' ? metadata.title.trim() : '',
              thumbnail: typeof metadata?.thumbnail_url === 'string' ? metadata.thumbnail_url.trim() : '',
            },
          ];
        } catch {
          return [video.id, null];
        }
      }),
    ).then((entries) => {
      if (ignore) {
        return;
      }

      setVideoMetadata(
        Object.fromEntries(entries.filter((entry) => Array.isArray(entry) && entry[1])),
      );
    });

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [event]);

  useEffect(() => {
    setActiveVideo(null);
  }, [slug]);

  if (isLoading && !event) {
    return (
      <section className="min-h-screen bg-[#060504] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-8">
          <div className="h-[58vh] rounded-[2.5rem] bg-white/5" />
          <div className="h-96 rounded-[2rem] bg-white/5" />
        </div>
      </section>
    );
  }

  if (!event && !isLoading) {
    return <Navigate to="/past-events" replace />;
  }

  return (
    <>
      <section className="min-h-screen overflow-hidden bg-[#060504] text-white">
        <div className="relative isolate min-h-[72vh] overflow-hidden">
          <div className="absolute inset-0">
            <picture>
              {event.mobileImage ? <source media="(max-width: 767px)" srcSet={event.mobileImage} /> : null}
              <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.45)_32%,rgba(0,0,0,0.82)_72%,rgba(5,4,3,1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,183,142,0.22),transparent_34%)]" />
          </div>

          <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
            <div className="max-w-4xl pt-24 sm:pt-32">
              <div className="flex flex-wrap gap-3">
                {event.year ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold uppercase  text-white/85 backdrop-blur-md">
                    <CalendarDays className="h-4 w-4 text-[#d8c78f]" />
                    {event.year}
                  </span>
                ) : null}
                {event.category ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold uppercase  text-white/85 backdrop-blur-md">
                    <Tag className="h-4 w-4 text-[#d8c78f]" />
                    {event.category}
                  </span>
                ) : null}
              </div>

              <h1 className="my-6 text-4xl font-black leading-tight text-[#fff8e8] sm:text-5xl lg:text-7xl">
                {event.title}
              </h1>

              {/* <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
                {content.videosDescription}
              </p> */}
            </div>
          </div>
        </div>

        <div className="-mt-16 relative z-10 mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,15,11,0.96),rgba(8,7,5,0.98))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d8c78f]">
                  {/* {content.videosEyebrow} */}
                </p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  {content.videosTitle}
                </h2>
              </div>
              {/* <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                {content.watchHint}
              </p> */}
            </div>

            {event.videos.length > 0 ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {event.videos.map((video, index) => {
                  const metadata = videoMetadata[video.id];
                  const resolvedTitle = metadata?.title || video.title;
                  const resolvedThumbnail = metadata?.thumbnail || video.thumbnail || event.image;

                  return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => setActiveVideo({ ...video, title: resolvedTitle, thumbnail: resolvedThumbnail })}
                    className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-1 hover:border-[#d8c78f]/40"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={resolvedThumbnail}
                        alt={resolvedTitle}
                        className="h-full w-full object-cover transition duration-700 "
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.78))]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/35 text-[#f4ead0] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[#d8c78f] group-hover:text-black">
                          <Play className="ml-1 h-8 w-8 fill-current" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase  text-[#d8c78f]">
                        {/* {content.videoLabel} {String(index + 1).padStart(2, '0')} */}
                      </p>
                      <h3 className=" text-xl font-bold leading-8 text-white">
                        {resolvedTitle}
                      </h3>
                    </div>
                  </button>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center text-white/55">
                {content.videosTitle}
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
