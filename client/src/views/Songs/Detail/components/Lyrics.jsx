import React from 'react'

export const Lyrics = ({lyrics}) => {
  return (
    <>
     <div className="flex justify-center px-6 text-clip text-xl text-orange-300 ">
        <h2 className='max-w-sm m-5 px-5 pb-16 text-center' >
        {`${lyrics}`} 
        </h2>
     </div>
    </>
  )
}

export default Lyrics;