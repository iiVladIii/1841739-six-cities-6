import { City } from '@/entities/City';
import { Location } from '@/entities/Location';

export type OfferType = 'apartment';
export interface Offer {
    id: string;
    title: string;
    type: OfferType;
    price: number;
    city: City;
    location: Location;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}
