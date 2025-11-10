import { describe, it, expect, vi, beforeEach } from 'vitest';
import { $api } from '@/shared/api/api';
import { createOfferReview } from './create-offer-review.ts';
import { Review } from '../model/types/review';

vi.mock('@/shared/api/api', () => ({
    $api: {
        post: vi.fn(),
    },
}));

describe('createOfferReview', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should successfully create a review', async () => {
        const mockReview: Review = {
            id: '1',
            comment: 'Great place!',
            rating: 5,
            date: '2024-01-01',
            user: {
                name: 'John Doe',
                avatarUrl: 'avatar.jpg',
                isPro: false,
            },
        };

        const args = {
            offerId: 'offer-123',
            rating: 5,
            comment: 'Great place!',
        };

        vi.mocked($api.post).mockResolvedValue({ data: mockReview });
        const result = await createOfferReview(args);
        expect($api.post).toHaveBeenCalledWith('/comments/offer-123', {
            rating: 5,
            comment: 'Great place!',
        });
        expect(result).toEqual(mockReview);
    });

    it('should throw error when response data is empty', async () => {
        const args = {
            offerId: 'offer-123',
            rating: 5,
            comment: 'Great place!',
        };

        vi.mocked($api.post).mockResolvedValue({ data: null });
        await expect(createOfferReview(args)).rejects.toThrow(
            'Could not create review',
        );
    });

    it('should throw error when API request fails', async () => {
        const args = {
            offerId: 'offer-123',
            rating: 5,
            comment: 'Great place!',
        };
        vi.mocked($api.post).mockRejectedValue(new Error('Network error'));
        await expect(createOfferReview(args)).rejects.toThrow('Network error');
    });
});
