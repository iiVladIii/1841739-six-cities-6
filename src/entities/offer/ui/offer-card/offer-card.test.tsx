import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OfferCard } from './offer-card';
import { Offer } from '../../model/types/offer';
import { CITY_NAME } from '@/entities/city';

vi.mock('../../lib/hooks/use-toggle-favorite-offer', () => ({
    useToggleFavoriteOffer: vi.fn(() => vi.fn()),
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

const renderWithRouter = (component: React.ReactElement) =>
    render(<MemoryRouter>{component}</MemoryRouter>);

describe('OfferCard', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Basic rendering', () => {
        it('renders card with correct data', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            expect(
                screen.getByText('Beautiful apartment in Paris'),
            ).toBeInTheDocument();
            expect(screen.getByText('€120')).toBeInTheDocument();
            expect(screen.getByText('apartment')).toBeInTheDocument();
            expect(screen.getByAltText('Place image')).toHaveAttribute(
                'src',
                'https://example.com/image.jpg',
            );
        });

        it('renders correct link to offer page', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            const links = screen.getAllByRole('link');
            expect(links[0]).toHaveAttribute('href', '/offer/test-id-123');
        });

        it('displays correct rating', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            const ratingElement =
                screen.getByText('Rating').previousElementSibling;
            expect(ratingElement).toHaveStyle({ width: '90%' });
        });
    });

    describe('Variants', () => {
        it('applies default variant classes', () => {
            const { container } = renderWithRouter(
                <OfferCard offer={mockOffer} variant="default" />,
            );

            const article = container.querySelector('article');
            expect(article).toHaveClass('cities__card');
            expect(article).not.toHaveClass('favorites__card');
        });

        it('applies favorite variant classes', () => {
            const { container } = renderWithRouter(
                <OfferCard offer={mockOffer} variant="favorite" />,
            );

            const article = container.querySelector('article');
            expect(article).toHaveClass('favorites__card');
            expect(article).not.toHaveClass('cities__card');
        });

        it('renders image with 260x200 dimensions for default variant', () => {
            renderWithRouter(<OfferCard offer={mockOffer} variant="default" />);

            const image = screen.getByAltText('Place image');
            expect(image).toHaveAttribute('width', '260');
            expect(image).toHaveAttribute('height', '200');
        });

        it('renders image with 150x110 dimensions for favorite variant', () => {
            renderWithRouter(
                <OfferCard offer={mockOffer} variant="favorite" />,
            );

            const image = screen.getByAltText('Place image');
            expect(image).toHaveAttribute('width', '150');
            expect(image).toHaveAttribute('height', '110');
        });
    });

    describe('Premium badge', () => {
        it('shows premium badge for premium offers', () => {
            const premiumOffer = { ...mockOffer, isPremium: true };
            renderWithRouter(<OfferCard offer={premiumOffer} />);

            expect(screen.getByText('Premium')).toBeInTheDocument();
        });

        it('does not show premium badge for regular offers', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            expect(screen.queryByText('Premium')).not.toBeInTheDocument();
        });
    });

    describe('Favorite functionality', () => {
        it('shows bookmark button without active state for non-favorite offers', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            const button = screen.getByRole('button');
            expect(button).not.toHaveClass(
                'place-card__bookmark-button--active',
            );
            expect(screen.getByText('To bookmarks')).toBeInTheDocument();
        });

        it('shows bookmark button with active state for favorite offers', () => {
            const favoriteOffer = { ...mockOffer, isFavorite: true };
            renderWithRouter(<OfferCard offer={favoriteOffer} />);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('place-card__bookmark-button--active');
            expect(screen.getByText('In bookmarks')).toBeInTheDocument();
        });

        it('calls toggleFavoriteHandler on button click', async () => {
            const mockToggleFavorite = vi.fn();
            const { useToggleFavoriteOffer } = await import(
                '../../lib/hooks/use-toggle-favorite-offer'
            );
            vi.mocked(useToggleFavoriteOffer).mockReturnValue(
                mockToggleFavorite,
            );

            renderWithRouter(<OfferCard offer={mockOffer} />);

            const button = screen.getByRole('button');
            fireEvent.click(button);

            expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
        });
    });

    describe('Mouse events', () => {
        it('calls onActiveOffer with offer on mouse enter', () => {
            const onActiveOffer = vi.fn();
            renderWithRouter(
                <OfferCard offer={mockOffer} onActiveOffer={onActiveOffer} />,
            );

            const article = screen.getByRole('article');
            fireEvent.mouseEnter(article);

            expect(onActiveOffer).toHaveBeenCalledWith(mockOffer);
        });

        it('calls onActiveOffer with null on mouse leave', () => {
            const onActiveOffer = vi.fn();
            renderWithRouter(
                <OfferCard offer={mockOffer} onActiveOffer={onActiveOffer} />,
            );

            const article = screen.getByRole('article');
            fireEvent.mouseLeave(article);

            expect(onActiveOffer).toHaveBeenCalledWith(null);
        });

        it('does not throw error when onActiveOffer is not provided', () => {
            renderWithRouter(<OfferCard offer={mockOffer} />);

            const article = screen.getByRole('article');

            expect(() => {
                fireEvent.mouseEnter(article);
                fireEvent.mouseLeave(article);
            }).not.toThrow();
        });
    });
});
