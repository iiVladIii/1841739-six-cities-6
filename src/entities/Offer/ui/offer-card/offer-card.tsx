import { memo, useCallback, useMemo } from 'react';
import { Offer } from '../../model/types/Offer';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getRouteOfferPage } from '@/shared/consts/router';
import cn from 'classnames';
import { useToggleFavoriteOffer } from '../../lib/hooks/useToggleFavoriteOffer';

interface Props {
    offer: Offer;
    variant?: 'default' | 'favorite';
    onActiveOffer?: (_o: Offer | null) => void;
}

export const OfferCard = memo((props: Props) => {
    const { offer, variant, onActiveOffer } = props;

    const starsRating = useMemo(() => 20 * offer.rating, [offer.rating]);

    const toggleFavoriteHandler = useToggleFavoriteOffer(
        offer.id,
        offer.isFavorite,
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

    const mouseEnter = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            onActiveOffer?.(offer);
        },
        [offer, onActiveOffer],
    );
    const mouseLeave = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            onActiveOffer?.(null);
        },
        [onActiveOffer],
    );

    return (
        <article
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            className={cn('place-card', {
                ['favorites__card']: isFavoriteVariant,
                ['cities__card']: !isFavoriteVariant,
            })}
            id={offer.id}
        >
            {offer.isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className={imageWrapperClass}>
                <Link to={getRouteOfferPage(offer.id)}>
                    <img
                        className="place-card__image"
                        src={offer.previewImage}
                        width={imageWidth}
                        height={imageHeight}
                        alt="Place image"
                    />
                </Link>
            </div>
            <div className={cardInfoClass}>
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">
                            &euro;{offer.price}
                        </b>
                        <span className="place-card__price-text">
                            &#47;&nbsp;night
                        </span>
                    </div>
                    <button
                        onClick={toggleFavoriteHandler}
                        className={cn('place-card__bookmark-button', 'button', {
                            'place-card__bookmark-button--active':
                                offer.isFavorite,
                        })}
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
                            {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
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
                    <Link to={getRouteOfferPage(offer.id)}>{offer.title}</Link>
                </h2>
                <p className="place-card__type">{offer.type}</p>
            </div>
        </article>
    );
});
