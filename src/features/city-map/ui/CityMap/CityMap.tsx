import { memo, useMemo } from 'react';
import { MapComponent } from '@/shared/ui';
import { CITY_NAME, CITY_LOCATIONS } from '@/entities/city';
import { Location } from '@/entities/location';
import { Offer } from '@/entities/offer';
import { MapPoint } from '@/shared/ui/map/map';
import { MAP_MARKER } from '@/shared/ui/map/consts';

interface CityMapProps {
    city: string | null | Location;
    offers: Offer[];
    selectedOffer?: Offer | null;
    onPointClick?: (offerId: string) => void;
}

const isLocation = (value: Location | string | null): value is Location =>
    value !== null &&
    typeof value === 'object' &&
    'latitude' in value &&
    'longitude' in value;

const isKnownCity = (value: string | null): value is CITY_NAME =>
    value !== null && Object.values(CITY_NAME).includes(value as CITY_NAME);

export const CityMap = memo((props: CityMapProps) => {
    const { city, offers, selectedOffer, onPointClick } = props;

    const points: MapPoint[] = useMemo(
        () =>
            offers?.map((o) => ({
                ...o.location,
                marker:
                    selectedOffer?.id === o.id
                        ? MAP_MARKER.current
                        : MAP_MARKER.default,
                targetId: o.id,
            })) ?? [],
        [offers, selectedOffer?.id],
    );

    const location: Location = useMemo(() => {
        if (isLocation(city)) return city;
        if (isKnownCity(city)) return CITY_LOCATIONS[city];
        return CITY_LOCATIONS[CITY_NAME.Paris];
    }, [city]);

    return (
        <MapComponent
            location={location}
            points={points}
            onPointClick={(p) => onPointClick?.(p.targetId)}
        />
    );
});
