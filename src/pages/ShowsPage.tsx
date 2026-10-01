import React, { useState } from 'react';
import { Search, Play, Pause, Clock, Radio, Disc } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';
import { useAudio } from '../context/AudioContext';
import type { Show } from '../types';

export const ShowsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { currentShow, isPlaying, playShow, togglePlay, playLiveStream } = useAudio();

  const categories = ['All', 'Electronic', 'Indie Rock', 'Storytelling', 'Podcasts', 'Interviews'];

  const filteredShows = SHOWS_DATA.filter((show) => {
    const matchesCategory =
      selectedCategory === 'All' || show.genre.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      show.title.toLowerCase().includes(query) ||
      show.host.toLowerCase().includes(query) ||
      show.category.toLowerCase().includes(query) ||
      show.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const handlePlayClick = (show: Show) => {
    if (currentShow?.id === show.id && isPlaying) {
      togglePlay();
    } else {
      playShow(show);
    }
  };

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

  return (
    <div className="section-padding" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="container">
        {/* Editorial Page Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="eyebrow-chip" style={{ marginBottom: '12px' }}>
            <span className="live-pulse-dot" style={{ width: '5px', height: '5px' }}></span>
            <span>Broadcasting Schedule & Archive</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', marginBottom: '12px', lineHeight: 1.15 }}>
            Discover Shows & Residencies
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.6 }}>
            Tune into original productions, weekly artist residencies, and documentary deep-dives produced live at Wavenest Radio.
          </p>
        </div>

        {/* Live Broadcast Feature Banner */}
        <div className="shows-live-banner" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="live-banner-icon-box">
              <Radio size={30} style={{ color: 'var(--accent-coral)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span className="badge-live-pill">
                  <span className="live-pulse-dot"></span>
                  ● LIVE ON AIR
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Channel 1 • 24/7 Primary Broadcast</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>Wavenest Studio A Continuous Broadcast</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Eclectic selections, underground releases, and live commentary streaming around the clock from Brooklyn.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={playLiveStream}
            className="btn btn-primary btn-lg"
            id="shows-live-stream-btn"
          >
            <Play size={18} fill="currentColor" />
            <span>Join Live Broadcast</span>
          </button>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          <div style={{ position: 'relative', maxWidth: '480px' }}>
            <Search
              size={18}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search by show title, host, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '44px' }}
              id="shows-search-input"
            />
          </div>

          {/* Filter Pills */}
          <div className="genre-filter-strip" role="tablist" aria-label="Genre categories">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`genre-pill ${selectedCategory === cat ? 'active' : ''}`}
                id={`cat-filter-${idx}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Shows Results Grid */}
        {filteredShows.length > 0 ? (
          <div className="shows-grid">
            {filteredShows.map((show) => {
              const isThisShowPlaying = isPlaying && currentShow?.id === show.id;

              return (
                <article
                  key={show.id}
                  className={`show-card ${isThisShowPlaying ? 'is-active-track' : ''}`}
                  id={`shows-page-card-${show.id}`}
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
                      <span></span>
                    </div>

                    {show.isLive && (
                      <div className="show-live-badge">
                        <span className="live-pulse-dot"></span>
                        <span>LIVE</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handlePlayClick(show)}
                      className="show-play-trigger"
                      id={`shows-page-play-${show.id}`}
                      aria-label={isThisShowPlaying ? `Pause ${show.title}` : `Play ${show.title} hosted by ${show.host}`}
                    >
                      {isThisShowPlaying ? (
                        <Pause size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
                      )}
                    </button>

                    {isThisShowPlaying && (
                      <div className="show-playing-equalizer" aria-label="Audio playing indicator">
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
                    <p className="show-host">Hosted by {show.host}</p>
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
        ) : (
          /* Empty Search State */
          <div
            className="manifesto-card"
            style={{ textAlign: 'center', padding: '64px 20px', maxWidth: '520px', margin: '40px auto' }}
          >
            <Disc size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-primary)' }}>No shows matched your filter</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
              We couldn't find any broadcasts matching "{searchQuery}". Try searching for other genres or hosts.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};