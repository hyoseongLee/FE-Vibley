import { AlbumTrack as AlbumTrackType } from '../../models/spotify.model';
import { usePlayerStore } from '../../stores/PlayerStore';
import { formatDuration } from '../../utils/formatDuration';
import { BsFillPlayFill } from 'react-icons/bs';

interface AlbumTrackProps {
  track: AlbumTrackType;
  artistNames: string[];
  albumImage: string;
  isActive?: boolean;
}

export default function AlbumTrack({
  track,
  artistNames,
  albumImage,
}: AlbumTrackProps) {
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  const handleClick = () => {
    if (!track.isPlayable) return;

    playTrack({
      id: track.id,
      title: track.name,
      artist: artistNames.join(', '),
      albumArt: albumImage,
      uri: `spotify:track:${track.id}`,
      duration: track.durationMs,
    });
  };

  const isActive = currentTrack?.id === track.id;

  return (
    <div
      onClick={handleClick}
      className={`grid grid-cols-[24px_1fr_auto] items-center gap-6 px-8 py-6 rounded-lg text-16-semibold text-gray transition cursor-pointer  hover:text-black
        ${isActive ? 'bg-primary text-white' : 'hover:bg-tertiary'}
      `}
    >
      {/* 트랙 번호 or 플레이 아이콘 */}
      {isActive ? (
        <BsFillPlayFill className='w-5 h-5 fill-white' />
      ) : (
        <span className=' w-4 text-center'>{track.trackNumber}</span>
      )}
      {/* 곡 제목 */}
      <span className={`${isActive ? 'text-white' : ''}`}>{track.name}</span>
      {/* 곡 시간 */}
      <span className={`${isActive ? 'text-white' : ''}`}>
        {formatDuration(track.durationMs)}
      </span>
    </div>
  );
}
