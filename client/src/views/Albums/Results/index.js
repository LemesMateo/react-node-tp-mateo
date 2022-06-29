import { useNavigate } from 'react-router';
import Loading from "../../../components/Loading";
import List from "./components/List";
import { useFetchAlbumsQuery } from "../../../redux/api/albums";

const Results = (title) => {
 
 const navigate = useNavigate();
 const {
  data: albums,
  isLoading,
  isSuccess,
  isFetching,
  error
} = useFetchAlbumsQuery(title);

 const handleListItemClick = (albumId) => {
  navigate(`/detail/${albumId}`);
 };

 const renderContent = () => {
  if (error)
  return (<Loading message="Buscando albums..." />);
  else if (isLoading || isFetching)
    return (<Loading message="Buscando albums..." />);
  else if (isSuccess && albums)
    return (<List data={albums} onListItemClick={handleListItemClick} />);
 };

 return (
  <div className="flex flex-row">
    <div className="w-5/5	h-screen overflow-y-auto px-10">
      {renderContent()}
    </div>
  </div>
 );
};

export default Results;