import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const userEndpoint = "http://localhost:5000/users/";

export const loginUser = createAsyncThunk(
    "loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${userEndpoint}login`, userData);
            const data = response.data;
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSingleUser = createAsyncThunk(
    "fetchSingleUser",
    async (id) => {
        const response = await axios.get(`${userEndpoint}${id}`);
        const userFound = response.data;
        const token = localStorage.getItem('token');
        return { userFound, token };
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
        localStorage.removeItem('token');
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
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async ({ id, userData }, _) => {
        const response = await axios.put(`${userEndpoint}${id}`, userData);
        const data = response.data;
        return data;
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
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                id: `${id}`
            },
        };

        const response = await axios.put(`${userEndpoint}${id}`, {currentUserId}, config);
        const data = response.data;
        console.log(data);

        return data;
    } catch (error) {
        return error;
    }
}

export const unFollowUser = async ({id, currentUserId}) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                id: `${id}`
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


export const tokenIsExpired = async(token) => {
    if(token) {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        const isExpired = decodedToken.exp.toString() < currentTime.toString().split(".")[0];
        return isExpired || false;
    }
}