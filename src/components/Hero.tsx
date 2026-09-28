import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Radio, ArrowRight } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const Hero: React.FC = () => {
  const { isPlaying, currentShow, togglePlay, playLiveStream } = useAudio();

  return (
    <section className="hero-section" aria-label="Introduction">
      <div className="hero-glow"></div>
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-content">
            <div className="eyebrow-chip" id="hero-eyebrow">
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
              <span>Independent Radio, Reimagined</span>
            </div>

            <h1 className="hero-title">
              Find your frequency. <br />
              <span className="gradient-text-teal">Discover your people.</span>
            </h1>

            <p className="hero-desc">
              Wavenest Radio brings independent music, original shows, conversations, and voices together in one modern listening experience.
            </p>

            <div className="hero-cta-group">
              <Link to="/pricing" className="btn btn-primary btn-lg" id="hero-cta-explore">
                <span>Explore Plans</span>
                <ArrowRight size={18} />
              </Link>

              <button
                type="button"
                onClick={playLiveStream}
                className="btn btn-secondary btn-lg"
                id="hero-cta-listen-live"
              >
                <Radio size={18} style={{ color: 'var(--accent-secondary)' }} />
                <span>Listen Live</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>✓</span>
                <span>100% Independent</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: 'var(--status-success)', fontWeight: 700 }}>✓</span>
                <span>24/7 Curated Sound</span>
              </div>
            </div>
          </div>

          {/* Right Modern Audio Visualizer Console */}
          <div className="audio-console" id="hero-audio-console">
            <div className="console-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-live">
                  <span className="pulse-dot"></span>
                  ON AIR
                </span>
                <span className="signal-gauge">FREQ: 98.4 FM</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                STUDIO A • NY
              </span>
            </div>

            {/* Equalizer Visualizer Screen */}
            <div className="waveform-display">
              <div className="freq-bars">
                {[65, 40, 85, 95, 70, 50, 90, 100, 80, 60, 90, 75, 45, 85, 60, 70, 95, 80, 55, 90].map((h, i) => (
                  <div
                    key={i}
                    className="freq-bar-item"
                    style={{
                      height: isPlaying ? `${Math.max(15, (h * (0.6 + 0.4 * Math.sin((i + Date.now() / 200) * 0.5))))}%` : '20%',
                      animation: isPlaying ? `eq-bounce ${0.8 + (i % 5) * 0.15}s ease-in-out infinite alternate` : 'none',
                      animationDelay: `${(i % 6) * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Current Broadcast Meta & Quick Control */}
            <div className="console-meta">
              <div className="track-info">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-secondary)' }}>
                  Now Streaming
                </span>
                <h3 className="track-title">{currentShow.title}</h3>
                <p className="track-host">{currentShow.host} • {currentShow.category}</p>
              </div>

              <button
                type="button"
                onClick={togglePlay}
                className="play-pause-btn"
                style={{ width: '48px', height: '48px' }}
                aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: '3px' }} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
