import { MagicText } from './ui/magic-text'; // دڵنیابەرەوە لە ناونیشانی فایلەکە
import { useTranslation } from 'react-i18next';
import { getAboutSectionContent } from '@/data/componentContent';

export default function AboutSection() {
  const { t } = useTranslation();
  const aboutSectionContent = getAboutSectionContent(t);

  return (
    <section className="bg-[#1a150a] text-[#efe7cf] py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* تایتڵی سەرەکی */}
        <div className=" mb-6 max-w-3xl">
          <p className="text-xl  uppercase  text-[#88743e] mb-4">
            {aboutSectionContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 text-lg font-bold uppercase leading-tight sm:text-xl text-[#c4b690] lg:text-4xl">
            {aboutSectionContent.hero.title}
          </h1>
        </div>

        {/* Magic Text یەکەم */}
        <div className="max-w-4xl ">
          <MagicText
            text={aboutSectionContent.aboutText}
            className="text-sm md:text-2xl "
          />
        </div>

        {/* پشوویەک لەنێوان دوو دەقەکە */}
        <div className="h-12"></div> 
        
        {/* Magic Text دووەم */}
        <div className="max-w-4xl ">
          <div className=" mb-4">
            <p className="text-xl  uppercase  text-[#88743e] mb-4">
              {aboutSectionContent.mission.eyebrow}
            </p>
            <h2 className="mt-4 text-lg font-bold uppercase leading-tight sm:text-xl text-[#c4b690] lg:text-4xl">
              {aboutSectionContent.mission.title}
            </h2>
          </div>
          <MagicText
            text={aboutSectionContent.missionText}
            className="text-sm md:text-2xl "
          />
        </div>

      </div>
    </section>
  );
}
