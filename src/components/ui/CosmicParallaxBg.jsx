import React, { useEffect, useState } from 'react';

const CosmicParallaxBg = ({
  head = "About Us",
  text = "Faith, Knowledge, Community",
  loop = true,
  className = "",
  primaryColor = "#7c3aed",
  secondaryColor = "#22d3ee",
}) => {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');

  const textParts = text.split(',').map(part => part.trim());

  const generateStarBoxShadow = (count) => {
    let shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 2200);
      const y = Math.floor(Math.random() * 2200);
      shadows.push(`${x}px ${y}px #ffffff`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(800));
    setMediumStars(generateStarBoxShadow(300));
    setBigStars(generateStarBoxShadow(120));

    document.documentElement.style.setProperty(
      '--animation-iteration',
      loop ? 'infinite' : '1'
    );
  }, [loop]);

  return (
    <div className={`cosmic-parallax-container relative overflow-hidden ${className}`}>
      {/* Stars Layers */}
      <div id="stars" style={{ boxShadow: smallStars }} className="cosmic-stars" />
      <div id="stars2" style={{ boxShadow: mediumStars }} className="cosmic-stars-medium" />
      <div id="stars3" style={{ boxShadow: bigStars }} className="cosmic-stars-large" />

      {/* Horizon */}
      <div id="horizon">
        <div 
          className="glow" 
          style={{ background: `radial-gradient(circle, ${secondaryColor}40 0%, transparent 70%)` }} 
        />
      </div>

      {/* Earth */}
      <div id="earth" style={{ boxShadow: `0 0 100px ${primaryColor}` }} />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
        <h1 
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl"
          style={{ textShadow: `0 0 40px ${primaryColor}` }}
        >
          {head}
        </h1>
        
        <div id="subtitle" className="text-white/90 text-xl md:text-2xl font-light tracking-widest flex flex-wrap justify-center gap-x-4">
          {textParts.map((part, index) => (
            <React.Fragment key={index}>
              <span className={`subtitle-part-${index + 1}`}>{part.toUpperCase()}</span>
              {index < textParts.length - 1 && <span className="opacity-30">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CosmicParallaxBg;