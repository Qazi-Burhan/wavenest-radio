import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Radio,
  Play,
  Pause,
  Clock,
  User,
  Sliders,
  LogOut,
  Disc,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { SHOWS_DATA } from '../data/shows';
import { PRICING_PLANS } from '../data/pricing';
import type { Show } from '../types';
import { ProfileModal } from '../components/ProfileModal';

export const DashboardPage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { currentShow, isPlaying, playShow, togglePlay, playLiveStream } = useAudio();
  const navigate = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Dynamic time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.name || 'Listener';
  const planDetails = PRICING_PLANS.find((p) => p.id === (user?.planId || 'creator')) || PRICING_PLANS[1];

  // Dynamic recommendation engine matching user's onboarding interests
  const userInterests = user?.interests || ['Indie Music', 'Alternative', 'Electronic'];
  const recommendedShows = SHOWS_DATA.filter((show) => {
    return userInterests.some((int) =>
      show.genre.toLowerCase().includes(int.toLowerCase()) ||
      show.category.toLowerCase().includes(int.toLowerCase()) ||
      show.description.toLowerCase().includes(int.toLowerCase())
    );
  }).slice(0, 3);

  const finalRecommendations = recommendedShows.length > 0 ? recommendedShows : SHOWS_DATA.slice(0, 3);
  const recentlyPlayed = SHOWS_DATA.slice(3, 5);

  const handlePlayClick = (show: Show) => {
    if (currentShow && currentShow.id === show.id) {
      togglePlay();
    } else {
      playShow(show);
    }
  };

  return (
    <div style={{ padding: '40px 0 96px' }}>
      <div className="container">
        {/* Top Member Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '28px'
          }}
        >
          <div>
            <div className="eyebrow-chip" style={{ marginBottom: '8px' }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
              <span>Member Frequency Hub</span>
            </div>
            <h1 style={{ fontSize: '2.75rem', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              {getGreeting()}, {displayName}.
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
              Here is your personalized daily broadcast stream, tailored to your tastes.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="btn btn-secondary"
              id="dashboard-account-btn"
            >
              <User size={18} />
              <span>Account & Plan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                signOut();
                navigate('/');
              }}
              className="btn btn-ghost"
              id="dashboard-signout-btn"
              data-testid="dashboard-signout-btn"
              style={{ color: '#F87171' }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Top Grid: Plan Status + Quick Live Broadcast Player */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          {/* Active Plan Card */}
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #141b2e 0%, #0d1222 100%)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            id="dashboard-plan-card"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Current Membership
                </span>
                <span className={`badge ${planDetails.id === 'pro' ? 'badge-teal' : 'badge-purple'}`}>
                  {planDetails.name} Plan
                </span>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>
                {planDetails.id === 'free' ? 'Free Listener' : planDetails.name + ' Supporter'}
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {planDetails.id === 'free'
                  ? 'Accessing standard 128 kbps live broadcasts. Upgrade anytime for ad-free high fidelity streaming.'
                  : `100% ad-free listening enabled with high-definition 320 kbps stream quality.`}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                Status: Active Prototype
              </span>
              <Link to="/pricing" className="btn btn-sm btn-secondary" style={{ fontSize: '0.8rem' }}>
                Change Plan
              </Link>
            </div>
          </div>

          {/* Quick Access to Live Radio */}
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #182035 0%, #101626 100%)',
              border: '1px solid rgba(45, 212, 191, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            id="dashboard-live-radio-card"
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-live">
                  <span className="pulse-dot"></span>
                  LIVE ON AIR
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  FREQ: 98.4 FM
                </span>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '6px' }}>
                Studio A Master Feed
              </h2>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Continuous 24/7 broadcast featuring underground guest selectors and live studio mixes.
              </p>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={playLiveStream}
                className="btn btn-teal btn-full"
                id="dashboard-listen-live-btn"
              >
                <Radio size={18} />
                <span>Stream Live Radio Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selected Interests Bar */}
        <div
          className="card"
          style={{
            padding: '20px 24px',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Your Interests:
            </span>
            {user?.interests && user.interests.length > 0 ? (
              user.interests.map((int, i) => (
                <span key={i} className="badge badge-purple" style={{ fontSize: '0.75rem', textTransform: 'none' }}>
                  {int}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No interests saved yet.</span>
            )}
          </div>

          <Link
            to="/onboarding"
            className="btn btn-ghost btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-secondary)' }}
            id="dashboard-edit-interests"
          >
            <Sliders size={14} />
            <span>Edit Taste Profile</span>
          </Link>
        </div>

        {/* Recommended For You Section */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Recommended for You</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Shows dynamically matched to your selected frequency tags.
              </p>
            </div>

            <Link to="/shows" className="btn btn-ghost btn-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>View All Shows</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="shows-grid">
            {finalRecommendations.map((show) => {
              const isThisShowPlaying = isPlaying && currentShow?.id === show.id;

              return (
                <div
                  key={show.id}
                  className={`show-card ${isThisShowPlaying ? 'is-active-track' : ''}`}
                  id={`rec-show-${show.id}`}
                >
                  <div>
                    <div className="show-top">
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                        {show.category}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        <Clock size={13} />
                        <span>{show.duration}</span>
                      </div>
                    </div>

                    <h3 className="show-title">{show.title}</h3>
                    <p className="show-host">Hosted by {show.host}</p>
                    <p className="show-desc" style={{ marginTop: '10px' }}>{show.description}</p>
                  </div>

                  <div className="show-bottom">
                    <span className="show-time">{show.scheduleTime}</span>

                    <button
                      type="button"
                      onClick={() => handlePlayClick(show)}
                      className="btn btn-sm"
                      style={{
                        background: isThisShowPlaying ? 'var(--accent-secondary)' : 'rgba(124, 92, 252, 0.2)',
                        color: isThisShowPlaying ? '#080B12' : '#A78BFA',
                        border: '1px solid ' + (isThisShowPlaying ? 'var(--accent-secondary)' : 'rgba(124, 92, 252, 0.4)'),
                        fontWeight: 700
                      }}
                      id={`btn-dashboard-play-${show.id}`}
                    >
                      {isThisShowPlaying ? (
                        <>
                          <Pause size={14} />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          <span>Play</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recently Played / Archives */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Recently Broadcasted</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              On-demand playback of archive sessions from the past 48 hours.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {recentlyPlayed.map((show) => {
              const isThisShowPlaying = isPlaying && currentShow?.id === show.id;
              return (
                <div
                  key={show.id}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderColor: isThisShowPlaying ? 'var(--accent-secondary)' : 'var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-sm)',
                        background: '#192134',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-secondary)'
                      }}
                    >
                      <Disc size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{show.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{show.host} • {show.duration}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlayClick(show)}
                    className="btn btn-sm btn-ghost"
                    style={{ color: isThisShowPlaying ? 'var(--accent-secondary)' : 'var(--text-primary)' }}
                  >
                    {isThisShowPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
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
