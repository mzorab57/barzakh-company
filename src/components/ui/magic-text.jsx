import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block mr-3 mt-3">
      {/* وشەی کاڵ لە پشتەوە */}
      <span className="absolute opacity-10">{children}</span>
      {/* وشەی ڕووناک کاتێک سکڕۆڵ دەکرێت */}
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText = ({ text, className = "" }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });
  
  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap leading-tight ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};