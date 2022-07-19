import { useParams } from "react-router";
import Loading from "../../../components/Loading";
import SongTitle from "./components/SongTitle";
import Lyrics from "./components/Lyrics"
import { useFetchSongQuery, useAddSongMutation, useDeleteSongMutation, useUpdateSongMutation } from "../../../redux/api/songs";
const Detail = () => {
const { songId } = useParams();
const {
        data: songDetail,
        isLoading: isLoadingSong,
        isSuccess: isSuccessSong,
        isFetching: isFetchingSong,
        error: errorSong,
      } = useFetchSongQuery(songId);
/* const [addSong] = useAddSongMutation()
const [updateSong] = useUpdateSongMutation()
const [deleteSong] = useDeleteSongMutation() */
 const renderContent = () => {
  if (isLoadingSong || isFetchingSong) {
   return <Loading message="Obteniendo informacion de la canción..." />;
  } else if (errorSong) {
   return <p>Ha ocurrido un error al obtener la informacion de la canción</p>;
  }
  return (
   <>
    <SongTitle
     title={songDetail.title ?? 'Sin titulo 2'}
    />
    <Lyrics lyrics={songDetail.lyrics} />
   </>
  )
 };

return (
    <>
  <div className="flex flex-row px-16 h-screen items-center justify-center">
   {renderContent()}
  </div>
  </>
 );
};

export default Detail;