import React from 'react'
import { useParams } from "react-router";

export const Lyrics = ({lyrics, isEdit, lyricsChangeHandler}) => {

  const isLoginTrue = JSON.parse(localStorage.getItem("login")); 
  const { songId } = useParams();

  return (
    <>
     <div className="flex justify-center px-6 text-clip text-xl text-orange-300 ">
     {isLoginTrue && isLoginTrue.userLogin ? 
      (
        <div>
        {isEdit ? (
            <div>
            <textarea value={lyrics}
            id={songId}
            onChange={(e) => lyricsChangeHandler(e)}
            />
            </div>
        ): (
          <h2 className="max-w-sm m-5 px-5 pb-16 text-center">
          {`${lyrics}`}
          </h2>
          ) }
        </div>
        
      ) : (
        <h2 className="max-w-sm m-5 px-5 pb-16 text-center">
        {`${lyrics}`}
        </h2>
      )}
     </div>
    </>
  )
}

export default Lyrics;