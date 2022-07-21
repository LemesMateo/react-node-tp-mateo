import React from 'react'
import { useParams } from "react-router";

export const Lyrics = ({lyrics, isEdit, lyricsChangeHandler}) => {

  const isLoginTrue = JSON.parse(localStorage.getItem("login")); 
  const { songId } = useParams();

  return (
    <>
    
{/* <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
 */}
     <div className="flex justify-center px-6 text-clip text-xl text-orange-300 ">
     {isLoginTrue && isLoginTrue.userLogin ? 
      (
        <div>
        {isEdit ? (
            <div>
            <textarea value={lyrics}
            className="block p-4 mt-4 w-full rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
            rows="30"
            cols="50"
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