import type { Show } from '../types';

export const SHOWS_DATA: Show[] = [
  {
    id: 'night-frequency',
    title: 'Night Frequency',
    category: 'Ambient & Synth',
    host: 'Elena Vance',
    duration: '60 min',
    scheduleTime: 'Nightly at 11:00 PM EST',
    genre: 'Electronic',
    isLive: true,
    tonePitch: 220, // A3 warm drone
    description: 'Immersive late-night soundscapes, downtempo electronica, and tape loops designed for deep focus and midnight wanderers.',
    audioFrequency: [40, 65, 80, 55, 90, 75, 60, 85, 95, 70, 50, 65, 45, 80]
  },
  {
    id: 'the-indie-hour',
    title: 'The Indie Hour',
    category: 'Alternative & Indie',
    host: 'Marcus Chen',
    duration: '45 min',
    scheduleTime: 'Tuesdays & Thursdays at 6:00 PM EST',
    genre: 'Indie Rock',
    tonePitch: 293.66, // D4 upbeat chords
    description: 'Discover the next wave of underground garage rock, bedroom pop discoveries, and unfiltered DIY singles fresh off the press.',
    audioFrequency: [60, 85, 95, 70, 50, 90, 100, 80, 65, 85, 90, 75, 60, 70]
  },
  {
    id: 'open-mic',
    title: 'Open Mic',
    category: 'Spoken Word & Live Sets',
    host: 'Nia Thorne',
    duration: '30 min',
    scheduleTime: 'Wednesdays at 8:00 PM EST',
    genre: 'Storytelling',
    tonePitch: 261.63, // C4 vocal resonance
    description: 'Unrehearsed live studio sessions, acoustic poetry, spoken word essays, and candid commentary from local independent creators.',
    audioFrequency: [30, 45, 60, 80, 70, 55, 65, 50, 40, 70, 85, 60, 45, 35]
  },
  {
    id: 'after-midnight',
    title: 'After Midnight',
    category: 'Deep Electronic & Lo-Fi',
    host: 'DJ Sol',
    duration: '90 min',
    scheduleTime: 'Fridays at 1:00 AM EST',
    genre: 'Electronic',
    tonePitch: 174.61, // F3 deep sub bass
    description: 'A hypnotic ninety-minute continuous mix of vinyl rarities, minimal techno, lo-fi textures, and unreleased dubplates.',
    audioFrequency: [75, 90, 100, 85, 60, 75, 95, 80, 90, 85, 70, 60, 85, 95]
  },
  {
    id: 'sound-stories',
    title: 'Sound Stories',
    category: 'Audio Documentary',
    host: 'Julian Cruz',
    duration: '50 min',
    scheduleTime: 'Sundays at 4:00 PM EST',
    genre: 'Podcasts',
    tonePitch: 329.63, // E4 narrative clarity
    description: 'Investigative narrative audio journalism delving into forgotten music subcultures, pirate radio history, and sound design pioneers.',
    audioFrequency: [40, 55, 70, 65, 85, 75, 60, 70, 80, 65, 55, 45, 60, 50]
  },
  {
    id: 'artist-spotlight',
    title: 'Artist Spotlight',
    category: 'In-Depth Interviews',
    host: 'Samira Khan',
    duration: '40 min',
    scheduleTime: 'Saturdays at 2:00 PM EST',
    genre: 'Interviews',
    tonePitch: 392.00, // G4 melodic tone
    description: 'Unfiltered conversations with breakthrough independent musicians about their creative process, gear, struggles, and artistic philosophy.',
    audioFrequency: [50, 70, 85, 90, 75, 60, 80, 95, 85, 70, 65, 80, 75, 60]
  }
];

export const LIVE_BROADCAST_TRACK: Show = {
  id: 'live-stream-main',
  title: 'Wavenest Live Broadcast',
  category: 'Live Broadcast — On Air',
  host: 'Elena Vance & Guests',
  duration: 'Live 24/7',
  scheduleTime: 'Broadcasting Live from Studio A',
  genre: 'Eclectic Mix',
  isLive: true,
  tonePitch: 220,
  description: 'Uninterrupted 24/7 live programming streaming curated independent music, live banter, and underground discoveries directly from Brooklyn, NY.',
  audioFrequency: [55, 80, 95, 70, 85, 90, 65, 75, 90, 85, 95, 70, 60, 80]
};
