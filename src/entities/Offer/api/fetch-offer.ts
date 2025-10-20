import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DetailedOffer } from '@/entities/Offer';
import { ServerError } from '@/shared/types/api';

export const fetchOffer = createAsyncThunk<
    DetailedOffer,
    string,
    ThunkConfig<ServerError>
>('offer/fetchOffer', async (offerId, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
        const response = await extra.api.get<DetailedOffer>(
            `/offers/${offerId}`,
        );
        if (!response.data) throw new Error();

        return response.data;
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
