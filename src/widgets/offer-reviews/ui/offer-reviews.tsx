import { memo, useCallback, useEffect, useState } from 'react';
import { OfferReviewForm } from '@/features/offer-review-form';
import { fetchOfferReview, Review, ReviewList } from '@/entities/review';
import { apiErrorHandler } from '@/shared/types/api';

interface Props {
    id?: string;
}

const sortReviews = (reviews: Review[]) =>
    reviews.sort((a, b) => (a.date > b.date ? -1 : 1));
export const OfferReviews = memo((props: Props) => {
    const { id } = props;

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        if (id)
            fetchOfferReview(id)
                .then((data) => setReviews(sortReviews(data)))
                .catch((e) => apiErrorHandler(e));
    }, [id]);

    const postReviewHandler = useCallback((review: Review) => {
        setReviews((p) => [review, ...p]);
    }, []);

    return (
        <section className="offer__reviews reviews">
            <h2 className="reviews__title">
                Reviews &middot;{' '}
                <span className="reviews__amount">{reviews.length}</span>
            </h2>
            <ReviewList reviews={reviews} />
            <OfferReviewForm id={id} onPost={postReviewHandler} />
        </section>
    );
});
