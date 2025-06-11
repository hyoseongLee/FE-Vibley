import axios from './axiosInstance';

export const spotifyAPI = {
  fetchPlaybackState: () => axios.get('/api/spotify/player'),
  play: (uris: string[], positionMs?: number) =>
  axios.put('/api/spotify/player/play', { uris, positionMs }),
  pause: () => axios.put('/api/spotify/player/pause'),
  next: () => axios.post('/api/spotify/player/next'),
  previous: () => axios.post('/api/spotify/player/previous'),
  seek: (positionMs: number) =>
  axios.put('/api/spotify/player/seek', { positionMs }),
  setVolume: (volumePercent: number) =>
  axios.put('/api/spotify/player/volume', { volumePercent }),
  addToQueue: (uri: string) =>
  axios.post('/api/spotify/player/queue', { uri }),
  };
  export function fetchPlaybackState() {
  throw new Error('Function not implemented.');
  }

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

export const getAlbumLikeStatus = (albumId: string) =>
  axios.get(`/api/spotify/album/${albumId}/status`);
export const getPlaylistLikeStatus = (playlistId: string) =>
  axios.get(`/api/spotify/playlist/${playlistId}/status`);