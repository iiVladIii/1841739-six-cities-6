import { DetailedOffer, Offer } from './Offer.ts';

export interface OfferSchema {
    availableOffers: Offer[];
    nearbyOffers: Offer[];
    offer: DetailedOffer | null;
}
