import { useEffect, useState } from 'react';
import Album from './Album';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import {
  followAlbum,
  unfollowAlbum,
  followPlaylist,
  unfollowPlaylist,
  getAlbumLikeStatus,
  getPlaylistLikeStatus,
} from '../../api/spotify';

export default function AlbumCard() {
  const { id, type } = useParams<{ id: string; type: 'album' | 'playlist' }>();
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ 마운트 시 좋아요 여부 확인
  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!id || !type) return;
      try {
        const res =
          type === 'album'
            ? await getAlbumLikeStatus(id)
            : await getPlaylistLikeStatus(id);
        setLiked(res.data.liked);
      } catch (err) {
        console.error('좋아요 상태 확인 실패:', err);
      }
    };

    checkLikeStatus();
  }, [id, type]);

  const toggleLike = async () => {
    if (!id || !type) return;
    setLoading(true);
    try {
      if (liked) {
        type === 'album' ? await unfollowAlbum(id) : await unfollowPlaylist(id);
      } else {
        type === 'album' ? await followAlbum(id) : await followPlaylist(id);
      }
      setLiked(!liked);
    } catch (err) {
      console.error('좋아요 토글 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      {id && <Album albumId={id} size={340} />}
      <button
        onClick={toggleLike}
        disabled={loading}
        className={clsx(
          'absolute bottom-3 right-3 w-[63px] h-[63px] rounded-full flex items-center justify-center transition-colors duration-200',
          liked
            ? 'bg-white text-primary'
            : 'bg-white text-lightgray hover:bg-palegray active:bg-white active:text-primary'
        )}
      >
        {liked ? <FaHeart className="w-[35px] h-[35px]" /> : <FaRegHeart className="w-[35px] h-[35px]" />}
      </button>
    </div>
  );
}
