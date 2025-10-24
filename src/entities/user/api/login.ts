import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '../model/types/user';
import { ServerError } from '@/shared/types/api';

interface LoginData {
    email: string;
    password: string;
}
export const login = createAsyncThunk<
    UserAuthData,
    LoginData,
    ThunkConfig<ServerError>
>('user/login', async (payload, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
        const response = await extra.api.post<UserAuthData>('/login', {
            ...payload,
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
