import { createSlice } from '@reduxjs/toolkit';
import { OfferSchema } from './types/state';
import { fetchOffersByCity } from '../api/fetchOffersByCity.ts';

const initialState: OfferSchema = {
    availableOffers: [],
    otherOffers: [],
    offer: null,
};
const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchOffersByCity.pending, (state, action) => {})
            .addCase(fetchOffersByCity.fulfilled, (state, action) => {
                state.availableOffers = action.payload;
            })
            .addCase(fetchOffersByCity.rejected, (state, action) => {}),
});

export const offerReducer = offerSlice.reducer;
