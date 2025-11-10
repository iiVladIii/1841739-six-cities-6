import { describe, it, expect, vi } from 'vitest';
import { fetchFavoriteOffers } from './fetch-favorite-offers';
import { CITY_NAME } from '@/entities/city';
import type { Offer } from '@/entities/offer';
import { AxiosInstance } from 'axios';

describe('fetchFavoriteOffers', () => {
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
        isFavorite: true,
        isPremium: false,
        rating: 4.5,
        previewImage: 'image.jpg',
    };

    it('should successfully fetch and group favorite offers by city', async () => {
        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '1',
                city: { ...mockOffer.city, name: CITY_NAME.Paris },
            },
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
        ];

        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: mockOffers }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = {
            api: mockApi,
            errorHandler: mockErrorHandler,
        };

        const thunk = fetchFavoriteOffers();
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.get).toHaveBeenCalledWith('/favorite');
        expect(result.type).toBe('offer/fetchFavoriteOffers/fulfilled');
        expect(result.payload).toEqual({
            [CITY_NAME.Paris]: [mockOffers[0], mockOffers[1]],
            [CITY_NAME.Cologne]: [mockOffers[2]],
        });
    });

    it('should handle empty response', async () => {
        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: [] }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchFavoriteOffers();
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchFavoriteOffers/fulfilled');
        expect(result.payload).toEqual({});
    });

    it('should handle API error', async () => {
        const error = new Error('Network error');
        const mockApi = {
            get: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn().mockReturnValue({
            message: 'Error fetching favorites',
            status: 500,
        });

        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchFavoriteOffers();
        const result = await thunk(dispatch, getState, extra);

        expect(mockErrorHandler).toHaveBeenCalledWith(error);
        expect(result.type).toBe('offer/fetchFavoriteOffers/rejected');
        expect(result.payload).toEqual({
            message: 'Error fetching favorites',
            status: 500,
        });
    });

    it('should handle missing data in response', async () => {
        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: null }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi
            .fn()
            .mockReturnValue({ message: 'No data' });
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchFavoriteOffers();
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchFavoriteOffers/rejected');
        expect(mockErrorHandler).toHaveBeenCalled();
    });
});
