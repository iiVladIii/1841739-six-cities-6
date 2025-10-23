import { City } from '@/entities/City';
import { Location } from '@/entities/Location';
import { User } from '@/entities/User';

export type OfferType = 'apartment' | 'room' | 'house' | 'hotel';
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

export interface DetailedOffer extends Offer {
    description: string;
    bedrooms: number;
    goods: string[];
    host: User;
    images: string[];
    maxAdults: number;
}
