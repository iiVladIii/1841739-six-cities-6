import { Offer } from '@/entities/Offer';

export const generateMockOffers = (): Offer[] => [
    {
        id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
        title: 'Beautiful & luxurious studio at great location',
        type: 'apartment',
        price: 120,
        city: {
            name: 'Amsterdam',
            location: {
                latitude: 52.35514938496378,
                longitude: 4.673877537499948,
                zoom: 8,
            },
        },
        location: {
            latitude: 52.35514938496378,
            longitude: 4.673877537499948,
            zoom: 8,
        },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/apartment-01.jpg',
    },
    {
        id: '8bf8a823-d39e-5232-93de-f1c573b38g11',
        title: 'Cozy room in the heart of the city',
        type: 'apartment',
        price: 80,
        city: {
            name: 'Paris',
            location: {
                latitude: 48.85661400000001,
                longitude: 2.3522219000000177,
                zoom: 8,
            },
        },
        location: {
            latitude: 48.85661400000001,
            longitude: 2.3522219000000177,
            zoom: 8,
        },
        isFavorite: true,
        isPremium: true,
        rating: 5,
        previewImage: 'img/room.jpg',
    },
    {
        id: '9cf9b934-e40f-6343-a4ef-g2d684c49h22',
        title: 'Modern house with garden',
        type: 'apartment',
        price: 200,
        city: {
            name: 'Berlin',
            location: {
                latitude: 52.52000659999999,
                longitude: 13.404953999999975,
                zoom: 8,
            },
        },
        location: {
            latitude: 52.52000659999999,
            longitude: 13.404953999999975,
            zoom: 8,
        },
        isFavorite: false,
        isPremium: true,
        rating: 4,
        previewImage: 'img/apartment-02.jpg',
    },
    {
        id: 'adf0c045-f51g-7454-b5fg-h3e795d50i33',
        title: 'Stylish loft in downtown area',
        type: 'apartment',
        price: 150,
        city: {
            name: 'London',
            location: {
                latitude: 51.5073359,
                longitude: -0.12775829999998223,
                zoom: 8,
            },
        },
        location: {
            latitude: 51.5073359,
            longitude: -0.12775829999998223,
            zoom: 8,
        },
        isFavorite: true,
        isPremium: false,
        rating: 3,
        previewImage: 'img/apartment-03.jpg',
    },
    {
        id: 'bef1d156-g62h-8565-c6gh-i4f806e61j44',
        title: 'Charming hotel room with city view',
        type: 'apartment',
        price: 90,
        city: {
            name: 'Barcelona',
            location: {
                latitude: 41.38506389999999,
                longitude: 2.1734034999999494,
                zoom: 8,
            },
        },
        location: {
            latitude: 41.38506389999999,
            longitude: 2.1734034999999494,
            zoom: 8,
        },
        isFavorite: false,
        isPremium: false,
        rating: 4,
        previewImage: 'img/room.jpg',
    },
];
