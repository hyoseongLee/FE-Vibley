import clsx from 'clsx';

interface Props {
  message: string;
	bgColor?: 'white' | 'tertiary';
}

function Chat({ message, bgColor = 'white' }: Props) {
  return (
    <div
      className={clsx(
        'rounded-[20px] p-4 text-18-regular font-regular leading-relaxed break-words',
        {
          'bg-white': bgColor === 'white',
          'bg-tertiary': bgColor === 'tertiary',
        }
      )}
      style={{ minHeight: '60px', maxWidth: '312px', minWidth: '50px' }}
    >
      {message}
    </div>
  );
}

export default Chat;
