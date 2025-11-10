import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferCard } from './offer-card';
import { Offer } from '../../model/types/offer';
import { CITY_NAME } from '@/entities/city';
import { StoreDecorator } from '@/shared/config/storybook/store-decorator';

const mockOffer: Offer = {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
        name: CITY_NAME.Amsterdam,
        location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
            zoom: 10,
        },
    },
    location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
};

const meta: Meta<typeof OfferCard> = {
    title: 'entities/Offer/OfferCard',
    component: OfferCard,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})],
    parameters: {
        layout: 'centered',
    },
    args: {
        onActiveOffer: () => {},
    },
};

export default meta;
type Story = StoryObj<typeof OfferCard>;

export const Default: Story = {
    args: {
        offer: mockOffer,
        variant: 'default',
    },
};

export const FavoriteOffer: Story = {
    args: {
        offer: {
            ...mockOffer,
            isFavorite: true,
        },
        variant: 'default',
    },
};

export const Premium: Story = {
    args: {
        offer: {
            ...mockOffer,
            isPremium: true,
        },
        variant: 'default',
    },
};

export const PremiumAndFavorite: Story = {
    args: {
        offer: {
            ...mockOffer,
            isPremium: true,
            isFavorite: true,
        },
        variant: 'default',
    },
};

export const FavoriteVariant: Story = {
    args: {
        offer: {
            ...mockOffer,
            isFavorite: true,
        },
        variant: 'favorite',
    },
};

export const HighRating: Story = {
    args: {
        offer: {
            ...mockOffer,
            rating: 5,
        },
        variant: 'default',
    },
};

export const LowRating: Story = {
    args: {
        offer: {
            ...mockOffer,
            rating: 2.3,
        },
        variant: 'default',
    },
};

export const ExpensiveOffer: Story = {
    args: {
        offer: {
            ...mockOffer,
            price: 500,
            isPremium: true,
            title: 'Luxury penthouse with stunning views',
        },
        variant: 'default',
    },
};

export const CheapOffer: Story = {
    args: {
        offer: {
            ...mockOffer,
            price: 35,
            title: 'Cozy room in the city center',
            type: 'room',
        },
        variant: 'default',
    },
};

export const HouseType: Story = {
    args: {
        offer: {
            ...mockOffer,
            type: 'house',
            title: 'Charming family house',
            price: 180,
        },
        variant: 'default',
    },
};

export const HotelType: Story = {
    args: {
        offer: {
            ...mockOffer,
            type: 'hotel',
            title: 'Boutique hotel room',
            price: 95,
            isPremium: true,
        },
        variant: 'default',
    },
};

export const LongTitle: Story = {
    args: {
        offer: {
            ...mockOffer,
            title: 'Super beautiful and extremely luxurious apartment at absolutely great and amazing location in the heart of the city',
        },
        variant: 'default',
    },
};

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <OfferCard offer={mockOffer} variant="default" />
            <OfferCard
                offer={{ ...mockOffer, isPremium: true }}
                variant="default"
            />
            <OfferCard
                offer={{ ...mockOffer, isFavorite: true }}
                variant="default"
            />
            <OfferCard
                offer={{ ...mockOffer, isFavorite: true }}
                variant="favorite"
            />
        </div>
    ),
};
