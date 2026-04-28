import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const MotionDiv = motion.div;

function FeatureSection({ section, index }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  });

  const opacityContent = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const clipProgress = useTransform(
    scrollYProgress,
    [0, 0.7],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );
  const translateContent = useTransform(scrollYProgress, [0, 1], [-50, 0]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'flex min-h-screen items-center justify-center gap-12  py-1 md:px-8 lg:gap-20 lg:px-0',
        section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row',
        'flex-col'
      )}
    >
      <MotionDiv style={{ y: translateContent, opacity: opacityContent }} className="w-full max-w-xl">
       
        <h3 className="mt-5 text-4xl font-bold leading-tight text-[#241b08] md:text-6xl">
          {section.title}
        </h3>
        {section.meta ? (
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-[#9a8550]">
            {section.meta}
          </p>
        ) : null}
        <p className="mt-6 text-base leading-8 text-[#5a4824] md:text-lg">
          {section.description}
        </p>
        {section.tags?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {section.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#eadfbe] bg-[#fcfaf4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6c5724]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </MotionDiv>

      <MotionDiv
        style={{
          opacity: opacityContent,
          clipPath: clipProgress,
        }}
        className="relative w-full max-w-xl "
      >
        <div className="absolute -inset-6 rounded-[2.5rem] bg-[#c6b78e]/20 blur-3xl" />
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#eadfbe] bg-white ">
          <img
            src={section.imageUrl}
            className="h-[420px] w-full object-cover md:h-[520px] rounded-[2.5rem]"
            alt={section.title}
            loading="lazy"
          />
          <div className="absolute inset-0  bg-gradient-to-t from-[#1d1609]/55 via-transparent to-transparent" />
          {section.badge ? (
            <div className="absolute bottom-6 left-6  rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md">
              {section.badge}
            </div>
          ) : null}
        </div>
      </MotionDiv>
    </div>
  );
}

export function Component({ sections = [], intro }) {
  return (
    <div className="overflow-hidden rounded-[2.5rem] bg-[linear-gradient(180deg,#fffdf7_0%,#f4ecd7_100%)] px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
      <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
      
        <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#241b08] sm:text-5xl lg:text-6xl">
          {intro?.title || 'Parallax Scroll Feature Section'}
        </h2>
        {intro?.description ? (
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#5a4824] sm:text-lg">
            {intro.description}
          </p>
        ) : null}
        
      </div>

      <div className="flex flex-col">
        {sections.map((section, index) => (
          <FeatureSection key={section.id} section={section} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Component;
