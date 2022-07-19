const SongTitle = ({title}) => {
    return (
     <div className="flex flex-col w-2/3 items-start overflow-y-auto my-16 justify-center text-white">
      <h2 className="text-4xl font-bold my-1">
       {`${title}`}
      </h2>
     </div>
    );
};
   
export default SongTitle;