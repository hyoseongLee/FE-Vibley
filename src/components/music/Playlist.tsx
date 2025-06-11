import axiosInstance from "../../api/axiosInstance";

export interface PlaylistItem {
id: string;
title: string;
artist: string;
imageUrl: string;
}

export const PlayList = async (prompt: string): Promise<PlaylistItem[]> => {
try {
// 백엔드에 프롬프트 전송
const res = await axiosInstance.post('/api/gemini/chat', { prompt });

if (!res.data?.result) {
throw new Error('유효하지 않은 응답 형식');
}
const playlist = res.data.result;

return [
  {
    id: playlist.id,
    title: playlist.name || 'Unknown Playlist',
    artist: playlist.ownerName || 'Unknown Owner',
    imageUrl: playlist.imageUrl || '/default-album.png'
  }
];
} catch (error: any) {
throw new Error(`앨범 추천 실패: ${error.response?.data?.message || error.message}`);
}
};