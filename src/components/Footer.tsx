import React from 'react';
import { Link } from 'react-router-dom';
import { Disc, Globe, Music, Share2 } from 'lucide-react';

const COPYRIGHT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="footer-editorial" aria-label="Station Footer">
      <div className="container">
        {/* Large Brand Statement Banner */}
        <div className="footer-statement-wrap">
          <h2 className="footer-large-statement">
            Stay curious. <br />
            <span className="accent-statement">Keep listening.</span>
          </h2>
          <div className="footer-frequency-pill">
            <span className="live-pulse-dot"></span>
            <span>TRANSMITTING ON 98.4 FM & WORLDWIDE WEB</span>
          </div>
        </div>

        {/* Navigation & Directory Grid */}
        <div className="footer-columns-grid">
          {/* Brand Info Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo" style={{ marginBottom: '14px' }}>
              <div className="brand-icon-box">
                <span className="brand-wave-bars">
                  <span className="wave-bar bar-1"></span>
                  <span className="wave-bar bar-2"></span>
                  <span className="wave-bar bar-3"></span>
                </span>
              </div>
              <span className="brand-name">WAVENEST</span>
            </Link>
            <p className="footer-tagline">
              Independent voices. Original sound. Your frequency.
            </p>
            <p className="footer-mission-note">
              A community-funded, non-commercial independent radio transmission network broadcasting live from Studio A in Brooklyn, NY.
            </p>
            <div className="footer-social-strip">
              <a href="#globe" className="footer-social-icon" aria-label="Global Web Stream">
                <Globe size={18} />
              </a>
              <a href="#music" className="footer-social-icon" aria-label="Track Curation">
                <Music size={18} />
              </a>
              <a href="#disc" className="footer-social-icon" aria-label="Vinyl Disc Archive">
                <Disc size={18} />
              </a>
              <a href="#share" className="footer-social-icon" aria-label="Share Frequency">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links-list">
              <li><Link to="/shows">Discover Shows</Link></li>
              <li><Link to="/pricing">Membership Tiers</Link></li>
              <li><Link to="/dashboard">Listener Hub</Link></li>
              <li><a href="#live">Live Broadcast</a></li>
              <li><a href="#podcasts">Podcast Archive</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">Our Story & Mission</Link></li>
              <li><Link to="/about#manifesto">Station Manifesto</Link></li>
              <li><Link to="/about#engineering">Audio Architecture</Link></li>
              <li><a href="#residents">Resident Selectors</a></li>
              <li><a href="#careers">Open Residencies</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links-list">
              <li><a href="#guide">Program Schedule</a></li>
              <li><a href="#press">Press Kit & Brand</a></li>
              <li><a href="#api">Stream Mounts (Icecast)</a></li>
              <li><a href="#patron">Patron Support Desk</a></li>
            </ul>
          </div>

          {/* Legal / Compliance */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links-list">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Broadcast</a></li>
              <li><a href="#music-rights">ASCAP / BMI Licensing</a></li>
              <li><a href="#cookies">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {COPYRIGHT_YEAR} WAVENEST RADIO INC. All rights reserved. Built as an advanced SaaS marketing & audio engineering portfolio product.
          </p>
          <div className="footer-bottom-badges">
            <span className="clean-pill">No Trackers</span>
            <span className="clean-pill">FLAC / Opus Lossless</span>
            <span className="clean-pill">Listener Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};