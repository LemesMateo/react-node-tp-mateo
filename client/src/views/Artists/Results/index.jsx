import { useNavigate } from 'react-router';
import Loading from "../../../components/Loading";
import List from "./components/List";


const Results = (props) => {
 const {artists, isLoadingArtists, isSuccessArtists, isFetchingArtists, errorArtists} = props
 const navigate = useNavigate();


 const handleListItemClick = (artistId) => {
  navigate(`/artists/detail/${artistId}`);
 };

 const renderContent = () => {
  if (errorArtists)
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-xl">{error.error}</p>
    </div>
  );
  else if (isLoadingArtists || isFetchingArtists)
    return (<div className="spinner">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>);
  else if (isSuccessArtists && artists)
    return (<div><h3>Artists</h3><List data={artists} onListItemClick={handleListItemClick} /></div>);
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