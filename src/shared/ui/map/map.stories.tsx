import type { Meta, StoryObj } from '@storybook/react-vite';
import '@/app/styles/main.css';

import { MapComponent, MapPoint } from './map';
import { MAP_MARKER } from './consts';
import { Location } from '@/entities/location';

const meta: Meta<typeof MapComponent> = {
    title: 'shared/Map',
    component: MapComponent,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        onPointClick: { action: 'point clicked' },
    },
    decorators: [
        (Story) => (
            <div style={{ height: '600px', width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof MapComponent>;

const defaultLocation: Location = {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
};

const parisPoints: MapPoint[] = [
    {
        targetId: '1',
        latitude: 48.8584,
        longitude: 2.2945,
        marker: MAP_MARKER.default,
        zoom: 10,
    },
    {
        targetId: '2',
        latitude: 48.8606,
        longitude: 2.3376,
        marker: MAP_MARKER.default,
        zoom: 10,
    },
    {
        targetId: '3',
        latitude: 48.8529,
        longitude: 2.3499,
        marker: MAP_MARKER.current,
        zoom: 10,
    },
];

export const Default: Story = {
    args: {
        location: defaultLocation,
        points: parisPoints,
    },
};

export const SinglePoint: Story = {
    args: {
        location: defaultLocation,
        points: [
            {
                targetId: 'single',
                latitude: 48.8566,
                longitude: 2.3522,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
        ],
    },
};

export const ManyPoints: Story = {
    args: {
        location: defaultLocation,
        points: Array.from({ length: 10 }, (_, i) => ({
            targetId: `point-${i}`,
            latitude: 48.8566 + (Math.random() - 0.5) * 0.1,
            longitude: 2.3522 + (Math.random() - 0.5) * 0.1,
            zoom: 10,
            marker: i === 5 ? MAP_MARKER.current : MAP_MARKER.default,
        })),
    },
};

export const EmptyMap: Story = {
    args: {
        location: defaultLocation,
        points: [],
    },
};

export const WithClickHandler: Story = {
    args: {
        location: defaultLocation,
        points: parisPoints,
        onPointClick: (point: MapPoint) => {},
    },
};

export const London: Story = {
    args: {
        location: {
            latitude: 51.5074,
            longitude: -0.1278,
            zoom: 10,
        },
        points: [
            {
                targetId: 'big-ben',
                latitude: 51.5007,
                longitude: -0.1246,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
            {
                targetId: 'tower-bridge',
                latitude: 51.5055,
                longitude: -0.0754,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
            {
                targetId: 'london-eye',
                latitude: 51.5033,
                longitude: -0.1195,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
        ],
    },
};

// Токио
export const Tokyo: Story = {
    args: {
        location: {
            latitude: 35.6762,
            longitude: 139.6503,
            zoom: 10,
        },
        points: [
            {
                targetId: 'shibuya',
                latitude: 35.6595,
                longitude: 139.7004,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
            {
                targetId: 'tokyo-tower',
                latitude: 35.6586,
                longitude: 139.7454,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
        ],
    },
};

export const OnlyCurrentMarkers: Story = {
    args: {
        location: defaultLocation,
        points: [
            {
                targetId: 'current-1',
                latitude: 48.8584,
                longitude: 2.2945,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
            {
                targetId: 'current-2',
                latitude: 48.8606,
                longitude: 2.3376,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
            {
                targetId: 'current-3',
                latitude: 48.8529,
                longitude: 2.3499,
                marker: MAP_MARKER.current,
                zoom: 10,
            },
        ],
    },
};

export const OnlyDefaultMarkers: Story = {
    args: {
        location: defaultLocation,
        points: [
            {
                targetId: 'default-1',
                latitude: 48.8584,
                longitude: 2.2945,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
            {
                targetId: 'default-2',
                latitude: 48.8606,
                longitude: 2.3376,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
            {
                targetId: 'default-3',
                latitude: 48.8529,
                longitude: 2.3499,
                marker: MAP_MARKER.default,
                zoom: 10,
            },
        ],
    },
};
