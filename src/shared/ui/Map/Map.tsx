import { memo, useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/entities/Location';
import { MAP_MARKER, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from './consts';
import { useMap } from './useMap';

export interface MapPoint extends Location {
    marker: MAP_MARKER;
}

interface Props {
    _className?: string;
    location: Location;
    points: MapPoint[];
}

const markers: Record<MAP_MARKER, leaflet.Icon<leaflet.IconOptions>> = {
    [MAP_MARKER.default]: leaflet.icon({
        iconUrl: URL_MARKER_DEFAULT,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    }),
    [MAP_MARKER.current]: leaflet.icon({
        iconUrl: URL_MARKER_CURRENT,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    }),
};

export const Map = memo((props: Props) => {
    const { _className, location, points } = props;
    const mapRef = useRef(null);
    const map = useMap(mapRef, location);

    useEffect(() => {
        if (map) {
            points.forEach((point) => {
                leaflet
                    .marker(
                        {
                            lat: point.latitude,
                            lng: point.longitude,
                        },
                        {
                            icon: markers[point.marker],
                        },
                    )
                    .addTo(map);
            });
        }
    }, [map, points]);

    return (
        <div
            style={{ width: '100%', height: '100%' }}
            ref={mapRef}
            className={_className}
        ></div>
    );
});
