import { memo, useCallback } from 'react';
import { Review } from '../../model/types/Review';
import { formatDate } from '@/shared/lib/formatDate';

interface Props {
    reviews: Review[];
}

export const ReviewList = memo((props: Props) => {
    const { reviews } = props;

    const calcStarsRating = useCallback((rating: number) => 20 * rating, []);

    if (reviews.length === 0) return null;

    return (
        <ul className="reviews__list">
            {reviews.map((r) => (
                <li className="reviews__item" key={r.id}>
                    <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                            <img
                                className="reviews__avatar user__avatar"
                                src={r.user.avatarUrl}
                                width="54"
                                height="54"
                                alt="Reviews avatar"
                            />
                        </div>
                        <span className="reviews__user-name">
                            {r.user.name}
                        </span>
                    </div>
                    <div className="reviews__info">
                        <div className="reviews__rating rating">
                            <div className="reviews__stars rating__stars">
                                <span
                                    style={{
                                        width: `${calcStarsRating(r.rating)}%`,
                                    }}
                                ></span>
                                <span className="visually-hidden">Rating</span>
                            </div>
                        </div>
                        <p className="reviews__text">{r.comment}</p>
                        <time
                            className="reviews__time"
                            dateTime={formatDate(r.date).dateTime}
                        >
                            {formatDate(r.date).mothYear}
                        </time>
                    </div>
                </li>
            ))}
        </ul>
    );
});
