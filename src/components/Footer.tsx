import React from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-col">
            <Link to="/" className="brand-logo" style={{ width: 'fit-content' }}>
              <div className="brand-icon-box">
                <Radio size={20} />
              </div>
              <span>WAVENEST</span>
            </Link>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: '1.6' }}>
              Independent voices. Original sound. Your frequency. Curated commercial-free broadcasts, podcasts, and community audio.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                style={{ color: 'var(--text-secondary)' }}
                className="footer-social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter X profile"
                style={{ color: 'var(--text-secondary)' }}
                className="footer-social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram profile"
                style={{ color: 'var(--text-secondary)' }}
                className="footer-social-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-link-list">
              <li><Link to="/#features" className="footer-link">Features</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing Tiers</Link></li>
              <li><Link to="/shows" className="footer-link">Shows & Schedule</Link></li>
              <li><Link to="/#live" className="footer-link">Live Broadcast</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-link-list">
              <li><Link to="/about" className="footer-link">About Wavenest</Link></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert("Wavenest Radio is a fictional portfolio project. Contact: student@portfolio.dev"); }} className="footer-link">Contact</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); alert("Fictional portfolio project — no active job openings."); }} className="footer-link">Careers</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-link-list">
              <li><a href="#help" onClick={(e) => { e.preventDefault(); alert("Visit our FAQ section or read the documentation."); }} className="footer-link">Help Center</a></li>
              <li><Link to="/#faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/shows" className="footer-link">Community Mixes</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-link-list">
              <li><a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Notice: Prototype application. No personal data is stored externally or sold."); }} className="footer-link">Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: This is a Week 3 student portfolio demonstration project."); }} className="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Note */}
        <div className="footer-bottom">
          <p>© 2026 Wavenest Radio. Portfolio project.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Built for Week 3 Internship Project • Simulated SaaS Audio Marketing & Onboarding Flow
          </p>
        </div>
      </div>
    </footer>
  );
};
