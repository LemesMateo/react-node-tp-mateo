import "../../App.css";
import React, { useState } from "react";
import { useFetchSongsQuery } from "../../redux/api/songs";
import { useFetchArtistsQuery } from "../../redux/api/artists";
import { useFetchAlbumsQuery } from "../../redux/api/albums";
import {default as Albums} from '../Albums/Results';
import {default as Artists} from '../Artists/Results';
import {default as Songs} from '../Songs/Results';
import Navbar from "../../components/Navbar";
import { Outlet, useParams } from "react-router";

function Home() {
  const { search } = useParams();
  //
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
    <>
    <div>
    <div className="inline-flex flex-col justify-center relative text-gray-500">
        <div className="flex flex-col sm:flex-row justify-evenly relative" >
            <Songs {...propSongs}/>
            <Artists {...propArtists}/>
          <Albums {...propAlbums}  />   
        </div>
        <Outlet/>
        </div>
        </div>
    </>
    )
}

export default Home;