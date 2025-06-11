import AIChatC from "../components/ai/AIChat";
import ShowAlbums from "../components/music/AlbumList";

const Main = () => {
  
  return (
    <div className="flex items-start justify-center gap-40 p-4">
      <div className="flex flex-col gap-1">
        <ShowAlbums type="new" title="최신 발매 음악" />
        <ShowAlbums type="liked-album" title="좋아요한 앨범" />
        <ShowAlbums type="liked-playlist" title="나의 플레이리스트" />
      </div>
      <div className="mt-10">
        <AIChatC />
      </div>
    </div>
  );
};

export default Main;
