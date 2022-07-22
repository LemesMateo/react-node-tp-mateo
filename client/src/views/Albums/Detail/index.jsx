import { useParams } from "react-router";
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { useFetchAlbumQuery } from "../../../redux/api/albums";
import { useFetchSongsByAlbumIdQuery, useDeleteSongMutation } from "../../../redux/api/songs";
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
        refetch 
      } = useFetchSongsByAlbumIdQuery(albumId);
  const [
    deleteSong, // This is the mutation trigger
    { data: deleteResponse, errorDelete, isLoading: isDelete }, // This is the destructured mutation result
  ] = useDeleteSongMutation()
        
const deleteHandler = (songId) =>
{
  console.log('deleteHandler', songId)
  deleteSong(songId);    

  
  refetch();
}
const SongsMap = () => {
  return songs.map((song) => <div className="flex justify-center text-clip text-xl text-orange-300 mb-6 mt-6" key={song.id}><h2 className="border rounded-lg border-gray-600  px-6 mr-4" >{song.title}</h2><button className=" font-lato font-bold sm:text-lg text-sm p-2 capitalize ml-4 fancybuttoncancel" onClick={(e) =>deleteHandler(song.id)}>delete</button></div>)
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
    <RightContainer
     title={albumDetail.title ?? 'Sin titulo'}
    />
    <LeftContainer imageUrl={albumDetail.cover_big} />
    {songs && songs.length > 0 ? ( 
          <div className="block h-screen p-6 rounded-lg items-center justify-center max-w-sm m-5 px-5 pb-16 text-center" ><h3 className="text-orange-500 sm:text-4xl text-3xl font-bold px-6 flex justify-center" >Songs</h3>
          <SongsMap />
          <Link to={`/songs/add/${albumId}/${songs[0].artist_id}`}>
            <button className="fancybuttonaccept capitalize text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xl font-medium">
            add songs
            </button>
          </Link>
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