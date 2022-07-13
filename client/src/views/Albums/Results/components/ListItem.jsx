const ListItem = ({ id, cover_small, title, onListItemClick }) => {
  const handleListItemClick = () => {
    onListItemClick(id);
  };

  return (
    <div key={id} className="flex w-full mt-3 justify-center" >
     <div className="w-1/6">
      <img src={cover_small} alt={title} className="w-14  hover:scale-110 transition duration-300 ease-in-out" />
     </div>
     <div className="w-5/6 flex flex-col items-start px-4">
      <button className="font-lato text-3x font-bold text-white capitalize fancybutton max-w-sm" onClick={handleListItemClick}>{title ?? "Sin titulo"}</button>
      <div className="flex h-full items-end">
      </div>
     </div>
    </div>
  );
}

export default ListItem;