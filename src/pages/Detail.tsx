import AlbumCard from "../components/music/AlbumCard";

const Detail = () => {
  return (
    <div className="flex items-start justify-center gap-60 p-4 ">
      <div className="mt-60">
        <AlbumCard />
      </div>
      <div className="mt-20">
        앨범트랙
      </div>

    </div>
  )

};

export default Detail;
