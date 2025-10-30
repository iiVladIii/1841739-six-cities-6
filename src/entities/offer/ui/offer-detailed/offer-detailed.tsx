import { memo, ReactNode, useMemo } from 'react';
import { DetailedOffer } from '../../model/types/offer';
import cn from 'classnames';
import { useToggleFavoriteOffer } from '../../lib/hooks/use-toggle-favorite-offer';

interface OfferDetailedProps {
    offer: DetailedOffer;
    reviews: ReactNode;
}

export const OfferDetailed = memo((props: OfferDetailedProps) => {
    const { offer, reviews } = props;
    const toggleFavoriteHandler = useToggleFavoriteOffer(
        offer.id,
        offer.isFavorite,
    );

    const starsRating = useMemo(() => 20 * offer.rating, [offer.rating]);

    return (
        <section className="offer">
            <div className="offer__gallery-container container">
                <div className="offer__gallery">
                    {offer.images.map((_img, _i) => (
                        <div className="offer__image-wrapper" key={_i}>
                            <img
                                className="offer__image"
                                src={_img}
                                alt="Photo studio"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="offer__container container">
                <div className="offer__wrapper">
                    {offer.isPremium && (
                        <div className="offer__mark">
                            <span>Premium</span>
                        </div>
                    )}
                    <div className="offer__name-wrapper">
                        <h1 className="offer__name">{offer.title}</h1>
                        <button
                            onClick={toggleFavoriteHandler}
                            className={cn('offer__bookmark-button button', {
                                'offer__bookmark-button--active':
                                    offer.isFavorite,
                            })}
                            type="button"
                        >
                            <svg
                                className="offer__bookmark-icon"
                                width="31"
                                height="33"
                            >
                                <use xlinkHref="#icon-bookmark"></use>
                            </svg>
                            <span className="visually-hidden">
                                To bookmarks
                            </span>
                        </button>
                    </div>
                    <div className="offer__rating rating">
                        <div className="offer__stars rating__stars">
                            <span
                                style={{
                                    width: `${starsRating}%`,
                                }}
                            ></span>
                            <span className="visually-hidden">Rating</span>
                        </div>
                        <span className="offer__rating-value rating__value">
                            {offer.rating}
                        </span>
                    </div>
                    <ul className="offer__features">
                        <li className="offer__feature offer__feature--entire">
                            {`${offer.type[0].toUpperCase()}${offer.type.slice(1)}`}
                        </li>
                        <li className="offer__feature offer__feature--bedrooms">
                            {offer.bedrooms} Bedrooms
                        </li>
                        <li className="offer__feature offer__feature--adults">
                            Max {offer.maxAdults} adults
                        </li>
                    </ul>
                    <div className="offer__price">
                        <b className="offer__price-value">&euro;120</b>
                        <span className="offer__price-text">&nbsp;night</span>
                    </div>
                    <div className="offer__inside">
                        <h2 className="offer__inside-title">
                            What&apos;s inside
                        </h2>
                        <ul className="offer__inside-list">
                            {offer.goods.map((_g, _i) => (
                                <li className="offer__inside-item" key={_i}>
                                    {_g}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="offer__host">
                        <h2 className="offer__host-title">Meet the host</h2>
                        <div className="offer__host-user user">
                            <div
                                className={cn(
                                    'offer__avatar-wrapper',
                                    'user__avatar-wrapper',
                                    {
                                        'offer__avatar-wrapper--pro':
                                            offer.host.isPro,
                                    },
                                )}
                            >
                                <img
                                    className="offer__avatar user__avatar"
                                    src={offer.host.avatarUrl}
                                    width="74"
                                    height="74"
                                    alt="Host avatar"
                                />
                            </div>
                            <span className="offer__user-name">
                                {offer.host.name}
                            </span>
                            {offer.host.isPro && (
                                <span className="offer__user-status">Pro</span>
                            )}
                        </div>
                        <div className="offer__description">
                            <p className="offer__text">{offer.description}</p>
                        </div>
                    </div>
                    {reviews}
                </div>
            </div>
        </section>
    );
});
