import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const postsEndpoint = "http://192.168.10.107:5000/posts/";

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
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.post(`${postsEndpoint}`, postData, config);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const updatePost = createAsyncThunk(
    'updatePost',
    async ({id, formData}, {rejectWithValue}, _) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.put(`${postsEndpoint}${id}`, formData, config);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deletePost = createAsyncThunk(
    'deletePost',
    async (id, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${postsEndpoint}${id}`);
            const data = response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)