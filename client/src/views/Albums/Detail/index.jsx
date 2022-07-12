import { useParams } from "react-router";
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";
import Loading from "../../../components/Loading";
import { useFetchAlbumQuery } from "../../../redux/api/albums";
import { useFetchSongsByAlbumIdQuery } from "../../../redux/api/songs";
const Detail = () => {
const { albumId } = useParams();
const {
        data: albumDetail,
        isLoading,
        isSuccess,
        isFetching,
        error,
      } = useFetchAlbumQuery(albumId);
const {
        data: songs,
        isLoading: isLoadingSongs,
        isSuccess: isSuccessSongs,
        isFetching: isFetchingSongs,
        error: errorSongs,
      } = useFetchSongsByAlbumIdQuery(albumId);
      const SongsMap = () => {
        return songs.map((user) => <div key={user.id}>{user.title}</div>)
      }
console.log(albumId, albumDetail, songs)
 const renderContent = () => {
  if (isLoading || isFetching) {
   return <Loading message="Obteniendo informacion del album..." />;
  } else if (error) {
   return <p>Ha ocurrido un error al obtener la informacion del album</p>;
  }
  return (
   <>
    <LeftContainer imageUrl={albumDetail.cover_big} />
    <RightContainer
     title={albumDetail.title ?? 'Sin titulo'}
    />
    {songs && songs.length > 0 ? ( 
          <div><h3>Songs</h3>
          <SongsMap />
          </div>         
          ) : isFetchingSongs ? (
          <h3>Loading...</h3>
        ) : (
          <></>
        )}
   </>
  )
 };

  return (
  <div className="flex flex-row px-16 h-screen items-center justify-center">
   {renderContent()}
  </div>
 );
};

export default Detail;