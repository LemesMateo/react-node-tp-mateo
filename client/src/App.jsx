import "./App.css";
import React, { useState } from "react";
import { createSearchParams, Link, Outlet, Route, Routes } from "react-router-dom";
import { useFetchSongsQuery } from "./redux/api/songs";
import { useFetchArtistsQuery } from "./redux/api/artists";
import { useFetchAlbumsQuery } from "./redux/api/albums";
import {default as Albums} from './views/Albums/Results';
import {default as Artists} from './views/Artists/Results';
import {default as Songs} from './views/Songs/Results';
import Navbar from "./components/Navbar";
import Home from './views/Home/Home'
import Layout from "./components/Layout";
import {default as AlbumDetails} from "./views/Albums/Detail"
import {default as ArtistDetails} from "./views/Artists/Detail"
import {default as SongDetails} from "./views/Songs/Detail"
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./features/auth/Welcome";
import UsersList from "./features/users/UsersList";
import Login from "./services/login";
function App() {
  return (
    <>
    <div>
    <Routes>
      <Route path="/" element={<Layout/>}> 
        <Route path='/albums/detail/:albumId' element={<AlbumDetails/>}/>
        <Route path='/artists/detail/:artistId' element={<ArtistDetails/>}/>
        <Route path='/songs/detail/:songId' element={<SongDetails/>}/>
        <Route path="login" element={<Login/>}/>
        <Route element={<RequireAuth/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="userslist" element={<UsersList/>}/>
        </Route>
      </Route>
    </Routes>        
        
    </div>
    </>
  );
}



export default App;