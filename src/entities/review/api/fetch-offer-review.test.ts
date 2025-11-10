import { describe, it, expect, vi, beforeEach } from 'vitest';
import { $api } from '@/shared/api/api';
import { fetchOfferReview } from './fetch-offer-review';
import { Review } from '../model/types/review';

vi.mock('@/shared/api/api', () => ({
    $api: {
        get: vi.fn(),
    },
}));

describe('fetchOfferReview', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully fetch reviews', async () => {
        const mockReviews: Review[] = [
            {
                id: '1',
                comment: 'Great place!',
                rating: 5,
                date: '2024-01-01',
                user: {
                    name: 'John Doe',
                    avatarUrl: 'avatar1.jpg',
                    isPro: false,
                },
            },
            {
                id: '2',
                comment: 'Nice location',
                rating: 4,
                date: '2024-01-02',
                user: {
                    name: 'Jane Smith',
                    avatarUrl: 'avatar2.jpg',
                    isPro: true,
                },
            },
        ];

        vi.mocked($api.get).mockResolvedValue({ data: mockReviews });
        const result = await fetchOfferReview('offer-123');
        expect($api.get).toHaveBeenCalledWith('/comments/offer-123');
        expect(result).toEqual(mockReviews);
    });

    it('should return empty array when no reviews', async () => {
        vi.mocked($api.get).mockResolvedValue({ data: [] });
        const result = await fetchOfferReview('offer-123');
        expect(result).toEqual([]);
    });

    it('should throw error when response data is null', async () => {
        vi.mocked($api.get).mockResolvedValue({ data: null });
        await expect(fetchOfferReview('offer-123')).rejects.toThrow(
            'Could not find review',
        );
    });

    it('should throw error when API request fails', async () => {
        vi.mocked($api.get).mockRejectedValue(new Error('Network error'));
        await expect(fetchOfferReview('offer-123')).rejects.toThrow(
            'Network error',
        );
    });
});
