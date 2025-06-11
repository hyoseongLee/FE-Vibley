import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface PromptProps {
  onSend: (message: string) => void;
  loading?: boolean;
}

const Prompt: React.FC<PromptProps> = ({ onSend, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex [377px] h-[62px] items-center p-4 bg-white rounded-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="내용을 입력해주세요"
        disabled={loading}
        className="px-4 py-3 outline-none border-none rounded-full text-18-regular"
      />
<button
  type="submit"
  disabled={loading || !input.trim()}
  className="w-[72px] h-[50px] bg-primary text-white rounded-full flex ml-5 items-center justify-center hover:text-black transition-colors cursor-pointer"
>

{/* 로딩시 */}
  {loading ? (
    <div className="w-[72px] h-[50px] border-2 border-white rounded-full animate-spin" />
  ) : (
    <FiSend size={24}/>
  )}
</button>
    </form>
  );
};

export default Prompt;
