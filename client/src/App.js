import React, {useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';
import PostDetails from './components/PostDetails';
import HomeLayout from './components/HomeLayout';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import Logout from './components/user/Logout';
import jwt_decode from "jwt-decode";

import {tokenIsExpired, logoutUser} from './api/userApi';

const App = () => {

  const dispatch = useDispatch();


  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    if(refreshToken && accessToken) {
      const decodedToken = jwt_decode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000)

      console.log("decodedToken:", decodedToken.exp);
      console.log("currentTime:", currentTime);
      
      if(decodedToken.exp < currentTime) {
        console.log("token expired");
        dispatch(tokenIsExpired(refreshToken)).then (response => {
          console.log(response);
          if(response?.error){
            dispatch(logoutUser());
          }
        })
      }
    }
  }, [dispatch, refreshToken, accessToken]);

  

  return (
    
    <div>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
            <Route index element={<PostList />} />
            <Route path="/posts/add" element={<AddPostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<h1>404 NotFound</h1>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App