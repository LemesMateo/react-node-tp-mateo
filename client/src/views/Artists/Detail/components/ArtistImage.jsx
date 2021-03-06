const ArtistImage = ({ url }) => (
 <div className="flex justify-start">
  <img src={url} className="w-80 hover:scale-110 transition duration-300 ease-in-out inset-0 " alt="artist-detail" />
 </div>
)

export default ArtistImage;