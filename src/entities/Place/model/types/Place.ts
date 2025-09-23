import { PlaceType } from '../consts/PlaceType';

export interface Place {
    id: number;
    title: string;
    type: PlaceType;
    price: number;
    rating: number;
    isPremium: boolean;
    isFavorite: boolean;
    previewImage: string;
    city: string;
    gallery?: string[];
}
