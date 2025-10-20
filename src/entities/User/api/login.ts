import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAuthData } from '../model/types/User';
import { ServerError, UNEXPECTED_ERROR_MESSAGE } from '@/shared/types/api';
import { AxiosError } from 'axios';

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
        if (e instanceof AxiosError && e.response?.data) {
            const serverError = e.response.data as ServerError;
            return rejectWithValue(serverError);
        }
        return rejectWithValue({
            errorType: 'UNEXPECTED_ERROR',
            message: UNEXPECTED_ERROR_MESSAGE,
            details: [],
        });
    }
});
