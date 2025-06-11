import { create } from 'zustand';

export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  uri: string;
  duration: number;
}

interface PlayerState {
  // 현재 상태들
  isPlaying: boolean;
  currentTrack: Track | null;
  position: number;
  duration: number;
  volume: number;
  prevVolume: number;

  // 트랙 리스트
  trackQueue: Track[]; // 다음 곡들
  trackHistory: Track[]; // 이전 곡들

  // 상태 설정 함수들
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  setPosition: (position: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setPrevVolume: (volume: number) => void;
  setStoreVolume: (volume: number) => void;

  // 트랙 조작 함수들
  enqueueTracks: (tracks: Track[]) => void;
  playTrack: (track: Track) => void;
  playNextInQueue: () => void;
  playPreviousInQueue: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  // 초기 상태
  isPlaying: false,
  currentTrack: null,
  position: 0,
  duration: 0,
  volume: 100,
  prevVolume: 100,
  trackQueue: [],
  trackHistory: [],

  // 상태 조작 함수들
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setPosition: (position) => set({ position }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setPrevVolume: (volume) => set({ prevVolume: volume }),
  setStoreVolume: (volume) => set({ volume }),

  // 큐 설정
  enqueueTracks: (tracks) => {
    set({ trackQueue: tracks });
  },

  // 트랙 재생
  playTrack: (track) => {
    const { currentTrack, trackHistory } = get();

    // 현재 트랙이 있으면 히스토리에 넣음
    if (currentTrack) {
      set({ trackHistory: [...trackHistory, currentTrack] });
    }

    set({
      currentTrack: track,
      isPlaying: true,
      position: 0,
      duration: track.duration,
    });
  },

  // 다음 트랙 재생
  playNextInQueue: () => {
    const { trackQueue } = get();
    if (trackQueue.length === 0) return;

    const [next, ...rest] = trackQueue;
    get().playTrack(next);
    set({ trackQueue: rest });
  },

  // 이전 트랙 재생
  playPreviousInQueue: () => {
    const { trackHistory, currentTrack, trackQueue } = get();
    if (trackHistory.length === 0) return;

    const prev = trackHistory[trackHistory.length - 1];

    set({
      currentTrack: prev,
      isPlaying: true,
      position: 0,
      duration: prev.duration,
      trackHistory: trackHistory.slice(0, -1),
      trackQueue: currentTrack ? [currentTrack, ...trackQueue] : trackQueue,
    });
  },
}));
