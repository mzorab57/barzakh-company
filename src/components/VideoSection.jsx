const HeroVideoSection = () => {
  const VIDEO_ID = 'cmkw01FkrdI';
  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const src = `https://www.youtube.com/embed/${VIDEO_ID}?controls=0&rel=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=${VIDEO_ID}&enablejsapi=1${origin ? `&origin=${origin}` : ''}`;
  return (
    <div className="relative w-screen  p-4 overflow-hidden bg-[#88743e]">

      {/* Background YouTube Video */}
     <video
            className="h-[65vh] w-full object-cover rounded brightness-75"
            src="https://pub-8090965640ca4bd1b63bf23a3ab20377.r2.dev/regay_hijray.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

      {/* Overlay */}
      <div className="absolute inset-0 "></div>

     
    </div>
  );
};

export default HeroVideoSection;
                                                                                                                                        