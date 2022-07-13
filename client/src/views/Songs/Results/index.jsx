import { useNavigate } from 'react-router';
import List from "./components/List";


const Results = (props) => {
 const {songs, isLoadingSongs, isSuccessSongs, isFetchingSongs, errorSongs} = props
 const navigate = useNavigate();
 const handleListItemClick = (songId) => {
  navigate(`/songs/detail/${songId}`);
 };

 const renderContent = () => {
  if (errorSongs)
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xl">{error.error}</p>
    </div>
  );
  else if (isLoadingSongs || isFetchingSongs)
    return (<div className="spinner">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>);
  else if (isSuccessSongs && songs)
    return (<div><h3 className='font-bold font-lato text-3xl text-white '  >Songs</h3><List data={songs} onListItemClick={handleListItemClick} /></div>);
 };

 return (
  <div className="flex">
    <div className="h-screen  px-10">
      {renderContent()}
    </div>
  </div>
 )
};

export default Results;