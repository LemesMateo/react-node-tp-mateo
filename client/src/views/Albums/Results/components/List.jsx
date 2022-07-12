import ListItem from "./ListItem";

const List = ({ data, onListItemClick }) => {
 return data.map(albums => <ListItem key={albums.id} {...albums} onListItemClick={onListItemClick} />);
};

export default List;


// return albums.map((user) => <div key={user.id}>{user.title}</div>)



