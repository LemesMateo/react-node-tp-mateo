import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { store } from './app/store'
import './index.css'
import {Provider} from "react-redux"
import App from './App'
import Artists from './routes/artists'
import Top10 from './routes/top10'
import {default as AlbumDetails} from "./views/Albums/Detail"
import {default as ArtistDetails} from "./views/Artists/Detail"
import {default as SongDetails} from "./views/Artists/Detail"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route path='/top10' element={<Top10/>}></Route>
      <Route path='/albums/detail/:albumId' element={<AlbumDetails/>}></Route>
      <Route path='/artists/detail/:artistId' element={<ArtistDetails/>}></Route>
      <Route path='/songs/detail/:songId' element={<SongDetails/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>  
    </Provider>
  </React.StrictMode>
)


