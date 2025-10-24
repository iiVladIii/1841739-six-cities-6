import { Offer } from '@/entities/offer';
import { CITY_NAME } from '@/entities/city';

export function toggleFavoriteOffers(offers: Offer[], id: string) {
    return offers.map((offer) => {
        if (offer.id === id) {
            return { ...offer, isFavorite: !offer.isFavorite };
        }
        return offer;
    });
}

export function calculateFavoritesCount(
    offers: Partial<Record<CITY_NAME, Offer[]>>,
) {
    return Object.values(offers).reduce((acc, offs) => {
        acc = acc + offs.length;
        return acc;
    }, 0);
}
