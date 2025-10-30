import { $api } from '@/shared/api/api';
import { Review } from '../model/types/review';

export const fetchOfferReview = async (offerId: string) => {
    const response = await $api.get<Review[]>(`/comments/${offerId}`);

    if (!response.data) throw new Error('Could not find review');
    return response.data;
};
