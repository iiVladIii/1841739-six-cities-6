import { DetailedOffer, Offer } from './offer';
import { CITY_NAME } from '@/entities/city';

export interface OfferSchema {
    availableOffers: Offer[];
    nearbyOffers: Offer[];
    offer: DetailedOffer | null;
    favoriteOffers: Partial<Record<CITY_NAME, Offer[]>>;
    favoriteCount: number;
}
