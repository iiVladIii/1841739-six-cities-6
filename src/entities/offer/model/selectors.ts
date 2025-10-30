import { StateSchema } from '@/app/providers/store';
import { useSelector } from 'react-redux';

export const getAvailableOffers = (state: StateSchema) =>
    state.offer.availableOffers;

export function useAvailableOffers() {
    return useSelector(getAvailableOffers);
}

export const getNearbyOffers = (state: StateSchema) => state.offer.nearbyOffers;

export function useNearbyOffers() {
    return useSelector(getNearbyOffers);
}

export const getOffer = (state: StateSchema) => state.offer.offer;

export function useOffer() {
    return useSelector(getOffer);
}

export const getFavoriteOffers = (state: StateSchema) =>
    state.offer.favoriteOffers;

export function useFavoriteOffers() {
    return useSelector(getFavoriteOffers);
}

export const getFavoriteCount = (state: StateSchema) =>
    state.offer.favoriteCount;

export function useFavoriteCount() {
    return useSelector(getFavoriteCount);
}
