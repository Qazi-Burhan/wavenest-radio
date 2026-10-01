import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const Hero: React.FC = () => {
  const { isPlaying, currentShow, togglePlay, playLiveStream, volume, setVolume, isMuted, toggleMute } = useAudio();

  const handleStartListening = () => {
    if (!isPlaying) {
      playLiveStream();
    } else {
      togglePlay();
    }
  };

  return (
    <section className="hero-section" aria-label="Hero Overview">
      <div className="hero-glow"></div>
      <div className="container">
        <div className="hero-grid">
          {/* Left Editorial Narrative Column */}
          <div className="hero-content">
            <div className="eyebrow-chip" id="hero-eyebrow">
              <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
              <span>LIVE FROM THE INDEPENDENT FREQUENCY</span>
            </div>

            <h1 className="hero-title">
              Sound without <br />
              <span className="hero-accent-text">the noise.</span>
            </h1>

            <p className="hero-desc">
              Find your frequency. Discover independent music, original conversations, and voices worth hearing — curated for people who want more than the mainstream.
            </p>

            <div className="hero-cta-group">
              <button
                type="button"
                onClick={handleStartListening}
                className="btn btn-primary btn-lg"
                id="hero-cta-listen-live"
                aria-label={isPlaying ? 'Pause live broadcast' : 'Start listening to live broadcast'}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                <span>{isPlaying ? 'Pause Broadcast' : 'Start Listening'}</span>
              </button>

              <Link
                to="/pricing"
                className="btn btn-secondary btn-lg"
                id="hero-cta-explore"
              >
                <span>Explore Plans</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-badges-strip">
              <div className="hero-badge-item">
                <span className="badge-check">✓</span>
                <span>No Credit Card Required</span>
              </div>
              <div className="hero-badge-item">
                <span className="badge-check">✓</span>
                <span>100% Commercial-Free</span>
              </div>
              <div className="hero-badge-item">
                <span className="badge-check">✓</span>
                <span>Lossless 320k Audio</span>
              </div>
            </div>
          </div>

          {/* Right Immersive Audio Visualizer Console */}
          <div className="audio-console" id="hero-audio-console">
            {/* Visualizer Status Bar */}
            <div className="console-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-live-pill">
                  <span className="live-pulse-dot"></span>
                  ● LIVE
                </span>
                <span className="console-freq-tag">98.4 FM</span>
              </div>
              <span className="console-location">
                STUDIO A • BROOKLYN
              </span>
            </div>

            {/* Circular Vinyl / Frequency Spectrum Core */}
            <div className="vinyl-spectrum-wrapper">
              <div className={`vinyl-disc ${isPlaying ? 'rotating' : ''}`}>
                <div className="vinyl-groove groove-1"></div>
                <div className="vinyl-groove groove-2"></div>
                <div className="vinyl-center">
                  <div className="center-dot"></div>
                </div>
              </div>

              {/* Reactive Equalizer Spectrum Bars */}
              <div className="waveform-display" aria-label="Audio frequency visualization">
                <div className="freq-bars">
                  {[65, 42, 88, 96, 74, 52, 92, 100, 84, 60, 92, 78, 48, 86, 62, 74, 98, 82, 58, 92].map((val, idx) => (
                    <div
                      key={idx}
                      className="freq-bar-item"
                      style={{
                        height: isPlaying
                          ? `${Math.max(16, (val * (0.65 + 0.35 * Math.sin(idx * 0.7))))}%`
                          : '18%',
                        animation: isPlaying
                          ? `eq-bounce ${0.75 + (idx % 4) * 0.18}s ease-in-out infinite alternate`
                          : 'none',
                        animationDelay: `${(idx % 5) * 0.08}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Now Playing Console Meta and Controls */}
            <div className="console-meta">
              <div className="track-info">
                <span className="console-eyebrow">NOW PLAYING</span>
                <h3 className="track-title">{currentShow.title}</h3>
                <p className="track-host">{currentShow.host} — {currentShow.category}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Volume Slider in Hero Console */}
                <div className="console-volume-control" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    aria-label="Console volume"
                    style={{ width: '56px', accentColor: 'var(--accent-coral)', height: '4px', cursor: 'pointer' }}
                  />
                </div>

                {/* Big Primary Play/Pause Circle */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="play-pause-btn"
                  aria-label={isPlaying ? `Pause ${currentShow.title}` : `Play ${currentShow.title}`}
                >
                  {isPlaying ? <Pause size={22} /> : <Play size={22} fill="currentColor" style={{ marginLeft: '3px' }} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};