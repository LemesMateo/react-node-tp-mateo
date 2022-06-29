import "./App.css";
import React, { useEffect, useState } from "react";
import { createSearchParams, Link, Outlet } from "react-router-dom";
import { useFetchSongsQuery } from "./redux/api/songs";
import { useFetchArtistsQuery } from "./redux/api/artists";
import { useFetchAlbumsQuery } from "./redux/api/albums";
import Results, * as Albums from "./views/Albums/Results"

function App() {
  const [search, setSearch] = useState([]);
  const {
    data: songs,
    isLoading: isLoadingSongs,
    isSuccess: isSuccessSongs,
    isFetching: isFetchingSongs,
    error: errorSongs,
  } = useFetchSongsQuery(search);
  const {
    data: artists,
    isLoading: isLoadingArtists,
    isSuccess: isSuccessArtists,
    isFetching: isFetchingArtists,
    error: errorArtists,
  } = useFetchArtistsQuery(search);
  

  const inputSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const SongsMap = () => {
    return songs.map((user) => <div key={user.id}>{user.title}</div>)
  }
  const ArtistsMap = () => {
    return artists.map((user) => <div key={user.id}>{user.name}</div>)
  }
  const AlbumsMap = () => {
    return albums.map((user) => <div key={user.id}>{user.title}</div>)
  }
  return (
    <div>
      <ul>
        <nav>
          <Link to={"/"} className="text-3xl font-bold underline" >Home</Link>
          <Link to={"/artists"} className="text-3xl font-bold underline">Artistas</Link>
          <Link to={"/top10"} className="text-3xl font-bold underline">Top10</Link>
          <Outlet></Outlet>
        </nav>
        <input
          value={search}
          onChange={(e) => inputSearchChangeHandler(e)}
        ></input>
        
        {isSuccessSongs && search.length > 2 ? ( 
          <div><h3>Songs</h3>
          <SongsMap />
          </div>         
          ) : isFetchingSongs ? (
          <h3>Loading...</h3>
        ) : (
          <></>
        )}      
         {isSuccessArtists && search.length > 2 ? (
          <div>
          <h3>Artists</h3>
          <ArtistsMap/>
          </div>
        ) : isFetchingArtists ? (
          <h3>Loading...</h3>
        ) : (
          <></>
        )}
         <Albums title={search} />
      </ul>
    </div>
  );
}

export default App;
