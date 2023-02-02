import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userEndpoint = "http://localhost:5000/users/";

export const fetchUsers = createAsyncThunk(
    "fetchUsers",
    async () => {
        const response = await axios.get(`${userEndpoint}`);
        const data = response.data;
        return data;
    }
);

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
    async (userData) => {
        const response = await axios.post(`${userEndpoint}register`, userData);
        const data = response.data;
        return data;
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

