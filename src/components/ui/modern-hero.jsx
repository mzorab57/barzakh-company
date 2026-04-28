import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

const SECTION_HEIGHT = 1500; // ئەمە درێژی سکڕۆڵەکەیە

export const SmoothScrollHero = ({ 
  title, eyebrow, description, date, location, centerImage, mobileCenterImage, parallaxImages 
}) => {
  return (
    <div className="bg-[#f7f0dc] text-white">
      <Hero 
        title={title} 
        eyebrow={eyebrow} 
        description={description} 
        date={date} 
        location={location} 
        centerImage={centerImage} 
        mobileCenterImage={mobileCenterImage}
        parallaxImages={parallaxImages}
      />
    </div>
  );
};

const Hero = ({ eyebrow, centerImage, mobileCenterImage, parallaxImages }) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage
        centerImage={centerImage}
        mobileCenterImage={mobileCenterImage}
        eyebrow={eyebrow}
      />

      <ParallaxImages images={parallaxImages} />

      {/* <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-[#090909]/0 to-[#090909]" /> */}
    </div>
  );
};

const CenterImage = ({ centerImage, mobileCenterImage, eyebrow }) => {
  const { scrollY } = useScroll();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' ? false : window.innerWidth >= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // لۆژیکی سەرەکی Clip Path: وێنەکە لە چوارگۆشەیەکی بچووکەوە دەبێتە فول سکرین
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  const activeCenterImage = isDesktop ? centerImage : (mobileCenterImage || centerImage);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${activeCenterImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ناوەڕۆکی ناو وێنە ناوەڕاستەکە */}
      <div className="relative z-10 max-w-4xl px-8 mt-40">
         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.4em] text-[#C6B78E] mb-4"
         >
            {eyebrow}
         </motion.p>
         {/* <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight">{title}</h1>
         <p className="mt-6 text-lg text-gray-300 max-w-2xl">{description}</p> */}
         
         {/* <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C6B78E]">
                <CalendarDays size={18} /> {date}
            </div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#C6B78E]">
                <MapPin size={18} /> {location}
            </div>
         </div> */}
      </div>
      
      {/* Overlay بۆ ئەوەی تێکستەکە باشتر بخوێندرێتەوە */}
      {/* <div className="absolute inset-0 bg-[#f7f0dc]/20 z-0" /> */}
    </motion.div>
  );
};

//  div parallax images image wrdakan
const ParallaxImages = ({ images }) => {
  return (
    <div className="relative z-20 mx-auto max-w-5xl  px-4 pt-[200px]">
      {images.map((img, index) => (
        <ParallaxImg
          key={index}
          src={img.src}
          alt={img.alt}
          start={img.start}
          end={img.end}
          className={img.className}
        />
      ))}
    </div>
  );
};


// iamge wrdakan
const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 0], [1.3, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} shadow-2xl object-cover `}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
