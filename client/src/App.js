import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import {fetchPosts} from './api/index';
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';
import PostDetails from './components/PostDetails';
import HomeLayout from './components/HomeLayout';

const App = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    
    <div>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index={true} element={<PostList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/add" element={<AddPostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App