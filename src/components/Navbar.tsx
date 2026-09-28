import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Radio, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ProfileModal } from './ProfileModal';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const { user, signOut, demoSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/shows' },
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
      <header className="navbar">
        <div className="container nav-container">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" id="nav-brand-logo">
            <div className="brand-icon-box">
              <Radio size={22} className="pulse-icon" />
            </div>
            <span>WAVENEST</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
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

          {/* Right Action Buttons */}
          <div className="nav-actions">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link
                  to="/dashboard"
                  className="btn btn-secondary btn-sm"
                  id="nav-btn-dashboard"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="btn btn-ghost btn-sm"
                  id="nav-btn-profile"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)' }}
                  aria-label="User Account Menu"
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

            {/* Hamburger Button for Mobile */}
            <button
              type="button"
              className="hamburger-btn"
              id="nav-mobile-toggle"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobile-drawer">
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
                style={{ width: '100%', textAlign: 'left', color: 'var(--accent-secondary)' }}
                onClick={() => handleMobileNav('/dashboard')}
              >
                Member Dashboard
              </button>
            </li>
          )}
        </ul>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                Quick Demo Sign In
              </button>
              <button
                type="button"
                onClick={() => handleMobileNav('/pricing')}
                className="btn btn-primary btn-full"
              >
                Explore Plans
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </>
  );
};
