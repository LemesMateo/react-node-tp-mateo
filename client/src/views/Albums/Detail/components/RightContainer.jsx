const RightContainer = ({
 title 
}) => {
 return (
  <div className="flex flex-row items-start my-16 justify-center text-orange-500">
   <h2 className="text-4xl font-bold my-1">
    {`${title}`}
   </h2>
  </div>
 );
};

export default RightContainer;