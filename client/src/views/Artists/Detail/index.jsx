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
        return songs.map((user) => <div key={user.id}>{user.title}</div>)
      }
console.log(artistId, artistDetail, songs)
 const renderContent = () => {
  if (isLoading || isFetching) {
   return <Loading message="Obteniendo informacion del artista..." />;
  } else if (error) {
   return <p>Ha ocurrido un error al obtener la informacion del artista</p>;
  }
  return (
   <>
    <LeftContainer imageUrl={artistDetail.picture_small} />
    <RightContainer
     name={artistDetail.name ?? 'Sin titulo'}
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