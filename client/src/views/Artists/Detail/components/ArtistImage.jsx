const ArtistImage = ({ url }) => (
 <div className="w-1/3 flex justify-center">
  <img src={url} className="w-150 max-w-xs hover:scale-110 transition duration-300 ease-in-out" alt="artist-detail" />
 </div>
)

export default ArtistImage;