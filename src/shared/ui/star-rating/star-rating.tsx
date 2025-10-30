import { memo, useCallback } from 'react';
import * as React from 'react';
import cn from 'classnames';

interface Props {
    className?: string;
    onChange?: (value: number) => void;
}

const stars: [string, number][] = [
    ['perfect', 5],
    ['good', 4],
    ['not bad', 3],
    ['badly', 2],
    ['terribly', 1],
];

export const StarRating = memo((props: Props) => {
    const { className, onChange } = props;
    const ratingHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(Number(e.currentTarget.value));
        },
        [onChange],
    );

    return (
        <div className={cn('form__rating', className)}>
            {stars.map(([title, value], _i) => (
                <React.Fragment key={value}>
                    <input
                        onChange={ratingHandler}
                        className="form__rating-input visually-hidden"
                        name="rating"
                        value={value}
                        id={`${value}-stars`}
                        type="radio"
                    />
                    <label
                        htmlFor={`${value}-stars`}
                        className="reviews__rating-label form__rating-label"
                        title={title}
                    >
                        <svg
                            className="form__star-image"
                            width="37"
                            height="33"
                        >
                            <use xlinkHref="#icon-star"></use>
                        </svg>
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
});
