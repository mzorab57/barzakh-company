import { MagicText } from './ui/magic-text'; // دڵنیابەرەوە لە ناونیشانی فایلەکە
import { aboutSectionContent } from '@/data/componentContent';

export default function AboutSection() {
  return (
    <section className="bg-[#1a150a] text-[#efe7cf] py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* تایتڵی سەرەکی */}
        <div className=" mb-24">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#88743e] mb-4">
            {aboutSectionContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#c4b690] lg:text-6xl">
            {aboutSectionContent.hero.title}
          </h1>
        </div>

        {/* Magic Text یەکەم */}
        <div className="max-w-6xl mx-auto">
          <MagicText
            text={aboutSectionContent.aboutText}
            className="text-4xl md:text-5xl "
          />
        </div>

        {/* پشوویەک لەنێوان دوو دەقەکە */}
        <div className="h-64"></div> 
        
        {/* Magic Text دووەم */}
        <div className="max-w-6xl mx-auto">
          <div className=" mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#88743e] mb-4">
              {aboutSectionContent.mission.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-bold uppercase leading-tight sm:text-4xl text-[#c4b690] lg:text-6xl">
              {aboutSectionContent.mission.title}
            </h2>
          </div>
          <MagicText
            text={aboutSectionContent.missionText}
            className="text-2xl md:text-3xl font-light leading-relaxed text-right"
          />
        </div>

      </div>
    </section>
  );
}
