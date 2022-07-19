import "../../../../App.css"
const ListItem = ({ id, picture_small, name, onListItemClick }) => {
  const handleListItemClick = () => {
    onListItemClick(id);
  };

  return (
    <div key={id} className="flex w-full mt-3 justify-center">
     <div className="w-1/6">
      <img src={picture_small} alt={name} className="w-14 hover:scale-110 transition duration-300 ease-in-out" />
     </div>
     <div className="w-5/6 flex flex-col items-start px-4">
      <button className="font-lato sm:text-xl text-sm font-bold text-white p-4 fancybutton capitalize" onClick={handleListItemClick}>{name ?? "Sin titulo"}</button>
      <div className="flex h-full items-end">
      </div>
     </div>
    </div>
  );
}

export default ListItem;