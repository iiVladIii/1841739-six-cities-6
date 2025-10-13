import { memo, useCallback, useEffect, useState } from 'react';
import { OfferReviewForm } from '@/features/OfferReviewForm';
import { Review, ReviewList } from '@/entities/Review';
import { generateMockReviews } from '@/shared/mocks/reviews';

interface Props {
    id?: string;
}

export const OfferReviews = memo((props: Props) => {
    const { id } = props;

    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        setReviews(generateMockReviews());
    }, [id]);

    const postReviewHandler = useCallback((review: Review) => {
        setReviews((p) => [...p, review]);
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
