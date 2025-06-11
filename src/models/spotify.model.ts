export interface Album {
  id: string;
  name: string;
  releaseDate: string;
  imageUrl: string | null;
  totalTracks: number;
  artists: string[];
  tracks: AlbumTrack[];
}
export interface AlbumTrack {
  id: string;
  name: string;
  trackNumber: number;
  durationMs: number;
  isPlayable: boolean;
  previewUrl: string | null;
  linkedFromId: string | null;
}
export interface Playlist {
  name: string;
  imageUrl: string | null;
  public: boolean;
  ownerName: string | null;
  totalTracks: number;
  tracks: PlaylistTrackItem[];
}
export interface PlaylistTrackItem {
  id: string;
  name: string;
  isPlayable: boolean;
  previewUrl: string | null;
  linkedFromId: string | null;
  artistNames: string[];
  albumImage: string | null;
}
export interface PlaybackState {
  is_playing: boolean;
  item: {
    name: string;
    id: string;
    duration_ms: number;
    artists: { name: string }[];
    album: { images: { url: string }[] };
  };
}
export interface GeminiPlaylistRecommendation {
  id: string;
  name: string;
  imageUrl: string | null;
  ownerId: string | null;
  ownerName: string | null;
}
export interface SimpleAlbumCard {
  id: string;
  image: string;
}
export interface FollowedAlbumCard {
  id: string;
  image: string;
}
export interface FollowedPlaylistCard {
  id: string;
  image: string;
}
