import '@testing-library/jest-dom';

// Mock window.scrollTo
window.scrollTo = () => {};

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock AudioContext
class MockAudioContext {
  state = 'running';
  currentTime = 0;
  destination = {};
  createGain() {
    return {
      gain: {
        setValueAtTime: vi.fn(),
        setTargetAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
  }
  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };
  }
  resume() {
    return Promise.resolve();
  }
}

// Attach mock AudioContext
(window as unknown as { AudioContext: typeof MockAudioContext }).AudioContext = MockAudioContext;
