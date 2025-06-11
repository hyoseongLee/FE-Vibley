import { useEffect, useState } from 'react';
import Album from './Album';
import { getNewReleases, getFollowedAlbums, getFollowedPlaylists } from '../../api/spotify';

interface ShowAlbumsProps {
  type: 'new' | 'liked-album' | 'liked-playlist';
  title: string;
}

interface AlbumData {
  id: string;
  image: string;
}

export default function ShowAlbums({ type, title }: ShowAlbumsProps) {
  const [items, setItems] = useState<AlbumData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (type === 'new') {
          response = await getNewReleases();
          setItems(response.data.albums);
        } else if (type === 'liked-album') {
          response = await getFollowedAlbums();
          setItems(response.data.albums);
        } else if (type === 'liked-playlist') {
          response = await getFollowedPlaylists();
          setItems(response.data.playlists);
        }
      } catch (error) {
        console.error(`${title} 불러오기 실패:`, error);
      }
    };

    fetchData();
  }, [type, title]);

  return (
    <div className="my-6">
      <h2 className="text-24-semibold mb-4">{title}</h2>
      <div className="flex gap-10">
        {items.map((item) =>
          type === 'liked-playlist' ? (
            <img
              key={item.id}
              src={item.image}
              alt="플레이리스트 이미지"
              className="w-[180px] h-[180px] object-cover rounded-20"
            />
          ) : (
            <Album key={item.id} albumId={item.id} size={180} />
          )
        )}
      </div>
    </div>
  );
}
