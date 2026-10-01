import React from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Radio,
  X,
  SkipBack,
  SkipForward
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { SHOWS_DATA } from '../data/shows';

export const AudioPlayer: React.FC = () => {
  const {
    currentShow,
    isPlaying,
    volume,
    isMuted,
    progress,
    currentTime,
    duration,
    isMinimized,
    isPlayerVisible,
    togglePlay,
    playShow,
    seekTo,
    setVolume,
    toggleMute,
    toggleMinimize,
    closePlayer
  } = useAudio();

  if (!isPlayerVisible || !currentShow) {
    return null;
  }

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = (clickX / width) * 100;
    seekTo(percent);
  };

  const handlePrevious = () => {
    const currentIndex = SHOWS_DATA.findIndex((s) => s.id === currentShow.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : SHOWS_DATA.length - 1;
    playShow(SHOWS_DATA[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = SHOWS_DATA.findIndex((s) => s.id === currentShow.id);
    const nextIndex = currentIndex < SHOWS_DATA.length - 1 ? currentIndex + 1 : 0;
    playShow(SHOWS_DATA[nextIndex]);
  };

  return (
    <aside
      className={`audio-player-dock ${isMinimized ? 'minimized' : ''}`}
      id="global-audio-player"
      aria-label="Global Audio Broadcast Bar"
    >
      {/* Minimized Quick Bar */}
      {isMinimized && (
        <button
          type="button"
          onClick={toggleMinimize}
          className="minimized-bar"
          id="player-maximize-btn"
          aria-label="Expand Audio Player"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="live-pulse-dot" style={{ width: '6px', height: '6px' }}></span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{currentShow.title}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>— {currentShow.host}</span>
            <Maximize2 size={13} style={{ marginLeft: '6px', color: 'var(--accent-coral)' }} />
          </div>
        </button>
      )}

      <div className="container player-container">
        {/* Left Track & Host Info */}
        <div className="player-left">
          <div className="player-cover-box" style={{ background: 'var(--bg-tertiary)' }}>
            <div className={`player-disc-mini ${isPlaying ? 'spinning' : ''}`}>
              <Radio size={18} style={{ color: 'var(--accent-coral)' }} />
            </div>
          </div>
          <div className="player-meta">
            <div className="player-meta-headline">
              <span className="player-title">{currentShow.title}</span>
              {currentShow.isLive && (
                <span className="player-live-tag">
                  <span className="live-pulse-dot" style={{ width: '4px', height: '4px' }}></span>
                  LIVE
                </span>
              )}
            </div>
            <p className="player-sub">{currentShow.host} • {currentShow.category}</p>
          </div>
        </div>

        {/* Center Transport & Scrub Bar */}
        <div className="player-center">
          <div className="player-controls">
            <button
              type="button"
              onClick={handlePrevious}
              className="player-step-btn"
              aria-label="Previous show"
              title="Previous Show"
            >
              <SkipBack size={15} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="player-play-btn"
              id="player-play-pause-btn"
              aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
            >
              {isPlaying ? <Pause size={17} /> : <Play size={17} fill="currentColor" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="player-step-btn"
              aria-label="Next show"
              title="Next Show"
            >
              <SkipForward size={15} />
            </button>

            {/* Equalizer Wave Indicator */}
            {isPlaying && (
              <div className="player-sound-waves" aria-hidden="true">
                <span className="mini-eq eq-1"></span>
                <span className="mini-eq eq-2"></span>
                <span className="mini-eq eq-3"></span>
              </div>
            )}
          </div>

          {/* Timeline Scrubber */}
          <div className="player-timeline-box">
            <span className="time-stamp">{formatTime(currentTime)}</span>
            <div
              className="timeline-bar-wrapper"
              onClick={handleTimelineClick}
              role="slider"
              aria-label="Audio timeline position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="timeline-bar-fill"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
            <span className="time-stamp">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Volume & Player Actions */}
        <div className="player-right">
          <button
            type="button"
            onClick={toggleMute}
            className="player-util-btn"
            id="player-mute-btn"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted || volume === 0 ? <VolumeX size={17} style={{ color: '#F87171' }} /> : <Volume2 size={17} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            id="player-volume-slider"
            aria-label="Volume level"
          />

          <button
            type="button"
            onClick={toggleMinimize}
            className="player-util-btn"
            id="player-minimize-btn"
            aria-label="Minimize Player"
            title="Minimize"
          >
            <Minimize2 size={16} />
          </button>

          <button
            type="button"
            onClick={closePlayer}
            className="player-util-btn"
            id="player-close-btn"
            aria-label="Close Player"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};