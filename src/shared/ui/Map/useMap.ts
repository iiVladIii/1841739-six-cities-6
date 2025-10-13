import { useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { Location } from '@/entities/Location';

export function useMap(
    mapRef: React.MutableRefObject<HTMLElement | null>,
    location: Location,
) {
    const [map, setMap] = useState<leaflet.Map | null>(null);
    const isRenderedRef = useRef(false);

    useEffect(() => {
        if (mapRef.current !== null && !isRenderedRef.current) {
            const instance = leaflet.map(mapRef.current, {
                center: {
                    lat: location.latitude,
                    lng: location.longitude,
                },
                zoom: location.zoom,
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
    }, [mapRef, location]);

    useEffect(() => {
        if (map && isRenderedRef.current) {
            map.setView([location.latitude, location.longitude], location.zoom);
        }
    }, [map, location]);

    return map;
}
