import { MagicText } from './ui/magic-text'; // دڵنیابەرەوە لە ناونیشانی فایلەکە

export default function AboutSection() {
  const aboutText = `
    We organize inspiring Islamic conferences for hundreds of our fellow Kurds,
building spaces where learning feels uplifting, thoughtful, and deeply
    connected to everyday life.
  `;
  
  const missionText = `
    Our goal is to bridge the gap and provide benefit to the community by
introducing diverse and world-renowned speakers and businesses that serve
    society. By the grace of God, we have benefited hundreds of people, both
Muslims and non-Muslims alike, by creating opportunities to learn through
broad and moderate Islamic thought.
  `;

  return (
    <section className="bg-[#1a150a] text-[#efe7cf] py-40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* تایتڵی سەرەکی */}
        <div className=" mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#88743e] mb-4">
            About Us
          </p>
          <h1 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#c4b690] lg:text-6xl">
            We create inspiring Islamic events that connect hearts, ideas, and community.
          </h1>
        </div>

        {/* Magic Text یەکەم */}
        <div className="max-w-6xl mx-auto">
          <MagicText
            text={aboutText}
            className="text-4xl md:text-5xl "
          />
        </div>

        {/* پشوویەک لەنێوان دوو دەقەکە */}
        <div className="h-64"></div> 
        
        {/* Magic Text دووەم */}
        <div className="max-w-6xl mx-auto">
          <div className=" mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#88743e] mb-4">
              Our Mission
            </p>
            <h2 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#c4b690] lg:text-6xl">
              Bridging the Gap
            </h2>
          </div>
          <MagicText
            text={missionText}
            className="text-2xl md:text-3xl font-light leading-relaxed text-right"
          />
        </div>

      </div>
    </section>
  );
}