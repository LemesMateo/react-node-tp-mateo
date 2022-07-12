import { useNavigate } from 'react-router';
import Loading from "../../../components/Loading";
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
    return (<div><h3>Songs</h3><List data={songs} onListItemClick={handleListItemClick} /></div>);
 };

 return (
  <div className="flex flex-row">
    <div className="w-5/5	h-screen overflow-y-auto px-10">
      {renderContent()}
    </div>
  </div>
 )
};

export default Results;