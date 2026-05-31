
import { Languages } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const languageItems = [
  { code: 'ku', labelKey: 'common.languages.ku' },
  { code: 'ar', labelKey: 'common.languages.ar' },
  { code: 'en', labelKey: 'common.languages.en' },
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languageItems.find(item => item.code === i18n.resolvedLanguage) || languageItems[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
        aria-label={t('common.actions.changeLanguage')}
      >
        <Languages className="h-4 w-4" />
        <span>{t(currentLanguage.labelKey)}</span>
      </button>

      {open ? (
        <div className="absolute end-0 top-full z-50 mt-3 min-w-[170px] overflow-hidden rounded-2xl border border-[#d7c896] bg-[#1f170d] text-white shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
          {languageItems.map(item => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                i18n.changeLanguage(item.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 text-sm transition hover:bg-white/10 ${
                i18n.resolvedLanguage === item.code ? 'bg-white/10 text-[#e6d6a3]' : 'text-white/82'
              }`}
            >
              <span>{t(item.labelKey)}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">{item.code}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
