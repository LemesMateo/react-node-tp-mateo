import { useState } from "react";
import { useParams } from "react-router";
import { useFetchSongQuery, useAddSongMutation, useDeleteSongMutation, useUpdateSongMutation, songsApi } from "../../../../redux/api/songs";
const SongTitle = ({title}) => {
    const [isEdit, setIsEdit] = useState(false);
    const isLoginTrue = JSON.parse(localStorage.getItem("login")); 
    const [updateSong] = useUpdateSongMutation()
    const [deleteSong] = useDeleteSongMutation()
    const [newSong, setNewSong] = useState('')
    const inputChangeHandler= (e) => {
        title = e.target.value;
    }
    const { songId } = useParams();
const {
        data: songDetail,
        isLoading: isLoadingSong,
        isSuccess: isSuccessSong,
        isFetching: isFetchingSong,
        error: errorSong,
      } = useFetchSongQuery(songId);
    const handleAceptar = () => {
        setIsEdit(false);
        //llamar al mutations
    }
    const handleCancelar = () => {
        setIsEdit(false);
    }
    const handleEditar = () => {
        setIsEdit(true);
    }
    return (
     <div className="flex items-start overflow-y-auto  justify-center text-orange-400 align-top ">
       {isLoginTrue && isLoginTrue.userLogin ? 
      (
        <div>
        <h2 className="text-4xl font-bold my-1">
        {`${title}`}
        </h2>
        {isEdit ? (
            <div>
            <input 
            id={songId}
            onChange={() => updateSong({...songDetail, completed: !songDetail.completed})}/>
            <button onClick={handleAceptar} >Aceptar</button>
            <button onClick={handleCancelar} >Cancelar</button>
            </div>
        ) : (<button onClick={handleEditar} >Editar</button>)}
        </div>
        
      ) : (
        <h2 className="text-4xl font-bold my-1">
        {`${title}`}
        </h2>
      )}
     </div>
    );
};
   
export default SongTitle;