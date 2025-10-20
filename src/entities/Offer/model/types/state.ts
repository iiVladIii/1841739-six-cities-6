import { DetailedOffer, Offer } from './Offer.ts';
import { CITY_NAME } from '@/entities/City';

export interface OfferSchema {
    availableOffers: Offer[];
    nearbyOffers: Offer[];
    offer: DetailedOffer | null;
    favoriteOffers: Partial<Record<CITY_NAME, Offer[]>>;
    favoriteCount: number;
}
