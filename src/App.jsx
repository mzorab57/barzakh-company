import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import DonationStatusPage from './pages/DonationStatusPage';
import EventCheckoutPage from './pages/EventCheckoutPage';
import EventCheckoutStatusPage from './pages/EventCheckoutStatusPage';
import EventDetailPage from './pages/EventDetailPage';
import Home from './pages/Home';
import MedinaStayPage from './pages/MedinaStayPage';
import MenuLandingPage from './pages/MenuLandingPage';
import PastEventDetailPage from './pages/PastEventDetailPage';
import PastEventsPage from './pages/PastEventsPage';
import MigrationRoutePage from './pages/MigrationRoutePage';
import StallsPage from './pages/StallsPage';
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
            <Route path="/donations/status" element={<DonationStatusPage />} />
            <Route path="/events/:slug/checkout/status" element={<EventCheckoutStatusPage />} />
            <Route path="/events/:slug/checkout" element={<EventCheckoutPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route
              path="/apply-to-volunteer"
              element={<VolunteerRegistrationPage />}
            />
            <Route
              path="/stalls"
              element={<StallsPage />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/past-events/:slug" element={<PastEventDetailPage />} />
            <Route
              path="/past-events"
              element={<PastEventsPage />}
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
