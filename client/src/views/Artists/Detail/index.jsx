import { useParams } from "react-router";
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";
import Loading from "../../../components/Loading";
import { useFetchArtistQuery } from "../../../redux/api/artists";
import { useFetchSongsByArtistIdQuery } from "../../../redux/api/songs";
const Detail = () => {
const { artistId } = useParams();
const {
        data: artistDetail,
        isLoading,
        isSuccess,
        isFetching,
        error,
      } = useFetchArtistQuery(artistId);
const {
        data: songs,
        isLoading: isLoadingSongs,
        isSuccess: isSuccessSongs,
        isFetching: isFetchingSongs,
        error: errorSongs,
      } = useFetchSongsByArtistIdQuery(artistId);
      const SongsMap = () => {
        return songs.map((user) => <div className="flex justify-center px-6 text-clip text-xl text-orange-300" key={user.id}>{user.title}</div>)
      }
 const renderContent = () => {
  if (isLoading || isFetching) {
   return <Loading message="Obteniendo informacion del artista..." />;
  } else if (error) {
   return <p>Ha ocurrido un error al obtener la informacion del artista</p>;
  }
  return (
   <>
    <RightContainer
     name={artistDetail.name ?? 'Sin titulo'}
    />
    <LeftContainer imageUrl={artistDetail.picture_medium} />
    {songs && songs.length > 0 ? ( 
          <div className="block h-screen p-6 rounded-lg items-center justify-center max-w-sm m-5 px-5 pb-16 text-center" ><h3 className="text-orange-500 text-3xl px-6 flex justify-center">Songs</h3>
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
  <div className="flex flex-col px-16 h-screen items-center justify-center">
   {renderContent()}
  </div>
 );
};

export default Detail;