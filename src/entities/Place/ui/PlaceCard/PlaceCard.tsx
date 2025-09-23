import { memo, useCallback, useMemo } from 'react';
import { Place } from '../../model/types/Place';
import * as React from 'react';

interface PlaceCardProps {
    className?: string;
    place: Place;
    onFavoriteClick?: (id: number) => void;
    variant?: 'default' | 'favorite';
}

export const PlaceCard = memo((props: PlaceCardProps) => {
    const { className: _cn, place, onFavoriteClick, variant } = props;

    const favoriteClasses = useMemo(() => {
        const classes = ['place-card__bookmark-button', 'button'];
        if (place.isFavorite)
            classes.push('place-card__bookmark-button--active');

        return classes;
    }, [place.isFavorite]);

    const starsRating = useMemo(() => 20 * place.rating, [place.rating]);

    const favoriteClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            onFavoriteClick?.(place.id);
        },
        [onFavoriteClick, place.id],
    );

    const isFavoriteVariant = variant === 'favorite';
    const imageWrapperClass = isFavoriteVariant
        ? 'favorites__image-wrapper place-card__image-wrapper'
        : 'cities__image-wrapper place-card__image-wrapper';
    const cardInfoClass = isFavoriteVariant
        ? 'favorites__card-info place-card__info'
        : 'place-card__info';
    const imageWidth = isFavoriteVariant ? 150 : 260;
    const imageHeight = isFavoriteVariant ? 110 : 200;

    return (
        <article
            className={
                isFavoriteVariant
                    ? 'favorites__card place-card'
                    : 'cities__card place-card'
            }
        >
            {place.isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={imageWrapperClass}>
                <a href="#">
                    <img
                        className="place-card__image"
                        src={place.previewImage}
                        width={imageWidth}
                        height={imageHeight}
                        alt="Place image"
                    />
                </a>
            </div>
            <div className={cardInfoClass}>
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">
                            &euro;{place.price}
                        </b>
                        <span className="place-card__price-text">
                            &#47;&nbsp;night
                        </span>
                    </div>
                    <button
                        onClick={favoriteClickHandler}
                        className={favoriteClasses.join(' ')}
                        type="button"
                    >
                        <svg
                            className="place-card__bookmark-icon"
                            width="18"
                            height="19"
                        >
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                            {place.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${starsRating}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <a href="#">{place.title}</a>
                </h2>
                <p className="place-card__type">{place.type}</p>
            </div>
        </article>
    );
});
