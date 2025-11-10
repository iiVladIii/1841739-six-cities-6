import { describe, expect, it } from 'vitest';
import { offerReducer } from './slice';
import { OfferSchema } from './types/state';
import { fetchOffersByCity } from '../api/fetch-offers-by-city';
import { fetchFavoriteOffers } from '../api/fetch-favorite-offers';
import { fetchOffer } from '../api/fetch-offer';
import { fetchNearbyOffersByCity } from '../api/fetch-nearby-offers-by-city';
import { toggleFavoriteOffer } from '../api/toggle-favorite-offer';
import { DetailedOffer, Offer } from '@/entities/offer';
import { CITY_NAME } from '@/entities/city';

describe('offerSlice', () => {
    const initialState: OfferSchema = {
        availableOffers: [],
        nearbyOffers: [],
        offer: null,
        favoriteCount: 0,
        favoriteOffers: {},
    };

    const mockOffer: Offer = {
        id: '1',
        title: 'Test Offer',
        isFavorite: false,
        city: {
            name: CITY_NAME.Amsterdam,
            location: {
                latitude: 48.8566,
                longitude: 2.3522,
                zoom: 10,
            },
        },
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        price: 100,
        rating: 4.5,
        type: 'apartment',
        previewImage: 'image.jpg',
        isPremium: false,
    };
    const detailedMockOffer: DetailedOffer = {
        ...mockOffer,
        description: 'description',
        bedrooms: 3,
        goods: [],
        host: { name: 'string', avatarUrl: 'string', isPro: true },
        images: [],
        maxAdults: 1,
    };

    it('should return initial state', () => {
        expect(offerReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    describe('fetchOffersByCity', () => {
        it('should handle fetchOffersByCity.fulfilled', () => {
            const offers = [mockOffer, { ...mockOffer, id: '2' }];
            const action = {
                type: fetchOffersByCity.fulfilled.type,
                payload: offers,
            };
            const state = offerReducer(initialState, action);
            expect(state.availableOffers).toEqual(offers);
            expect(state.availableOffers).toHaveLength(2);
        });
    });

    describe('fetchFavoriteOffers', () => {
        it('should handle fetchFavoriteOffers.fulfilled', () => {
            const favoriteOffers = {
                [CITY_NAME.Paris]: [mockOffer],
                [CITY_NAME.Amsterdam]: [{ ...mockOffer, id: '2' }],
            };
            const action = {
                type: fetchFavoriteOffers.fulfilled.type,
                payload: favoriteOffers,
            };
            const state = offerReducer(initialState, action);
            expect(state.favoriteOffers).toEqual(favoriteOffers);
            expect(state.favoriteCount).toBe(2);
        });

        it('should calculate correct favorite count', () => {
            const favoriteOffers = {
                [CITY_NAME.Paris]: [mockOffer, { ...mockOffer, id: '2' }],
                [CITY_NAME.Amsterdam]: [
                    { ...mockOffer, id: '3' },
                    { ...mockOffer, id: '4' },
                    { ...mockOffer, id: '5' },
                ],
            };
            const action = {
                type: fetchFavoriteOffers.fulfilled.type,
                payload: favoriteOffers,
            };
            const state = offerReducer(initialState, action);
            expect(state.favoriteCount).toBe(5);
        });
    });

    describe('fetchOffer', () => {
        it('should handle fetchOffer.fulfilled', () => {
            const action = {
                type: fetchOffer.fulfilled.type,
                payload: mockOffer,
            };
            const state = offerReducer(initialState, action);
            expect(state.offer).toEqual(mockOffer);
        });

        it('should update existing offer', () => {
            const currentState: OfferSchema = {
                ...initialState,
                offer: { ...detailedMockOffer },
            };
            const updatedOffer = {
                ...detailedMockOffer,
                title: 'Updated Title',
            };
            const action = {
                type: fetchOffer.fulfilled.type,
                payload: updatedOffer,
            };
            const state = offerReducer(currentState, action);
            expect(state.offer?.title).toBe('Updated Title');
        });
    });

    describe('fetchNearbyOffersByCity', () => {
        it('should handle fetchNearbyOffersByCity.fulfilled', () => {
            const nearbyOffers = [
                mockOffer,
                { ...mockOffer, id: '2' },
                { ...mockOffer, id: '3' },
            ];
            const action = {
                type: fetchNearbyOffersByCity.fulfilled.type,
                payload: nearbyOffers,
            };
            const state = offerReducer(initialState, action);
            expect(state.nearbyOffers).toEqual(nearbyOffers);
            expect(state.nearbyOffers).toHaveLength(3);
        });
    });

    describe('toggleFavoriteOffer', () => {
        it('should add offer to favorites when status is 1', () => {
            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...mockOffer, isFavorite: true },
                meta: {
                    arg: {
                        id: '1',
                        status: 1,
                    },
                },
            };
            const state = offerReducer(initialState, action);
            expect(state.favoriteOffers[CITY_NAME.Amsterdam]).toHaveLength(1);
            expect(state.favoriteOffers[CITY_NAME.Amsterdam]?.[0]).toEqual({
                ...mockOffer,
                isFavorite: true,
            });
            expect(state.favoriteCount).toBe(1);
        });

        it('should remove offer from favorites when status is 0', () => {
            const currentState: OfferSchema = {
                ...initialState,
                favoriteOffers: {
                    [CITY_NAME.Amsterdam]: [
                        mockOffer,
                        { ...mockOffer, id: '2' },
                    ],
                },
                favoriteCount: 2,
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...mockOffer, isFavorite: false },
                meta: {
                    arg: {
                        id: '1',
                        status: 0,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            expect(state.favoriteOffers[CITY_NAME.Amsterdam]).toHaveLength(1);
            expect(state.favoriteOffers[CITY_NAME.Amsterdam]?.[0].id).toBe('2');
            expect(state.favoriteCount).toBe(1);
        });

        it('should update availableOffers favorite status', () => {
            const currentState: OfferSchema = {
                ...initialState,
                availableOffers: [mockOffer, { ...mockOffer, id: '2' }],
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...mockOffer, isFavorite: true },
                meta: {
                    arg: {
                        id: '1',
                        status: 1,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            const toggledOffer = state.availableOffers.find(
                (o) => o.id === '1',
            );
            expect(toggledOffer?.isFavorite).toBe(true);
        });

        it('should update nearbyOffers favorite status', () => {
            const currentState: OfferSchema = {
                ...initialState,
                nearbyOffers: [mockOffer, { ...mockOffer, id: '2' }],
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...mockOffer, isFavorite: true },
                meta: {
                    arg: {
                        id: '1',
                        status: 1,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            const toggledOffer = state.nearbyOffers.find((o) => o.id === '1');
            expect(toggledOffer?.isFavorite).toBe(true);
        });

        it('should update current offer favorite status if ids match', () => {
            const currentState: OfferSchema = {
                ...initialState,
                offer: detailedMockOffer,
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...detailedMockOffer, isFavorite: true },
                meta: {
                    arg: {
                        id: '1',
                        status: 1,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            expect(state.offer?.isFavorite).toBe(true);
        });

        it('should not update current offer if ids do not match', () => {
            const currentState: OfferSchema = {
                ...initialState,
                offer: detailedMockOffer,
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...detailedMockOffer, id: '2', isFavorite: true },
                meta: {
                    arg: {
                        id: '2',
                        status: 1,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            expect(state.offer?.isFavorite).toBe(false);
        });

        it('should create new city array if city does not exist in favorites', () => {
            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: {
                    ...mockOffer,
                    city: { ...mockOffer.city, name: CITY_NAME.Amsterdam },
                    isFavorite: true,
                },
                meta: {
                    arg: {
                        id: '1',
                        status: 1,
                    },
                },
            };

            const state = offerReducer(initialState, action);

            expect(state.favoriteOffers.Amsterdam).toBeDefined();
            expect(state.favoriteOffers.Amsterdam).toHaveLength(1);
        });

        it('should handle removing last offer from city', () => {
            const currentState: OfferSchema = {
                ...initialState,
                favoriteOffers: {
                    [CITY_NAME.Amsterdam]: [mockOffer],
                },
                favoriteCount: 1,
            };

            const action = {
                type: toggleFavoriteOffer.fulfilled.type,
                payload: { ...mockOffer, isFavorite: false },
                meta: {
                    arg: {
                        id: '1',
                        status: 0,
                    },
                },
            };

            const state = offerReducer(currentState, action);

            expect(state.favoriteOffers[CITY_NAME.Amsterdam]).toHaveLength(0);
            expect(state.favoriteCount).toBe(0);
        });
    });
});
