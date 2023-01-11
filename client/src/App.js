import React from 'react';
import PostList from './components/PostList';
import { Routes, Route, Navigate } from "react-router-dom";
import AddPostForm from './components/AddPostForm';

const App = () => {

  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Navigate to="/posts" />}/>
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/add" element={<AddPostForm />} />
        
      </Routes>
    </div>
  )
}

export default App