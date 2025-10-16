import { memo } from 'react';
import { Offer } from '../../model/types/Offer';
import { OfferCard } from '../OfferCard/OfferCard';

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
