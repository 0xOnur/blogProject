import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userEndpoint = "http://192.168.10.107:5000/users/";

export const loginUser = createAsyncThunk(
    "loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${userEndpoint}login`, userData);
            const data = response.data;
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const tokenIsExpired = createAsyncThunk(
    'tokenIsExpired',
    async(refreshToken, {rejectWithValue}) => {
    if(refreshToken) {
        try {
            const response = await axios.post(`${userEndpoint}token`, {refreshToken});
            const data = response.data;
            return data;
        }catch(error) {
            return rejectWithValue(error.response.data);
        }
    } 
});

export const fetchSingleUser = createAsyncThunk(
    "fetchSingleUser",
    async (id) => {
        const response = await axios.get(`${userEndpoint}${id}`);
        const userFound = response.data;
        return userFound;
    }
);



export const fetchUserPosts = createAsyncThunk(
    "fetchUserPosts",
    async (id) => {
        const response = await axios.get(`${userEndpoint}${id}/posts`);
        const data = response.data;
        return data;
    }
);

export const logoutUser = createAsyncThunk(
    "logoutUser",
    async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return [];
    }
);


export const getUserById = createAsyncThunk(
    "getUserById",
    async (id) => {
        const response = await axios.get(`${userEndpoint}${id}`);
        const data = response.data;
        return data;
    }
);


export const createUser = createAsyncThunk(
    "createUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${userEndpoint}register`, userData);
            const data = response.data;
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async ({ id, userData}, {rejectWithValue}, _) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };

            const response = await axios.put(`${userEndpoint}${id}`, userData, config);
            const data = response.data;
            return data;
        }catch (error){
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id) => {
        const response = await axios.delete(`${userEndpoint}${id}`);
        const data = response.data;
        return data;
    }
);

export const followUser = async ({id, currentUserId}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        const response = await axios.put(`${userEndpoint}follow/${id}`, {currentUserId}, config);
        const data = response.data;

        return data;
    } catch (error) {
        return error;
    }
}

export const unFollowUser = async ({id, currentUserId}) => {
    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        };

        const response = await axios.put(`${userEndpoint}unfollow/${id}`, {currentUserId}, config);
        const data = response.data;
        return data;
    } catch (error) {
        return error;
    }
}

export const getFollowers = async (id) => {
    try {
        const response = await axios.get(`${userEndpoint}${id}/followers`);
        const data = response.data;
        return data;
    } catch (error) {
        return error;
    }
}

export const getFollowing = async (id) => {
    try {
        const response = await axios.get(`${userEndpoint}${id}/following`);
        const data = response.data;
        return data;
    } catch (error) {
        return error;
    }
}


