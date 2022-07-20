import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../views/Home/Home'
import Navbar from './Navbar'
const Layout = ({ logoutUser, setLogoutUser }) => {
  return (
    <>

    <Navbar logoutUser={logoutUser} setLogoutUser={setLogoutUser}/>
    <Home/>
    <main>        
    </main>
    </>
  )
}


export default Layout