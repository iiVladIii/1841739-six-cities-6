import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Header } from '@/widgets/Header';
import { Offer, OfferCards } from '@/entities/Offer';
import { generateMockOffers } from '@/shared/mocks/offers.ts';
import { CityTabs } from '@/features/CityTabs';
import { CityMap } from '@/widgets/CityMap';
import { getRouteMainPage } from '@/shared/consts/router';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Cities } from '@/entities/City';
import { SortSelector } from '@/features/sort-selector';

const MainPage = memo(() => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    const selectOffer = useCallback((offer: Offer | null) => {
        setSelectedOffer(offer);
    }, []);

    const selectedCity = useMemo(
        () => searchParams.get('city'),
        [searchParams],
    );

    useEffect(() => {
        if (!selectedCity) {
            navigate(`${getRouteMainPage()}?city=${Cities.Amsterdam}`);
        }
    }, [navigate, selectedCity]);

    useEffect(() => {
        setOffers(generateMockOffers());
    }, []);

    return (
        <div className="page page--gray page--main">
            <Header />

            {offers?.length === 0 ? (
                <main className="page__main page__main--index page__main--index-empty">
                    <h1 className="visually-hidden">Cities</h1>
                    <CityTabs city={selectedCity} />
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
                    <CityTabs city={selectedCity} />
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
                                    <OfferCards
                                        offers={offers}
                                        onActiveOffer={selectOffer}
                                    />
                                </div>
                            </section>
                            <div className="cities__right-section">
                                <CityMap
                                    city={selectedCity}
                                    offers={offers}
                                    selectedOffer={selectedOffer}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
});

export default MainPage;
