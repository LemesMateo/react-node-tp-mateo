import "./App.css";
import React, { useState } from "react";
import { createSearchParams, Link, Outlet } from "react-router-dom";
import { useFetchSongsQuery } from "./redux/api/songs";
import { useFetchArtistsQuery } from "./redux/api/artists";
import { useFetchAlbumsQuery } from "./redux/api/albums";
import {default as Albums} from './views/Albums/Results';
import {default as Artists} from './views/Artists/Results';
import {default as Songs} from './views/Songs/Results';

function App() {
  const [search, setSearch] = useState([]);
  const {
    data: songs,
    isLoading: isLoadingSongs,
    isSuccess: isSuccessSongs,
    isFetching: isFetchingSongs,
    error: errorSongs,
  } = useFetchSongsQuery(search, {skip: search.length>2 ? false : true});
  const {
    data: artists,
    isLoading: isLoadingArtists,
    isSuccess: isSuccessArtists,
    isFetching: isFetchingArtists,
    error: errorArtists,
  } = useFetchArtistsQuery(search, {skip: search.length>2 ? false : true});
  const {
    data: albums,
    isLoading: isLoadingAlbums,
    isSuccess: isSuccessAlbums,
    isFetching: isFetchingAlbums,
    error: errorAlbums,
  } = useFetchAlbumsQuery(search, {skip: search.length>2 ? false : true});

  const inputSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };
  let propAlbums = {
    albums, isLoadingAlbums, isSuccessAlbums, isFetchingAlbums, errorAlbums
  }
   let propArtists = {
    artists, isLoadingArtists, isSuccessArtists, isFetchingArtists, errorArtists
   }

   let propSongs = {
    songs, isLoadingSongs, isSuccessSongs, isFetchingSongs, errorSongs
   }

 
  return (
    <div>
      <ul>
        <nav>
          <Link to={"/"} className="text-3xl font-bold underline" >Home</Link>
          <Link to={"/top10"} className="text-3xl font-bold underline">Top10</Link>
        </nav>
        </ul>
        <input
          className="input"
          type="text"
          name="text"
          required=""
          placeholder="Search Songs, Artists, Albums"
          id="search"
          value={search}
          onChange={(e) => inputSearchChangeHandler(e)}
        ></input>
        
            <Artists {...propArtists}/>
            <Songs {...propSongs}/>
          <Albums {...propAlbums}  />      
    </div>
  );
}



export default App;