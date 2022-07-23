import { useNavigate } from 'react-router';
import List from "./components/List";


const Results = (props) => {
 const {albums, isLoadingAlbums, isSuccessAlbums, isFetchingAlbums, errorAlbums} = props
 const navigate = useNavigate();


 const handleListItemClick = (albumId) => {
  navigate(`/albums/detail/${albumId}`);
 };

 const renderContent = () => {
  if (errorAlbums)
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xl">{error.error}</p>
    </div>
  );
  else if (isLoadingAlbums || isFetchingAlbums)
    return (<div className="spinner">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>);
  else if (isSuccessAlbums && albums)
    return (<div><h3 className='font-bold font-lato sm:text-3xl text-sm text-white mt-2'>Albums</h3><List data={albums} onListItemClick={handleListItemClick} /></div>);
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