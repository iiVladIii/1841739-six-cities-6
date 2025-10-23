export type { OfferType, Offer, DetailedOffer } from './model/types/Offer';
export { OfferCard } from './ui/offer-card/offer-card';
export { OfferCards } from './ui/offer-cards/offer-cards';
export { OfferDetailed } from './ui/offer-detailed/offer-detailed';

export { offerReducer } from './model/slice';
export type { OfferSchema } from './model/types/state';

export {
    getAvailableOffers,
    useAvailableOffers,
    getOffer,
    useNearbyOffers,
    getNearbyOffers,
    useOffer,
    useFavoriteOffers,
    useFavoriteCount,
} from './model/selectors';

export { fetchOffersByCity } from './api/fetch-offers-by-city';
export { fetchNearbyOffersByCity } from './api/fetch-nearby-offers-by-city';
export { fetchOffer } from './api/fetch-offer';
export { fetchFavoriteOffers } from './api/fetch-favorite-offers';
export { toggleFavoriteOffer } from './api/toggle-favorite-offer';

export { OFFER_SORT_OPTIONS } from './model/consts';
