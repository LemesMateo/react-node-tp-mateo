import ListItem from "./ListItem";

const List = ({ data, onListItemClick }) => {
 return data.map(artists => <ListItem key={artists.id} {...artists} onListItemClick={onListItemClick} />);
};

export default List;


