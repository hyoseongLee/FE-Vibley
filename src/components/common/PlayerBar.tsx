import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../../stores/PlayerStore';
import { spotifyAPI } from '../../api/spotify';
import music from '../../assets/music.png';
import {
  IoPlaySkipBackSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoPlaySkipForwardSharp,
  IoVolumeMuteSharp,
  IoVolumeHighSharp,
} from 'react-icons/io5';
import { formatDuration } from '../../utils/formatDuration';

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    position,
    duration,
    volume,
    prevVolume,
    setCurrentTrack,
    setIsPlaying,
    setPosition,
    setDuration,
    setVolume,
    setPrevVolume,
    togglePlayback,
    skipToNext,
    skipToPrevious,
    seekToPosition,
  } = usePlayerStore();

  const progressUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // 플레이어 상태 폴링 (2초마다)
  useEffect(() => {
    const fetchPlaybackState = async () => {
      try {
        const res = await spotifyAPI.fetchPlaybackState();
        const data = res.data;

        setCurrentTrack({
          title: data.item?.name || '',
          artist: data.item?.artists?.map((a: any) => a.name).join(', ') || '',
          albumArt: data.item?.album?.images?.[0]?.url || music,
          uri: data.item?.uri || '',
          duration: data.item?.duration_ms || 0,
        });
        setIsPlaying(data.is_playing);
        setPosition(data.progress_ms || 0);
        setDuration(data.item?.duration_ms || 0);
        setVolume(data.device?.volume_percent ?? 100);
      } catch (error) {
        console.error('플레이어 상태 업데이트 실패:', error);
      }
    };

    // 최초 상태 불러오기
    fetchPlaybackState();

    // 2초마다 상태 업데이트
    const interval = setInterval(fetchPlaybackState, 2000);

    return () => {
      if (interval) clearInterval(interval);
      if (progressUpdateRef.current) clearInterval(progressUpdateRef.current);
    };
  }, [setCurrentTrack, setIsPlaying, setPosition, setDuration, setVolume]);

  // 기본값 처리
  const defaultAlbumArt = music;
  const title = currentTrack?.title || '오늘 뭐 듣지?';
  const artist = currentTrack?.artist || 'AI 추천을 받아보세요';
  const albumArt = currentTrack?.albumArt || defaultAlbumArt;
  const pos = currentTrack ? position : 0;
  const dur = currentTrack ? duration : 100;
  const vol = typeof volume === 'number' ? volume : 100;

  // 음소거/해제
  const handleMute = async () => {
    if (vol === 0) {
      await setVolume(prevVolume || 100);
    } else {
      setPrevVolume(vol);
      await setVolume(0);
    }
  };

  // 시크바 조절
  const handleSeek = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    await seekToPosition(newPos);
  };

  // 볼륨 조절
  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    await setVolume(newVol);
  };

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full h-20 bg-white flex items-center px-6 z-50 gap-4'>
      {/* 앨범아트 */}
      <img src={albumArt} alt='album' className='w-[47px] h-[45px] rounded' />

      {/* 곡 정보 */}
      <div className='flex flex-col min-w-[200px]'>
        <div className='font-sans text-black text-18-semibold'>{title}</div>
        <div className='text-14-medium font-sans text-lightgray truncate'>
          {artist}
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className='flex gap-8 mr-20 ml-auto'>
        <button onClick={skipToPrevious}>
          <IoPlaySkipBackSharp color='black' size={32} />
        </button>
        <button
          onClick={togglePlayback}
          className='w-8 h-8 flex items-center justify-center'
        >
          {isPlaying ? <IoPauseSharp size={32} /> : <IoPlaySharp size={32} />}
        </button>
        <button onClick={skipToNext}>
          <IoPlaySkipForwardSharp size={32} />
        </button>
      </div>

      {/* 시크바 */}
      <div className='flex flex-1 items-center rounded-lg gap-2 bg-lightgray w-[480px] h-1'>
        <input
          type='range'
          min={0}
          max={dur}
          value={pos}
          onChange={handleSeek}
          className='h-1 bg-primary rounded-lg appearance-none cursor-pointer flex-1'
          disabled={!currentTrack}
        />
      </div>
      <div>
        <span className='text-14 text-black'>
          {formatDuration(pos)} / {formatDuration(dur)}
        </span>
      </div>

      {/* 볼륨 컨트롤 */}
      <div className='flex items-center gap-2'>
        <button onClick={handleMute}>
          {vol === 0 ? (
            <IoVolumeMuteSharp size={30} />
          ) : (
            <IoVolumeHighSharp size={30} />
          )}
        </button>
        <input
          type='range'
          min={0}
          max={100}
          value={vol}
          onChange={handleVolumeChange}
          className='w-[100px] h-1 bg-lightgray rounded-lg appearance-none cursor-pointer'
        />
      </div>
    </div>
  );
}
