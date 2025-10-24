import { memo, useCallback, useEffect, useState } from 'react';
import { Header } from '@/widgets/header';
import {
    fetchNearbyOffersByCity,
    fetchOffer,
    Offer,
    OfferCards,
    useNearbyOffers,
    useOffer,
} from '@/entities/offer';
import { OfferDetailed } from '@/entities/offer';
import { OfferReviews } from '@/widgets/offer-reviews';
import { CityMap } from '@/features/city-map';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { scrollIntoView } from '@/shared/lib/scroll-into-view';

const OfferPage = memo(() => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const recommendedPlaces = useNearbyOffers();
    const offer = useOffer();
    const [_selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const navigate = useNavigate();

    const selectOffer = useCallback((o: Offer | null) => {
        setSelectedOffer(o);
    }, []);

    useEffect(() => {
        if (id) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            dispatch(fetchOffer(id)).then((d) => {
                if (d.meta.requestStatus === 'rejected') {
                    navigate('/404');
                }
            });
        }
    }, [dispatch, id, navigate]);

    useEffect(() => {
        if (offer) {
            dispatch(
                fetchNearbyOffersByCity({
                    id: offer.id,
                    city: offer.city.name,
                }),
            );
        }
    }, [dispatch, offer]);

    if (!offer) return null;

    return (
        <div className="page">
            <Header />
            <main className="page__main page__main--offer">
                <OfferDetailed
                    offer={offer}
                    reviews={<OfferReviews id={offer.id} />}
                />
                <section className="offer__map map">
                    <CityMap
                        city={offer.city.name}
                        offers={[offer, ...recommendedPlaces.slice(0, 3)]}
                        selectedOffer={offer}
                        onPointClick={(p) => {
                            scrollIntoView(`#${p}`);
                        }}
                    />
                </section>

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">
                            Other places in the neighbourhood
                        </h2>
                        <div className="near-places__list places__list">
                            <OfferCards
                                offers={recommendedPlaces.slice(0, 3)}
                                onActiveOffer={selectOffer}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
});

export default OfferPage;
