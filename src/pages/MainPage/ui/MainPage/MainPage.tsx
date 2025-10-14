import { memo, useEffect, useState } from 'react';
import { Header } from '@/widgets/Header';
import { Place, PlaceCard } from '@/entities/Place';
import { PlaceType } from '@/entities/Place/model/consts/PlaceType.ts';

const placesInitial: Place[] = [
    {
        id: 1,
        title: 'Beautiful & luxurious apartment at great location',
        type: PlaceType.APARTMENT,
        price: 120,
        rating: 4.0,
        isPremium: true,
        isFavorite: false,
        previewImage: 'img/apartment-01.jpg',
        city: 'Amsterdam',
    },
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
        id: 3,
        title: 'Canal View Prinsengracht',
        type: PlaceType.APARTMENT,
        price: 132,
        rating: 4.0,
        isPremium: false,
        isFavorite: false,
        previewImage: 'img/apartment-02.jpg',
        city: 'Amsterdam',
    },
    {
        id: 4,
        title: 'Nice, cozy, warm big bed apartment',
        type: PlaceType.APARTMENT,
        price: 180,
        rating: 5.0,
        isPremium: true,
        isFavorite: false,
        previewImage: 'img/apartment-03.jpg',
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
        city: 'Amsterdam',
    },
];

const Tabs = () => (
    <div className="tabs">
        <section className="locations container">
            <ul className="locations__list tabs__list">
                <li className="locations__item">
                    <a className="locations__item-link tabs__item" href="#">
                        <span>Paris</span>
                    </a>
                </li>
                <li className="locations__item">
                    <a className="locations__item-link tabs__item" href="#">
                        <span>Cologne</span>
                    </a>
                </li>
                <li className="locations__item">
                    <a className="locations__item-link tabs__item" href="#">
                        <span>Brussels</span>
                    </a>
                </li>
                <li className="locations__item">
                    <a className="locations__item-link tabs__item tabs__item--active">
                        <span>Amsterdam</span>
                    </a>
                </li>
                <li className="locations__item">
                    <a className="locations__item-link tabs__item" href="#">
                        <span>Hamburg</span>
                    </a>
                </li>
                <li className="locations__item">
                    <a className="locations__item-link tabs__item" href="#">
                        <span>Dusseldorf</span>
                    </a>
                </li>
            </ul>
        </section>
    </div>
);

const MainPage = memo(() => {
    const [places, setPlaces] = useState<Place[]>([]);

    useEffect(() => {
        setPlaces(placesInitial);
    }, []);

    return (
        <div className="page page--gray page--main">
            <Header />

            {places?.length === 0 ? (
                <main className="page__main page__main--index page__main--index-empty">
                    <h1 className="visually-hidden">Cities</h1>
                    <div className="tabs">
                        <section className="locations container">
                            <ul className="locations__list tabs__list">
                                <li className="locations__item">
                                    <a
                                        className="locations__item-link tabs__item"
                                        href="#"
                                    >
                                        <span>Paris</span>
                                    </a>
                                </li>
                                <li className="locations__item">
                                    <a
                                        className="locations__item-link tabs__item"
                                        href="#"
                                    >
                                        <span>Cologne</span>
                                    </a>
                                </li>
                                <li className="locations__item">
                                    <a
                                        className="locations__item-link tabs__item"
                                        href="#"
                                    >
                                        <span>Brussels</span>
                                    </a>
                                </li>
                                <li className="locations__item">
                                    <a className="locations__item-link tabs__item">
                                        <span>Amsterdam</span>
                                    </a>
                                </li>
                                <li className="locations__item">
                                    <a
                                        className="locations__item-link tabs__item"
                                        href="#"
                                    >
                                        <span>Hamburg</span>
                                    </a>
                                </li>
                                <li className="locations__item">
                                    <a
                                        className="locations__item-link tabs__item tabs__item--active"
                                        href="#"
                                    >
                                        <span>Dusseldorf</span>
                                    </a>
                                </li>
                            </ul>
                        </section>
                    </div>
                    <div className="cities">
                        <div className="cities__places-container cities__places-container--empty container">
                            <section className="cities__no-places">
                                <div className="cities__status-wrapper tabs__content">
                                    <b className="cities__status">
                                        No places to stay available
                                    </b>
                                    <p className="cities__status-description">
                                        We could not find any property available
                                        at the moment in Dusseldorf
                                    </p>
                                </div>
                            </section>
                            <div className="cities__right-section"></div>
                        </div>
                    </div>
                </main>
            ) : (
                <main className="page__main page__main--index">
                    <h1 className="visually-hidden">Cities</h1>
                    <Tabs />
                    <div className="cities">
                        <div className="cities__places-container container">
                            <section className="cities__places places">
                                <h2 className="visually-hidden">Places</h2>
                                <b className="places__found">
                                    312 places to stay in Amsterdam
                                </b>
                                <form
                                    className="places__sorting"
                                    action="#"
                                    method="get"
                                >
                                    <span className="places__sorting-caption">
                                        Sort by
                                    </span>
                                    <span
                                        className="places__sorting-type"
                                        tabIndex={0}
                                    >
                                        Popular
                                        <svg
                                            className="places__sorting-arrow"
                                            width="7"
                                            height="4"
                                        >
                                            <use xlinkHref="#icon-arrow-select"></use>
                                        </svg>
                                    </span>
                                    <ul className="places__options places__options--custom places__options--opened">
                                        <li
                                            className="places__option places__option--active"
                                            tabIndex={0}
                                        >
                                            Popular
                                        </li>
                                        <li
                                            className="places__option"
                                            tabIndex={0}
                                        >
                                            Price: low to high
                                        </li>
                                        <li
                                            className="places__option"
                                            tabIndex={0}
                                        >
                                            Price: high to low
                                        </li>
                                        <li
                                            className="places__option"
                                            tabIndex={0}
                                        >
                                            Top rated first
                                        </li>
                                    </ul>
                                </form>
                                <div className="cities__places-list places__list tabs__content">
                                    {places.map((place) => (
                                        <PlaceCard
                                            key={place.id}
                                            place={place}
                                        />
                                    ))}
                                </div>
                            </section>
                            <div className="cities__right-section">
                                <section className="cities__map map"></section>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
});

export default MainPage;
