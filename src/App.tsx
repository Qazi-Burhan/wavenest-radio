import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShowsPage } from './pages/ShowsPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on navigation change
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // If navigating to hash, smooth scroll to element, else scroll top
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AudioProvider>
          <ScrollToTop />
          <div className="app-layout" id="wavenest-app">
            {/* Global Sticky Navigation */}
            <Navbar />

            {/* Dynamic Page Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shows" element={<ShowsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Global Footer */}
            <Footer />

            {/* Persistent Mini Audio Player */}
            <AudioPlayer />
          </div>
        </AudioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
