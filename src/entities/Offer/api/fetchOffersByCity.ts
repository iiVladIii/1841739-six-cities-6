import { ThunkConfig } from '@/app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '@/entities/Offer';
import { CITY_NAME } from '@/entities/City';
import { generateMockOffers } from '@/shared/mocks/offers';

//TODO axios fetch offers by city
export const fetchOffersByCity = createAsyncThunk<
    Offer[],
    CITY_NAME,
    ThunkConfig<string>
>('offer/fetchOffersByCity', async (city, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return generateMockOffers();
    } catch (e) {
        return rejectWithValue('ERROR');
    }
});
