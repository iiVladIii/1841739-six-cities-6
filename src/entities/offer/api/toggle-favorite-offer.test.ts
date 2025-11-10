import { describe, it, expect, vi } from 'vitest';
import { toggleFavoriteOffer } from './toggle-favorite-offer';
import { CITY_NAME } from '@/entities/city';
import type { DetailedOffer } from '@/entities/offer';
import { AxiosInstance } from 'axios';

describe('toggleFavoriteOffer', () => {
    const mockDetailedOffer: DetailedOffer = {
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
        description: 'Test description',
        bedrooms: 2,
        goods: ['Wi-Fi', 'Kitchen'],
        host: {
            name: 'Host Name',
            isPro: true,
            avatarUrl: 'avatar.jpg',
        },
        images: ['image1.jpg', 'image2.jpg'],
        maxAdults: 4,
    };

    it('should add offer to favorites (status 1)', async () => {
        const responseOffer = { ...mockDetailedOffer, isFavorite: true };

        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: responseOffer }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = toggleFavoriteOffer({ id: '1', status: 1 });
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/1');
        expect(result.type).toBe('offer/toggleFavoriteOffer/fulfilled');
        expect(result.payload).toEqual(responseOffer);
        expect((result.payload as DetailedOffer).isFavorite).toBe(true);
    });

    it('should remove offer from favorites (status 0)', async () => {
        const responseOffer = { ...mockDetailedOffer, isFavorite: false };

        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: responseOffer }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = toggleFavoriteOffer({ id: '1', status: 0 });
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/0');
        expect(result.type).toBe('offer/toggleFavoriteOffer/fulfilled');
        expect(result.payload).toEqual(responseOffer);
        expect((result.payload as DetailedOffer).isFavorite).toBe(false);
    });

    it('should handle API error', async () => {
        const error = new Error('Unauthorized');
        const mockApi = {
            post: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn().mockReturnValue({
            message: 'Unauthorized',
            status: 401,
        });

        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = toggleFavoriteOffer({ id: '1', status: 1 });
        const result = await thunk(dispatch, getState, extra);

        expect(mockErrorHandler).toHaveBeenCalledWith(error);
        expect(result.type).toBe('offer/toggleFavoriteOffer/rejected');
        expect(result.payload).toEqual({
            message: 'Unauthorized',
            status: 401,
        });
    });

    it('should handle missing data in response', async () => {
        const mockApi = {
            post: vi.fn().mockResolvedValue({ data: null }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi
            .fn()
            .mockReturnValue({ message: 'No data' });
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = toggleFavoriteOffer({ id: '1', status: 1 });
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/toggleFavoriteOffer/rejected');
        expect(mockErrorHandler).toHaveBeenCalled();
    });
});
