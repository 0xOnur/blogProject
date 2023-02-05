import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const postsEndpoint = "http://localhost:5000/posts/";

export const fetchPosts = createAsyncThunk(
    'fetchPost',
    async () => {
        const response = await axios.get(`${postsEndpoint}`);
        const data = response.data;
        return data;
    }
)

export const createPost = createAsyncThunk(
    'createPost',
    async (postData, {rejectWithValue}) => {
        try {
            const response = await axios.post(`${postsEndpoint}`, postData);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async ({id, postData}, _) => {
        const response = await axios.put(`${postsEndpoint}${id}`, postData);
        const data = response.data;
        return data;
    }
)


export const deletePost = createAsyncThunk(
    'deletePost',
    async (id, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    id: `${id}`
                },
            };
            const response = await axios.delete(`${postsEndpoint}${id}`, config);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
        
    }
)

export const fetchSinglePost = createAsyncThunk(
    'fetchSinglePost',
    async (id) => {
        const response = await axios.get(`${postsEndpoint}${id}`);
        const data = response.data;
        return data;
    }
)