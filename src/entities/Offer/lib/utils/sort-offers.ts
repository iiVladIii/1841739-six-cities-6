import { Offer } from '@/entities/Offer';
import { OFFER_SORT_TYPE } from '../../model/consts';

export const sortOffers = (
    offers: Offer[],
    sortType: OFFER_SORT_TYPE,
): Offer[] => {
    const sortFunctions = {
        'popular-desc': (a: Offer, b: Offer) => {
            if (a.isPremium !== b.isPremium) return b.isPremium ? 1 : -1;
            if (a.isFavorite !== b.isFavorite) return b.isFavorite ? 1 : -1;
            return b.rating - a.rating;
        },
        'price-asc': (a: Offer, b: Offer) => a.price - b.price,
        'price-desc': (a: Offer, b: Offer) => b.price - a.price,
        'top-desc': (a: Offer, b: Offer) => b.rating - a.rating,
    };

    const sortFunction = sortFunctions[sortType as keyof typeof sortFunctions];

    return sortFunction ? [...offers].sort(sortFunction) : [...offers];
};

export const isOfferSortType = (str: string): str is OFFER_SORT_TYPE =>
    str === 'price-asc' ||
    str === 'popular-desc' ||
    str === 'price-desc' ||
    str === 'top-desc';
