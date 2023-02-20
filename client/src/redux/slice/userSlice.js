import {createSlice} from '@reduxjs/toolkit';
import * as api from '../../api/userApi';

const initialState = {
    user: [],
    //there is any user profile
    userProfile: null,
    //
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
        [api.loginUser.fulfilled]: (state, action) => {
            state.user = action.payload;
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
            state.user = action.payload;
        },
        [api.updateUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [api.deleteUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        }
    }
});

export default userSlice.reducer;