import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const apiEndpoint = "http://localhost:5000/posts/";

export const fetchPosts = createAsyncThunk(
    'fetchPost',
    async () => {
        const response = await axios.get(`${apiEndpoint}`);
        const data = response.data;
        return data;
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async (postData) => {
        const response = await axios.post(`${apiEndpoint}`, postData);
        const data = response.data;
        return data;
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async ({id, postData}, _) => {
        const response = await axios.put(`${apiEndpoint}${id}`, postData);
        const data = response.data;
        return data;
    }
)


export const deletePost = createAsyncThunk(
    'deletePost',
    async (id) => {
        const response = await axios.delete(`${apiEndpoint}${id}`);
        const data = response.data;
        return data;
    }
)

export const fetchSinglePost = createAsyncThunk(
    'fetchSinglePost',
    async (id) => {
        const response = await axios.get(`${apiEndpoint}${id}`);
        const data = response.data;
        return data;
    }
)