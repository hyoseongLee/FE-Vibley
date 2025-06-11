import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumTrack from '../components/music/AlbumTrack';
// import PlaylistTrack from '../components/music/PlaylistTrack';
import { getAlbum, getPlaylist } from '../api/spotify';
import { Album, Playlist } from '../models/spotify.model';
import { usePlayerStore } from '../stores/PlayerStore';
import PlaylistTrack from '../components/music/PlaylistTrack';
import AlbumCard from '../components/music/AlbumCard';

const Detail = () => {
  const { type, id } = useParams<{ type: 'album' | 'playlist'; id: string }>();
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  const [album, setAlbum] = useState<Album | null>(null);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    if (!type || !id) {
      console.error('❗️타입 또는 ID가 없습니다. URL을 확인해주세요.');
      return;
    }

    const fetchData = async () => {
      try {
        if (type === 'album') {
          const res = await getAlbum(id);
          setAlbum(res.data.album);
        } else if (type === 'playlist') {
          const res = await getPlaylist(id);
          setPlaylist(res.data.playlist);
        } else {
          console.error(`❗️지원되지 않는 타입입니다: ${type}`);
        }
      } catch (error) {
        console.error('❗️상세 정보 가져오기 실패:', error);
      }
    };

    fetchData();
  }, [type, id]);

  // 로딩 중 처리
  if (!album && !playlist) {
    return (
      <div className='p-8 text-gray-500'>데이터를 불러오는 중입니다...</div>
    );
  }

  if (type === 'album' && album) {
    return (
      <div className='flex items-start justify-center gap-60 p-4 '>
        <div className='mt-60'>
          <AlbumCard />
        </div>
        <div className='mt-20'>
          <div className='p-6 max-w-4xl mx-auto'>
            <div className='mb-6'>
              <h2 className='text-3xl font-bold'>{album.name}</h2>
              <p className='text-18-semibold text-gray mt-2'>
                {album.artists.join(', ')} · {album.releaseDate} ·{' '}
                {album.totalTracks}곡
              </p>
            </div>
            <div className='flex flex-col'>
              {album.tracks.map((track) => (
                <AlbumTrack
                  key={track.id}
                  track={track}
                  artistNames={album.artists}
                  albumImage={album.imageUrl ?? ''}
                  isActive={currentTrack?.id === track.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'playlist' && playlist) {
    return (
      <div className='flex items-start justify-center gap-6 p-4 '>
        <div className=''>
          <AlbumCard />
        </div>
        <div className='mt-20'>
          <div className='p-6 max-w-4xl mx-auto'>
            <div className='mb-6'>
              <h2 className='text-3xl font-bold'>{playlist.name}</h2>
              <p className='text-18-semibold text-gray mt-2'>
                {playlist.ownerName ?? 'unknown'} · 총 {playlist.totalTracks}곡
              </p>
            </div>
            <div className='flex flex-col'>
              {playlist.tracks.map((track, index) => (
                <PlaylistTrack
                  key={track.id}
                  track={track}
                  index={index}
                  isActive={currentTrack?.id === track.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className='p-8 text-red-500'>❗️잘못된 요청입니다.</div>;
};

export default Detail;
