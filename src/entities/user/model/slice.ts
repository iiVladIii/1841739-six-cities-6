import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from './types/state';
import { removeAccessToken, setAccessToken } from '@/shared/api/auth-cookie';
import { login } from '../api/login';
import { checkAuth } from '../api/check-auth';
import { logout } from '../api/logout';

const initialState: UserSchema = {};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(login.pending, (state, action) => {
                state.authError = undefined;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                setAccessToken(action.payload.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.authError = action.payload;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                setAccessToken(action.payload.token);
            })
            .addCase(checkAuth.rejected, (state, action) => {
                removeAccessToken();
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = undefined;
                removeAccessToken();
            })
            .addCase(logout.rejected, (state, action) => {
                state.user = undefined;
                removeAccessToken();
            }),
});

export const userReducer = userSlice.reducer;
