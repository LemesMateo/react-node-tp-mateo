import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { store } from './app/store'
import './index.css'
import {Provider} from "react-redux"

import App from './App'
import Artists from './routes/artists'
import Top10 from './routes/top10'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} >
      <Route path='/artists' element={<Artists/>}></Route>
      <Route path='/top10' element={<Top10/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>  
    </Provider>
  </React.StrictMode>
)
