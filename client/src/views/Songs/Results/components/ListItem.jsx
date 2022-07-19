const ListItem = ({ id, title, onListItemClick }) => {
  const handleListItemClick = () => {
    onListItemClick(id);
  };

  return (
    <div key={id} className="flex mt-3 justify-center" >
     <div className="w-5/6 flex flex-col items-start px-4">
      <button className="font-lato font-bold sm:text-xl text-sm  text-white capitalize p-4  fancybutton" onClick={handleListItemClick}>{title ?? "Sin titulo"}</button>
      <div className="flex h-full items-end">
      </div>
     </div>
    </div>
  );
}

export default ListItem;