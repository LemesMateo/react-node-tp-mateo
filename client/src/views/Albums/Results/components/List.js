import ListItem from "./ListItem";

const List = ({ data, onListItemClick }) => {
 return data?.map(album => <ListItem key={album.id} {...album} onListItemClick={onListItemClick} />);
};

export default List;