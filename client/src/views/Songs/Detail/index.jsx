import { useParams, useNavigate } from "react-router";
import Loading from "../../../components/Loading";
import SongTitle from "./components/SongTitle";
import Lyrics from "./components/Lyrics"
import { useEffect, useState } from "react";
import { useFetchSongQuery, useAddSongMutation, useDeleteSongMutation, useUpdateSongMutation } from "../../../redux/api/songs";
const Detail = () => {
const isLoginTrue = JSON.parse(localStorage.getItem("login")); 
console.log("islogintrue",isLoginTrue);
const navigate = useNavigate();
const { songId, albumId, artistId } = useParams();
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

  const [isEdit, setIsEdit] = useState(false);
  const [songDetailForEdit, setSongDetailForEdit] = useState(songDetail);  
  const [
    updateSong, 
    { data: updateResponse, error, isLoading: isUpdating }, 
  ] = useUpdateSongMutation()
  const [
    addSong, 
    { data: addResponse, addError, isLoading: isAdding }, 
  ] = useAddSongMutation()
  
  const handleAceptar = () => {
    setIsEdit(false);    
    if(albumId && artistId){
      addSong(songDetailForEdit);
      navigate(`/albums/detail/${albumId}`);
    } else{
      updateSong(songDetailForEdit);
    }
      

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
  const Botones = () => {
    if (isEdit)
    return  (
      <div>
      <button className="fancybuttonaccept font-lato font-bold sm:text-xl text-sm text-white capitalize p-2 mr-4" onClick={handleAceptar} >Aceptar</button>
      <button className="fancybuttoncancel font-lato font-bold sm:text-xl text-sm text-white capitalize p-2 ml-4" onClick={handleCancelar} >Cancelar</button>
      </div>
    ) 
    else
      return (<button className="fancybutton font-lato font-bold sm:text-xl text-sm text-white capitalize p-2"  onClick={handleEditar} >Editar</button>)
  };
/*    {isEdit ? (
      <div>
      <button className="fancybuttonaccept font-lato font-bold sm:text-xl text-sm text-white capitalize p-2 mr-4" onClick={handleAceptar} >Aceptar</button>
      <button className="fancybuttoncancel font-lato font-bold sm:text-xl text-sm text-white capitalize p-2 ml-4" onClick={handleCancelar} >Cancelar</button>
      </div>
  ) : (<button className="fancybutton font-lato font-bold sm:text-xl text-sm text-white capitalize p-2"  onClick={handleEditar} >Editar</button>)}*/

  
 const renderContent = () => {
  if (isLoadingSong || isFetchingSong) {
   return <Loading message="Obteniendo informacion de la canción..." />;
  } else if (errorSong) {
   return <p>Ha ocurrido un error al obtener la informacion de la canción</p>;
  }
  return (
   <>
   <div className="flex-row  place-items-center">
    {isLoginTrue && isLoginTrue.userLogin ? (<Botones/>) : (<></>)}
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
    
  <div className="block p-6  rounded-lg items-center justify-center">
   {renderContent()}
  </div>
  </>
 );
};

export default Detail;