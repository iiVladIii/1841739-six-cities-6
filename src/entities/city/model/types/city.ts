import { CITY_NAME } from '../consts/cities';
import { Location } from '@/entities/location';

export interface City {
    name: CITY_NAME;
    location: Location;
}
