import { memo, useCallback, useEffect, useState } from 'react';
import { Header } from '@/widgets/header';
import {
    fetchOffersByCity,
    Offer,
    OfferCards,
    useAvailableOffers,
} from '@/entities/offer';
import { CityPageTabs } from '@/features/city-tabs';
import { CityMap } from '@/features/city-map';
import { useCityName } from '@/entities/city';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { SortSelector } from '@/features/sort-selector';
import { scrollIntoView } from '@/shared/lib/scroll-into-view';
import { useSearchParams } from 'react-router-dom';

const MainPage = memo(() => {
    const offers = useAvailableOffers();
    const dispatch = useAppDispatch();
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [searchParams] = useSearchParams();
    const sortBy = searchParams.get('sort-by');

    const selectOffer = useCallback((offer: Offer | null) => {
        setSelectedOffer(offer);
    }, []);

    const selectedCity = useCityName();

    useEffect(() => {
        if (selectedCity && sortBy) dispatch(fetchOffersByCity(selectedCity));
    }, [dispatch, selectedCity, sortBy]);

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
                                    onPointClick={(p) => {
                                        scrollIntoView(`#${p}`);
                                    }}
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
