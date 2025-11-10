import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewList } from './review-list';
import { Review } from '../../model/types/review';

vi.mock('@/shared/lib/format-date', () => ({
    formatDate: vi.fn((date: string) => ({
        dateTime: date,
        mothYear: 'January 2024',
    })),
}));

describe('ReviewList', () => {
    const mockReviews: Review[] = [
        {
            id: '1',
            comment: 'Great place to stay!',
            rating: 5,
            date: '2024-01-01',
            user: {
                name: 'John Doe',
                avatarUrl: 'https://example.com/avatar1.jpg',
                isPro: false,
            },
        },
        {
            id: '2',
            comment: 'Nice location',
            rating: 4,
            date: '2024-01-02',
            user: {
                name: 'Jane Smith',
                avatarUrl: 'https://example.com/avatar2.jpg',
                isPro: true,
            },
        },
    ];

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render list of reviews', () => {
        render(<ReviewList reviews={mockReviews} />);
        expect(screen.getByText('Great place to stay!')).toBeInTheDocument();
        expect(screen.getByText('Nice location')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should render correct number of reviews', () => {
        const { container } = render(<ReviewList reviews={mockReviews} />);
        const reviewItems = container.querySelectorAll('.reviews__item');
        expect(reviewItems).toHaveLength(2);
    });

    it('should render avatars with correct attributes', () => {
        render(<ReviewList reviews={mockReviews} />);
        const avatars = screen.getAllByAltText('Reviews avatar');
        expect(avatars).toHaveLength(2);
        expect(avatars[0]).toHaveAttribute(
            'src',
            'https://example.com/avatar1.jpg',
        );
        expect(avatars[1]).toHaveAttribute(
            'src',
            'https://example.com/avatar2.jpg',
        );
    });

    it('should calculate rating width correctly', () => {
        const { container } = render(<ReviewList reviews={mockReviews} />);
        const ratingStars = container.querySelectorAll('.reviews__stars span');
        expect(ratingStars[0]).toHaveStyle({ width: '100%' });
        expect(ratingStars[2]).toHaveStyle({ width: '80%' });
    });

    it('should render formatted dates', () => {
        render(<ReviewList reviews={mockReviews} />);
        const times = screen.getAllByText('January 2024');
        expect(times).toHaveLength(2);
    });

    it('should render datetime attribute correctly', () => {
        const { container } = render(<ReviewList reviews={mockReviews} />);
        const timeElements = container.querySelectorAll('.reviews__time');
        expect(timeElements[0]).toHaveAttribute('dateTime', '2024-01-01');
        expect(timeElements[1]).toHaveAttribute('dateTime', '2024-01-02');
    });

    it('should return null when reviews array is empty', () => {
        const { container } = render(<ReviewList reviews={[]} />);
        expect(container.firstChild).toBeNull();
    });

    it('should render reviews with correct structure', () => {
        const { container } = render(<ReviewList reviews={mockReviews} />);
        expect(container.querySelector('.reviews__list')).toBeInTheDocument();
        expect(container.querySelectorAll('.reviews__user')).toHaveLength(2);
        expect(container.querySelectorAll('.reviews__info')).toHaveLength(2);
        expect(container.querySelectorAll('.reviews__rating')).toHaveLength(2);
    });
});
