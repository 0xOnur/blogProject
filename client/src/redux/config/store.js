import {configureStore } from '@reduxjs/toolkit';
import postsReducer from '../slice/postSlice';

const store = configureStore({
    reducer: {
        post: postsReducer,
    }
});

export default store;