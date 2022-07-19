import React from 'react'

export const Lyrics = ({lyrics}) => {
  return (
    <>
     <div className="w-1/3 flex justify-center">
        <h2>
        {`${lyrics}`} 
        </h2>
     </div>
    </>
  )
}

export default Lyrics;