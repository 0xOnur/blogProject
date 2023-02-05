import React from 'react';
import { Routes, Route } from "react-router-dom";
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';
import PostDetails from './components/PostDetails';
import HomeLayout from './components/HomeLayout';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import Logout from './components/user/Logout';

const App = () => {

  return (
    
    <div>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
            <Route index element={<PostList />} />
            <Route path="/posts/add" element={<AddPostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App