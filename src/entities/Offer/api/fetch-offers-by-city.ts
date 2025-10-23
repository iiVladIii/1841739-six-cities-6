import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '@/entities/Offer';
import { CITY_NAME } from '@/entities/City';
import { ServerError } from '@/shared/types/api';
import { isOfferSortType, sortOffers } from '../lib/utils/sort-offers';

export const fetchOffersByCity = createAsyncThunk<
    Offer[],
    CITY_NAME,
    ThunkConfig<ServerError>
>('offer/fetchOffersByCity', async (city, thunkAPI) => {
    const { rejectWithValue, extra } = thunkAPI;
    try {
        const response = await extra.api.get<Offer[]>('/offers');
        if (!response.data) throw new Error();

        const params = new URLSearchParams(window.location.search);
        const sortParam = params.get('sort-by');
        const filteredByCity = response.data.filter(
            (c) => c.city.name === city,
        );
        if (sortParam && isOfferSortType(sortParam)) {
            return sortOffers(filteredByCity, sortParam);
        }
        return filteredByCity;
    } catch (e) {
        return rejectWithValue(extra.errorHandler(e));
    }
});
