import { useNavigate } from 'react-router';
import Loading from "../../../components/Loading";
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
    return (<div><h3>Albums</h3><List data={albums} onListItemClick={handleListItemClick} /></div>);
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