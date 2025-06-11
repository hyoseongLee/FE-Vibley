import clsx from 'clsx';
import type { PlaylistItem } from '../music/Playlist';
import { useNavigate } from 'react-router-dom'; // 추가

interface Props {
  message: string;
  bgColor?: 'white' | 'tertiary';
  playlistItems?: PlaylistItem[];
}

function Chat({ message, bgColor = 'white', playlistItems }: Props) {
  const navigate = useNavigate(); // 추가

  return (
    <div
      className={clsx(
        'rounded-[20px] p-4 text-18-regular font-regular leading-relaxed break-words',
        {
          'bg-white': bgColor === 'white',
          'bg-tertiary': bgColor === 'tertiary',
        }
      )}
      style={{ width: '312px', minHeight: '116px' }}
    >
      {message}
      {playlistItems && (
        <div className="mt-4 space-y-2">
          {playlistItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-2"
              onClick={() => navigate(`/playlist/${item.id}`)} // 추가
              style={{ cursor: 'pointer' }} 
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-12 h-12 rounded"
              />
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.artist}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chat;
