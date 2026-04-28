import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSlider.css";

// تۆمارکردنی Plugin ی ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const slides = [
  { id: "first", title: "City Skyline", nav: "One", img: "https://images.unsplash.com/photo-1695634930904-e20e04b7be24?q=85" },
  { id: "second", title: "Flowers of friendship", nav: "Two", img: "https://images.unsplash.com/photo-1697369574152-58c8e59e35d4?q=85" },
  { id: "third", title: "Waves in the Ocean", nav: "Three", img: "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?q=75&w=1920" },
  { id: "fourth", title: "New York City", nav: "Four", img: "https://images.unsplash.com/photo-1617412327653-c29093585207?q=75&w=1920" },
  { id: "fifth", title: "Dark side of the moon", nav: "Five", img: "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?q=75&w=1920" },
];

const StickyHeroSlider = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".section");
      const stepDuration = 1.2;
      
      // ئامادەکردنی ستایلی سەرەتایی (هەموو سلايدەکان دەخەینە ژێر یەکدی)
      gsap.set(sections.slice(1), { autoAlpha: 0 });
      gsap.set(".wrapper-outer", { yPercent: 100 });
      gsap.set(".wrapper-inner", { yPercent: 100 });
      
      // پیشاندانی سلايدی یەکەم بە تەنها
      gsap.set(sections[0], { autoAlpha: 1 });
      gsap.set(sections[0].querySelector(".wrapper-outer"), { yPercent: 0 });
      gsap.set(sections[0].querySelector(".wrapper-inner"), { yPercent: 0 });

      // دروستکردنی Timeline ی سەرەکی بۆ سکڕۆڵ
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(slides.length - 1) * 150}%`,
          pin: true,                      // چەسپاندنی هەموو سێکشەنەکە
          scrub: 1.6,
          anticipatePin: 1,
        }
      });

      // دروستکردنی ئەنیمەیشنی تێپەڕین بۆ هەر سلايدێک
      slides.forEach((_, i) => {
        if (i === 0) return;

        const prevSection = sections[i - 1];
        const currSection = sections[i];
        const position = (i - 1) * stepDuration;

        // لۆژیکی Clipping Effect ی تۆ (یەکێک دێت و یەکێک دەڕوات)
        tl.to(prevSection.querySelector(".background"), { yPercent: -15, duration: stepDuration, ease: "none" }, position)
          .to(currSection, { autoAlpha: 1, duration: 0.01, ease: "none" }, position)
          .fromTo(currSection.querySelector(".wrapper-outer"), { yPercent: 100 }, { yPercent: 0, duration: stepDuration, ease: "none" }, position)
          .fromTo(currSection.querySelector(".wrapper-inner"), { yPercent: -100 }, { yPercent: 0, duration: stepDuration, ease: "none" }, position)
          .fromTo(currSection.querySelector(".background"), { yPercent: 15 }, { yPercent: 0, duration: stepDuration, ease: "none" }, position)
          .fromTo(currSection.querySelector(".section-title"), 
            { autoAlpha: 0, yPercent: 150 }, 
            { autoAlpha: 1, yPercent: 0, duration: 0.8, ease: "power2.out" }, 
            position + 0.08
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="slider-main-wrapper ">
      <div ref={sliderRef} className="hero-slider-fixed">
        {/* <header className="header">
          <nav>
            {slides.map((s, i) => (
              <a key={i} className={activeSlide === i ? "active" : ""} href={`#${s.id}`}>
                {s.nav}
              </a>
            ))}
          </nav>
        </header> */}

        {slides.map((slide) => (
          <section key={slide.id} className={`section ${slide.id}`}>
            <div className="wrapper-outer">
              <div className="wrapper-inner">
                <div className="background" style={{ backgroundImage: `url(${slide.img})` }}>
                  <h2 className="section-title">{slide.title}</h2>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default StickyHeroSlider;
