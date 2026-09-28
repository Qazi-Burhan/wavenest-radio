import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Show } from '../types';
import { SHOWS_DATA, LIVE_BROADCAST_TRACK } from '../data/shows';

interface AudioContextType {
  currentShow: Show;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  isMinimized: boolean;
  isPlayerVisible: boolean;
  playShow: (show: Show) => void;
  togglePlay: () => void;
  seekTo: (percent: number) => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  toggleMinimize: () => void;
  closePlayer: () => void;
  playLiveStream: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentShow, setCurrentShow] = useState<Show>(SHOWS_DATA[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(312);
  const [duration, setDuration] = useState<number>(2700);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(true);

  // Web Audio API procedural ambient synth ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const parseDuration = (durStr: string): number => {
    if (durStr.includes('Live')) return 7200;
    const match = durStr.match(/\d+/);
    return match ? parseInt(match[0], 10) * 60 : 1800;
  };

  const startSynth = (pitch: number = 220) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopSynth();

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, ctx.currentTime);
      gain.connect(ctx.destination);
      gainNodeRef.current = gain;

      const osc1 = ctx.createOscillator();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc1.connect(gain);
      osc1.start();
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(pitch * 1.5, ctx.currentTime);
      osc2.connect(gain);
      osc2.start();
      osc2Ref.current = osc2;
    } catch {
      // AudioContext fallback
    }
  };

  const stopSynth = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.12;
      gainNodeRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.05);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  const playShow = (show: Show) => {
    setCurrentShow(show);
    const durSecs = parseDuration(show.duration);
    setDuration(durSecs);
    setCurrentTime(show.isLive ? 740 : 0);
    setIsPlayerVisible(true);
    setIsPlaying(true);
    startSynth(show.tonePitch || 220);
  };

  const playLiveStream = () => {
    playShow(LIVE_BROADCAST_TRACK);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynth();
    } else {
      setIsPlaying(true);
      startSynth(currentShow.tonePitch || 220);
    }
  };

  const seekTo = (percent: number) => {
    const clamped = Math.max(0, Math.min(100, percent));
    const targetSeconds = Math.floor((clamped / 100) * duration);
    setCurrentTime(targetSeconds);
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    stopSynth();
    setIsPlayerVisible(false);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioContext.Provider
      value={{
        currentShow,
        isPlaying,
        volume,
        isMuted,
        progress,
        currentTime,
        duration,
        isMinimized,
        isPlayerVisible,
        playShow,
        togglePlay,
        seekTo,
        setVolume,
        toggleMute,
        toggleMinimize,
        closePlayer,
        playLiveStream
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
