import { memo, useCallback, useEffect, useState } from 'react';
import { Header } from '@/widgets/Header';
import {
    fetchOffersByCity,
    Offer,
    OfferCards,
    useAvailableOffers,
} from '@/entities/Offer';
import { CityPageTabs } from '@/features/CityTabs';
import { CityMap } from '@/features/city-map';
import { useCityName } from '@/entities/City';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SortSelector } from '@/features/sort-selector';

const MainPage = memo(() => {
    const offers = useAvailableOffers();
    const dispatch = useAppDispatch();
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    const selectOffer = useCallback((offer: Offer | null) => {
        setSelectedOffer(offer);
    }, []);

    const selectedCity = useCityName();

    useEffect(() => {
        if (selectedCity) dispatch(fetchOffersByCity(selectedCity));
    }, [dispatch, selectedCity]);

    return (
        <div className="page page--gray page--main">
            <Header />

            {offers?.length === 0 ? (
                <main className="page__main page__main--index page__main--index-empty">
                    <h1 className="visually-hidden">Cities</h1>
                    <CityPageTabs />
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
                    <CityPageTabs />
                    <div className="cities">
                        <div className="cities__places-container container">
                            <section className="cities__places places">
                                <h2 className="visually-hidden">Places</h2>
                                <b className="places__found">
                                    {offers.length} places to stay in{' '}
                                    {selectedCity}
                                </b>
                                <SortSelector />
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
