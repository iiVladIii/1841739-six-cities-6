import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '@/entities/Offer';
import { ServerError } from '@/shared/types/api';
import { CITY_NAME } from '@/entities/City';

interface Args {
    id: string;
    city: CITY_NAME;
}

export const fetchNearbyOffersByCity = createAsyncThunk<
    Offer[],
    Args,
    ThunkConfig<ServerError>
>('offer/fetchNearbyOffersByCity', async ({ id, city }, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
        const response = await extra.api.get<Offer[]>(`/offers/${id}/nearby`);
        if (!response.data) throw new Error();

        return response.data.filter((c) => c.city.name === city);
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
