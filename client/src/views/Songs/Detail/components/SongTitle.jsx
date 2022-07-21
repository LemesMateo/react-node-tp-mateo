import { useState } from "react";
import { useParams } from "react-router";
import { useFetchSongQuery } from "../../../../redux/api/songs";
const SongTitle = ({title, isEdit, titleChangeHandler}) => {

    const isLoginTrue = JSON.parse(localStorage.getItem("login")); 
    const [newSong, setNewSong] = useState('')
    const { songId } = useParams();

    return (
     <div className="flex items-start overflow-y-auto  justify-center text-orange-400 align-top ">
       {isLoginTrue && isLoginTrue.userLogin ? 
      (
        <div>
        {isEdit ? (
            <div>
            <input value={title}
            className="bg-gray-700 mt-4 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 font-lato font-bold sm:text-xl text-sm capitalize p-2"
            id={songId}
            onChange={(e) => titleChangeHandler(e)}
            />
            </div>
        ): (
          <h2 className="text-4xl font-bold my-1">
          {`${title}`}
          </h2>
          ) }
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