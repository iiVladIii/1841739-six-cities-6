import { CITY_NAME } from '../consts/Cities';
import { Location } from '@/entities/Location';

export interface City {
    name: CITY_NAME;
    location: Location;
}
