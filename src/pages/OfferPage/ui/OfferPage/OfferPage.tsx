import { memo, useEffect, useState } from 'react';
import { Header } from '@/widgets/Header';
import { generateMockOffers } from '@/shared/mocks/offers';
import { DetailedOffer, Offer, OfferCards } from '@/entities/Offer';
import { OfferDetailed } from '@/entities/Offer';
import { OfferReviews } from '@/widgets/OfferReviews';

const OfferPage = memo(() => {
    const [recommendedPlaces, setRecommendedPlaces] = useState<Offer[]>([]);
    useEffect(() => {
        setRecommendedPlaces(generateMockOffers());
    }, []);

    const [offer, _setOffer] = useState<DetailedOffer>({
        ...generateMockOffers()[0],
        description:
            'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
        bedrooms: 3,
        goods: [
            'Wi-Fi',
            'Washing machine',
            'Towels',
            'Heating',
            'Coffee machine',
            'Baby seat',
            'Kitchen',
            'Dishwasher',
            'Cabel TV',
            'Fridge',
        ],
        host: {
            avatarUrl: 'img/avatar-angelina.jpg',
            isPro: true,
            name: 'Angelina',
        },
        images: [
            'img/room.jpg',
            'img/apartment-01.jpg',
            'img/apartment-02.jpg',
            'img/apartment-03.jpg',
            'img/studio-01.jpg',
            'img/apartment-01.jpg',
        ],
        maxAdults: 4,
    });

    return (
        <div className="page">
            <Header />
            <main className="page__main page__main--offer">
                <OfferDetailed
                    offer={offer}
                    reviews={<OfferReviews id={offer.id} />}
                />

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">
                            Other places in the neighbourhood
                        </h2>
                        <div className="near-places__list places__list">
                            <OfferCards offers={recommendedPlaces} />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
});

export default OfferPage;
