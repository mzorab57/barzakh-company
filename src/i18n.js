import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const savedLanguage = typeof window !== 'undefined' ? window.localStorage.getItem('barzakh-language') : null;
const defaultLanguage = savedLanguage || 'ku';

export const i18nReady = i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: 'ku',
    supportedLngs: ['ku', 'ar', 'en'],
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', language => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('barzakh-language', language);
  }
});

export default i18n;
