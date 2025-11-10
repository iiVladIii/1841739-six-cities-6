import { describe, it, expect, vi } from 'vitest';
import { fetchOffer } from './fetch-offer';
import { CITY_NAME } from '@/entities/city';
import type { DetailedOffer } from '@/entities/offer';
import { AxiosInstance } from 'axios';

describe('fetchOffer', () => {
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

    it('should successfully fetch detailed offer', async () => {
        const mockApi = {
            get: vi.fn().mockResolvedValue({ data: mockDetailedOffer }),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn();
        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchOffer('1');
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.get).toHaveBeenCalledWith('/offers/1');
        expect(result.type).toBe('offer/fetchOffer/fulfilled');
        expect(result.payload).toEqual(mockDetailedOffer);
    });

    it('should handle API error', async () => {
        const error = new Error('Offer not found');
        const mockApi = {
            get: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn().mockReturnValue({
            message: 'Offer not found',
            status: 404,
        });

        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchOffer('999');
        const result = await thunk(dispatch, getState, extra);

        expect(mockErrorHandler).toHaveBeenCalledWith(error);
        expect(result.type).toBe('offer/fetchOffer/rejected');
        expect(result.payload).toEqual({
            message: 'Offer not found',
            status: 404,
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

        const thunk = fetchOffer('1');
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchOffer/rejected');
        expect(mockErrorHandler).toHaveBeenCalled();
    });
});
