import { createSlice } from '@reduxjs/toolkit';
import { OfferSchema } from './types/state';
import { fetchOffersByCity } from '../api/fetch-offers-by-city.ts';
import { fetchFavoriteOffers } from '../api/fetch-favorite-offers.ts';
import { fetchOffer } from '../api/fetch-offer.ts';
import { fetchNearbyOffersByCity } from '../api/fetch-nearby-offers-by-city.ts';
import { toggleFavoriteOffer } from '../api/toggle-favorite-offer.ts';
import {
    calculateFavoritesCount,
    toggleFavoriteOffers,
} from '../lib/utils/favorite-offers';

const initialState: OfferSchema = {
    availableOffers: [],
    nearbyOffers: [],
    offer: null,
    favoriteCount: 0,
    favoriteOffers: {},
};

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(fetchOffersByCity.fulfilled, (state, action) => {
                state.availableOffers = action.payload;
            })
            .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
                state.favoriteOffers = action.payload;
                state.favoriteCount = calculateFavoritesCount(
                    state.favoriteOffers,
                );
            })
            .addCase(fetchOffer.fulfilled, (state, action) => {
                state.offer = action.payload;
            })
            .addCase(fetchNearbyOffersByCity.fulfilled, (state, action) => {
                state.nearbyOffers = action.payload;
            })
            .addCase(toggleFavoriteOffer.fulfilled, (state, action) => {
                const offer = action.payload;
                const status = action.meta.arg.status;
                const id = action.meta.arg.id;
                if (status === 1) {
                    if (!(offer.city.name in state.favoriteOffers)) {
                        state.favoriteOffers[offer.city.name] = [];
                    }
                    state.favoriteOffers[offer.city.name]!.push(offer);
                }
                if (status === 0) {
                    state.favoriteOffers[offer.city.name] =
                        state.favoriteOffers[offer.city.name]?.filter(
                            (o) => o.id !== id,
                        ) ?? [];
                }
                state.nearbyOffers = toggleFavoriteOffers(
                    state.nearbyOffers,
                    id,
                );
                state.availableOffers = toggleFavoriteOffers(
                    state.availableOffers,
                    id,
                );
                state.favoriteCount = calculateFavoritesCount(
                    state.favoriteOffers,
                );
                if (state.offer && state.offer.id === id)
                    state.offer.isFavorite = !state.offer.isFavorite;
            }),
});

export const offerReducer = offerSlice.reducer;
