import React from 'react'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../views/Home/Home'
import Navbar from './Navbar'
import { useNavigate } from 'react-router';

const Layout = ({ logoutUser, setLogoutUser }) => {
  const navigate = useNavigate();
  const [search, setSearch] =  useState([]);
  const inputSearchChangeHandler = (e) => {
    setSearch(e.target.value);
    navigate(`/${e.target.value}`);
  };

  return (
    <>

    <Navbar logoutUser={logoutUser} setLogoutUser={setLogoutUser}/>
    <div className="inline-flex flex-col justify-center relative text-gray-500">
        
      <input
          className="input"
          type="text"
          name="text"
          required=""
          placeholder="Search Songs, Artists, Albums"
          id="search"
          value={search}
          onChange={(e) => inputSearchChangeHandler(e)}
        >
        </input>
        
    </div>
    <main>        
    </main>
    </>
  )
}


export default Layout