import { Location } from '@/entities/Location';
import { CITY_NAME } from './Cities';

export const CITY_LOCATIONS: Record<CITY_NAME, Location> = {
    [CITY_NAME.Paris]: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 10,
    },
    [CITY_NAME.Cologne]: {
        latitude: 50.9375,
        longitude: 6.9603,
        zoom: 10,
    },
    [CITY_NAME.Brussels]: {
        latitude: 50.8503,
        longitude: 4.3517,
        zoom: 11,
    },
    [CITY_NAME.Amsterdam]: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 10,
    },
    [CITY_NAME.Hamburg]: {
        latitude: 53.5511,
        longitude: 9.9937,
        zoom: 10,
    },
    [CITY_NAME.Dusseldorf]: {
        latitude: 51.2277,
        longitude: 6.7735,
        zoom: 10,
    },
};
