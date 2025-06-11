import { useEffect, useState } from 'react';
import { getAlbum } from '../../api/spotify'; 
import clsx from 'clsx';

interface AlbumProps {
  albumId: string;
  size?: number; // 이걸로 크기 조절해서 쓰세요 기본값은 340임
  className?: string;
}

export default function Album({ albumId, size = 340, className }: AlbumProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!albumId) return;

    let mounted = true;
    setLoading(true);

    getAlbum(albumId)
      .then((res) => {
        const url = res.data.album?.imageUrl;
        if (mounted) {
          if (url) {
            setImageUrl(url);
            setError(false);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [albumId]);

  if (loading) {
    return (
      <div
        className={clsx('bg-gray-100 animate-pulse rounded-20', className)}
        style={{ width: size, height: size }}
      />
    );
  }

  if (error || !imageUrl) {
    return (
      <div
        className={clsx(
          'bg-gray-200 text-xs text-center text-gray-600 flex items-center justify-center rounded',
          className
        )}
        style={{ width: size, height: size }}
      >
        이미지 없음
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt="앨범 이미지"
      className={clsx('object-cover rounded-20', className)}
      style={{ width: size, height: size }}
    />
  );
}