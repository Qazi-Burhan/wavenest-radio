import React, { useState } from 'react';
import { Play, Pause, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOWS_DATA } from '../data/shows';
import { useAudio } from '../context/AudioContext';
import type { Show } from '../types';

interface ShowsSectionProps {
  limit?: number;
  showFilter?: boolean;
}

export const ShowsSection: React.FC<ShowsSectionProps> = ({ limit, showFilter = false }) => {
  const { currentShow, isPlaying, playShow, togglePlay } = useAudio();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const genres = ['All', 'Electronic', 'Indie Rock', 'Storytelling', 'Podcasts', 'Interviews'];

  const filteredShows = SHOWS_DATA.filter((show) => {
    if (selectedGenre === 'All') return true;
    return show.genre.toLowerCase() === selectedGenre.toLowerCase();
  });

  const displayShows = limit ? filteredShows.slice(0, limit) : filteredShows;

  const handlePlayClick = (show: Show) => {
    if (currentShow.id === show.id && isPlaying) {
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

  return (
    <section className="section-padding shows-section" aria-label="Curated Shows & Residencies">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-eyebrow">RESIDENT BROADCASTS</span>
            <h2 className="section-title">Original shows. Unfiltered perspectives.</h2>
            <p className="section-desc">
              Weekly curated audio residency series hosted by independent musicians, journalists, and selectors.
            </p>
          </div>

          {limit && (
            <Link to="/shows" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>View Full Schedule</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>

        {/* Optional Genre Filter Buttons */}
        {showFilter && (
          <div className="genre-filter-strip" role="tablist" aria-label="Filter shows by genre">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                role="tab"
                aria-selected={selectedGenre === genre}
                className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        )}

        {/* Shows Editorial Card Grid */}
        <div className="shows-grid">
          {displayShows.map((show) => {
            const isCurrentActive = currentShow.id === show.id;
            const isCurrentPlaying = isCurrentActive && isPlaying;

            return (
              <article
                key={show.id}
                className={`show-card ${isCurrentActive ? 'is-active-track' : ''}`}
                id={`show-card-${show.id}`}
              >
                {/* Visual Artwork Thumbnail with Vinyl Vibe */}
                <div
                  className="show-artwork-cover"
                  style={{ background: getShowCoverGradient(show.id) }}
                >
                  <div className="artwork-overlay"></div>

                  {/* Frequency Waveform Background Pattern */}
                  <div className="artwork-frequency-lines" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  {/* Status Indicator */}
                  {show.isLive && (
                    <div className="show-live-badge">
                      <span className="live-pulse-dot"></span>
                      <span>LIVE</span>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <button
                    type="button"
                    onClick={() => handlePlayClick(show)}
                    className="show-play-trigger"
                    aria-label={isCurrentPlaying ? `Pause ${show.title}` : `Play ${show.title} hosted by ${show.host}`}
                  >
                    {isCurrentPlaying ? (
                      <Pause size={20} fill="currentColor" />
                    ) : (
                      <Play size={20} fill="currentColor" style={{ marginLeft: '2px' }} />
                    )}
                  </button>

                  {/* Active Equalizer Overlay when playing */}
                  {isCurrentPlaying && (
                    <div className="show-playing-equalizer" aria-label="Audio playing indicator">
                      <span className="eq-bar bar-1"></span>
                      <span className="eq-bar bar-2"></span>
                      <span className="eq-bar bar-3"></span>
                    </div>
                  )}
                </div>

                {/* Show Details and Metadata */}
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
                      {isCurrentPlaying ? 'Now Playing' : 'Listen Now'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};