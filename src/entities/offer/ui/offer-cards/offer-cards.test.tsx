import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OfferCards } from './offer-cards';
import { Offer } from '../../model/types/offer';
import { OfferCard } from '../offer-card/offer-card';
import { CITY_NAME } from '@/entities/city';

vi.mock('../offer-card/offer-card', () => ({
    OfferCard: vi.fn(
        ({
            offer,
            variant,
            onActiveOffer,
        }: {
            offer: Offer;
            variant?: 'default' | 'favorite';
            onActiveOffer?: (offer: Offer | null) => void;
        }) => (
            <div
                data-testid={`offer-card-${offer.id}`}
                data-variant={variant}
                data-has-callback={!!onActiveOffer}
            >
                {offer.title}
            </div>
        ),
    ),
}));

const mockOffers: Offer[] = [
    {
        id: 'offer-1',
        title: 'Beautiful apartment',
        type: 'apartment',
        price: 120,
        rating: 4.5,
        previewImage: 'https://example.com/image1.jpg',
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
    },
    {
        id: 'offer-2',
        title: 'Cozy studio',
        type: 'room',
        price: 80,
        rating: 4.0,
        previewImage: 'https://example.com/image2.jpg',
        isPremium: true,
        isFavorite: true,
        city: {
            name: CITY_NAME.Amsterdam,
            location: {
                latitude: 52.3676,
                longitude: 4.9041,
                zoom: 10,
            },
        },
        location: {
            latitude: 52.3676,
            longitude: 4.9041,
            zoom: 10,
        },
    },
    {
        id: 'offer-3',
        title: 'Luxury house',
        type: 'house',
        price: 300,
        rating: 5.0,
        previewImage: 'https://example.com/image3.jpg',
        isPremium: true,
        isFavorite: false,
        city: {
            name: CITY_NAME.Hamburg,
            location: {
                latitude: 53.5511,
                longitude: 9.9937,
                zoom: 10,
            },
        },
        location: {
            latitude: 53.5511,
            longitude: 9.9937,
            zoom: 10,
        },
    },
];

describe('OfferCards', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Basic rendering', () => {
        it('renders all offer cards', () => {
            render(<OfferCards offers={mockOffers} />);

            expect(
                screen.getByTestId('offer-card-offer-1'),
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('offer-card-offer-2'),
            ).toBeInTheDocument();
            expect(
                screen.getByTestId('offer-card-offer-3'),
            ).toBeInTheDocument();
        });

        it('renders correct number of cards', () => {
            const { container } = render(<OfferCards offers={mockOffers} />);

            const cards = container.querySelectorAll(
                '[data-testid^="offer-card-"]',
            );
            expect(cards).toHaveLength(3);
        });

        it('renders offer cards with correct titles', () => {
            render(<OfferCards offers={mockOffers} />);

            expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
            expect(screen.getByText('Cozy studio')).toBeInTheDocument();
            expect(screen.getByText('Luxury house')).toBeInTheDocument();
        });
    });

    describe('Empty offers', () => {
        it('renders nothing when offers array is empty', () => {
            const { container } = render(<OfferCards offers={[]} />);

            const cards = container.querySelectorAll(
                '[data-testid^="offer-card-"]',
            );
            expect(cards).toHaveLength(0);
        });
    });

    describe('Variant prop', () => {
        it('passes default variant to OfferCard components', () => {
            render(<OfferCards offers={mockOffers} variant="default" />);

            const cards = screen.getAllByTestId(/^offer-card-/);
            cards.forEach((card) => {
                expect(card).toHaveAttribute('data-variant', 'default');
            });
        });

        it('passes favorite variant to OfferCard components', () => {
            render(<OfferCards offers={mockOffers} variant="favorite" />);

            const cards = screen.getAllByTestId(/^offer-card-/);
            cards.forEach((card) => {
                expect(card).toHaveAttribute('data-variant', 'favorite');
            });
        });
    });

    describe('onActiveOffer callback', () => {
        it('passes onActiveOffer callback to OfferCard components', () => {
            const onActiveOffer = vi.fn();
            render(
                <OfferCards
                    offers={mockOffers}
                    onActiveOffer={onActiveOffer}
                />,
            );

            const cards = screen.getAllByTestId(/^offer-card-/);
            cards.forEach((card) => {
                expect(card).toHaveAttribute('data-has-callback', 'true');
            });
        });

        it('does not pass callback when onActiveOffer is not provided', () => {
            render(<OfferCards offers={mockOffers} />);

            const cards = screen.getAllByTestId(/^offer-card-/);
            cards.forEach((card) => {
                expect(card).toHaveAttribute('data-has-callback', 'false');
            });
        });
    });

    describe('OfferCard component integration', () => {
        it('calls OfferCard with correct props for each offer', () => {
            const onActiveOffer = vi.fn();

            render(
                <OfferCards
                    offers={mockOffers}
                    variant="favorite"
                    onActiveOffer={onActiveOffer}
                />,
            );

            expect(vi.mocked(OfferCard)).toHaveBeenCalledTimes(3);

            expect(vi.mocked(OfferCard)).toHaveBeenCalledWith(
                expect.objectContaining({
                    offer: mockOffers[0],
                    variant: 'favorite',
                    onActiveOffer,
                }),
                expect.anything(),
            );

            expect(vi.mocked(OfferCard)).toHaveBeenCalledWith(
                expect.objectContaining({
                    offer: mockOffers[1],
                    variant: 'favorite',
                    onActiveOffer,
                }),
                expect.anything(),
            );

            expect(vi.mocked(OfferCard)).toHaveBeenCalledWith(
                expect.objectContaining({
                    offer: mockOffers[2],
                    variant: 'favorite',
                    onActiveOffer,
                }),
                expect.anything(),
            );
        });
    });

    describe('Single offer', () => {
        it('renders single offer card correctly', () => {
            render(<OfferCards offers={[mockOffers[0]]} />);

            expect(
                screen.getByTestId('offer-card-offer-1'),
            ).toBeInTheDocument();
            expect(
                screen.queryByTestId('offer-card-offer-2'),
            ).not.toBeInTheDocument();
            expect(
                screen.queryByTestId('offer-card-offer-3'),
            ).not.toBeInTheDocument();
        });
    });

    describe('Memoization', () => {
        it('does not re-render when props do not change', () => {
            const { rerender } = render(<OfferCards offers={mockOffers} />);

            const callCountAfterFirstRender =
                vi.mocked(OfferCard).mock.calls.length;

            rerender(<OfferCards offers={mockOffers} />);

            expect(vi.mocked(OfferCard).mock.calls.length).toBe(
                callCountAfterFirstRender,
            );
        });

        it('re-renders when offers change', () => {
            const { rerender } = render(<OfferCards offers={mockOffers} />);

            const callCountAfterFirstRender =
                vi.mocked(OfferCard).mock.calls.length;

            const newOffers = [mockOffers[0]];
            rerender(<OfferCards offers={newOffers} />);

            expect(vi.mocked(OfferCard).mock.calls.length).toBeGreaterThan(
                callCountAfterFirstRender,
            );
        });
    });
});
