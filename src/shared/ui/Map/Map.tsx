import { memo, useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leaflet.css';
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

export const MapComponent = memo((props: Props) => {
    const { _className, location, points } = props;
    const mapRef = useRef(null);
    const markersRef = useRef<
        Map<string, { marker: leaflet.Marker; type: MAP_MARKER }>
    >(new Map());
    const map = useMap(mapRef, location);

    useEffect(() => {
        if (map) {
            const currentMarkers = markersRef.current;
            const processedKeys = new Set<string>();

            points.forEach((point) => {
                const key = `${point.latitude}_${point.longitude}`;
                processedKeys.add(key);

                const existingMarkerData = currentMarkers.get(key);

                if (!existingMarkerData) {
                    const marker = leaflet
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

                    currentMarkers.set(key, { marker, type: point.marker });
                } else if (existingMarkerData.type !== point.marker) {
                    existingMarkerData.marker.setIcon(markers[point.marker]);
                    existingMarkerData.type = point.marker;
                }
            });

            currentMarkers.forEach((markerData, key) => {
                if (!processedKeys.has(key)) {
                    const markerElement = markerData.marker.getElement();
                    if (markerElement) {
                        markerElement.style.opacity = '0';
                        setTimeout(() => {
                            if (map.hasLayer(markerData.marker)) {
                                map.removeLayer(markerData.marker);
                            }
                            currentMarkers.delete(key);
                        }, 200);
                    } else {
                        map.removeLayer(markerData.marker);
                        currentMarkers.delete(key);
                    }
                }
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
