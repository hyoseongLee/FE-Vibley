import axios from './axiosInstance';

export const fetchPlaybackState = () => axios.get('/api/spotify/player');
export const play = (uris: string[], positionMs?: number) =>
  axios.put('/api/spotify/player/play', { uris, positionMs });
export const pause = () => axios.put('/api/spotify/player/pause');
export const next = () => axios.post('/api/spotify/player/next');
export const previous = () => axios.post('/api/spotify/player/previous');
export const seek = (positionMs: number) =>
  axios.put('/api/spotify/player/seek', { positionMs });
export const setVolume = (volumePercent: number) =>
  axios.put('/api/spotify/player/volume', { volumePercent });
export const addToQueue = (uri: string) =>
  axios.post('/api/spotify/player/queue', { uri });

export const fetchUserProfile = () => axios.get('/api/spotify/profile');
export const getAlbum = (albumId: string) =>
  axios.get(`/api/spotify/album/${albumId}`);
export const getPlaylist = (playlistId: string) =>
  axios.get(`/api/spotify/playlist/${playlistId}`);
export const getPlaylistTracks = (playlistId: string) =>
  axios.get(`/api/spotify/playlist-tracks/${playlistId}`);
export const getNewReleases = () => axios.get('/api/spotify/new-releases');

export const followAlbum = (albumId: string) =>
  axios.put(`/api/spotify/album/follow/${albumId}`);
export const unfollowAlbum = (albumId: string) =>
  axios.delete(`/api/spotify/album/follow/${albumId}`);
export const followPlaylist = (playlistId: string) =>
  axios.put(`/api/spotify/playlist/${playlistId}/follow`);
export const unfollowPlaylist = (playlistId: string) =>
  axios.delete(`/api/spotify/playlist/${playlistId}/follow`);

export const getFollowedAlbums = () => axios.get('/api/spotify/followed/albums');
export const getFollowedPlaylists = () =>
  axios.get('/api/spotify/followed/playlists');
