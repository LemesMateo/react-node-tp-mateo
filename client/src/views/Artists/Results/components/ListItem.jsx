const ListItem = ({ id, picture_medium, name, onListItemClick }) => {
  const handleListItemClick = () => {
    onListItemClick(id);
  };

  return (
    <div key={id} className="flex flex-row w-full mt-16" style={{ minWidth: 650 }}>
     <div className="w-1/6">
      <img src={picture_medium} alt={name} className="w-32" />
     </div>
     <div className="w-5/6 flex flex-col items-start py-1 px-4">
      <p className="font-lato text-3xl">{name ?? "Sin titulo"}</p>
      <div className="flex h-full items-end">
       <button 
        className="border-2 border-red-400 rounded-md 
          w-48 h-10 text-xl text-red-400 hover:bg-red-400 hover:text-white"
        onClick={handleListItemClick}
       >
        Ver mas
       </button>
      </div>
     </div>
    </div>
  );
}

export default ListItem;