import React, { useState } from 'react';
import { Search, Radio, Clock, Play, Pause, Disc } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';
import { useAudio } from '../context/AudioContext';
import type { Show } from '../types';

export const ShowsPage: React.FC = () => {
  const { currentShow, isPlaying, playShow, togglePlay, playLiveStream } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Ambient & Synth', 'Alternative & Indie', 'Spoken Word & Live Sets', 'Deep Electronic & Lo-Fi', 'Audio Documentary', 'In-Depth Interviews'];

  const filteredShows = SHOWS_DATA.filter((show) => {
    const matchesCategory = selectedCategory === 'All' || show.category === selectedCategory;
    const matchesSearch =
      show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      show.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePlayClick = (show: Show) => {
    if (currentShow && currentShow.id === show.id) {
      togglePlay();
    } else {
      playShow(show);
    }
  };

  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <div className="eyebrow-chip" style={{ marginBottom: '12px' }}>
            <span>Broadcasting Schedule & Archive</span>
          </div>
          <h1 style={{ fontSize: '3rem', letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Discover Shows & Residencies
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '640px' }}>
            Tune into original productions, weekly artist residencies, and documentary deep-dives produced live at Wavenest Radio.
          </p>
        </div>

        {/* Live Broadcast Feature Card */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #161c2e 0%, #0d1220 100%)',
            border: '1px solid var(--border-accent)',
            padding: '28px 32px',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444'
              }}
            >
              <Radio size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span className="badge badge-live">
                  <span className="pulse-dot"></span>
                  LIVE ON AIR
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Channel 1 • 24/7 Primary Stream</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Wavenest Studio A Continuous Broadcast</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Eclectic selections, underground releases, and live commentary streaming around the clock.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={playLiveStream}
            className="btn btn-teal btn-lg"
            id="shows-live-stream-btn"
          >
            <Play size={18} />
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}
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
                <div
                  key={show.id}
                  className={`show-card ${isThisShowPlaying ? 'is-active-track' : ''}`}
                  id={`shows-page-card-${show.id}`}
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Air Slot</span>
                      <span className="show-time">{show.scheduleTime}</span>
                    </div>

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
                      id={`shows-page-play-${show.id}`}
                    >
                      {isThisShowPlaying ? (
                        <>
                          <Pause size={14} />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play size={14} />
                          <span>Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div
            className="card"
            style={{ textAlign: 'center', padding: '64px 20px', maxWidth: '520px', margin: '40px auto' }}
          >
            <Disc size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No shows matched your filter</h3>
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
