import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import MedinaStayPage from './pages/MedinaStayPage';
import MenuLandingPage from './pages/MenuLandingPage';
import MigrationRoutePage from './pages/MigrationRoutePage';
import TurkeyEventPage from './pages/TurkeyEventPage';
import VolunteerRegistrationPage from './pages/VolunteerRegistrationPage';


function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
}

function LanguageDocumentSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.resolvedLanguage || 'ku';
    const isRtl = language === 'ku' || language === 'ar';

    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [i18n.resolvedLanguage]);

  return null;
}

function App() {
  const { t } = useTranslation();
  const stallsRoute = t('routes.stalls', { returnObjects: true });
  const pastEventsRoute = t('routes.pastEvents', { returnObjects: true });
  const faqRoute = t('routes.faq', { returnObjects: true });

  return (
    <Router>
      <LanguageDocumentSync />
      <ScrollToHash />
      <div className="min-h-screen ">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/events/turkey-2027"
              element={<TurkeyEventPage />}
            />
            <Route
              path="/events/migration-route"
              element={<MigrationRoutePage />}
            />
            <Route
              path="/events/medina-stay"
              element={<MedinaStayPage />}
            />
            <Route
              path="/apply-to-volunteer"
              element={<VolunteerRegistrationPage />}
            />
            <Route
              path="/stalls"
              element={
                <MenuLandingPage
                  eyebrow={stallsRoute.eyebrow}
                  title={stallsRoute.title}
                  description={stallsRoute.description}
                  highlights={stallsRoute.highlights}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/past-events"
              element={
                <MenuLandingPage
                  eyebrow={pastEventsRoute.eyebrow}
                  title={pastEventsRoute.title}
                  description={pastEventsRoute.description}
                  highlights={pastEventsRoute.highlights}
                />
              }
            />
            <Route
              path="/faq"
              element={
                <MenuLandingPage
                  eyebrow={faqRoute.eyebrow}
                  title={faqRoute.title}
                  description={faqRoute.description}
                  highlights={faqRoute.highlights}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
