import { useTranslation } from 'react-i18next';
import { getVideoSectionContent } from '@/data/componentContent';

const HeroVideoSection = () => {
  const { t } = useTranslation();
  const videoSectionContent = getVideoSectionContent(t);

  return (
    <section className="relative min-h-screen bg-[#050403] px-4 py-16 sm:px-6 lg:px-8 lg:py-24 flex items-center justify-center font-sans overflow-hidden">
      
    
      {/* Cinematic Video Container */}
      <div className="relative w-full max-w-[75rem] h-[60vh]  sm:h-[75vh] lg:h-[65vh] mx-auto z-10 group cursor-default">
        
        {/* Main Frame */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-[#0a0805] shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 transition-all duration-1000 hover:border-[#E6D6A3]/30 hover:shadow-[0_40px_120px_rgba(230,214,163,0.2)]">
          
          {/* The Video */}
          <video
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[40s] ease-linear group-hover:scale-110"
            src={videoSectionContent.videoSrc}
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Premium Overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none opacity-80 transition-opacity duration-700 group-hover:opacity-60" />
          
          {/* Subtle Vignette (Dark edges) */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] pointer-events-none" />

          {/* Film Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('/noise.svg')] pointer-events-none" />

          {/* Cinematic Progress Bar & Timecode */}
          <div className="absolute bottom-6 left-10 right-10 sm:bottom-10 sm:left-16 sm:right-16 flex items-center gap-4 sm:gap-6 z-20 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
            <span className="text-[10px] sm:text-xs font-mono text-white/70">
              {videoSectionContent.progress?.start || "00:00"}
            </span>
            
            <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
              {/* Animated Progress Line */}
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-[#E6D6A3]/50 to-[#E6D6A3] rounded-full shadow-[0_0_15px_#E6D6A3] animate-progress" />
            </div>
            
            <span className="text-[10px] sm:text-xs font-mono text-white/70">
              {videoSectionContent.progress?.end || "03:45"}
            </span>
          </div>

          {/* Optional: Subtle REC indicator (can remove if you don't want it) */}
          <div className="absolute top-8 right-10 sm:top-12 sm:right-14 flex items-center gap-2 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold tracking-[0.3em] text-white uppercase">Live</span>
          </div>

        </div>
      </div>

      {/* Embedded Styles for animations */}
      <style>{`
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }

        .animate-progress {
          animation: loadProgress 20s ease-in-out infinite alternate;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.08; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes loadProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default HeroVideoSection;