import { memo, useCallback, useMemo, useState } from 'react';
import { useUserAuthData } from '@/entities/user';
import * as React from 'react';
import { StarRating } from '@/shared/ui';
import { createOfferReview, Review } from '@/entities/review';
import { apiErrorHandler } from '@/shared/types/api';

interface Props {
    id?: string;
    onPost?: (review: Review) => void;
}

export const OfferReviewForm = memo((props: Props) => {
    const { id, onPost } = props;
    const [review, setReview] = useState<Pick<Review, 'comment' | 'rating'>>({
        rating: 0,
        comment: '',
    });

    const authData = useUserAuthData();
    const submitHandler = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.stopPropagation();
            e.preventDefault();
            if (id) {
                createOfferReview({
                    offerId: id,
                    rating: review.rating,
                    comment: review.comment,
                })
                    .then((r) => {
                        onPost?.(r);
                        setReview({ rating: 0, comment: '' });
                    })
                    .catch((err) => apiErrorHandler(err));
            }
        },
        [id, onPost, review.comment, review.rating],
    );

    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value;
            setReview((p) => ({ ...p, comment: value }));
        },
        [],
    );

    const ratingHandler = useCallback((value: number) => {
        setReview((p) => ({ ...p, rating: value }));
    }, []);

    const reviewIsValid = useMemo(
        () =>
            !(
                review.rating === 0 ||
                !review.comment ||
                review.comment.length < 50 ||
                review.comment.length > 300
            ),
        [review.comment, review.rating],
    );

    if (!authData || !id) return null;

    return (
        <form
            className="reviews__form form"
            action="#"
            method="post"
            onSubmit={submitHandler}
        >
            <label className="reviews__label form__label" htmlFor="review">
                Your review
            </label>
            <StarRating
                className={'reviews__rating-form '}
                onChange={ratingHandler}
            />
            <textarea
                onChange={changeHandler}
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                value={review.comment}
                placeholder="Tell how was your stay, what you like and what can be improved"
            ></textarea>
            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set{' '}
                    <span className="reviews__star">rating</span> and describe
                    your stay with at least{' '}
                    <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={!reviewIsValid}
                >
                    Submit
                </button>
            </div>
        </form>
    );
});
