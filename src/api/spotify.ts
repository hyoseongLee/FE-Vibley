import axios from './axiosInstance';

export const fetchPlaybackState = () => axios.get('/spotify/player');
export const play = (uris: string[], positionMs?: number) =>
  axios.put('/spotify/player/play', { uris, positionMs });
export const pause = () => axios.put('/spotify/player/pause');
export const next = () => axios.post('/spotify/player/next');
export const previous = () => axios.post('/spotify/player/previous');
export const seek = (positionMs: number) =>
  axios.put('/spotify/player/seek', { positionMs });
export const setVolume = (volumePercent: number) =>
  axios.put('/spotify/player/volume', { volumePercent });
export const addToQueue = (uri: string) =>
  axios.post('/spotify/player/queue', { uri });

export const fetchUserProfile = () => axios.get('/spotify/profile');
export const getAlbum = (albumId: string) =>
  axios.get(`/spotify/album/${albumId}`);
export const getPlaylist = (playlistId: string) =>
  axios.get(`/spotify/playlist/${playlistId}`);
export const getPlaylistTracks = (playlistId: string) =>
  axios.get(`/spotify/playlist-tracks/${playlistId}`);
export const getNewReleases = () => axios.get('/spotify/new-releases');

export const followAlbum = (albumId: string) =>
  axios.put(`/spotify/album/follow/${albumId}`);
export const unfollowAlbum = (albumId: string) =>
  axios.delete(`/spotify/album/follow/${albumId}`);
export const followPlaylist = (playlistId: string) =>
  axios.put(`/spotify/playlist/${playlistId}/follow`);
export const unfollowPlaylist = (playlistId: string) =>
  axios.delete(`/spotify/playlist/${playlistId}/follow`);

export const getFollowedAlbums = () => axios.get('/spotify/followed/albums');
export const getFollowedPlaylists = () =>
  axios.get('/spotify/followed/playlists');
