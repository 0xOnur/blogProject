import {createSlice} from '@reduxjs/toolkit';
import * as api from '../../api/userApi';

const initialState = {
    user: [],
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [api.fetchUsers.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
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
        [api.logoutUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [api.logoutUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.getUserById.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [api.createUser.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [api.createUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [api.createUser.pending]: (state) => {
            state.error = null;
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