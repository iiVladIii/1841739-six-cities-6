import { memo, useMemo } from 'react';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { OfferCards } from '@/entities/Offer';
import { Link } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import { useFavoriteOffers } from '@/entities/Offer';

const FavoritesPage = memo(() => {
    const placesByCities = useFavoriteOffers();

    const isEmpty = useMemo(() => {
        const isNoCities = Object.keys(placesByCities).length === 0;
        const isNoFavorites = Object.values(placesByCities).every(
            (pls) => pls.length === 0,
        );

        return isNoCities || isNoFavorites;
    }, [placesByCities]);

    return (
        <div className="page page--gray page--main">
            <Header />
            {isEmpty ? (
                <main className="page__main page__main--favorites page__main--favorites-empty">
                    <div className="page__favorites-container container">
                        <section className="favorites favorites--empty">
                            <h1 className="visually-hidden">
                                Favorites (empty)
                            </h1>
                            <div className="favorites__status-wrapper">
                                <b className="favorites__status">
                                    Nothing yet saved.
                                </b>
                                <p className="favorites__status-description">
                                    Save properties to narrow down search or
                                    plan your future trips.
                                </p>
                            </div>
                        </section>
                    </div>
                </main>
            ) : (
                <main className="page__main page__main--favorites">
                    <div className="page__favorites-container container">
                        <section className="favorites">
                            <h1 className="favorites__title">Saved listing</h1>
                            <ul className="favorites__list">
                                {Object.entries(placesByCities).map(
                                    ([city, places]) => (
                                        <li
                                            className="favorites__locations-items"
                                            key={city}
                                        >
                                            <div className="favorites__locations locations locations--current">
                                                <div className="locations__item">
                                                    <Link
                                                        className="locations__item-link"
                                                        to={`${getRouteMainPage()}?city=${city}`}
                                                    >
                                                        <span>{city}</span>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="favorites__places">
                                                <OfferCards
                                                    offers={places}
                                                    variant={'favorite'}
                                                />
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </section>
                    </div>
                </main>
            )}

            <Footer />
        </div>
    );
});

export default FavoritesPage;
