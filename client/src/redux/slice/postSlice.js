import {createSlice} from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
    posts: [],
    currentPost: null
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [api.fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        [api.fetchSinglePost.fulfilled]: (state, action) => {
            state.currentPost = action.payload;
        },
        [api.createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        },
        [api.updatePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            state.currentPost = action.payload;
            
        },
        [api.deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload._id);
        }
    }
});

export default postSlice.reducer;