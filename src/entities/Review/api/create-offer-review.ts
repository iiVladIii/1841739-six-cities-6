import { $api } from '@/shared/api/api';
import { Review } from '../model/types/Review';

interface Args {
    comment: string;
    rating: number;
    offerId: string;
}
export const createOfferReview = async ({ offerId, rating, comment }: Args) => {
    const response = await $api.post<Review>(`/comments/${offerId}`, {
        rating,
        comment,
    });
    if (!response.data) throw new Error('Could not create review');
    return response.data;
};
