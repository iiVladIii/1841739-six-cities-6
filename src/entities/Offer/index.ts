export type { OfferType, Offer, DetailedOffer } from './model/types/Offer';
export { OfferCard } from './ui/OfferCard/OfferCard';
export { OfferCards } from './ui/OfferCards/OfferCards';
export { OfferDetailed } from './ui/OfferDetailed/OfferDetailed';

export { offerReducer } from './model/slice';
export type { OfferSchema } from './model/types/state';

export {
    getAvailableOffers,
    useAvailableOffers,
    getOffer,
    useNearbyOffers,
    getNearbyOffers,
    useOffer,
} from './model/selectors';

export { fetchOffersByCity } from './api/fetchOffersByCity';
