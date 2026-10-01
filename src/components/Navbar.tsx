import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Radio, Menu, X, User, LogOut, LayoutDashboard, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { ProfileModal } from './ProfileModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut, demoSignIn } = useAuth();
  const { isPlaying, playLiveStream } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const desktopViewport = window.matchMedia('(min-width: 1024px)');
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
    };

    desktopViewport.addEventListener('change', closeMenuOnDesktop);
    return () => desktopViewport.removeEventListener('change', closeMenuOnDesktop);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'Shows', path: '/shows' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleMobileNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Brand Typographic Logo with Audio Frequency Symbol */}
          <Link to="/" className="brand-logo" id="nav-brand-logo" aria-label="Wavenest Radio Home">
            <div className="brand-icon-box" aria-hidden="true">
              <span className="brand-wave-bars">
                <span className="wave-bar bar-1"></span>
                <span className="wave-bar bar-2"></span>
                <span className="wave-bar bar-3"></span>
                <span className="wave-bar bar-4"></span>
              </span>
            </div>
            <span className="brand-name">WAVENEST</span>
          </Link>

          {/* Center Navigation Links */}
          <nav aria-label="Primary Navigation">
            <ul className="nav-links">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                    id={`nav-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Items */}
          <div className="nav-actions">
            {/* Live Frequency Indicator Button */}
            <button
              type="button"
              onClick={playLiveStream}
              className={`live-indicator ${isPlaying ? 'is-playing' : ''}`}
              title="Tune in to 24/7 Live Broadcast (98.4 FM)"
              aria-label="Tune into live broadcast 98.4 FM"
            >
              <span className="live-pulse-dot" aria-hidden="true"></span>
              <span className="live-text">LIVE</span>
              <span className="live-freq">98.4 FM</span>
              {isPlaying && <Volume2 size={13} className="live-sound-icon" />}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link
                  to="/dashboard"
                  className="btn btn-secondary btn-sm"
                  id="nav-btn-dashboard"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <LayoutDashboard size={15} />
                  <span>Hub</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="btn btn-ghost btn-sm"
                  id="nav-btn-profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 10px 4px 6px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)'
                  }}
                  aria-label={`Profile for ${user.name}`}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'var(--accent-coral)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    demoSignIn('creator');
                    navigate('/dashboard');
                  }}
                  className="btn btn-ghost btn-desktop"
                  id="nav-btn-signin"
                >
                  Sign In
                </button>
                <Link
                  to="/pricing"
                  className="btn btn-primary btn-sm btn-desktop"
                  id="nav-btn-getstarted"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Drawer Trigger */}
            <button
              type="button"
              className="hamburger-btn"
              id="nav-mobile-toggle"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-drawer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        id="mobile-drawer"
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setMobileMenuOpen(false);
          }
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={20} style={{ color: 'var(--accent-coral)' }} />
            <span style={{ fontWeight: 800, letterSpacing: '0.08em', fontSize: '1.1rem' }}>WAVENEST</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', padding: '6px' }}
          >
            <X size={22} />
          </button>
        </div>

        <ul className="mobile-nav-links">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <button
                type="button"
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left' }}
                onClick={() => handleMobileNav(link.path)}
              >
                {link.name}
              </button>
            </li>
          ))}

          {user && (
            <li>
              <button
                type="button"
                className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                style={{ width: '100%', textAlign: 'left', color: 'var(--accent-coral)' }}
                onClick={() => handleMobileNav('/dashboard')}
              >
                Member Dashboard
              </button>
            </li>
          )}
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '24px' }}>
          {user ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileModalOpen(true);
                }}
                className="btn btn-secondary btn-full"
              >
                <User size={18} />
                <span>Account Profile ({user.name})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="btn btn-ghost btn-full"
                style={{ color: '#F87171' }}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  demoSignIn('creator');
                  setMobileMenuOpen(false);
                  navigate('/dashboard');
                }}
                className="btn btn-secondary btn-full"
              >
                Sign In (Demo)
              </button>
              <button
                type="button"
                onClick={() => handleMobileNav('/pricing')}
                className="btn btn-primary btn-full"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Modal Dialog */}
      {profileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </>
  );
};