import ListItem from "./ListItem";

const List = ({ data, onListItemClick }) => {
 return data.map(songs => <ListItem key={songs.id} {...songs} onListItemClick={onListItemClick} />);
};

export default List;



