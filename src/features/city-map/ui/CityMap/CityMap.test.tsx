import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CityMap } from './CityMap';
import { CITY_NAME, CITY_LOCATIONS } from '@/entities/city';
import { MAP_MARKER } from '@/shared/ui/map/consts';
import { Offer } from '@/entities/offer';

interface MockMapComponentProps {
    location: {
        latitude: number;
        longitude: number;
        zoom: number;
    };
    points: Array<{
        latitude: number;
        longitude: number;
        marker: string;
    }>;
}

interface ParsedLocation {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface ParsedPoint {
    latitude: number;
    longitude: number;
    marker: string;
}

vi.mock('@/shared/ui', () => ({
    MapComponent: ({ location, points }: MockMapComponentProps) => (
        <div data-testid="map-component">
            <div data-testid="location">{JSON.stringify(location)}</div>
            <div data-testid="points">{JSON.stringify(points)}</div>
        </div>
    ),
}));

const mockOffer: Offer = {
    id: 'test-id-123',
    title: 'Beautiful apartment in Paris',
    type: 'apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'https://example.com/image.jpg',
    isPremium: false,
    isFavorite: false,
    city: {
        name: CITY_NAME.Paris,
        location: {
            latitude: 48.8566,
            longitude: 2.3522,
            zoom: 10,
        },
    },
    location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 10,
    },
};

describe('CityMap', () => {
    const mockOffers = [
        {
            ...mockOffer,
            id: 'test-id-1',
            location: { latitude: 48.8566, longitude: 2.3522, zoom: 10 },
        },
        {
            ...mockOffer,
            id: 'test-id-2',
            location: { latitude: 48.8606, longitude: 2.3376, zoom: 10 },
        },
    ];

    it('should render with city name', () => {
        render(<CityMap city={CITY_NAME.Paris} offers={mockOffers} />);
        expect(screen.getByTestId('map-component')).toBeInTheDocument();
    });

    it('should use location object when city is Location', () => {
        const location = { latitude: 50.0, longitude: 10.0, zoom: 10 };
        render(<CityMap city={location} offers={mockOffers} />);
        const locationElement = screen.getByTestId('location');
        expect(locationElement.textContent).toContain('50');
    });

    it('should set current marker for selected offer', () => {
        render(
            <CityMap
                city={CITY_NAME.Paris}
                offers={mockOffers}
                selectedOffer={mockOffers[0]}
            />,
        );
        const points = JSON.parse(
            screen.getByTestId('points').textContent!,
        ) as ParsedPoint[];
        expect(points[0].marker).toBe(MAP_MARKER.current);
        expect(points[1].marker).toBe(MAP_MARKER.default);
    });

    it('should use Paris as default location', () => {
        render(<CityMap city={null} offers={mockOffers} />);
        const location = JSON.parse(
            screen.getByTestId('location').textContent!,
        ) as ParsedLocation;
        expect(location).toEqual(CITY_LOCATIONS[CITY_NAME.Paris]);
    });
});
