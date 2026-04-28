import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import MedinaStayPage from './pages/MedinaStayPage';
import MenuLandingPage from './pages/MenuLandingPage';
import MigrationRoutePage from './pages/MigrationRoutePage';
import TurkeyEventPage from './pages/TurkeyEventPage';


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

function App() {
  return (
    <Router>
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
              element={
                <MenuLandingPage
                  eyebrow="Get Involved"
                  title="Apply to Volunteer"
                  description="Start your volunteer journey with Barzakh Company and learn what roles, requirements, and timelines are available."
                  highlights={[
                    'Volunteer roles and responsibilities',
                    'Application process and requirements',
                    'Important timelines and contact details',
                  ]}
                />
              }
            />
            <Route
              path="/stalls"
              element={
                <MenuLandingPage
                  eyebrow="Participation"
                  title="Stalls"
                  description="Find information for vendors and stall applicants, including setup expectations, event fit, and booking details."
                  highlights={[
                    'Vendor application and booking details',
                    'Stall setup expectations and guidance',
                    'Event fit, availability, and next steps',
                  ]}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/past-events"
              element={
                <MenuLandingPage
                  eyebrow="Archive"
                  title="Past Events"
                  description="Look back at previous Barzakh Company experiences, highlights, and the impact of earlier gatherings."
                  highlights={[
                    'Event highlights and memorable moments',
                    'Featured speakers, guests, and experiences',
                    'A look at how previous events were received',
                  ]}
                />
              }
            />
            <Route
              path="/faq"
              element={
                <MenuLandingPage
                  eyebrow="Support"
                  title="FAQ"
                  description="Review commonly asked questions about events, registration, travel planning, and participant support."
                  highlights={[
                    'General registration questions',
                    'Travel and accommodation answers',
                    'Support and contact guidance',
                  ]}
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
