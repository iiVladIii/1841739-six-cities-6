import { memo, useMemo } from 'react';
import { Map } from '@/shared/ui';
import { Cities, CITY_LOCATIONS } from '@/entities/City';
import { Location } from '@/entities/Location';
import { Offer } from '@/entities/Offer';
import { MapPoint } from '@/shared/ui/Map/Map';
import { MAP_MARKER } from '@/shared/ui/Map/consts';

interface CityMapProps {
    city: string | null | Location;
    offers: Offer[];
    selectedOffer?: Offer | null;
}

const isLocation = (value: Location | string | null): value is Location =>
    value !== null &&
    typeof value === 'object' &&
    'latitude' in value &&
    'longitude' in value;

const isKnownCity = (value: string | null): value is Cities =>
    value !== null && Object.values(Cities).includes(value as Cities);

export const CityMap = memo((props: CityMapProps) => {
    const { city, offers, selectedOffer } = props;

    const points: MapPoint[] = useMemo(
        () =>
            offers?.map((o) => ({
                ...o.location,
                marker:
                    selectedOffer?.id === o.id
                        ? MAP_MARKER.current
                        : MAP_MARKER.default,
            })) ?? [],
        [offers, selectedOffer?.id],
    );

    const location: Location = useMemo(() => {
        if (isLocation(city)) return city;
        if (isKnownCity(city)) return CITY_LOCATIONS[city];
        return CITY_LOCATIONS[Cities.Amsterdam];
    }, [city]);

    return <Map location={location} points={points} />;
});
