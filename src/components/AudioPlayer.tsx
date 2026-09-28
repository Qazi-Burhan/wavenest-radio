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
  Disc3
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';

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

  return (
    <div
      className={`audio-player-dock ${isMinimized ? 'minimized' : ''}`}
      id="global-audio-player"
      role="region"
      aria-label="Audio Broadcast Player"
    >
      {/* Minimized Handle */}
      {isMinimized && (
        <button
          type="button"
          onClick={toggleMinimize}
          className="minimized-bar"
          id="player-maximize-btn"
          aria-label="Expand Audio Player"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Radio size={14} />
            <span>Now Playing: {currentShow.title}</span>
            <Maximize2 size={12} />
          </div>
        </button>
      )}

      <div className="container player-container">
        {/* Left Track Metadata */}
        <div className="player-left">
          <div className="player-cover-box">
            {isPlaying ? (
              <Disc3 size={24} className="spin-slow" style={{ animation: 'spin 4s linear infinite' }} />
            ) : (
              <Radio size={24} />
            )}
          </div>
          <div className="player-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="player-title">{currentShow.title}</span>
              {currentShow.isLive && (
                <span className="badge badge-live" style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                  <span className="pulse-dot" style={{ width: '5px', height: '5px' }}></span>
                  LIVE
                </span>
              )}
            </div>
            <p className="player-sub">{currentShow.host} • {currentShow.category}</p>
          </div>
        </div>

        {/* Center Player Controls & Timeline */}
        <div className="player-center">
          <div className="player-controls">
            {/* Equalizer indicator */}
            {isPlaying && (
              <div className="eq-container" style={{ height: '14px', marginRight: '6px' }}>
                <div className="eq-bar" style={{ width: '2px' }}></div>
                <div className="eq-bar" style={{ width: '2px' }}></div>
                <div className="eq-bar" style={{ width: '2px' }}></div>
              </div>
            )}

            <button
              type="button"
              onClick={togglePlay}
              className="play-pause-btn"
              id="player-play-pause-btn"
              aria-label={isPlaying ? 'Pause broadcast' : 'Play broadcast'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
            </button>
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

        {/* Right Volume & Controls */}
        <div className="player-right">
          <button
            type="button"
            onClick={toggleMute}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px', color: isMuted ? '#F87171' : 'var(--text-secondary)' }}
            id="player-mute-btn"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
            aria-label="Volume slider"
          />

          <button
            type="button"
            onClick={toggleMinimize}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px', color: 'var(--text-secondary)' }}
            id="player-minimize-btn"
            aria-label="Minimize Player"
          >
            <Minimize2 size={18} />
          </button>

          <button
            type="button"
            onClick={closePlayer}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px', color: 'var(--text-secondary)' }}
            id="player-close-btn"
            aria-label="Close Player"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
