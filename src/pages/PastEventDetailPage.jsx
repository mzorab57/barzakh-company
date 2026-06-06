import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Play, Tag, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { getPastEventDetailPageContent } from '@/data/pageContent';

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
  const { t } = useTranslation();
  const content = getPastEventDetailPageContent(t);
  const event = useMemo(() => content.events.find((item) => item.slug === slug), [content.events, slug]);
  const [activeVideo, setActiveVideo] = useState(null);

  if (!event) {
    return <Navigate to="/past-events" replace />;
  }

  return (
    <>
      <section className="min-h-screen overflow-hidden bg-[#060504] text-white">
        <div className="relative isolate">
          <div className="absolute inset-0">
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.74)_55%,rgba(5,4,3,0.98)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,183,142,0.22),transparent_34%)]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
            {/* <Link
              to="/past-events"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4ead0] backdrop-blur-md transition hover:border-[#d8c78f]/50 hover:bg-black/30"
            >
              <ArrowLeft className="h-4 w-4" />
              {content.backLabel}
            </Link> */}

            <div className="pt-32 max-w-4xl">
              <div className="flex pt-40 flex-wrap gap-3">
                {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  <CalendarDays className="h-4 w-4 text-[#d8c78f]" />
                  {event.year}
                </span> */}
                {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  <Tag className="h-4 w-4 text-[#d8c78f]" />
                  {event.category}
                </span> */}
              </div>
              {/* <h1 className="mt-6 text-4xl font-black leading-tight text-[#fff8e8] sm:text-5xl lg:text-7xl">
                {event.title}
              </h1> */}
              {/* <p className="mt-6 max-w-3xl text-base leading-8 text-white/76 sm:text-lg">
                {event.description}
              </p> */}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
          <div className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,15,11,0.96),rgba(8,7,5,0.98))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                {/* <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#d8c78f]">
                  {content.videosEyebrow}
                </p> */}
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  {content.videosTitle}
                </h2>
              </div>
              {/* <p className="max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                {content.videosDescription}
              </p> */}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {event.videos.map((video, index) => (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setActiveVideo(video)}
                  className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] text-left transition duration-500 hover:-translate-y-1 hover:border-[#d8c78f]/40"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.78))]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-black/35 text-[#f4ead0] backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[#d8c78f] group-hover:text-black">
                        <Play className="ml-1 h-8 w-8 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8c78f]">
                      {content.videoLabel} {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-white">
                      {video.title}
                    </h3>
                    {/* <p className="mt-3 text-sm leading-7 text-white/64">
                      {content.watchHint}
                    </p> */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
