import { describe, it, expect, vi } from 'vitest';
import { fetchNearbyOffersByCity } from './fetch-nearby-offers-by-city';
import { CITY_NAME } from '@/entities/city';
import type { Offer } from '@/entities/offer';
import { AxiosInstance } from 'axios';

describe('fetchNearbyOffersByCity', () => {
    const mockOffer: Offer = {
        id: '1',
        title: 'Test Offer',
        type: 'apartment',
        price: 100,
        city: {
            name: CITY_NAME.Paris,
            location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        },
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        previewImage: 'image.jpg',
    };

    it('should fetch and filter nearby offers by city', async () => {
        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '2',
                city: { ...mockOffer.city, name: CITY_NAME.Paris },
            },
            {
                ...mockOffer,
                id: '3',
                city: { ...mockOffer.city, name: CITY_NAME.Cologne },
            },
            {
                ...mockOffer,
                id: '4',
                city: { ...mockOffer.city, name: CITY_NAME.Paris },
            },
        ];

        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: mockOffers }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchNearbyOffersByCity({
            id: '1',
            city: CITY_NAME.Paris,
        });
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.get).toHaveBeenCalledWith('/offers/1/nearby');
        expect(result.type).toBe('offer/fetchNearbyOffersByCity/fulfilled');
        expect(result.payload).toHaveLength(2);
        expect(result.payload).toEqual([mockOffers[0], mockOffers[2]]);
    });

    it('should return empty array if no offers match the city', async () => {
        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '2',
                city: { ...mockOffer.city, name: CITY_NAME.Cologne },
            },
        ];

        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: mockOffers }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchNearbyOffersByCity({
            id: '1',
            city: CITY_NAME.Paris,
        });
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchNearbyOffersByCity/fulfilled');
        expect(result.payload).toEqual([]);
    });

    it('should handle API error', async () => {
        const error = new Error('Network error');
        const mockApi = {
            get: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn().mockReturnValue({
            message: 'Error fetching nearby offers',
            status: 404,
        });

        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchNearbyOffersByCity({
            id: '1',
            city: CITY_NAME.Paris,
        });
        const result = await thunk(dispatch, getState, extra);

        expect(mockErrorHandler).toHaveBeenCalledWith(error);
        expect(result.type).toBe('offer/fetchNearbyOffersByCity/rejected');
        expect(result.payload).toEqual({
            message: 'Error fetching nearby offers',
            status: 404,
        });
    });
});
