export default function Error() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center p-4'>
      <h1 className='text-3xl font-bold mb-4'>⚠️ 문제가 발생했어요</h1>
      <p className='text-lg'>예상치 못한 오류가 발생했습니다.</p>

      <a
        href='/main'
        className='mt-6 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition'
      >
        메인으로 돌아가기
      </a>
    </div>
  );
}
