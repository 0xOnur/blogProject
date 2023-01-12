import React from 'react'
import { Outlet } from 'react-router-dom';
import NAV from './Navbar';

const HomeLayout = () => {
  return (
    <>
        <NAV isActive={'home'}/>
        <Outlet />
    </>
  )
}

export default HomeLayout