import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { OfferDetailed } from './offer-detailed';
import { DetailedOffer } from '../../model/types/offer';
import { CITY_NAME } from '@/entities/city';

vi.mock('../../lib/hooks/use-toggle-favorite-offer', () => ({
    useToggleFavoriteOffer: vi.fn(() => vi.fn()),
}));

const mockDetailedOffer: DetailedOffer = {
    id: 'test-id-123',
    title: 'Luxury apartment in Amsterdam',
    type: 'apartment',
    price: 250,
    rating: 4.8,
    description: 'A nice place to stay',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating'],
    host: {
        name: 'John Doe',
        avatarUrl: 'https://example.com/avatar.jpg',
        isPro: true,
    },
    images: [
        'https://example.com/img1.jpg',
        'https://example.com/img2.jpg',
        'https://example.com/img3.jpg',
    ],
    maxAdults: 4,
    isPremium: false,
    isFavorite: false,
    city: {
        name: CITY_NAME.Amsterdam,
        location: {
            latitude: 52.3676,
            longitude: 4.9041,
            zoom: 10,
        },
    },
    previewImage: '',
    location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 10,
    },
};

describe('OfferDetailed', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Basic rendering', () => {
        it('renders offer title', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(
                screen.getByText('Luxury apartment in Amsterdam'),
            ).toBeInTheDocument();
        });

        it('renders offer type with capitalized first letter', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('Apartment')).toBeInTheDocument();
        });

        it('renders correct rating value', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('4.8')).toBeInTheDocument();
        });

        it('renders rating stars with correct width', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const ratingElement =
                screen.getAllByText('Rating')[0].previousElementSibling;
            expect(ratingElement).toHaveStyle({ width: '96%' });
        });

        it('renders bedrooms count', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
        });

        it('renders max adults count', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
        });

        it('renders description', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(
                screen.getByText('A nice place to stay'),
            ).toBeInTheDocument();
        });
    });

    describe('Images gallery', () => {
        it('renders all offer images', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const images = screen.getAllByAltText('Photo studio');
            expect(images).toHaveLength(3);
        });

        it('renders images with correct src attributes', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const images = screen.getAllByAltText('Photo studio');
            expect(images[0]).toHaveAttribute(
                'src',
                'https://example.com/img1.jpg',
            );
            expect(images[1]).toHaveAttribute(
                'src',
                'https://example.com/img2.jpg',
            );
            expect(images[2]).toHaveAttribute(
                'src',
                'https://example.com/img3.jpg',
            );
        });
    });

    describe('Premium badge', () => {
        it('shows premium badge for premium offers', () => {
            const premiumOffer = { ...mockDetailedOffer, isPremium: true };
            render(<OfferDetailed offer={premiumOffer} reviews={null} />);

            expect(screen.getByText('Premium')).toBeInTheDocument();
        });

        it('does not show premium badge for regular offers', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.queryByText('Premium')).not.toBeInTheDocument();
        });
    });

    describe('Goods list', () => {
        it('renders all goods items', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
            expect(screen.getByText('Washing machine')).toBeInTheDocument();
            expect(screen.getByText('Towels')).toBeInTheDocument();
            expect(screen.getByText('Heating')).toBeInTheDocument();
        });

        it('renders goods section title', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText("What's inside")).toBeInTheDocument();
        });
    });

    describe('Host information', () => {
        it('renders host name', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });

        it('renders host avatar', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const avatar = screen.getByAltText('Host avatar');
            expect(avatar).toHaveAttribute(
                'src',
                'https://example.com/avatar.jpg',
            );
            expect(avatar).toHaveAttribute('width', '74');
            expect(avatar).toHaveAttribute('height', '74');
        });

        it('shows Pro badge for pro host', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            expect(screen.getByText('Pro')).toBeInTheDocument();
        });

        it('does not show Pro badge for regular host', () => {
            const regularHostOffer = {
                ...mockDetailedOffer,
                host: { ...mockDetailedOffer.host, isPro: false },
            };
            render(<OfferDetailed offer={regularHostOffer} reviews={null} />);

            expect(screen.queryByText('Pro')).not.toBeInTheDocument();
        });

        it('applies pro class to avatar wrapper for pro host', () => {
            const { container } = render(
                <OfferDetailed offer={mockDetailedOffer} reviews={null} />,
            );

            const avatarWrapper = container.querySelector(
                '.offer__avatar-wrapper',
            );
            expect(avatarWrapper).toHaveClass('offer__avatar-wrapper--pro');
        });
    });

    describe('Favorite functionality', () => {
        it('shows bookmark button without active state for non-favorite offers', () => {
            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const button = screen.getByRole('button');
            expect(button).not.toHaveClass('offer__bookmark-button--active');
        });

        it('shows bookmark button with active state for favorite offers', () => {
            const favoriteOffer = { ...mockDetailedOffer, isFavorite: true };
            render(<OfferDetailed offer={favoriteOffer} reviews={null} />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('offer__bookmark-button--active');
        });

        it('calls toggleFavoriteHandler on button click', async () => {
            const mockToggleFavorite = vi.fn();
            const { useToggleFavoriteOffer } = await import(
                '../../lib/hooks/use-toggle-favorite-offer'
            );
            vi.mocked(useToggleFavoriteOffer).mockReturnValue(
                mockToggleFavorite,
            );

            render(<OfferDetailed offer={mockDetailedOffer} reviews={null} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
        });
    });

    describe('Reviews section', () => {
        it('renders reviews component when provided', () => {
            const reviewsComponent = (
                <div data-testid="reviews">Reviews content</div>
            );
            render(
                <OfferDetailed
                    offer={mockDetailedOffer}
                    reviews={reviewsComponent}
                />,
            );

            expect(screen.getByTestId('reviews')).toBeInTheDocument();
            expect(screen.getByText('Reviews content')).toBeInTheDocument();
        });

        it('does not render anything when reviews is null', () => {
            const { container } = render(
                <OfferDetailed offer={mockDetailedOffer} reviews={null} />,
            );

            expect(
                container.querySelector('[data-testid="reviews"]'),
            ).not.toBeInTheDocument();
        });
    });
});
