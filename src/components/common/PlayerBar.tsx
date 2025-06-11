import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../../stores/PlayerStore';
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
    setIsPlaying,
    setPosition,
    setVolume,
    setStoreVolume,
    setPrevVolume,
    playNextInQueue,
    playPreviousInQueue,
  } = usePlayerStore();

  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const progressUpdateRef = useRef<number | null>(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken || player) return;

    const loadSpotifySDK = () => {
      return new Promise<void>((resolve) => {
        if ((window as any).Spotify) {
          resolve();
          return;
        }

        (window as any).onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };

        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);
      });
    };

    const initPlayer = async () => {
      await loadSpotifySDK();

      const newPlayer = new (window as any).Spotify.Player({
        name: 'Vibely Web Player',
        getOAuthToken: (cb: any) => cb(accessToken),
        volume: 0.8,
      });

      newPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('✅ SDK Ready:', device_id);
        setDeviceId(device_id);
      });

      newPlayer.addListener('initialization_error', (e: { message: string }) =>
        console.error('❌ 초기화 실패:', e.message)
      );

      await newPlayer.connect();
      setPlayer(newPlayer);
    };

    initPlayer();
  }, [accessToken, player]);

  const playWithSDK = async () => {
    if (!accessToken || !deviceId || !currentTrack) return;

    try {
      await player.resume();

      const res = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: [currentTrack.uri],
          }),
        }
      );

      if (res.ok) {
        console.log('✅ 트랙 재생 요청 성공');
        setIsPlaying(true);
      } else {
        const err = await res.json();
        console.error('❌ 트랙 재생 실패:', err);
      }
    } catch (err) {
      console.error('❌ playWithSDK 에러:', err);
    }
  };

  const togglePlayback = async () => {
    if (!player || !accessToken || !deviceId) return;
    if (!isPlaying) {
      await playWithSDK();
    } else {
      await player.pause();
      setIsPlaying(false);
    }
  };

  const handleMute = async () => {
    if (volume === 0) {
      await setVolume(prevVolume || 100);
    } else {
      setPrevVolume(volume);
      await setVolume(0);
    }
  };

  const handleSeek = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPos = Number(e.target.value);
    if (player) await player.seek(newPos);
    setPosition(newPos);
  };

  const handleVolumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    if (player) await player.setVolume(newVol / 100);
    setStoreVolume(newVol);
  };

  useEffect(() => {
    if (!isPlaying) return;

    progressUpdateRef.current = setInterval(() => {
      const position = usePlayerStore.getState().position;
      const duration = usePlayerStore.getState().duration;
      usePlayerStore
        .getState()
        .setPosition(Math.min(position + 1000, duration));
    }, 1000);
    return () => {
      if (progressUpdateRef.current) clearInterval(progressUpdateRef.current);
    };
  }, [isPlaying, duration, setPosition]);

  useEffect(() => {
    if (currentTrack && player && deviceId && accessToken) {
      playWithSDK();
    }
  }, [currentTrack]);

  const title = currentTrack?.title || '오늘 뭐 듣지?';
  const artist = currentTrack?.artist || 'AI 추천을 받아보세요';
  const albumArt = currentTrack?.albumArt || music;
  const pos = currentTrack ? position : 0;
  const dur = currentTrack ? duration : 100;
  const vol = typeof volume === 'number' ? volume : 100;

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full h-20 bg-white flex items-center px-6 z-50 gap-8'>
      <img src={albumArt} alt='album' className='w-[47px] h-[45px] rounded' />

      <div className='flex flex-col min-w-[200px]'>
        <div className='font-sans text-black text-18-semibold'>{title}</div>
        <div className='text-14-medium font-sans text-lightgray truncate'>
          {artist}
        </div>
      </div>

      <div className='flex gap-6 ml-auto'>
        <button onClick={playPreviousInQueue}>
          <IoPlaySkipBackSharp color='black' size={24} />
        </button>
        <button
          onClick={togglePlayback}
          className='w-8 h-8 flex items-center justify-center'
        >
          {isPlaying ? <IoPauseSharp size={24} /> : <IoPlaySharp size={24} />}
        </button>
        <button onClick={playNextInQueue}>
          <IoPlaySkipForwardSharp size={24} />
        </button>
      </div>

      <div className='flex flex-1 items-center rounded-lg gap-2 bg-lightgray w-[480px] h-1'>
        <input
          type='range'
          min={0}
          max={dur}
          value={pos}
          onChange={handleSeek}
          className='h-1 bg-lightgray rounded-lg appearance-none cursor-pointer flex-1'
          disabled={!currentTrack}
        />
      </div>
      <div>
        <span className='text-14 text-black'>
          {formatDuration(pos)} / {formatDuration(dur)}
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <button onClick={handleMute}>
          {vol === 0 ? (
            <IoVolumeMuteSharp size={20} />
          ) : (
            <IoVolumeHighSharp size={20} />
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
