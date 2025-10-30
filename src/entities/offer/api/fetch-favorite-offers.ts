import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '@/entities/offer';
import { CITY_NAME } from '@/entities/city';
import { ServerError } from '@/shared/types/api';

export const fetchFavoriteOffers = createAsyncThunk<
    Partial<Record<CITY_NAME, Offer[]>>,
    void,
    ThunkConfig<ServerError>
>('offer/fetchFavoriteOffers', async (_, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
        const response = await extra.api.get<Offer[]>('/favorite');
        if (!response.data) throw new Error();

        return response.data.reduce(
            (acc: Partial<Record<CITY_NAME, Offer[]>>, curr) => {
                if (!(curr.city.name in acc)) {
                    acc[curr.city.name] = [];
                }
                acc[curr.city.name]!.push(curr);

                return acc;
            },
            {},
        );
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
