import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';
import { SHOWS_DATA } from '../data/shows';
import { useAudio } from '../context/AudioContext';
import type { Show } from '../types';

interface ShowsSectionProps {
  limit?: number;
}

export const ShowsSection: React.FC<ShowsSectionProps> = ({ limit }) => {
  const { currentShow, isPlaying, playShow, togglePlay } = useAudio();
  const displayedShows = limit ? SHOWS_DATA.slice(0, limit) : SHOWS_DATA;

  const handlePlayClick = (show: Show) => {
    if (currentShow && currentShow.id === show.id) {
      togglePlay();
    } else {
      playShow(show);
    }
  };

  return (
    <section className="shows-section" id="shows" aria-label="Curated Shows">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Original Broadcasts</p>
          <h2 className="section-title">Explore Resident Shows</h2>
          <p className="section-subtitle">
            From late-night ambient soundscapes to gritty basement garage rock, hear the weekly programs shaping our frequency.
          </p>
        </div>

        <div className="shows-grid">
          {displayedShows.map((show) => {
            const isThisShowPlaying = isPlaying && currentShow?.id === show.id;

            return (
              <div
                key={show.id}
                className={`show-card ${isThisShowPlaying ? 'is-active-track' : ''}`}
                id={`show-card-${show.id}`}
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
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Air Time</span>
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
                    id={`btn-play-show-${show.id}`}
                    aria-label={`${isThisShowPlaying ? 'Pause' : 'Play preview for'} ${show.title}`}
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
      </div>
    </section>
  );
};
