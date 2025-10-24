import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '../model/types/user';
import { getAccessToken } from '@/shared/api/auth-cookie';

export const checkAuth = createAsyncThunk<
    UserAuthData,
    void,
    ThunkConfig<void>
>('user/check-auth', async (payload, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    if (!getAccessToken()) return rejectWithValue();
    try {
        const response = await extra.api.get<UserAuthData>('/login');

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue();
    }
});
