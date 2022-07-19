import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { store } from './app/store'
import './index.css'
import {Provider} from "react-redux"
import App from './App'
import {default as AlbumDetails} from "./views/Albums/Detail"
import {default as ArtistDetails} from "./views/Artists/Detail"
import {default as SongDetails} from "./views/Artists/Detail"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<App />}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
)


