import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroSlider.css";

// تۆمارکردنی Plugin ی ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    id: "first",
    title: "",
    nav: "One",
    img: "../assets/images/hero1.jpg",
    // 
    // mobileImg: "https://lightuponlight.co.uk/wp-content/uploads/2026/04/Ali-summer-conference-copy.jpg",
    mobileImg: "../assets/images/hero4.jpg",
  },
  {
    id: "second",
    title: "",
    nav: "Two",
    img: "../assets/images/hero2.jpg",
    mobileImg: "https://lightuponlight.co.uk/wp-content/uploads/2026/04/Ali-summer-conference-copy.jpg",
  },
  {
    id: "third",
    title: "",
    nav: "Three",
    img: "../assets/images/hero3.jpg",
    mobileImg: "https://lightuponlight.co.uk/wp-content/uploads/2025/06/Umrah-2026-Package-Included-1-819x1024.jpg",
  },
  { id: "fourth", title: "", nav: "Four", img: "https://lightuponlight.co.uk/wp-content/uploads/2025/07/Khalilah.jpg" },
  { id: "fifth", title: "", nav: "Five", img: "../assets/images/hero4.jpg" },
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
    <div ref={containerRef} className="slider-main-wrapper overflow-hidden ">
      <div ref={sliderRef} className="hero-slider-fixed overflow-hidden">
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
                <div
                  className="background"
                  style={{
                    "--desktop-bg": `url(${slide.img})`,
                    "--mobile-bg": `url(${slide.mobileImg || slide.img})`,
                  }}
                >
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
