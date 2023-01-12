import React from 'react';
import PostList from './components/PostList';
import { Routes, Route } from "react-router-dom";
import AddPostForm from './components/AddPostForm';
import PostDetails from './components/PostDetails';
import HomeLayout from './components/HomeLayout';
import PostsLayout from './components/PostsLayout';

const App = () => {

  return (
    <div>
      <Routes>
        
        <Route path='/' element={<HomeLayout />}>
          <Route index={true} element={<PostList />} />
        </Route>

        <Route path="/posts" element={<PostsLayout />}>
            <Route path="/posts/add" element={<AddPostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Route>
        
      </Routes>
    </div>
  )
}

export default App