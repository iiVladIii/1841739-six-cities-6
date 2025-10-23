import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken } from '@/shared/api/authCookie';

export const logout = createAsyncThunk<void, void, ThunkConfig<void>>(
    'user/logout',
    async (payload, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        if (!getAccessToken()) return rejectWithValue();
        try {
            await extra.api.delete<void>('/login');
        } catch (e) {
            return rejectWithValue();
        }
    },
);
