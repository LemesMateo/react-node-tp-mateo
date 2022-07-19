const RightContainer = ({
 name 
}) => {
 return (
  <div className="flex flex-row items-start overflow-y-auto my-16 justify-center text-orange-500">
   <h2 className="text-4xl font-bold my-1">
    {`${name}`}
   </h2>
  </div>
 );
};

export default RightContainer;