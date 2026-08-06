import { useEffect, useState } from 'react';
import './CosmicParallaxBg.css';

function CosmicParallaxBg({
  head,
  text,
  loop = false,
  className = '',
  primaryColor = '#88743e', // ڕەنگی ئەسڵی تۆ
  secondaryColor = '#C5B78E', // ڕەنگی دووەمی تۆ
}) {
  const [smallStars, setSmallStars] = useState('');
  const [mediumStars, setMediumStars] = useState('');
  const [bigStars, setBigStars] = useState('');

  const textParts = text.split(',').map((part) => part.trim());

  const generateStarBoxShadow = (count) => {
    const shadows = [];
    for (let i = 0; i < count; i += 1) {
      const x = Math.floor(Math.random() * 2000);
      const y = Math.floor(Math.random() * 2000);
      shadows.push(`${x}px ${y}px rgba(255,255,255,0.8)`);
    }
    return shadows.join(', ');
  };

  useEffect(() => {
    setSmallStars(generateStarBoxShadow(700));
    setMediumStars(generateStarBoxShadow(200));
    setBigStars(generateStarBoxShadow(100));
  }, [loop]);

  return (
    <div
      className={`cosmic-parallax-container ${className}`}
      style={{
        '--cosmic-primary': primaryColor,
        '--cosmic-secondary': secondaryColor,
      }}
    >
      {/* ئەستێرەکان لە پشتەوەن */}
      <div style={{ boxShadow: smallStars }} className="cosmic-stars" />
      <div style={{ boxShadow: mediumStars }} className="cosmic-stars-medium" />
      <div style={{ boxShadow: bigStars }} className="cosmic-stars-large" />

      {/* ڕووناکی دەوروبەر (Nebula) */}
      <div className="cosmic-nebula cosmic-nebula-center" />

      {/* زەوی یان بازنە گەورەکە کە لەم سەر بۆ ئەو سەری شاشەیە */}
      <div className="cosmic-horizon-container">
        <div className="cosmic-main-sphere" />
      </div>

      {/* دەقەکان لە سەرەوەی هەموو شتێک جێگیر کراون */}
      <div className="cosmic-content-overlay">
        <div className="cosmic-title-main">{head.toUpperCase()}</div>
        <div className="cosmic-subtitle-list">
          {textParts.map((part, index) => (
            <h1
              key={`${part}-${index}`}
              className={` translate-y-28 text-gray-200 max-w-xl text-xl`}
            >
              {part.toUpperCase()}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CosmicParallaxBg };