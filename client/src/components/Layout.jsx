import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../views/Home/Home'
import Navbar from './Navbar'
const Layout = () => {
  return (
    <>

    <Navbar/>
    <Home/>
    <main>        
    </main>
    </>
  )
}


export default Layout