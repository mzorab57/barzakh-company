const HeroVideoSection = () => {
  const VIDEO_ID = 'cmkw01FkrdI';
  const origin = typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : '';
  const src = `https://www.youtube.com/embed/${VIDEO_ID}?controls=0&rel=0&autoplay=1&mute=1&playsinline=1&loop=1&playlist=${VIDEO_ID}&enablejsapi=1${origin ? `&origin=${origin}` : ''}`;
  return (
    <div className="relative w-screen  p-4 overflow-hidden">

      {/* Background YouTube Video */}
      <iframe
        className="absolute inset-0 w-screen  h-full"
        src={src}
        title="LUL Background Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Logo */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <img
          src="https://lightuponlight.co.uk/wp-content/uploads/2023/05/LUL-Logo.png"
          alt="LUL Logo"
          className="w-[170px] md:w-[260px] py-[10rem]"
        />
      </div>
    </div>
  );
};

export default HeroVideoSection;
                                                                                                                                        