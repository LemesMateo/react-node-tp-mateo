import { useParams } from "react-router";
import Loading from "../../../components/Loading";
import SongTitle from "./components/SongTitle";
import Lyrics from "./components/Lyrics"
import { useState } from "react";
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

/* const handleSubmit = (e) => {
  e.preventDefault();
  addTodo({userId:1, title:newSong, completed:false})
  setNewSong('')
} */
/* const newItemSection = 
<form onSubmit={handleSubmit}>
  <label htmlFor="new-song">Enter a new song</label>
  <div className="new-song">
    <input
    type="text"
    id="new-song"
    value={newSong}
    onChange={(e) => setNewSong(e.target.value)}
    placeholder="Enter new Song"
    />
  </div>
  <button className="submit" ></button>

</form>
 */

 const renderContent = () => {
  if (isLoadingSong || isFetchingSong) {
   return <Loading message="Obteniendo informacion de la canción..." />;
  } else if (errorSong) {
   return <p>Ha ocurrido un error al obtener la informacion de la canción</p>;
  }
  return (
   <>
   <div className="flex-row  place-items-center">
    <SongTitle
     title={songDetail.title ?? 'Sin titulo 2'}
    />
    <Lyrics lyrics={songDetail.lyrics} />
    </div>
   </>
  )
 };

return (
    <>
    
{/* <a href="#" class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a> */}

  <div className="block p-6  rounded-lg items-center justify-center">
   {renderContent()}
  </div>
  </>
 );
};

export default Detail;