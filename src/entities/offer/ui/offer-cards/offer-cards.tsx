import { memo } from 'react';
import { Offer } from '../../model/types/offer';
import { OfferCard } from '../offer-card/offer-card';

interface OfferCardsProps {
    offers: Offer[];
    variant?: 'default' | 'favorite';
    onActiveOffer?: (offer: Offer | null) => void;
}

export const OfferCards = memo((props: OfferCardsProps) => {
    const { offers = [], variant, onActiveOffer } = props;

    return (
        <>
            {offers.map((o) => (
                <OfferCard
                    offer={o}
                    key={o.id}
                    variant={variant}
                    onActiveOffer={onActiveOffer}
                />
            ))}
        </>
    );
});
