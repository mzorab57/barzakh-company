import { useTranslation } from 'react-i18next';
import { getVideoSectionContent } from '@/data/componentContent';

const HeroVideoSection = () => {
  const { t } = useTranslation();
  const videoSectionContent = getVideoSectionContent(t);

  return (
    <section className="relative min-h-screen bg-[#050403] px-4 py-16 sm:px-6 lg:px-8 lg:py-24 flex items-center justify-center font-sans overflow-hidden">
      
      {/* Background Grid Pattern & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E6D6A3] rounded-full blur-[150px] opacity-10 animate-pulse-slow" />

      <div className="mx-auto max-w-[90rem] w-full relative z-10">
        
        {/* Main Luxury Container */}
        <div className="group/card relative grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-[#0a0805]/80 backdrop-blur-3xl border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-1000 hover:border-[#E6D6A3]/30 hover:shadow-[0_40px_120px_rgba(230,214,163,0.15)] lg:grid-cols-12 lg:rounded-[3.5rem]">
          
          {/* Left Side: Text Content (Takes 5 columns on Desktop) */}
          <div className="order-2 flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-20 lg:order-1 lg:col-span-5 lg:px-16 xl:px-20 relative z-20">
            
            {/* Subtle Inner Glow behind text */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#E6D6A3]/10 rounded-full blur-[80px]" />

            <div className="max-w-xl text-white space-y-10 relative z-10">
              
              {/* Premium Badge */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center gap-3 rounded-full  bg-[#E6D6A3]/5 px-4 py-2 backdrop-blur-md">
                  {/* <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6D6A3] opacity-60"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E6D6A3]"></span>
                  </div> */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#E6D6A3]">
                    {videoSectionContent.badge}
                  </span>
                </div>
              </div>

              {/* Masterpiece Heading */}
              <h2 className="animate-fade-in-up text-5xl font-black uppercase leading-[1.1] tracking-tighter sm:text-6xl lg:text-[4rem] xl:text-[4.5rem]" style={{ animationDelay: '0.4s' }}>
                <span className="block text-white/90 font-light tracking-tight">
                  {videoSectionContent.headingLines[0]}
                </span>
                <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-[#E6D6A3] via-[#fff5d6] to-[#b39e60] drop-shadow-[0_0_30px_rgba(230,214,163,0.3)]">
                  {videoSectionContent.headingLines[1]}
                </span>
                {/* Outline Text Effect */}
                <span className="block mt-1 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                  {videoSectionContent.headingLines[2]}
                </span>
              </h2>

              {/* Description */}
              <p className="animate-fade-in-up text-base font-light leading-relaxed text-white/50 sm:text-lg max-w-md" style={{ animationDelay: '0.6s' }}>
                {videoSectionContent.description}
              </p>

              {/* Luxury CTA & Tags Group */}
              <div className="animate-fade-in-up pt-4 space-y-8" style={{ animationDelay: '0.8s' }}>
                
               

                {/* Minimalist Tags */}
                <div className="flex flex-wrap gap-4 border-t border-white/10 pt-8">
                  {videoSectionContent.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="cursor-default text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 transition-colors duration-300 hover:text-[#E6D6A3]"
                    >
                      • {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side: Cinematic Video (Takes 7 columns on Desktop) */}
          <div className="order-1 relative w-full min-h-[450px] sm:min-h-[600px] lg:order-2 lg:col-span-7 lg:min-h-full overflow-hidden bg-black">
            
            {/* The Video */}
            <video
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[30s] ease-linear group-hover/card:scale-110"
              src={videoSectionContent.videoSrc}
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Premium Gradients for Blending */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0805] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0a0805] lg:via-[#0a0805]/60 lg:to-transparent" />
            
            {/* Film Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('/noise.svg')]" />

            {/* Cinematic Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex size-10 items-center justify-center rounded-full border border-white/5 bg-black/20 backdrop-blur-sm transition-transform duration-700 group-hover/card:scale-110 group-hover/card:bg-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                 <svg className="w-8 h-8 text-white/80  drop-shadow-lg transition-all duration-300 group-hover/card:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>

            {/* Cinematic Progress Bar & Timecode */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 flex items-center gap-4 z-20">
              <span className="text-[10px] font-mono text-white/50">{videoSectionContent.progress.start}</span>
              <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#E6D6A3] rounded-full shadow-[0_0_10px_#E6D6A3] animate-progress" />
              </div>
              <span className="text-[10px] font-mono text-white/50">{videoSectionContent.progress.end}</span>
            </div>

            {/* Top Right "REC" indicator */}
           

 {/* Corner Accents */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-12 w-24 h-24 border-t-2 border-r-2 border-[#E6D6A3]/30 rounded-tr-3xl pointer-events-none"></div>
            <div className="absolute bottom-12 left-8 lg:bottom-12 lg:left-12 w-24 h-24 border-b-2 border-l-2 border-[#E6D6A3]/30 rounded-bl-3xl pointer-events-none lg:hidden"></div>
          </div>
        </div>
      </div>

      {/* Embedded Styles for the specific animations */}
      <style>{`
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }

        .animate-progress {
          animation: loadProgress 15s ease-in-out infinite alternate;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.1); }
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
