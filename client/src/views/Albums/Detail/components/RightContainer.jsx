const RightContainer = ({
 title 
}) => {
 return (
  <div className="flex  overflow-y-auto  justify-center text-white">
   <h2 className="text-4xl font-bold my-1">
    {`${title}`}
   </h2>
  </div>
 );
};

export default RightContainer;