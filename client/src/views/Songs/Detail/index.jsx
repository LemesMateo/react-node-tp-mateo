import { useParams, useNavigate } from "react-router";
import Loading from "../../../components/Loading";
import SongTitle from "./components/SongTitle";
import Lyrics from "./components/Lyrics"
import { useEffect, useState } from "react";
import { useFetchSongQuery, useAddSongMutation, useDeleteSongMutation, useUpdateSongMutation } from "../../../redux/api/songs";
const Detail = () => {
const navigate = useNavigate();
const { songId, albumId, artistId } = useParams();
console.log("params:",songId, albumId, artistId)
const {
        data: songDetail,
        isLoading: isLoadingSong,
        isSuccess: isSuccessSong,
        isFetching: isFetchingSong,
        error: errorSong,
      } = useFetchSongQuery(songId);
      
      useEffect(() => {
        if(albumId && artistId)
        {
          setSongDetailForEdit({
            albumId:albumId,
            artistId:artistId,
            title:'',
            lyrics:''
          });  
          setIsEdit(true);
        }
        else{
          setSongDetailForEdit(songDetail);
        }
        
      }, [songDetail])
      

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



  const [isEdit, setIsEdit] = useState(false);
  const [songDetailForEdit, setSongDetailForEdit] = useState(songDetail);  
  const [
    updateSong, // This is the mutation trigger
    { data: updateResponse, error, isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdateSongMutation()
  const [
    addSong, // This is the mutation trigger
    { data: addResponse, addError, isLoading: isAdding }, // This is the destructured mutation result
  ] = useAddSongMutation()



  
  const handleAceptar = () => {
    setIsEdit(false);
    console.log("grabamos",songDetailForEdit)
    
    console.log(updateResponse, error)
    if(albumId && artistId){
      addSong(songDetailForEdit);
      navigate(`/albums/detail/${albumId}`);
      
    } else{
      updateSong(songDetailForEdit);
    }
      
    //llamar al mutations
  }
  const handleCancelar = () => {
      setIsEdit(false);
  }
  const handleEditar = () => {
      setIsEdit(true);
  }

  const titleChangeHandler = (e) => {
    setSongDetailForEdit({...songDetailForEdit, title:e.target.value});
  };

  const lyricsChangeHandler = (e) => {
    setSongDetailForEdit({...songDetailForEdit, lyrics:e.target.value});
  };

 const renderContent = () => {
  if (isLoadingSong || isFetchingSong) {
   return <Loading message="Obteniendo informacion de la canción..." />;
  } else if (errorSong) {
   return <p>Ha ocurrido un error al obtener la informacion de la canción</p>;
  }
  return (
   <>
   <div className="flex-row  place-items-center">
   {isEdit ? (
            <div>
            <button onClick={handleAceptar} >Aceptar</button>
            <button onClick={handleCancelar} >Cancelar</button>
            </div>
        ) : (<button onClick={handleEditar} >Editar</button>)}
    <SongTitle
     title={songDetailForEdit ?  (songDetailForEdit.title ?? 'Sin titulo 2') : 'Sin titulo 2'} isEdit={isEdit} titleChangeHandler={titleChangeHandler}
    />
    <Lyrics lyrics={songDetailForEdit ?  (songDetailForEdit.lyrics ?? '') : ''} isEdit={isEdit} lyricsChangeHandler={lyricsChangeHandler}/>
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