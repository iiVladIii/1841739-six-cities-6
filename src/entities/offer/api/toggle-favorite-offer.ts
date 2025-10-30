import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/app/providers/store';
import type { DetailedOffer } from '@/entities/offer';
import type { ServerError } from '@/shared/types/api';

interface Args {
    id: string;
    status: 0 | 1;
}

export const toggleFavoriteOffer = createAsyncThunk<
    DetailedOffer,
    Args,
    ThunkConfig<ServerError>
>('offer/toggleFavoriteOffer', async ({ id, status }, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
        const response = await extra.api.post<DetailedOffer>(
            `/favorite/${id}/${status}`,
        );
        if (!response.data) throw new Error();

        return response.data;
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
