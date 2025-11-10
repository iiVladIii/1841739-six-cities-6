import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchOffersByCity } from './fetch-offers-by-city';
import { CITY_NAME } from '@/entities/city';
import type { Offer } from '@/entities/offer';
import { AxiosInstance } from 'axios';

const mockLocation = {
    search: '',
};

vi.stubGlobal('window', {
    location: mockLocation,
});

describe('fetchOffersByCity', () => {
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

    beforeEach(() => {
        mockLocation.search = '';
    });

    it('should fetch and filter offers by city', async () => {
        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '1',
                price: 100,
                city: { ...mockOffer.city, name: CITY_NAME.Paris },
            },
            {
                ...mockOffer,
                id: '2',
                price: 150,
                city: { ...mockOffer.city, name: CITY_NAME.Cologne },
            },
            {
                ...mockOffer,
                id: '3',
                price: 200,
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

        const thunk = fetchOffersByCity(CITY_NAME.Paris);
        const result = await thunk(dispatch, getState, extra);

        expect(mockApi.get).toHaveBeenCalledWith('/offers');
        expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
        expect(result.payload).toHaveLength(2);
        expect(
            (result.payload as Offer[]).every(
                (offer: Offer) => offer.city.name === CITY_NAME.Paris,
            ),
        ).toBe(true);
    });

    it('should fetch offers and apply sorting from URL params', async () => {
        mockLocation.search = '?sort-by=price-low';

        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '1',
                price: 200,
                city: { ...mockOffer.city, name: CITY_NAME.Paris },
            },
            {
                ...mockOffer,
                id: '2',
                price: 100,
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

        const thunk = fetchOffersByCity(CITY_NAME.Paris);
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
        expect((result.payload as Offer[])[0].price).toBe(200);
        expect((result.payload as Offer[])[1].price).toBe(100);
    });

    it('should ignore invalid sort parameter', async () => {
        mockLocation.search = '?sort-by=invalid-sort';

        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '1',
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

        const thunk = fetchOffersByCity(CITY_NAME.Paris);
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
        expect(result.payload).toEqual(mockOffers);
    });

    it('should return empty array if no offers match the city', async () => {
        const mockOffers: Offer[] = [
            {
                ...mockOffer,
                id: '1',
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

        const thunk = fetchOffersByCity(CITY_NAME.Paris);
        const result = await thunk(dispatch, getState, extra);

        expect(result.type).toBe('offer/fetchOffersByCity/fulfilled');
        expect(result.payload).toEqual([]);
    });

    it('should handle API error', async () => {
        const error = new Error('Network error');
        const mockApi = {
            get: vi.fn().mockRejectedValue(error),
        } as unknown as AxiosInstance;

        const mockErrorHandler = vi.fn().mockReturnValue({
            message: 'Error fetching offers',
            status: 500,
        });

        const dispatch = vi.fn();
        const getState = vi.fn();
        const extra = { api: mockApi, errorHandler: mockErrorHandler };

        const thunk = fetchOffersByCity(CITY_NAME.Paris);
        const result = await thunk(dispatch, getState, extra);

        expect(mockErrorHandler).toHaveBeenCalledWith(error);
        expect(result.type).toBe('offer/fetchOffersByCity/rejected');
        expect(result.payload).toEqual({
            message: 'Error fetching offers',
            status: 500,
        });
    });
});
