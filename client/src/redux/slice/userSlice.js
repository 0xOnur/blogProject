import {createSlice} from '@reduxjs/toolkit';
import * as api from '../../api/userApi';

const initialState = {
    user: [
    ],
    accessToken: null,
    refreshToken: null,
    //there is any user profile
    userProfile: null,
    //
    isPending: false,
    userPosts: [],
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [api.loginUser.pending]: (state) => {
            state.error = null;
            state.user = [];
        },
        [api.tokenIsExpired.pending]: (state, action) => {
            state.error = null;
        },
        [api.tokenIsExpired.fulfilled]: (state, action) => {
            state.user.accessToken = action.payload.accessToken;
            state.user.refreshToken = action.payload.refreshToken;
        },
        [api.tokenIsExpired.rejected]: (state, action) => {
            state.user = [];
        },
        [api.loginUser.fulfilled]: (state, action) => {
            state.user = action.payload.userFound;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        [api.loginUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.fetchSingleUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [api.fetchUserPosts.fulfilled]: (state, action) => {
            state.userPosts = action.payload;
        },
        [api.logoutUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.accessToken = null;
            state.refreshToken = null;
        },
        [api.logoutUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.getUserById.fulfilled]: (state, action) => {
            state.userProfile = action.payload;
        },
        [api.followUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.createUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.createUser.pending]: (state) => {
            state.error = null;
        },
        [api.createUser.fulfilled]: (state, action) => {
            state.user = action.payload.userFound;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        [api.updateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.isPending = false;
        },
        [api.updateUser.pending]: (state) => {
            state.isPending = true;
        },
        [api.updateUser.rejected]: (state, action) => {
            state.isPending = false;
            state.error = action.payload;
        },
        [api.deleteUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        }
    }
});

export default userSlice.reducer;