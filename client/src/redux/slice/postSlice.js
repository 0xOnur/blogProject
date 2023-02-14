import {createSlice} from '@reduxjs/toolkit';
import * as api from '../../api/postsApi';

const initialState = {
    posts: [],
    currentPost: null,
    isPending: false,
    error: null,
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [api.fetchPosts.fulfilled]: (state, action) => {
            state.error = null;
            state.currentPost = null;
            state.posts = action.payload;
        },
        [api.fetchSinglePost.fulfilled]: (state, action) => {
            state.error = null;
            state.currentPost = action.payload;
        },
        [api.fetchSinglePost.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.createPost.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.createPost.pending]: (state, action) => {
            state.error = null;
        },
        [api.createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        },
        [api.updatePost.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
            state.currentPost = action.payload;
            state.isPending = false;
        },
        [api.updatePost.pending]: (state, action) => {
            state.error = null;
            state.isPending = true;
        },
        [api.updatePost.rejected]: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
        },
        [api.deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload._id);
        },
        [api.deletePost.rejected]: (state, action) => {
            state.error = action.payload;
        }
    }
});

export default postSlice.reducer;