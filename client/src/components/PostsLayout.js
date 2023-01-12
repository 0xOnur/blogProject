import React from 'react'
import { Outlet } from 'react-router-dom'
import NAV from './Navbar'

const PostsLayout = () => {
  return (
    <>
      <NAV isActive={'newPost'} />
      <Outlet />
    </>
    
  )
}

export default PostsLayout