import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Pause,
  LogOut,
  Sliders,
  Sparkles,
  Flame,
  ArrowRight,
  Clock,
  Disc,
  Headphones,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { SHOWS_DATA, LIVE_BROADCAST_TRACK } from '../data/shows';
import { ProfileModal } from '../components/ProfileModal';
import type { Show } from '../types';

const currentHour = new Date().getHours();
const currentGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { currentShow, isPlaying, playShow, togglePlay, playLiveStream } = useAudio();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const handlePlayClick = (show: Show) => {
    if (currentShow?.id === show.id && isPlaying) {
      togglePlay();
    } else {
      playShow(show);
    }
  };

  // Curated editorial art gradients for each show
  const getShowCoverGradient = (id: string) => {
    switch (id) {
      case 'night-frequency':
        return 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)';
      case 'the-indie-hour':
        return 'linear-gradient(135deg, #1C1917 0%, #431407 50%, #7C2D12 100%)';
      case 'open-mic':
        return 'linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)';
      case 'after-midnight':
        return 'linear-gradient(135deg, #18181B 0%, #27272A 50%, #3F3F46 100%)';
      case 'sound-stories':
        return 'linear-gradient(135deg, #3B0764 0%, #581C87 50%, #6B21A8 100%)';
      case 'artist-spotlight':
        return 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 50%, #2563EB 100%)';
      default:
        return 'linear-gradient(135deg, #181C2A 0%, #22293E 100%)';
    }
  };

  const recommendedShows = SHOWS_DATA.slice(0, 3);
  const recentlyPlayed = [SHOWS_DATA[1], SHOWS_DATA[3], SHOWS_DATA[4]];

  return (
    <div className="section-padding" style={{ paddingTop: '100px', minHeight: '85vh' }}>
      <div className="container">
        {/* Top Header & Greeting Bar */}
        <div className="dashboard-header-bar">
          <div>
            <div className="eyebrow-chip" style={{ marginBottom: '10px' }}>
              <span className="live-pulse-dot" style={{ width: '5px', height: '5px' }}></span>
              <span>Member Frequency Hub</span>
            </div>
            <h1 className="dashboard-greeting-title">
              {currentGreeting}, {user?.name || 'Listener'}.
            </h1>
            <p className="dashboard-greeting-sub">
              Here's what we tuned for you today across the independent network.
            </p>
          </div>

          {/* Quick Member Status Badges & Controls */}
          <div className="dashboard-actions-strip">
            <div className="member-tier-pill">
              <span className="tier-tag">{user?.planId ? user.planId.toUpperCase() : 'CREATOR'}</span>
              <span className="tier-fidelity">320k Lossless</span>
            </div>

            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="btn btn-secondary btn-sm"
              id="dashboard-profile-btn"
            >
              <span>Preferences</span>
              <Sliders size={14} />
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-ghost btn-sm"
              id="dashboard-signout-btn"
              data-testid="dashboard-signout-btn"
              style={{ color: '#F87171' }}
              aria-label="Sign out"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics Row */}
        <div className="dashboard-metrics-grid">
          <div className="dash-metric-card">
            <div className="metric-icon-box">
              <Flame size={20} style={{ color: 'var(--accent-coral)' }} />
            </div>
            <div>
              <span className="metric-label">Listening Streak</span>
              <h4 className="metric-val">12 Days Active</h4>
            </div>
          </div>

          <div className="dash-metric-card">
            <div className="metric-icon-box">
              <Clock size={20} style={{ color: 'var(--status-live)' }} />
            </div>
            <div>
              <span className="metric-label">Tuned Schedule</span>
              <h4 className="metric-val">{user?.listeningTime || 'Late Night'} Window</h4>
            </div>
          </div>

          <div className="dash-metric-card">
            <div className="metric-icon-box">
              <Sparkles size={20} style={{ color: '#A78BFA' }} />
            </div>
            <div>
              <span className="metric-label">Membership Perks</span>
              <h4 className="metric-val">100% Ad-Free Audio</h4>
            </div>
          </div>
        </div>

        {/* SECTION 32: DASHBOARD HERO - NOW LIVE EXPERIENCE */}
        <div className="dashboard-hero-live-card">
          <div className="live-hero-left">
            <div className="live-hero-status-row">
              <span className="badge-live-pill">
                <span className="live-pulse-dot"></span>
                ● LIVE
              </span>
              <span className="live-hero-freq">98.4 FM Studio A</span>
            </div>

            <h2 className="live-hero-title">Night Frequency</h2>
            <p className="live-hero-host">with Maya Chen & Elena Vance</p>
            <p className="live-hero-desc">
              Now broadcasting live from Brooklyn: deep ambient soundscapes, downtempo electronica, and rare cassette cuts.
            </p>

            <div className="live-hero-cta-row">
              <button
                type="button"
                onClick={playLiveStream}
                className="btn btn-primary btn-lg"
                id="dashboard-hero-listen-btn"
              >
                {isPlaying && currentShow?.id === LIVE_BROADCAST_TRACK.id ? (
                  <>
                    <Pause size={18} />
                    <span>Pause Broadcast</span>
                  </>
                ) : (
                  <>
                    <Play size={18} fill="currentColor" />
                    <span>Listen Now</span>
                  </>
                )}
              </button>
              <span className="live-listener-count">
                <Headphones size={15} /> 1,420 tuned in right now
              </span>
            </div>
          </div>

          {/* Equalizer Visualizer in Dashboard Hero */}
          <div className="live-hero-visualizer">
            <div className="freq-bars" style={{ height: '70px', gap: '5px' }}>
              {[40, 75, 95, 60, 85, 100, 70, 90, 55, 80, 95, 65, 85, 50, 90].map((val, idx) => (
                <div
                  key={idx}
                  className="freq-bar-item"
                  style={{
                    height: isPlaying ? `${Math.max(20, val)}%` : '25%',
                    animation: isPlaying ? `eq-bounce ${0.8 + (idx % 3) * 0.2}s ease-in-out infinite alternate` : 'none',
                    animationDelay: `${(idx % 4) * 0.1}s`,
                    background: 'var(--accent-coral)'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Interests Strip */}
        <div className="dashboard-interests-strip">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Your Interests:
            </span>
            {user?.interests && user.interests.length > 0 ? (
              user.interests.map((int, i) => (
                <span key={i} className="genre-pill active" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  {int}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No interests configured yet.</span>
            )}
          </div>

          <Link
            to="/onboarding"
            className="btn btn-ghost btn-sm"
            id="dashboard-edit-interests"
            style={{ color: 'var(--accent-coral)', fontSize: '0.82rem' }}
          >
            <Sliders size={13} style={{ marginRight: '4px' }} />
            <span>Retune Taste Profile</span>
          </Link>
        </div>

        {/* SECTION 33: RECOMMENDED FOR YOU */}
        <div style={{ marginBottom: '56px' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <span className="section-eyebrow">TAILORED TUNING</span>
              <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '6px' }}>Recommended For You</h2>
              <p className="section-desc" style={{ fontSize: '0.95rem' }}>
                Shows dynamically matched to your listening preferences and favorite soundscapes.
              </p>
            </div>

            <Link to="/shows" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>View All Shows</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="shows-grid">
            {recommendedShows.map((show) => {
              const isThisShowPlaying = isPlaying && currentShow?.id === show.id;

              return (
                <article
                  key={show.id}
                  className={`show-card ${isThisShowPlaying ? 'is-active-track' : ''}`}
                  id={`rec-show-${show.id}`}
                >
                  <div
                    className="show-artwork-cover"
                    style={{ background: getShowCoverGradient(show.id) }}
                  >
                    <div className="artwork-overlay"></div>
                    <div className="artwork-frequency-lines" aria-hidden="true">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlayClick(show)}
                      className="show-play-trigger"
                      id={`btn-dashboard-play-${show.id}`}
                      aria-label={isThisShowPlaying ? `Pause ${show.title}` : `Play ${show.title}`}
                    >
                      {isThisShowPlaying ? (
                        <Pause size={18} fill="currentColor" />
                      ) : (
                        <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />
                      )}
                    </button>

                    {isThisShowPlaying && (
                      <div className="show-playing-equalizer">
                        <span className="eq-bar bar-1"></span>
                        <span className="eq-bar bar-2"></span>
                        <span className="eq-bar bar-3"></span>
                      </div>
                    )}
                  </div>

                  <div className="show-info">
                    <div className="show-category-row">
                      <span className="show-category">{show.category}</span>
                      <span className="show-duration">
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {show.duration}
                      </span>
                    </div>

                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-host">with {show.host}</p>
                    <p className="show-description">{show.description}</p>

                    <div className="show-footer-row">
                      <span className="show-schedule-tag">{show.scheduleTime}</span>
                      <button
                        type="button"
                        onClick={() => handlePlayClick(show)}
                        className="show-text-action"
                      >
                        {isThisShowPlaying ? 'Now Playing' : 'Listen Now'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* SECTION 33: HORIZONTAL MEDIA ROWS - RECENTLY PLAYED */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-eyebrow">ARCHIVE ON DEMAND</span>
            <h2 className="section-title" style={{ fontSize: '1.6rem', marginBottom: '6px' }}>Recently Broadcasted</h2>
            <p className="section-desc" style={{ fontSize: '0.9rem' }}>
              Catch up on full studio recordings from the past 48 hours.
            </p>
          </div>

          <div className="horizontal-media-list">
            {recentlyPlayed.map((show) => {
              const isThisShowPlaying = isPlaying && currentShow?.id === show.id;

              return (
                <div
                  key={show.id}
                  className={`media-row-item ${isThisShowPlaying ? 'is-playing' : ''}`}
                  onClick={() => handlePlayClick(show)}
                >
                  <div className="media-row-left">
                    <div className="media-row-icon">
                      <Disc size={18} style={{ color: isThisShowPlaying ? 'var(--accent-coral)' : 'var(--text-muted)' }} />
                    </div>
                    <div>
                      <h4 className="media-row-title">{show.title}</h4>
                      <p className="media-row-sub">{show.host} • {show.category} • {show.duration}</p>
                    </div>
                  </div>

                  <div className="media-row-right">
                    <span className="media-row-time">{show.scheduleTime}</span>
                    <button
                      type="button"
                      className="media-row-play-btn"
                      aria-label={isThisShowPlaying ? `Pause ${show.title}` : `Play ${show.title}`}
                    >
                      {isThisShowPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {profileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </div>
  );
};