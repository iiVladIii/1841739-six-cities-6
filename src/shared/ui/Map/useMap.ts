import { useEffect, useRef, useState, useMemo } from 'react';
import leaflet from 'leaflet';
import { Location } from '@/entities/Location';

export function useMap(
    mapRef: React.MutableRefObject<HTMLElement | null>,
    location: Location,
) {
    const [map, setMap] = useState<leaflet.Map | null>(null);
    const isRenderedRef = useRef(false);

    const memoizedLocation = useMemo(
        () => ({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: location.zoom,
        }),
        [location.latitude, location.longitude, location.zoom],
    );

    useEffect(() => {
        if (mapRef.current !== null && !isRenderedRef.current) {
            const instance = leaflet.map(mapRef.current, {
                center: {
                    lat: memoizedLocation.latitude,
                    lng: memoizedLocation.longitude,
                },
                zoom: memoizedLocation.zoom,
            });

            leaflet
                .tileLayer(
                    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    },
                )
                .addTo(instance);

            setMap(instance);
            isRenderedRef.current = true;
        }
    }, [mapRef, memoizedLocation]);

    useEffect(() => {
        if (map && isRenderedRef.current) {
            map.setView(
                [memoizedLocation.latitude, memoizedLocation.longitude],
                memoizedLocation.zoom,
            );
        }
    }, [map, memoizedLocation]);

    return map;
}
