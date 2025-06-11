import clsx from 'clsx';

interface Props {
  message: string;
	bgColor?: 'white' | 'tertiary';
}

function Chat({ message, bgColor = 'white' }: Props) {
  return (
    <div
      className={clsx(
        'rounded-[20px] p-4 text-18-regular font-regular leading-relaxed break-words p-[20px]' ,
        {
          'bg-white': bgColor === 'white',
          'bg-tertiary': bgColor === 'tertiary',
        }
      )}
      style={{ width: '312px', minHeight: '116px' }}
    >
      {message}
    </div>
  );
}

export default Chat;
