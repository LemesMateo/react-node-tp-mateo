import "./App.css";
import React, {useState} from "react";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import {default as Albums} from './views/Albums/Results';
import {default as Artists} from './views/Artists/Results';
import {default as Songs} from './views/Songs/Results';
import Navbar from "./components/Navbar";
import Home from './views/Home/Home'
import Layout from "./components/Layout";
import {default as AlbumDetails} from "./views/Albums/Detail"
import {default as ArtistDetails} from "./views/Artists/Detail"
import {default as SongDetails} from "./views/Songs/Detail"
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
function App() {
  const [logoutUser, setLogoutUser] = useState(false);
  return (
    <>
    <div>
    <Routes>
      <Route path="/" element={<Layout logoutUser={logoutUser} setLogoutUser={setLogoutUser} />}> 
        <Route path='/albums/detail/:albumId' element={<AlbumDetails/>}/>
        <Route path='/artists/detail/:artistId' element={<ArtistDetails/>}/>
        <Route path='/songs/detail/:songId' element={<SongDetails/>}/>
        <Route path="/login" element={<Login setLogoutUser={setLogoutUser}/>}/>
        <Route path="/register" element={<Register setLogoutUser={setLogoutUser}/>}/>
      </Route>
    </Routes>        
        
    </div>
    </>
  );
}



export default App;