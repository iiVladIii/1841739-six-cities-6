import { memo, useEffect, useMemo, useState } from 'react';
import { Header } from '@/widgets/Header';
import { Place, PlaceCard, PlaceType } from '@/entities/Place';
import { Footer } from '@/widgets/Footer';

interface MainPageProps {
    className?: string;
}

const placesInitial: Place[] = [
    {
        id: 2,
        title: 'Wood and stone place',
        type: PlaceType.ROOM,
        price: 80,
        rating: 4.0,
        isPremium: false,
        isFavorite: true,
        previewImage: 'img/room.jpg',
        city: 'Amsterdam',
    },
    {
        id: 5,
        title: 'Wood and stone place',
        type: PlaceType.ROOM,
        price: 80,
        rating: 4.0,
        isPremium: false,
        isFavorite: true,
        previewImage: 'img/room.jpg',
        city: 'Cologne',
    },
];

const FavoritesPage = memo((props: MainPageProps) => {
    const { className: _className } = props;

    const [placesByCities, setPlacesByCities] = useState<
        Record<string, Place[]>
    >({});
    useEffect(() => {
        setPlacesByCities(
            placesInitial.reduce((acc: Record<string, Place[]>, curr) => {
                if (!(curr.city in acc)) {
                    acc[curr.city] = [];
                }
                acc[curr.city].push(curr);

                return acc;
            }, {}),
        );
    }, []);

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
                                                    <a
                                                        className="locations__item-link"
                                                        href="#"
                                                    >
                                                        <span>{city}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="favorites__places">
                                                {places.map((p) => (
                                                    <PlaceCard
                                                        place={p}
                                                        key={p.id}
                                                        variant={'favorite'}
                                                    />
                                                ))}
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
