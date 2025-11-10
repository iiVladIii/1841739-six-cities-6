import { describe, it, expect } from 'vitest';
import { sortOffers } from './sort-offers'; // Update with correct path
import { Offer } from '../../model/types/offer';
import { CITY_NAME } from '@/entities/city';

const mockOffers: Offer[] = [
    {
        id: '1',
        title: 'Beautiful apartment',
        type: 'apartment',
        price: 120,
        city: {
            name: CITY_NAME.Paris,
            location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        },
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        isFavorite: false,
        isPremium: false,
        rating: 4.5,
        previewImage: 'img1.jpg',
    },
    {
        id: '2',
        title: 'Cozy room',
        type: 'room',
        price: 80,
        city: {
            name: CITY_NAME.Amsterdam,
            location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
        },
        location: { latitude: 52.3676, longitude: 4.9041, zoom: 10 },
        isFavorite: true,
        isPremium: true,
        rating: 4.8,
        previewImage: 'img2.jpg',
    },
    {
        id: '3',
        title: 'Luxury house',
        type: 'house',
        price: 200,
        city: {
            name: CITY_NAME.Brussels,
            location: { latitude: 50.8503, longitude: 4.3517, zoom: 10 },
        },
        location: { latitude: 50.8503, longitude: 4.3517, zoom: 10 },
        isFavorite: false,
        isPremium: true,
        rating: 3.9,
        previewImage: 'img3.jpg',
    },
    {
        id: '4',
        title: 'Budget hotel',
        type: 'hotel',
        price: 50,
        city: {
            name: CITY_NAME.Cologne,
            location: { latitude: 50.9375, longitude: 6.9603, zoom: 10 },
        },
        location: { latitude: 50.9375, longitude: 6.9603, zoom: 10 },
        isFavorite: true,
        isPremium: false,
        rating: 4.2,
        previewImage: 'img4.jpg',
    },
];

describe('sortOffers', () => {
    it('should sort by price in ascending order (price-asc)', () => {
        const result = sortOffers(mockOffers, 'price-asc');

        expect(result[0].price).toBe(50);
        expect(result[1].price).toBe(80);
        expect(result[2].price).toBe(120);
        expect(result[3].price).toBe(200);
    });

    it('should sort by price in descending order (price-desc)', () => {
        const result = sortOffers(mockOffers, 'price-desc');

        expect(result[0].price).toBe(200);
        expect(result[1].price).toBe(120);
        expect(result[2].price).toBe(80);
        expect(result[3].price).toBe(50);
    });

    it('should sort by rating in descending order (top-desc)', () => {
        const result = sortOffers(mockOffers, 'top-desc');

        expect(result[0].rating).toBe(4.8);
        expect(result[1].rating).toBe(4.5);
        expect(result[2].rating).toBe(4.2);
        expect(result[3].rating).toBe(3.9);
    });

    it('should return array without changes for popular-desc', () => {
        const result = sortOffers(mockOffers, 'popular-desc');
        expect(result[0].id).toBe('1');
        expect(result[1].id).toBe('2');
        expect(result[2].id).toBe('3');
        expect(result[3].id).toBe('4');
    });

    it('should not mutate the original array', () => {
        const originalOffers = [...mockOffers];
        sortOffers(mockOffers, 'price-asc');
        expect(mockOffers).toEqual(originalOffers);
    });

    it('should return a new array', () => {
        const result = sortOffers(mockOffers, 'price-asc');
        expect(result).not.toBe(mockOffers);
    });

    it('should handle empty array correctly', () => {
        const result = sortOffers([], 'price-asc');
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });

    it('should handle array with single element correctly', () => {
        const singleOffer = [mockOffers[0]];
        const result = sortOffers(singleOffer, 'price-desc');
        expect(result.length).toBe(1);
        expect(result[0]).toEqual(mockOffers[0]);
    });

    it('should handle offers with same price correctly', () => {
        const offersWithSamePrice: Offer[] = [
            { ...mockOffers[0], price: 100 },
            { ...mockOffers[1], price: 100 },
            { ...mockOffers[2], price: 100 },
        ];

        const result = sortOffers(offersWithSamePrice, 'price-asc');
        expect(result.every((offer) => offer.price === 100)).toBe(true);
    });

    it('should handle offers with same rating correctly', () => {
        const offersWithSameRating: Offer[] = [
            { ...mockOffers[0], rating: 4.5 },
            { ...mockOffers[1], rating: 4.5 },
            { ...mockOffers[2], rating: 4.5 },
        ];

        const result = sortOffers(offersWithSameRating, 'top-desc');
        expect(result.every((offer) => offer.rating === 4.5)).toBe(true);
    });
});
