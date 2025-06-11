import { create } from 'zustand';
import { spotifyAPI } from '../api/spotify';

interface Track {
title: string;
artist: string;
albumArt: string;
uri: string;
duration: number;
}

interface PlayerState {
// 플레이어 상태
isPlaying: boolean;
currentTrack: Track | null;
position: number;
duration: number;
volume: number;
prevVolume: number;

// 액션 함수들
setCurrentTrack: (track: Track) => void;
setIsPlaying: (playing: boolean) => void;
setPosition: (position: number) => void;
setDuration: (duration: number) => void;
setVolume: (volume: number) => Promise<void>;
setPrevVolume: (volume: number) => void;
togglePlayback: () => Promise<void>;
skipToNext: () => Promise<void>;
skipToPrevious: () => Promise<void>;
seekToPosition: (position: number) => Promise<void>;
playTrack: (track: Track) => Promise<void>;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
isPlaying: false,
currentTrack: null,
position: 0,
duration: 0,
volume: 100,
prevVolume: 100,

// 상태 설정 함수들
setCurrentTrack: (track) => set({ currentTrack: track }),
setIsPlaying: (playing) => set({ isPlaying: playing }),
setPosition: (position) => set({ position }),
setDuration: (duration) => set({ duration }),
setPrevVolume: (volume) => set({ prevVolume: volume }),

// 볼륨 조절
setVolume: async (volume) => {
try {
await spotifyAPI.setVolume(volume);
set({ volume });
} catch (error) {
console.error('볼륨 조절 실패:', error);
}
},

// 재생/일시정지 토글
togglePlayback: async () => {
try {
const { isPlaying } = get();
if (isPlaying) {
await spotifyAPI.pause();
} else {
await spotifyAPI.play([]);
}
set({ isPlaying: !isPlaying });
} catch (error) {
console.error('재생 제어 실패:', error);
}
},

// 다음 트랙
skipToNext: async () => {
try {
await spotifyAPI.next();
} catch (error) {
console.error('다음 트랙 이동 실패:', error);
}
},

// 이전 트랙
skipToPrevious: async () => {
try {
await spotifyAPI.previous();
} catch (error) {
console.error('이전 트랙 이동 실패:', error);
}
},

// 재생 위치 이동
seekToPosition: async (position) => {
try {
await spotifyAPI.seek(position);
set({ position });
} catch (error) {
console.error('재생 위치 이동 실패:', error);
}
},

// 트랙 재생
playTrack: async (track) => {
try {
await spotifyAPI.play([track.uri]);
set({ currentTrack: track });
} catch (error) {
console.error('트랙 재생 실패:', error);
}
}
}));