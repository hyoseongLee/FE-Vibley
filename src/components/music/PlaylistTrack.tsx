import { BsFillPlayFill } from 'react-icons/bs';
import { usePlayerStore } from '../../stores/PlayerStore';
import { PlaylistTrackItem } from '../../models/spotify.model';
import { formatDuration } from '../../utils/formatDuration';

interface PlaylistTrackProps {
  track: PlaylistTrackItem;
  index: number;
  isActive?: boolean;
}

export default function PlaylistTrack({ track, index }: PlaylistTrackProps) {
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  const handleClick = () => {
    console.log(track);

    playTrack({
      id: track.id,
      title: track.name,
      artist: track.artistNames.join(', '),
      albumArt: track.albumImage ?? '',
      uri: `spotify:track:${track.id}`,
      duration: track.durationMs,
    });
  };

  const isActive = currentTrack?.id === track.id;

  return (
    <div
      onClick={handleClick}
      className={`grid grid-cols-[24px_1fr_auto] items-center gap-6 px-8 py-4 rounded-lg text-16-semibold text-gray transition cursor-pointer  hover:text-black
        ${isActive ? 'bg-primary text-white' : 'hover:bg-tertiary'}
      `}
    >
      {/* 번호 or 플레이 아이콘 */}

      {isActive ? (
        <BsFillPlayFill className='w-5 h-5 fill-white' />
      ) : (
        <span className=' w-4 text-center'>{index + 1}</span>
      )}

      {/* 제목 + 아티스트 */}
      <div className='flex flex-col truncate'>
        <span className={`truncate ${isActive ? 'text-white' : ''} `}>
          {track.name}
        </span>
        <span className={`text-sm truncate ${isActive ? 'text-white' : ''}`}>
          {track.artistNames.join(', ')}
        </span>
      </div>

      {/* 시간 */}
      <span className={`${isActive ? 'text-white' : ''}`}>
        {formatDuration(track.durationMs)}
      </span>
    </div>
  );
}
