import { useEffect, useRef, useState } from 'react';
import { RiGeminiFill } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa6';
import Chat from './Chat';
import Prompt from './Prompt';
import { PlayList, PlaylistItem } from '../../components/music/Playlist';

interface AIChatProps {
  prompt?: string;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  message: string;
  playlistItems?: PlaylistItem[];
}

export default function AIChatC({ prompt }: AIChatProps) {
  const [chatList, setChatList] = useState<ChatMessage[]>([
    { sender: 'ai', message: '반가워요! 지금 당신의 기분에 꼭 맞는 음악을 준비해드릴게요.' },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (msg: string) => {
    setChatList((prev) => [...prev, { sender: 'user', message: msg }]);
    setLoading(true);
    try {
      const items = await PlayList(msg);
      setChatList((prev) => [
        ...prev,
        {
          sender: 'ai',
          message: '이 플레이리스트를 추천해요! 🎵',
          playlistItems: items
        }
      ]);
    } catch (error) {
      setChatList((prev) => [
        ...prev,
        { sender: 'ai', message: '추천을 가져오지 못했어요 😅 다시 시도해주세요!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!prompt) return;
    const fetchInitial = async () => {
      try {
        const items = await PlayList(prompt);
        setChatList((prev) => [
          ...prev,
          { sender: 'user', message: prompt },
          {
            sender: 'ai',
            message: '제 추천 플레이리스트에요! 🎧',
            playlistItems: items
          }
        ]);
      } catch {
        setChatList((prev) => [
          ...prev,
          { sender: 'ai', message: '초기 추천을 불러오지 못했어요' }
        ]);
      }
    };
    fetchInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatList]);

  return (
    <div className="flex flex-col justify-between min-h-[780px] bg-background rounded-20">
      <main className="p-4 max-w-md mx-auto w-full overflow-y-auto flex-grow max-h-[690px]">
        <h2 className="font-bold text-lg mb-4">AI Music Recommender</h2>
        <div className="flex flex-col gap-4">
          {chatList.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'} gap-2`}
            >
              {msg.sender === 'ai' && (
                <div className="w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
                  <RiGeminiFill className="text-white text-2xl" />
                </div>
              )}
              <Chat
                message={msg.message}
                bgColor={msg.sender === 'ai' ? 'white' : 'tertiary'}
                playlistItems={msg.playlistItems}
              />
              {msg.sender === 'user' && (
                <div className="w-[50px] h-[50px] rounded-full bg-emerald-400 flex items-center justify-center text-white">
                  <FaRegUser className="text-2xl" />
                </div>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </main>
      <footer className="p-4 max-w-md mx-auto w-full">
        <Prompt onSend={handleSend} loading={loading} />
      </footer>
    </div>
  );
}
